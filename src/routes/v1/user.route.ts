import { Router} from "express";
import SignupController from "../../controller/v1/user.controller";
import UserController from "../../controller/v1/user.controller";
import validator from "../../middleware/validator.middleware";
import upload from "../../middleware/multer.middleware";
import session from "../../middleware/session.middleware";
import {USERTYPE} from "../../constants"

const userRouter = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Status:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: number
 *           description: Status code of response
 *         success:
 *           type: boolean
 *           description: If request was successfully completed
 *         message: 
 *           type: string
 *           description: Messge from server
 *         type:
 *           type: string
 *           description: Response type
 *       example:
 *          statusCode: 201
 *          success: true
 *          message: User created
 *          type: 'USER_CREATED'
 *     
 *     Result:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: number
 *           description: Status code of resopnse
 *         success:
 *           type: boolean
 *           description: If request was successfull
 *         message:
 *           type: string
 *           description: Message from server
 *         data:
 *           type: object
 *           descritption: Result payload
 * 
 *       example:
 *         statusCode: 200
 *         success: true
 *         message: "Request success"
 *         data: {"user": {}}
 *           
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of user.
 *           required: true
 *         email:
 *           type: string
 *           description: email of user
 *           required: true
 *         phoneNumber:
 *           type: string
 *           description: Phone number of user
 *           required: true
 *         active: 
 *           type: boolean
 *           description: if user is active.
 *           required: true
 *         DOB: 
 *           type: date
 *           description: The user birthdate.
 *         password:
 *           type: string
 *           description: minLen 8, minLowerCase 1, minUpperCase 1, minNumbers 1, minSymbols 1
 *         type:
 *           type: number
 *           description: 0 for coach, 1 for athlete.
 *           required: true
 * 
 *       example:
 *         name: Ranvijay
 *         email: r@gmail.com
 *         phoneNumber: "+914325678965"
 *         password: aB3?asfi
 *         active: true
 *         DOB: "hoga kuch"
 *         type: 0
 *         
 *   securitySchemes:
 *     device-id:
 *       type: apiKey
 *       name: device-id
 *       in: header
 *       description: The device id
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   
 */
/**
 * @swagger
 * tags:
 *   - name: SignUp
 *     description: Routes to signup a new user.
 * 
 *   - name: Password
 *     description: Routes to modify password.
 */

/**
 * @swagger
 * /api/user/v1/signup/:
 *   post:
 *      summary: Register a user and send verification link to his email.
 *      tags: [SignUp]
 *      requestBody:
 *        requird: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  required: true
 *                  example: Ranvijay
 *                email:
 *                  type: string
 *                  required: true
 *                  example: ranvijay@gmail.com
 *                phoneNumber:
 *                  type: string 
 *                  required: true
 *                  example: "+917253830894"
 *                password:
 *                  type: string
 *                  required: true
 *                  example: aB3?asfi
 *                userType:
 *                   type: number
 *                   required: true
 *                   example: 0
 *                  
 *      responses:
 *        201:
 *          description: User profile created and email sent for verification
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 *             
 *        500:
 *          description: Some server error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 * 
 *        409:
 *          description: User exists
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 * 
 *        400:
 *          description: Missing fields
 *          content: 
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 */
 userRouter.post("/signup",
    validator.validateUser,
    SignupController.signUp
)

/**
 * @swagger
 * /api/user/v1/signup/email/verify:
 *   get:
 *      summary: Verify email.
 *      tags: [SignUp]
 *      parameters:
 *        - in: query
 *          name: token
 *          schema: 
 *            type: string
 *          description: The user token given for verification
 *                    
 *  
 *      responses:
 *        201:
 *          description: User profile activated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 *             
 *        500:
 *          description: Some server error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 * 
 *        400:
 *          description: Token missing 
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 * 
 *        
 *        403:
 *          description: User id not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 *        
 */
 userRouter.get("/signup/email/verify", 
    validator.validateToken,
    UserController.verifyEmail
 );

/**
 * @swagger
 * /api/user/v1/signup/phone:
 *   post:
 *      summary: Send a otp to a new user for verification
 *      tags: [SignUp]
 *      requestBody:
 *        requird: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                phoneNumber:
 *                  type: string 
 *                  required: true
 *                  example: "+917253830894"
 *                
 *                  
 *                    
 *  
 *      responses:
 *        200:
 *          description: Otp sent to user.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 *             
 *        500:
 *          description: Some server error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 * 
 *        404:
 *          description: Phone number does not exists.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 * 
 *        400:
 *          description: Missing fields
 *          content: 
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 */
userRouter.post("/signup/phone", 
    validator.validatePhone,
    SignupController.signUpPhone
);

/**
 * @swagger
 * /api/user/v1/signup/phone/verify:
 *   post:
 *      summary: Verify otp and set user active for valid otp and remove user if not valid
 *      tags: [SignUp]
 *      security:
 *        - device-id: []
 *      requestBody:
 *        requird: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                phoneNumber:
 *                  type: string
 *                  required: true
 *                  example: "+917253830894"
 *                code:
 *                  type: string
 *                  required: true
 *                  example: 1234
 *      
 *                  
 *      responses:
 *        201:
 *          description: User profile activated and token sended
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 *             
 *        500:
 *          description: Some server error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 * 
 *        403:
 *          description: Invalid otp 
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 * 
 *        404:
 *          description: No user with given phone number found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 */
userRouter.post("/signup/phone/verify",
    validator.validatePhoneDevice,
    UserController.verifyPhone
);

/**
 * @swagger
 * /api/user/v1/signup/phone/resendOtp:
 *   post:
 *      summary: Resend otp to user
 *      tags: [SignUp]
 *      requestBody:
 *        requird: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                phoneNumber:
 *                  type: string
 *                  required: true
 *                  example: "+917253830894"
 *                
 *                    
 *  
 *      responses:
 *        200:
 *          description: OTP resent
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 *             
 *        500:
 *          description: Some server error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 * 
 *        403:
 *          description: Phone number not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 *        
 *        400:
 *           description: Missing fields 
 */
userRouter.post("/signup/phone/resendotp",
    validator.validatePhone,
    UserController.resendOtp
)

/**
 * @swagger
 * /api/user/v1/forgotPassword/phone:
 *   post:
 *      summary: Send a otp to a new user for password reset.
 *      tags: [Password]
 *      requestBody:
 *        requird: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                phoneNumber:
 *                  type: string 
 *                  required: true
 *                  example: "+917253830894"
 *                    
 *  
 *      responses:
 *        201:
 *          description: Otp sent to user
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 *             
 *        500:
 *          description: Some server error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 * 
 *        400:
 *          description: Invalid phone number
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 * 
 *        403:
 *          description: Missing fields
 *          content: 
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 */
userRouter.post("/forgotPassword/phone",
    validator.validatePhone,
    UserController.forgotPasswordPhone
    )

/**
 * @swagger
 * /api/user/v1/forgotPassword/phone/verify:
 *   post:
 *      summary: Verify otp and 
 *      tags: [Password]
 *      security:
 *        - device-id: []
 *      requestBody:
 *        requird: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                phoneNumber:
 *                  type: string
 *                  required: true
 *                  example: "+917253830894"
 *                code:
 *                  type: string
 *                  required: true
 *                  example: 1234
 *                    
 *  
 *      responses:
 *        200:
 *          description: OTP verified
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 *             
 *        500:
 *          description: Some server error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 * 
 *        400:
 *          description: Invalid otp
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 * 
 *        403:
 *          description: Invalid phone number
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 */
userRouter.post("/forgotPassword/phone/verify",
    validator.validatePhoneOtp,
    UserController.newPasswordOTPValidator
)

/**
 * @swagger
 * /api/user/v1/forgotPassword/email:
 *   post:
 *      summary: Send a email to user for password reset.
 *      tags: [Password]
 *      requestBody:
 *        requird: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string 
 *                  required: true
 *                  example: ranvijay@gmail.com
 *      security:
 *        - device-id: []
 *  
 *      responses:
 *        201:
 *          description: Email sent to user
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 *             
 *        500:
 *          description: Some server error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 * 
 *        400:
 *          description: Invalid email
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 * 
 *        403:
 *          description: Missing fields
 *          content: 
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 */
userRouter.post("/forgotPassword/email",
    validator.validateEmail,
    validator.validateEmailPassword,
    UserController.newPasswordEmail
);

/**
 * @swagger
 * /api/user/v1/updatePassword:
 *   post:
 *      summary: Update user password when otp is confirmed.
 *      tags: [Password]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                password:
 *                  type: string
 *                  required: true
 *                  example: aB3?asfi
 *                confirmPassword:
 *                  type: string
 *                  required: true
 *                  example: aB3?asfi
 *      security:
 *        - bearerAuth: []
 *        - device-id: []
 * 
 *                    
 *  
 *      responses:
 *        201:
 *          description: User password updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 *             
 *        500:
 *          description: Some server error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 * 
 *        400:
 *          description: Invalid phone number
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 * 
 *        403:
 *          description: Missing fields
 *          content: 
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 */
userRouter.post("/updatePassword",
    validator.updatePassword,
    session([USERTYPE.ATHLETE, USERTYPE.COACH]),
    UserController.newPassword
)

/**
 * @swagger
 * /api/user/v1/login:
 *   post:
 *      summary: Login a user
 *      tags: [User]
 *      security:
 *        - device-id: []
 *      requestBody:
 *        requird: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  required: false
 *                  example: ranvijay@gmail.com
 *                phoneNumber:
 *                  type: string
 *                  required: false
 *                  example: "+917253830894"
 *                password:
 *                  type: string
 *                  required: true
 *                  example: aB3?asfi
 *                
 *                    
 *  
 *      responses:
 *        201:
 *          description: User logged in
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 *             
 *        500:
 *          description: Some server error
 *          
 * 
 *        400:
 *          description: User exists and is logged in
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 * 
 *        403:
 *          description: Invalid credentials
 *          
 */
 userRouter.post("/login", 
    validator.login,
    UserController.login
);

/**
 * @swagger
 * /api/user/v1/profile:
 *   get:
 *      summary: Get user profile
 *      tags: [User]
 *      security:
 *        - bearerAuth: []
 *        - device-id: []
 *                    
 *  
 *      responses:
 *        200:
 *          description: User profile sent.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 *             
 *        500:
 *          description: Some server error
 *          
 * 
 *        401:
 *          description: Unauthorized
 * 
 *        400:
 *          description: Missing fields
 *          
 */
userRouter.get("/profile",
    validator.validateSession,
    session([USERTYPE.ATHLETE, USERTYPE.COACH]),
    UserController.getUserDetails 
);

/**
 * @swagger
 * /api/user/v1/setDOB:
 *   patch:
 *      summary: Enter DOB of user.
 *      tags: [User]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                DOB:
 *                  type: string
 *                  required: true
 *                  example: 12/12/2000
 *      security:
 *        - bearerAuth: []
 *        - device-id: []
 *                
 *      responses:
 *        201:
 *          description: Date of birth added
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 *             
 *        500:
 *          description: Some server error
 *          
 * 
 *        401:
 *          description: Unauthorized
 *          
 */
userRouter.patch("/setDOB",
    validator.validateDOB,
    session([USERTYPE.ATHLETE, USERTYPE.COACH]),
    UserController.newDOB
);

/**
 * @swagger
 * /api/user/v1/uploadPicture:
 *   patch:
 *      summary: Enter DOB of user.
 *      tags: [User]
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                profileImage:
 *                  type: string
 *                  format: binary
 *            encoding:
 *              profileImage:
 *                contentType: image/png, image/jpeg
 *                headers:
 *                  X-Custom-Header:
 *                    description: This is profile pic
 *      security:
 *        - bearerAuth: []
 *        - device-id: []
 *                
 *      responses:
 *        201:
 *          description: Profile picture uploded
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 *             
 *        500:
 *          description: Some server error
 *          
 * 
 *        401:
 *          description: Unauthorized
 *          
 */
userRouter.patch("/uploadPicture", 
    validator.validateSession,
    session([USERTYPE.ATHLETE, USERTYPE.COACH]),
    UserController.image
)

export default userRouter ;