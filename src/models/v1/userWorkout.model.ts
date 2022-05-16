import { Schema, model, Model } from "mongoose";
import { WORKOUT } from "../../constants";
import { userWorkoutInterface } from "../../interface";

const userWorkoutSchema: Schema<userWorkoutInterface> = new Schema<userWorkoutInterface>({
    athlete: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    workout: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'workout'
    },
    startDate: {
        type: Date,
        required: true
    },
    repetation: {
        type: Number,
        required: true
    },
    performAt: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        enum: WORKOUT,
        default: 0
    }
});

export const userWorkoutModel: Model<userWorkoutInterface> = model("userWorkout", userWorkoutSchema);