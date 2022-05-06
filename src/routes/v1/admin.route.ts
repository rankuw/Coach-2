import {Router} from "express";
import AdminController from "../../controller/v1/admin.controller";
import SubscriptionController from "../../controller/v1/subscription.controller";
const adminRoute = Router();

// ! send these routes to subscription routes.
// ! add an admin user type to protect these routes for admin
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
 *   - name: Admin
 *     description: Admin Routes to add subscription details.
 */

/**
 * @swagger
 * /api/admin/v1/subscriptionPlan/add:
 *   post:
 *      summary: Enter DOB of user.
 *      tags: [Admin]
 *      security:
 *        - bearerAuth: []
 *        - device-id: []
 *                
 *      responses:
 *        201:
 *          description:Added subscription
 *             
 *        500:
 *          description: Some server error
 *          
 * 
 *        401:
 *          description: Unauthorized
 *          
 */
adminRoute.post("/subscriptionPlan",
    SubscriptionController.addSubscription
);


/**
 * @swagger
 * /api/admin/v1/SubscriptionCost/add:
 *   post:
 *      summary: Enter DOB of user.
 *      tags: [Admin]
 *      security:
 *        - bearerAuth: []
 *        - device-id: []
 *                
 *      responses:
 *        201:
 *          description: Added subscription cost
 *             
 *        500:
 *          description: Some server error
 *          
 * 
 *        401:
 *          description: Unauthorized
 *          
 */
adminRoute.post("/subscriptionCost/add",
    AdminController.addSubscriptionCost
);

export default adminRoute;


