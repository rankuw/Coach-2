import { check } from "express-validator";
import mongoose from "mongoose";
import { userSubscriptionInterface } from "../../interface";
import userSubscriptionModel from "../../models/v1/userSubscription.model"
import Base from "../base"
class UserSubscriptionEntity<T> extends Base<T>{
    
    constructor(){
        super(userSubscriptionModel);
    }

    getSubscriptionDetails =async (payload: any) => {
        try{
            
            const doc = await this.getModel().findOne(payload);
            console.log(doc);
            await Promise.all([
                doc.populate({path: "userId", select: "phoneNumber email -_id"}),
                doc.populate("subscriptionId")
            ]);
            console.log(doc);
            const res = {
                lastBilled: doc.createdAt,
                billedAmount: doc.subscriptionId.cost,
                billingCycle: doc.subscriptionId.type,
                nextBillingDate: doc.createdAt,
                autoRenewal: doc.autoRenew
            }
            return res;
        }catch(err){
            return Promise.reject(err);
        }
    }

    getMaXUsersAllowds = async (id: string): Promise<number> =>  {
        const subscriptionPlan= await this.getModel().aggregate([
            {$match: {userId: new mongoose.Types.ObjectId(id)}},
            {$lookup: {
                from: 'subscriptioncosts',
                as: 'subCost',
                let: {'id': "$subscriptionId"}, // subscriptionId is in userSubscription model
                pipeline: [
                    {$match:{$expr:{ $and: [{$eq: ["$_id","$$id"]}]}}},
                    {$lookup: {
                        from: 'subscriptions',
                        localField: 'subscriptionId',
                        foreignField: '_id',
                        as: 'subbs'
                    }},
                    {$unwind: '$subbs'},
                    {$project: {"allowed": "$subbs.noOfCoach"}}
                ]
            }},
            {$unwind: "$subCost"},
            {$project: {"allowed": "$subCost.allowed"}}
        ])
        console.log(subscriptionPlan)
        return subscriptionPlan[0].allowed;
    }

    incrementNumberOfUsersAdded = async (id: string) => {
        try{
            const doc = await this.getModel().findOneAndUpdate({userId: id}, {$inc: {'noOfSelectedUsers': 1}});
            return doc;
        }catch(err){
            console.log(err);
            return Promise.reject(err);
        }

    }
}

export const userSubscriptionEntity = new UserSubscriptionEntity<userSubscriptionInterface>();