import userSubscriptionModel from "../../models/v1/userSubscription.model"
import Base from "../base"
class UserSubscriptionEntity extends Base{
    constructor(){
        super(userSubscriptionModel);
    }
}

export const userSubscriptionEntity = new UserSubscriptionEntity();