import {Types} from "mongoose";
import { USERTYPE, WORKOUT } from "../../constants";


    export interface userInterface{
        id: string,
        name: String,
        email: String,
        phoneNumber: String,
        DOB?: String,
        password: string,
        active?: boolean,
        userType: USERTYPE,
        emailVerified: boolean,
        phoneVerified: boolean,
        profilePicUrl: string
    }

    export interface loginInterface{
        email?: String,
        phoneNumber?: string,
        password?: string,
        _id?: string| Types.ObjectId
    }

    export interface userExerciseInterface{
        userWorkout: Types.ObjectId,
        exercise: Types.ObjectId,
        completed: boolean
    };

    export interface userSubscriptionInterface{
        _id: Types.ObjectId,
        userId: Types.ObjectId,
        subscriptionId: Types.ObjectId,
        noOfSelectedUsers: number,
        type?: USERTYPE,
        autoRenew: boolean
    }

    export interface userWorkoutInterface{
        _id: string | Types.ObjectId
        user: Types.ObjectId,
        workout: Types.ObjectId,
        startDate: Date,
        repetation: number,
        performAt: string,
        status: WORKOUT
    }

    export interface userExerciseInterface{
        _id: string | Types.ObjectId
        user: Types.ObjectId,
        exercise: Types.ObjectId,
        isCompleted: boolean
    }

    export interface coachAthleteInterface{
        _id: string | Types.ObjectId
        athlete: Types.ObjectId,
        coach: Types.ObjectId
    }

    export interface sessionDetail{
        _id: string,
        userType: USERTYPE
    }