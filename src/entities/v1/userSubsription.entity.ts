import userSubscriptionModel from "../../models/v1/userSubscription.model"
import Base from "../base"
class UserSubscriptionEntity extends Base{
    constructor(){
        super(userSubscriptionModel);
    }
    getValue =async (payload: any) => {
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
}

export const userSubscriptionEntity = new UserSubscriptionEntity();