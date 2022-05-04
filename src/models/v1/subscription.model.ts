import { subscriptionInterface} from "../../interface";
import {Schema, model, Model} from "mongoose"
import { DIFFICULTY } from "../../constants/enum.constants";

export const subscriptionSchema: Schema<subscriptionInterface> = new Schema<subscriptionInterface>({
    level: {
        type: String,
        enum: DIFFICULTY
    },
    noOfAthelete: {
        type: Number,
        required: true
    },
    noOfCoach: {
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    }
});

const SubscriptionModel: Model<subscriptionInterface> = model<subscriptionInterface>("Subscription", subscriptionSchema);
export default SubscriptionModel;

