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

    export interface userWorkout{
        user: Types.ObjectId,
        workout: Types.ObjectId,
        startDate: Date,
        repetatition: number,
        performAt: string,
        status: WORKOUT
    }