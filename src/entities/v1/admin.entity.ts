import Logger from "../../logger";
import SubscriptionModel from "../../models/v1/subscription.model";
import subscriptionCostModel from "../../models/v1/subscriptionCost.model";
import { subscriptionCostInterface, subscriptionInterface } from "../../interface";
import { STATUS_MSG } from "../../constants";
const logger = Logger("admin-entity");

export default class AdminEntity{

    static async addSubscription(payload: subscriptionInterface): Promise<subscriptionInterface>{
        try{    
            const subscription: subscriptionInterface = await SubscriptionModel.create(payload);
            return subscription;
        }catch(err: any){
            logger.error(err);
            return Promise.reject(STATUS_MSG.ERROR.DB_ERROR(err.message));
        }
    }

    static async addSubsriptionCost(payload: subscriptionCostInterface){
        try{
            const subscriptionCost: subscriptionCostInterface = await subscriptionCostModel.create(payload);
            return subscriptionCost;
        }catch(err: any){
            logger.error(err);
            return Promise.reject(STATUS_MSG.ERROR.DB_ERROR(err.message));
        }
    }
}

