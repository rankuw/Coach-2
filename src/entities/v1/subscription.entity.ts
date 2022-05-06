import Logger from "../../logger";
import SubscriptionModel from "../../models/v1/subscription.model";
import subscriptionCostModel from "../../models/v1/subscriptionCost.model";
import { subscriptionCostInterface, subscriptionInterface } from "../../interface";
import { STATUS_MSG } from "../../constants";
const logger = Logger("admin-entity");

export class SubscriptionEntity{

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

    static async getSubscritionDetail(){
        try{
            const result = await SubscriptionModel.aggregate([
                {
                    $lookup: {
                        from: "subscriptioncosts",
                        localField: "_id",
                        foreignField: "subscriptionId",
                        as: "types"
                    }
                },
                {
                    $project: {
                        _id: 1,
                        level: 1,
                        noOfAthelete: 1,
                        noOfCoach: 1,
                        description: 1,
                        types: {
                            "$map": {
                                input: "$types",
                                as: "types",
                                in: {
                                    "_id": "$$types._id",
                                    "type": "$$types.type",
                                    "cost": "$$types.cost"
                                }
                            }
                        }
                    }
                }
            ]);
            return result;
        }catch(err){
            logger.error(err);
            return Promise.reject(err);
        }
        
    }
}

