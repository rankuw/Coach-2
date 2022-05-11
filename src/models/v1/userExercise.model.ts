import {Schema, model, Model} from "mongoose";
import { userExerciseInterface } from "../../interface";

const userExerciseSchema: Schema<userExerciseInterface> = new Schema<userExerciseInterface>({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    exercise: {
        type: Schema.Types.ObjectId,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false,
        required: true
    }
});

export const userExerciseModel: Model<userExerciseInterface> = model("userExercise", userExerciseSchema);