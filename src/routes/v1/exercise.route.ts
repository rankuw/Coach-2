import {Router} from "express";
import { USERTYPE } from "../../constants";
import AdminController from "../../controller/v1/admin.controller";
import ExerciseController from "../../controller/v1/exercise.controller";
import session from "../../middleware/session.middleware";
const exerciseRoute = Router();


/**
 * @swagger
 * components:
 *   schemas: 
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
 *   
 */
/**
 * @swagger
 * tags:
 *   
 *   - name: Exercise
 *     description: Routes for adding and querying exercises.
 */

/**
 * @swagger
 * /api/user/v1/exercise:
 *   get:
 *      summary: Get all exercies in a database.
 *      tags: [Exercise]
 *                
 *      responses:
 *        200:
 *          description: Subscription plans returned.
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
 exerciseRoute.get("/exercise",
   ExerciseController.getExercises
 )

 /**
 * @swagger
 * /api/user/v1/exercise/{difficulty}:
 *   get:
 *      summary: Get all exercises based on difficulty.
 *      tags: [Exercise]
 *      parameters:
 *        - in: path
 *          name: difficulty
 *          type: string
 *          description: The difficulty level of exercise
 *                
 *      responses:
 *        200:
 *          description: Subscription plans returned.
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
  exerciseRoute.get("/exercise/:difficulty",
  ExerciseController.getExercise
)

/**
 * @swagger
 * /api/user/v1/exercise/finish/one:
 *   patch:
 *      summary: mark a exercise finished..
 *      tags: [Exercise]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                exercise:
 *                  type: string
 *                  required: true
 *                  example: 627ba2cc881471e411e28ad2
 *                userWorkoutId:
 *                  type: string
 *                  required: true
 *                  example: 62823dd24124b408fa8c8421
 *      security:
 *        - device-id: []
 *        - bearerAuth: []
 *                
 *      responses:
 *        200:
 *          description: Subscription plans returned.
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
 exerciseRoute.patch("/exercise/finish/one",
   session([USERTYPE.ATHLETE]),
   ExerciseController.finishExercise
)

/**
 * @swagger
 * /api/user/v1/exercise/finish/multiple:
 *   patch:
 *      summary: Mark multiple exercises finished.
 *      tags: [Exercise]
 * 
 *      security:
 *        - device-id: []
 *        - bearerAuth: []      
 * 
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                userWorkoutId:
 *                  type: string
 *                  required: true
 *                  example: 6278b31886244e3928819b0e
 *                exercises:
 *                  type: array
 *                  required: true
 *                  items:
 *                    type: array
 *                  example: ["6276bb58c5b81eafda326568", "6276bb9dc5b81eafda32656c"]
 *                
 *      responses:
 *        200:
 *          description: Subscription plans returned.
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
exerciseRoute.patch("/exercise/finish/multiple",
   session([USERTYPE.ATHLETE]),
   ExerciseController.finishMultipleExercise
)

/**
 * @swagger
 * /api/user/v1/exercise/query/{title}:
 *   get:
 *      summary: Query a exercise by title.
 *      tags: [Exercise]
 *      parameters:
 *        - in: path
 *          name: exercise
 *          type: string
 *          description: The id of exercise to remove.        
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
exerciseRoute.get("/exercise/query/:exercise",
   ExerciseController.queryExercises
)

 export default exerciseRoute;