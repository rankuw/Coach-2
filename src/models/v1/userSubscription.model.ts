import {model, Schema, Model, models} from "mongoose";
import { USERTYPE } from "../../constants";
import {userSubscriptionInterface} from "../../interface";

const userSubscriptionSchema: Schema<userSubscriptionInterface> = new Schema<userSubscriptionInterface>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subscriptionId: {
        type: Schema.Types.ObjectId,
        ref: 'SubscriptionCost',
        required: true
    },
    noOfSelectedUsers: {
        type: Number,
        required: true,
        default: 0
    },
    type: {
        type: Number,
        enum: USERTYPE
    },
    autoRenew: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const userSubscriptionModel: Model<userSubscriptionInterface> = model<userSubscriptionInterface>('userSubscription', userSubscriptionSchema);
export default userSubscriptionModel;