import {NextFunction, Request, Response} from "express";
import {sendOTP, verifyOTP, errorHandler, createToken, sendEmail, extractToken, passwordCompare} from "../../utils/index"
import { loginInterface, sessionDetail, userInterface} from "../../interface/";
import Logger from "../../logger";
import {UserEntity, SessionEntity, userSubscriptionEntity }from "../../entities/"
import { HOST, PORT, STATUS_MSG } from "../../constants";
import upload from "../../middleware/multer.middleware";
import { coachAthleteEntity } from "../../entities/v1/coachAthlete.entity";
import { workoutEntity } from "../../entities/v1/workout.entity";
import { userWokoutEntity } from "../../entities/v1/userWorkout.entity";

const logger = Logger("user-controller");
export default class UserController{

    // @desc Sign up a user and send verification link to his email
    // @route POST /api/user/v1/signup
    // @access Public
    static async signUp(req: Request, res: Response){
        const {name, phoneNumber, email, password, userType} = req.body;
        try{
            // check if user exists from before.
            const userStatus= <(boolean|string)[]> await UserEntity.userStatus(email, phoneNumber);
            let userId: string;
            if(userStatus.every(elem => elem === false)){
                userId = await UserEntity.addUser(name, email, phoneNumber, password, userType);

            }else if(userStatus.every(elem => typeof elem === "string") && userStatus[0] === userStatus[1]){
                userId = <string>userStatus[0];
            }else{
                throw STATUS_MSG.ERROR.USER_EXISTS;
            }
            const token = createToken({_id: userId}, 60 * 5);
            const url: string = `<a href ="http://${HOST}:${PORT}/api/user/v1/signup/email/verify?token=${token}"> Click here </a>`;
            const otpStatus = await sendEmail(email, url, "verify your email");
            res.status(201).json(STATUS_MSG.SUCCESS.EMAIL_SENT(email));
            
        }catch(err: any){
            logger.error(err);
            errorHandler(err, res);
        }
    }

    // @desc Verify user email
    // @route GET /api/user/v1/signup/email/verify
    // @access Private
    static async verifyEmail(req: Request, res: Response){
        const token = <string>req.query.token;
        
        try{
            const {_id} = await extractToken(token);
            const user = await UserEntity.userExists({_id, emailVerified: false});
            if(!user){
                throw STATUS_MSG.ERROR.FORBIDDEN("No user with given id found");
            }else{
                const athleteUpdated = <userInterface|null> await UserEntity.updateUser({_id}, {emailVerified: true});
                if(athleteUpdated){
                    res.status(201).json(STATUS_MSG.SUCCESS.CUSTOM_SUCCESS(201, "email verified continue to verify phone"));
                }else{
                    throw STATUS_MSG.ERROR.DB_ERROR;
                }
            }
        }catch(err){
            logger.error(err);
            errorHandler(err, res);
        }
        
    }
    // @desc Sign up a user using his phone 
    // @route POST /api/user/v1/signup/phone
    // @access Public
    static async signUpPhone(req: Request, res: Response) {
        const {phoneNumber} = req.body;
        try{
            // check if user exists and has his email verified.
            const userExists = await UserEntity.userExists({phoneNumber, emailVerified: true});
            if(!userExists){
                throw STATUS_MSG.ERROR.NOT_EXIST("Phone number");
            }else{
                // send otp to the user on his phone.
                const otpStatus = await sendOTP(phoneNumber); 

                // return user the number to which otp was sent.
                res.status(200).json(STATUS_MSG.SUCCESS.OTP_SENT(phoneNumber));
            }
            
        }catch(err: any){
            logger.error(err);
            errorHandler(err, res);
        }
    }

    // @desc Make user active for valid otp. Remove from database if not.
    // @route POST /api/user/v1/signup/phone/verify
    // @access Public
    static async verifyPhone(req: Request, res: Response) {
        const {phoneNumber, code} = req.body;
        const deviceId = <string> req.headers["device-id"];
        try{
            // check if the number is valid.
            const user = <boolean>await UserEntity.userExists({phoneNumber, phoneVerified: false}); 
            if(user){
                // verify the otp
                const optVerified: boolean = await verifyOTP(phoneNumber, code); 
                if(!optVerified){
                    throw STATUS_MSG.DATA_RESPONSE(403, false, "otp is not valid", {});
                    
                }else{
                    // if otp is valid set user as active.
                    const user = <null|userInterface> await UserEntity.updateUser({phoneNumber}, {phoneVerified: true, active: true}); 
                    if(!user){
                        throw STATUS_MSG.ERROR.DB_ERROR;
                    }else{
                        const sessionId = await SessionEntity.createSession(user.id, deviceId, user.userType);
                        const token: string = "Bearer " + createToken({_id: user.id, sessionId, userType: user.userType});
                        res.status(201).json(STATUS_MSG.DATA_RESPONSE(201, true, "User activated", {result: user, token}));
                    }
                }
            }else{
                throw STATUS_MSG.DATA_RESPONSE(404, false, "User not found", {});
            }
                    
            }catch(err: any){
                logger.error(err);
                errorHandler(err, res);
            }
        }

        // @desc Resend otp.
        // @route POST /api/user/v1/signup/phone/resendotp
        // @access Private
        static async resendOtp(req: Request, res: Response){
            const {phoneNumber} = req.body;
            try{
                const numberExists = <boolean> await UserEntity.userExists({phoneNumber, phoneVerified: false, emailVerified: true});
                if(numberExists){
                    // send otp to the user on his phone.
                    const otpStatus = await sendOTP(phoneNumber); 

                    res.status(200).json(STATUS_MSG.SUCCESS.OTP_SENT(phoneNumber));
                }else{
                    throw STATUS_MSG.ERROR.FORBIDDEN("phone number not found");
                }
            }catch(err: any){
                logger.error(err);
                errorHandler(err, res);
            }
        }

        

        
        // @desc new password for user who forgot his previous one.
        // @route POST /api/user/v1/forgoPassword/phone
        // @access Private
        static async forgotPasswordPhone(req: Request, res: Response){
            const {phoneNumber} = req.body;
            try{
                // check if user exists.
                const userExists = await UserEntity.userExists({phoneNumber, active: true});
                if(!userExists){
                    throw STATUS_MSG.ERROR.FORBIDDEN("phone number not found");
                }else{
    
                    // send otp to the user on his phone.
                    const otpStatus = await sendOTP(req.body.phoneNumber); 
    
                    // return user the number to which otp was sent.
                    res.status(200).json(STATUS_MSG.SUCCESS.OTP_SENT(phoneNumber));
                }
                
            }catch(err: any){
                logger.error(err);
                errorHandler(err, res);
            }
        }

        // @desc Create new password if valid otp.
        // @route POST /api/user/v1/forgotPassword/phone/verify
        // @access Private
        static async newPasswordOTPValidator(req: Request, res: Response){
            const {phoneNumber, code} = req.body;
            const deviceId = <string> req.headers["device-id"];
            try{
                // check if the number is valid.
                const user = <userInterface>await UserEntity.findUserDetails({phoneNumber}); 
                    if(user){
                        // verify the otp
                        const optVerified: boolean = await verifyOTP(phoneNumber, code); 
                        if(!optVerified){
                            // if invalid otp provided.
                            throw STATUS_MSG.ERROR.INVALID_TOKEN;
                        }else{
                            // if otp is valid now the user will be send session token.
                            const sessionId = await SessionEntity.createSession(user.id, deviceId, user.userType);
                            const token: string = "Bearer " + createToken({_id: user.id, sessionId, userType: user.userType});
                            
                            res.status(200).json(STATUS_MSG.SUCCESS.CUSTOM_SUCCESS(201, token));
                        }
                    }else{
                        throw STATUS_MSG.ERROR.FORBIDDEN("phone number not found");
                    }
                        
                }catch(err: any){
                    logger.error(err);
                    errorHandler(err, res);
                }
        }

        // @desc Validate a email and send a session token for that email.
        // @route POST /api/user/v1/forgotPassword/email
        // @access Public
        static async newPasswordEmail(req: Request, res: Response){
            const {email} = req.body;
            const deviceId = <string>req.headers["device-id"];
            try{
                const user = await UserEntity.findUserDetails({email});
                if(!user){
                    throw STATUS_MSG.ERROR.FORBIDDEN("Email not found");
                }else{
                    const sessionId = await SessionEntity.createSession(user.id, deviceId, user.userType);
                    const token: string= createToken({_id: user.id, sessionId, userType: user.userType});
                    const url: string = "http://coach?token=" + token;
                    const emailStatus = await sendEmail(email, url, "Verify your email to reset password"); 
                    res.status(201).send(STATUS_MSG.SUCCESS.CUSTOM_SUCCESS(201, "Password reset link sent"));
                }
            }catch(err){
                logger.error(err);
                errorHandler(err, res);
            }
        }

        // @desc Update user password.
        // @route POST /api/user/v1/updatePassword
        // @access Private
        static async newPassword(req: Request, res: Response){
            const {password} = req.body;
            try{
                const {_id} = <sessionDetail>req.user;
                const user = <userInterface|null> await UserEntity.updateUser({_id}, {password});
                if(!user){
                    throw STATUS_MSG.ERROR.FORBIDDEN("User not found");
                }else{
                    throw STATUS_MSG.SUCCESS.PROFILE_UPDATED
                }
            }catch(err: any){
                logger.error(err);
                errorHandler(err, res);
            }
        }

        // @desc Login a user and send back jwt token.
        // @route POST /api/user/v1/login
        // @access Private
        static async login(req: Request, res: Response){
            try{
                const deviceId = <string>req.headers["device-id"];
                const password: string = req.body.password;
                delete req.body.password;
                const loginDetail: loginInterface = req.body;
            
                //check if user exists.
                const user: userInterface = <userInterface> await UserEntity.findUserDetails(loginDetail);
                logger.info(user);
                if(!user){
                    res.status(401).json(STATUS_MSG.DATA_RESPONSE(403, false, "wrong credentials", {}));
                }
                else{
                    
                    const checkPassword: boolean = await passwordCompare(password, user.password);
                    logger.info(checkPassword);
                    if(checkPassword){
                        // create or update session if user exists.
                        const sessionId = await SessionEntity.createSession(user.id, deviceId, user.userType);
                        const token: string = "Bearer " + createToken({_id: user.id, sessionId, userType: user.userType});
                        console.log(user);
                        res.status(201).json(STATUS_MSG.DATA_RESPONSE(201, true, "user logger in", {user, token}));
                    }else{
                        res.status(401).json(STATUS_MSG.DATA_RESPONSE(401, false, "wrong credentials", {}));
                    }
                    
                }
            }catch(err: any){
                logger.error(err);
                errorHandler(err, res);
            }
        }

        // @desc Get user details of a loged in user.
        // @route POST /api/user/v1/profile
        // @access Private
        static async getUserDetails(req: Request, res: Response){
            const {_id} = <sessionDetail>req.user;
            try{
                const user = await UserEntity.findUserDetails({_id});
                if(user){
                    res.status(200).json(STATUS_MSG.SUCCESS.CUSTOM_CONTENT(200, {user}));
                }else{
                    res.send("not found");
                }
            }catch(err: any){
                logger.error(err);
                res.send(err.message);
            }

        }


        // @desc Add user date of birth
        // @route POST /api/user/v1/setDOB
        // @access Private
        static async newDOB(req: Request, res: Response){
            const DOB: string = new Date(req.body.DOB).toDateString();
            const {_id} = <sessionDetail>req.user;
            try{
                const isUpdated = await UserEntity.updateUser({_id}, {DOB});
                logger.info(isUpdated);
                if(isUpdated){
                    res.status(201).json(STATUS_MSG.DATA_RESPONSE(201, true, "User profile uploaded", {user: isUpdated}));
                }else{
                    res.status(401).json(STATUS_MSG.ERROR.FORBIDDEN("Invalid user id"));
                }
            }catch(err){
                logger.error(err);
                errorHandler(err, res);
            }
        
        }

        // @desc Add user's profile picture
        // @route POST /api/user/v1/uploadPicture
        // @access Private
        static async image(req: Request, res: Response, next: NextFunction){
            upload(req, res, async function(err){
                try{
                    if(err){
                        throw STATUS_MSG.ERROR.BAD_REQUEST(err.message);
                    }else{
                        try{
                            if(req.file?.path === undefined){
                                throw STATUS_MSG.DATA_RESPONSE(400, false, "Image not provided", {});
                            }
                            const _id: string = <string>req.user;
                            const url: string = `${HOST}:${PORT}/${req.file?.path}`;
                            const user = await UserEntity.updateUser({_id}, {profilePicUrl: url});
                            if(!user){
                                throw STATUS_MSG.DATA_RESPONSE(404, false, "User not found", {});
                            }else{
                                res.status(201).json(STATUS_MSG.DATA_RESPONSE(201, true, "User profile uploaded", {user}));
                            }
                        }catch(err){
                            logger.error(err);
                            errorHandler(err, res);
                        }
                    }
                }catch(err: any){
                    logger.error(err);
                    errorHandler(err, res);
                }  
            })
        }

        static async addUser(req: Request, res: Response){
            try{
                const {_id, userType} = <sessionDetail>req.user;
                const {phoneNumber, email} = req.body;
                const {noOfSelectedUsers} = await userSubscriptionEntity.getValue({userId: _id});
                const maxUserAllowed = await userSubscriptionEntity.getMaXUsersAllowds(_id);
                if(maxUserAllowed <= noOfSelectedUsers){
                    console.log(maxUserAllowed, noOfSelectedUsers)
                    throw STATUS_MSG.ERROR.BAD_REQUEST("You can't add any more users");
                }
                const user = await UserEntity.getUser({phoneNumber, email, userType: !userType});
                if(!user){
                    res.status(404).json(STATUS_MSG.ERROR.NOT_EXIST("user"))
                }else{
                    const coach = userType? user: _id;
                    const athlete = userType? _id: user;
                    const exists = await coachAthleteEntity.getValue({coach, athlete});
                    if(exists){
                        throw STATUS_MSG.ERROR.USER_EXISTS;
                    }
                    const coachAthlete = await coachAthleteEntity.addValue({coach, athlete });
                    await userSubscriptionEntity.incrementNumberOfUsersAdded(_id);
                    res.status(201).send(coachAthlete);
                }

            }catch(err){
                logger.error(err);
                errorHandler(err, res);
            }
        }

        static async getConncetions(req: Request, res: Response){
            try{
                const {_id: user, userType} = <sessionDetail> req.user;
                console.log(userType);
                let connection;
                if(userType){// user is athlete
                    connection = await coachAthleteEntity.getAllCoach(user)

                }else{ // user is coach
                    connection = await coachAthleteEntity.getAllAthlete(user); // get all athlete from here.
                }
                console.log(connection);
                res.send(connection);
            }catch(err){
                logger.error(err);
                errorHandler(err, res);
            }
        }
}


