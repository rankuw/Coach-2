import {model, Schema, Model} from "mongoose";
import { SUBSCRIPTIONTYPE } from "../../constants";
import { subscriptionCostInterface, subscriptionInterface } from "../../interface";

export const subscriptionCostSchema: Schema<subscriptionCostInterface> = new Schema<subscriptionCostInterface>({
    type: {
        type: String,
        enum: SUBSCRIPTIONTYPE,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    subscriptionId: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "subscriptions"
    }
});

const subscriptionCostModel: Model<subscriptionCostInterface> = model<subscriptionCostInterface>("SubscriptionCost", subscriptionCostSchema);
export default subscriptionCostModel;