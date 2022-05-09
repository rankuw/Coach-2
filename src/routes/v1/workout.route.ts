import { Router} from "express";
import WorkoutController from "../../controller/v1/workout.controller";
import UserController from "../../controller/v1/user.controller";
import validator from "../../middleware/validator.middleware";
import session from "../../middleware/session.middleware";
import {USERTYPE} from "../../constants"

const workoutRoute = Router();
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
 *     Workout:
 *       type: object
 *       properties:
 *         coach:
 *           type: String
 *           description: id of coach.
 *           required: true
 *         photoURL:
 *           type: string
 *           description: photo of workout
 *           required: true
 *         title:
 *           type: string
 *           description: Title of workout
 *           required: true
 *         difficulty: 
 *           type: string
 *           description: difficulty level of workout.
 *           required: true
 *         description: 
 *           type: string
 *           description: The description of workout.
 *           required: true
 *         duration:
 *           type: Number
 *           description: duration of workout in minutes
 *           required: true
 *         calories:
 *           type: number
 *           description: Calories that this workout will burn.
 *           required: true
 *         time: 
 *           type: string
 *           description: Time when athlete will perform this workout.
 *           required: true
 * 
 *       example:
 *         coach: 626f677b6babc732f3b40aab
 *         photoURL: adsfasdfasdfsda
 *         title: hand
 *         difficulty: Beginner
 *         description: This is a beginner workout
 *         duration: 20
 *         calories: 120
 *         time: 4:10
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
 *   - name: Exercise
 *     description: Routes to create a new workout.
 */

/**
 * @swagger
 * /api/user/v1/workout/add:
 *   post:
 *      summary: Register a user and send verification link to his email.
 *      tags: [Workout]
 *      requestBody:
 *        requird: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Workout'
 *      
 *      security:
 *        - device-id: []
 *        - bearerAuth: []
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
 workoutRoute.post("/workout/add",
    WorkoutController.addWorkout
)

export default workoutRoute;