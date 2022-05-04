import { workout } from "../../interface";
import {Schema, model} from "mongoose";
import { BODY_PART, DIFFICULTY } from "../../constants/enum.constants";

const workoutSchema: Schema<workout> = new Schema<workout>({
    title: {
        type: String,
        required: true,
        unique: true
    },
    difficultLvl: {
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
    focusBodyPart: {
        type: String,
        enum: BODY_PART
    }
})

const WorkoutModel = model("workout", workoutSchema);
export default WorkoutModel;