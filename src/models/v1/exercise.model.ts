import {model, Schema, Model} from "mongoose";
import { DIFFICULTY } from "../../constants";
import {exerciseInterface} from "../../interface/exercise.interface";

const exerciseSchema: Schema<exerciseInterface> = new Schema<exerciseInterface>({
    name: {
        type: String,
        required: true
    },
    photoURL: {
        type: String,
        required: true
    },
    videoURL: {
        type: String,
        required: true
    },
    level: {
        enum: DIFFICULTY,
        required: true
    }
});

const ExerciseModel: Model<exerciseInterface> = model('exercise', exerciseSchema);
export default ExerciseModel;

