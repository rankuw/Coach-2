import {Schema, model, Model} from "mongoose";
import { coachAthleteInterface} from "../../interface";

const coachAthleteSchmea = new Schema<coachAthleteInterface>({
    athlete: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    coach: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    totalExercises: {
        type: Number,
        default: 0
    },
    totalExercisesCompleted: {
        type: Number,
        default: 0
    },
    lastAssigned: {
        type: String,
        default: "not assigned"
    }
});

coachAthleteSchmea.index({"athlete": 1, "coach": 1}, {unique: true});

const CoachAthleteModel: Model<coachAthleteInterface> = model("coachAthlete", coachAthleteSchmea);

export default CoachAthleteModel;