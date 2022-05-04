import { BODY_PART, DIFFICULTY} from "../constants/enum.constants";
import {Types} from "mongoose"

export interface workout{
    title: String,
    difficultLvl: DIFFICULTY,
    description: string,
    duration: Number,
    focusBodyPart: BODY_PART,
    
}

export interface workoutCategory{
    title: String,
    photo: URL,
    workouts: [Types.ObjectId],
    status: Boolean //will get true if user completes exercise.
}
