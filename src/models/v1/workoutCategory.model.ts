import { Schema, model, Types } from "mongoose";
import { workoutCategory } from "../../interface/workout";

const workoutCategorySchema: Schema<workoutCategory>= new Schema<workoutCategory>({
    title: {
        type: String,
        required: true
    },
    photo: {
        type: URL
    },
    workouts: {
        type: [Types.ObjectId]
    },
    status: {
        type: Boolean,
        default: false
    }
});


const workoutCatModel = model("WorkoutCategory", workoutCategorySchema);
export default workoutCatModel;
