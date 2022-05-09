import { Request, Response, NextFunction } from "express";
import {check, validationResult, query, header} from "express-validator";
import { errorHandler } from "../utils";
import { STATUS_MSG } from "../constants/app.constants";
import Logger from "../logger";

const logger = Logger("validation-middleware");
class Validator{
    checkValidation(req: Request, res: Response, next: NextFunction){
        const error: any= validationResult(req); // check if express-validator found any error.
                try{
                    if(!error.isEmpty()){ //if error found by express-validator
                        logger.error(error.errors);
                        throw STATUS_MSG.ERROR.BAD_REQUEST(error.errors[0].msg);

                    }else{
                        next();
                    }
                    
                }catch(err: any){
                    logger.error(err);
                    errorHandler(err, res);
                }
    }

    checkLoginValidation = (req: Request, res: Response, next: NextFunction) => {
        try{
            if(!req.body.email && !req.body.phoneNumber){
                throw STATUS_MSG.ERROR.BAD_REQUEST("phone number or email missing");
            }else{
                this.checkValidation(req, res, next);
            }
        }catch(err){
            logger.error(err);
            errorHandler(err, res);
        }
    }
    
    validatePhone = [
        check("phoneNumber").exists().withMessage("Phone number is required").isLength({min: 12, max: 14}).withMessage("Phone number should be of lenght 10").bail().matches(/^\+[1-9]{1}[0-9]{3,14}$/).withMessage("Invalid phone number").bail(),
        this.checkValidation
    ]

    validatePassord = [
        check("password").exists().withMessage("Password is needed").bail().isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: false,
            pointsPerUnique: 1,
            pointsPerRepeat: 0.5,
            pointsForContainingLower: 10,
            pointsForContainingUpper: 10,
            pointsForContainingNumber: 10,
            pointsForContainingSymbol: 10,
          }).withMessage("Weak password"),
        this.checkValidation
    ]

    validateEmail = [
        check("email").exists().withMessage("Email is required").bail().trim().normalizeEmail().isEmail().withMessage("Not a valid email").bail(),
        this.checkValidation
    ]

    validateName = [
        check('name').exists().withMessage("Name is required").bail().trim().not().isEmpty().withMessage("Name cannot be empty").bail(),
        this.checkValidation
    ]

    validateDeviceId = [
        header("device-id").exists().withMessage("Device id is required").bail(),
        this.checkValidation
    ]

    validateAuthorization = [
        header("authorization").exists().withMessage("Authorization token is missing").bail(),
        this.checkValidation
    ]

    validateSession = [
        this.validateDeviceId[0],
        this.validateAuthorization[0],
        this.checkValidation
    ]

    validateDOB = [
        check("DOB").trim().exists().withMessage("Enter a date of birth").bail().matches(/^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/).withMessage("Not a valid date of birth").bail(),
        ...this.validateSession
    ]
    
    validateToken = [
        query("token").exists().withMessage("Token is missing").bail(),
        this.checkValidation
    ]

    validatePhoneOtp = [
        this.validatePhone[0],
        check("code").exists().withMessage("Code not provided").matches(/^[0-9]{4}$/).withMessage("Invalid code format").isLength({min: 4, max: 4}).withMessage('Invalid code length'),
        this.checkValidation
    ]

    validatePhoneDevice = [ // for route that verifys phone number
        this.validateDeviceId[0],
        ...this.validatePhoneOtp
    ]

    validateEmailPassword = [
        this.validateEmail[0],
        ...this.validateDeviceId
    ]

    validateUser = [
        this.validateName[0],
        this.validateEmail[0],
        this.validatePhone[0],
        this.validatePassord[0],
        this.checkValidation
    ]

    login = [
        this.validatePassord[0],
        this.validateSession[0],
        check("email").optional().trim().normalizeEmail().isEmail().withMessage("Not a valid email").bail(),
        check("phoneNumber").optional().isLength({min: 12, max: 14}).withMessage("Phone number should be of lenght 10").bail().matches(/^\+[1-9]{1}[0-9]{3,14}$/).withMessage("Invalid phone number").bail(),
        this.checkLoginValidation
    ]

    updatePassword = [
        this.validatePassord[0],
        check("confirmPassword").exists().withMessage("Enter confirmation pasword").custom((value, {req}) => {
            if(value !== req.body.password){
                throw new Error("Password confirmation does not match password")
            }
            return true;
        }),
        this.checkValidation
    ]
    
    
}

const validator = new Validator();
export default validator;