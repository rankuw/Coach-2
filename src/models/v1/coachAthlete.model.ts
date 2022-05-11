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
    }
});

const CoachAthleteModel: Model<coachAthleteInterface> = model("coachAthlete", coachAthleteSchmea);
export default CoachAthleteModel;