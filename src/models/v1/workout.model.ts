import { workoutInterface } from "../../interface";
import {Schema, model} from "mongoose";
import { BODY_PART, DIFFICULTY } from "../../constants/enum.constants";

const workoutSchema: Schema<workoutInterface> = new Schema<workoutInterface>({
    coach: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    photoURL: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    difficulty: {
        type: String,
        enum: DIFFICULTY,
        required: true
    },
    description: {
        type: String,
    },
    duration: {
        type: Number,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    }
})

const WorkoutModel = model("workout", workoutSchema);
export default WorkoutModel;