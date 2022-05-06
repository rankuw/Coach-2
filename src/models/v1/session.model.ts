import { Schema, model, Model } from "mongoose";
import { USERTYPE } from "../../constants";
import { sessionInterface } from "../../interface/v1/session.interface";

const sessionSchema: Schema<sessionInterface> = new Schema<sessionInterface>({
    isActive: {
        type: Boolean,
        default: true
    },
    isLoggedIn: {
        type: Boolean,
        default: true
    },
    userId: {
        type: String,
        required: true
    },
    deviceId: {
        type: String,
        required: true
    },
    userType: {
        type: Number,
        enum: USERTYPE,
        required: true
    }
}, {
    timestamps: true
})

const SessionModel: Model<sessionInterface> = model<sessionInterface>("Session", sessionSchema);
export default SessionModel;