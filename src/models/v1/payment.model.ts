import { Schema } from "mongoose";
import { STATUS, SUBSCRIPTION } from "../../constants/enum.constants";
import { paymentHistoryInterface } from "../../interface/common.interface";

const paymentSubscriptionSchema = new Schema<paymentHistoryInterface>({
    level: {
        type: String,
        enum: SUBSCRIPTION,
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