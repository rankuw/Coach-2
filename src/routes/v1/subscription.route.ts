import Route from "express";
import session from "../../middleware/session.middleware";
import { USERTYPE } from "../../constants";
import validator from "../../middleware/validator.middleware";
import SubscriptionController from "../../controller/v1/subscription.controller";

const subscriptionRoute = Route();

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
 *   - name: Subscription
 *     description: The subscription user chooses.
 */

/**
 * @swagger
 * /api/user/v1/subscriptionPlans:
 *   get:
 *      summary: Get subscription plans.
 *      tags: [Subscription]
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
 subscriptionRoute.get("/subscriptionPlans",
   validator.validateSession,
   session([USERTYPE.ATHLETE, USERTYPE.COACH]),
   SubscriptionController.getSubscriptions
 )

/**
 * @swagger
 * /api/user/v1/subscriptionPlan/select/{subscriptionId}:
 *   post:
 *      summary: Subscribe user to a subscriptioin plan.
 *      tags: [Subscription]
 *      parameters:
 *        - in: path
 *          name: subscriptionId
 *          type: string
 *          description: The subscription Id of subscription plan
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
 subscriptionRoute.post("/subscriptionPlan/select/:subscriptionId",
    session([USERTYPE.ATHLETE, USERTYPE.COACH]),
    SubscriptionController.addUserSubscription
 )

 /**
 * @swagger
 * /api/user/v1/subscriptionDetail:
 *   get:
 *      summary: Get subscription details of a user.
 *      tags: [Subscription]
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
 subscriptionRoute.get("/subscriptionDetail",
    session([USERTYPE.ATHLETE, USERTYPE.COACH]),
    SubscriptionController.getDetails
 )


 subscriptionRoute.get("/subscription/main",
   session([USERTYPE.ATHLETE, USERTYPE.COACH]),
   SubscriptionController.subDetail
 )
 export default subscriptionRoute;