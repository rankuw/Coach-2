import {SubscriptionEntity, userSubscriptionEntity} from "../../entities/";
import {Request, Response} from "express";
import { STATUS_MSG } from "../../constants";
import { errorHandler } from "../../utils";
import Logger from "../../logger";

const logger = Logger("subscription-controller");

export default class SubscriptionController{

    // @desc Get all the subscription plans
    // @route GET /api/subscription/v1/subscriptionPlans
    // @access Private
    static async getSubscriptions(req: Request, res: Response){
        try{
            const result = await SubscriptionEntity.getSubscritionDetail();
            res.status(200).json(STATUS_MSG.SUCCESS.FETCH_SUCCESS({result}));
        }catch(err){
            errorHandler(err, res);
        }
    }

    // @desc Add subscreption plans
    // @route POST /api/subscription/v1/subscriptionPlans/add
    // @access Private
    static async addSubscription(req: Request, res: Response){
        try{
            const subscription = await SubscriptionEntity.addSubscription(req.body);
            res.status(201).json(subscription);
        }catch(err){
            errorHandler(err, res);
        }
    }

    // @desc Add subscreption plan rates
    // @route POST /api/subscription/v1/subscriptionCost/add
    // @access Private
    static async addSubscriptionCost(req: Request, res: Response){
        try{
            const subscriptionCost = await SubscriptionEntity.addSubsriptionCost(req.body);
            res.status(201).json(subscriptionCost);  
        }catch(err){
            errorHandler(err, res);
        }
    }

    // @desc Subscribe a user to a plan
    // @route POST /api/subscription/v1/subscriptionPlan/select/:subscriptionId
    // @access Private
    static async addUserSubscription(req: Request, res: Response){
        try{
            const subscriptionId = <string>req.params["subscriptionId"];
            const userId = req.user;
            const detail = await userSubscriptionEntity.addValue({subscriptionId: subscriptionId, userId: userId});
            res.json(detail);
        }catch(err){
            logger.error(err);
            errorHandler(err, res);
        }
    }

    // @desc Get user's subscription plan
    // @route POST /api/subscription/v1/subscriptionDetail
    // @access Private
    static async getDetails(req: Request, res: Response){
        try{
            const userId = <string>req.user;
            const detail = await userSubscriptionEntity.getSubscriptionDetails({userId});
            res.send(detail);
        }catch(err: any){
            logger.error(err);
            errorHandler(err, res);
        }
    }

    
}