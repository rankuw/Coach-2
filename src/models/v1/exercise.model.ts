import { Schema, model, Model } from "mongoose";
import { DIFFICULTY } from "../../constants";
import { exerciseInterface } from "../../interface";

const exerciseSchema: Schema<exerciseInterface> = new Schema<exerciseInterface>({
    title: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: DIFFICULTY,
        required: true
    },
    photoURL: {
        type: String,
        required: true
    },
    videoURL: {
        type: String,
        required: true
    }
});
exerciseSchema.index({title: "text"});
const ExerciseModel: Model<exerciseInterface> = model("exercise", exerciseSchema);
export default ExerciseModel;