import Logger from "../../logger";
import { Request, Response } from "express";
import { SubscriptionEntity } from "../../entities/";
import { errorHandler } from "../../utils";

const logger = Logger("admin-controller");

export default class AdminController{

    static async addSubscriptionPlan(req: Request, res: Response){
        try{
            const subscription = await SubscriptionEntity.addSubscription(req.body);
            res.status(201).json(subscription);
        }catch(err){
            errorHandler(err, res);
        }
    }

    static async addSubscriptionCost(req: Request, res: Response){
        try{
            const subscriptionCost = await SubscriptionEntity.addSubsriptionCost(req.body);
            res.status(201).json(subscriptionCost);  
        }catch(err){
            errorHandler(err, res);
        }
    }
}