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
 *         exercises: 
 *           type: [ObjectId]
 *           description: The exercises for this workout
 *           required: true
 * 
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
 *         exercises: [6276bb58c5b81eafda326568, 6276bb9dc5b81eafda32656c]
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
 *      summary: create a workout and add exercises to it.
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
    session([USERTYPE.COACH]),
    WorkoutController.addWorkout
)


/**
 * @swagger
 * /api/user/v1/workout/assign:
 *   post:
 *      summary: Assign a workout to an athlete.
 *      tags: [Workout]
 *      requestBody:
 *        requird: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                athlete: 
 *                  type: string
 *                  required: true
 *                  example: 6270be493ae62de8e94f060d
 *                workout:
 *                  type: string
 *                  required: true
 *                  example: 6278b31886244e3928819b0e
 *                startDate:
 *                  type: Date
 *                  required: true
 *                  example: 2/1/2022
 *                repetation:
 *                  type: Number
 *                  required: true
 *                  example: 2
 *                performAt:
 *                  type: string
 *                  required: true
 *                  example: 7:00 AM
 *                Status: 
 *                  type: number
 *                  required: true
 *                  example: 0
 *                  
 *      
 *      
 *      security:
 *        - device-id: []
 *        - bearerAuth: []         
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

workoutRoute.post("/workout/assign",
    session([USERTYPE.COACH]),
    WorkoutController.assignWorkout
)

/**
 * @swagger
 * /api/user/v1/workout/{coach}:
 *   get:
 *      summary: Get workouts created by a particular coach on a paricular date
 *      tags: [Workout]
 *      parameters:
 *        - in: query
 *          name: coach
 *          schema:
 *            type: string
 *          description: The _id of coach
 *          
 *        - in: query
 *          name: date
 *          schema:
 *            type: string
 *          description: The date to query exercise.        
 *      
 *      
 *      security:
 *        - device-id: []
 *        - bearerAuth: []         
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
workoutRoute.get("/workout/:coach",
    session([USERTYPE.ATHLETE]),
    WorkoutController.getWorkoutsByCoach
)

/**
 * @swagger
 * /api/user/v1/workout/search/{title}:
 *   get:
 *      summary: get all workouts with a particular title.
 *      tags: [Workout]
 *      parameters:
 *        - in: path
 *          name: title
 *          schema:
 *            type: string
 *          description: The title of workout.        
 *      
 *      
 *      security:
 *        - device-id: []
 *        - bearerAuth: []         
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
 workoutRoute.get("/workout/search/:title",
    session([USERTYPE.COACH]),
    WorkoutController.queryWorkouts
)

/**
 * @swagger
 * /api/user/v1/workout:
 *   get:
 *      summary: get all workouts assigned on a particular date.
 *      tags: [Workout]
 *      parameters:
 *        - in: query
 *          name: date
 *          schema:
 *            type: string
 *          description: The date to query exercise.        
 *      
 *      
 *      security:
 *        - device-id: []
 *        - bearerAuth: []         
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
workoutRoute.get("/workout", 
    session([USERTYPE.ATHLETE]),
    WorkoutController.getWorkouts
)

/**
 * @swagger
 * /api/user/v1/workout/remove/{title}:
 *   delete:
 *      summary: Remove a workout.
 *      tags: [Workout]
 *      parameters:
 *        - in: path
 *          name: workout
 *          type: string
 *          description: The id of exercise to remove.        
 *      
 *      
 *      security:
 *        - device-id: []
 *        - bearerAuth: []         
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
workoutRoute.delete("/workout/remove/:workout",
    session([USERTYPE.COACH]),
    WorkoutController.removeWorkout
)



export default workoutRoute;