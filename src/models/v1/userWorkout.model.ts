import { Schema, model, Model } from "mongoose";
import { WORKOUT } from "../../constants";
import { userWorkout } from "../../interface";

const userWorkoutSchema: Schema<userWorkout> = new Schema<userWorkout>({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    workout: {
        type: Schema.Types.ObjectId,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    repetatition: {
        type: Number,
        required: true
    },
    performAt: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        enum: WORKOUT
    }
});

const userWorkoutModel: Model<userWorkout> = model("userWorkout", userWorkoutSchema);