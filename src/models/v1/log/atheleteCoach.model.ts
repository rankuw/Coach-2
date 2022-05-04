import { Schema, model } from "mongoose";

interface athleteCoachInterface{
    athleteId: Schema.Types.ObjectId, // points to the athlete.
    coachId: Schema.Types.ObjectId, // points to the coach.
    exercise: Schema.Types.ObjectId // points to the exercies.
    progress: String
}

const athleteCoach: Schema<athleteCoachInterface> = new Schema<athleteCoachInterface>({
    athleteId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    coachId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    exercise: {
        type: Schema.Types.ObjectId,
        required: true
    },
    progress: {
        type: String,
        default: ""
    }
})

const AthleteCoach = model<athleteCoachInterface>("AthleteCoach", athleteCoach);
export default AthleteCoach;