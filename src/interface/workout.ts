import { BODY_PART, DIFFICULTY} from "../constants/enum.constants";
import {Types} from "mongoose"

export interface workoutInterface{
    coach: Types.ObjectId,
    photoURL: string,
    title: string,
    difficulty: DIFFICULTY,
    description: string,
    duration: number,
    calories: number,
    time: number,
    
} 
