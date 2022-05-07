import {Router} from "express";
import AdminController from "../../controller/v1/admin.controller";
import ExerciseController from "../../controller/v1/exercise.controller";
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
 *      summary: Get subscription plans.
 *      tags: [Exercise]
 *      
 *      security:
 *        - bearerAuth: []
 *        - device-id: []
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
 *      summary: Get subscription plans.
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

 export default exerciseRoute;