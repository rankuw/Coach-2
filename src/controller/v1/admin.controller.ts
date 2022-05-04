import Logger from "../../logger";
import { Request, Response } from "express";
import AdminEntity from "../../entities/v1/admin.entity";
import { errorHandler } from "../../utils";

const logger = Logger("admin-controller");

export default class AdminController{

    static async addSubscriptionPlan(req: Request, res: Response){
        try{
            const subscription = await AdminEntity.addSubscription(req.body);
            res.status(201).json(subscription);
        }catch(err){
            errorHandler(err, res);
        }
    }

    static async addSubscriptionCost(req: Request, res: Response){
        try{
            const subscriptionCost = await AdminEntity.addSubsriptionCost(req.body);
            res.status(201).json(subscriptionCost);  
        }catch(err){
            errorHandler(err, res);
        }
    }
}