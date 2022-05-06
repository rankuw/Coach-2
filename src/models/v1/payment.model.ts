import { Schema } from "mongoose";
import { STATUS, SUBSCRIPTIONTYPE } from "../../constants/enum.constants";
import { paymentHistoryInterface } from "../../interface/common.interface";

const paymentSubscriptionSchema = new Schema<paymentHistoryInterface>({
    level: {
        type: String,
        enum: SUBSCRIPTIONTYPE,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: () => new Date()
    },
    status: {
        type: Number,
        enum: STATUS
    }
})

export default paymentSubscriptionSchema;