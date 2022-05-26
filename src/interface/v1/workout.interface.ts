import { BODY_PART, DIFFICULTY} from "../../constants/";
import {Types} from "mongoose"

export interface workoutInterface{
    id: string | Types.ObjectId,
    coach: Types.ObjectId,
    photoURL: string,
    title: string,
    difficulty: DIFFICULTY,
    description: string,
    duration: number,
    calories: number,
    exercises: [Types.ObjectId]
} 

export interface workoutExerciseInterface{
    exercise: Types.ObjectId,
    workout: Types.ObjectId
}