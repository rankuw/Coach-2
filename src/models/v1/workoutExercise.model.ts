import {model, Schema, Model} from "mongoose";
import { workoutExerciseInterface } from "../../interface/";

const workoutExerciseSchema: Schema<workoutExerciseInterface> = new Schema<workoutExerciseInterface>({
    exercise: {
        type: Schema.Types.ObjectId,
        ref: "exercise"
    },
    workout: {
        type: Schema.Types.ObjectId,
        ref: "workout"
    }
});

const WorkoutExerciseModel: Model<workoutExerciseInterface> = model("workout", workoutExerciseSchema);