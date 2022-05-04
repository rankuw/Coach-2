import mongoose from "mongoose"
import { DIFFICULTY, STATUS, SUBSCRIPTIONTYPE, USERTYPE } from "../constants/enum.constants"

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



export interface paymentHistoryInterface{
    level: SUBSCRIPTIONTYPE,
    id: mongoose.Types.ObjectId,
    amount: Number,
    date: Date, // include time
    status: STATUS
}

export interface statusInterface{
    statusCode: number,
    success: Boolean,
    message: string,
    data?: any
}

export interface loginInterface{
    email?: String,
    phoneNumber?: string,
    password?: string,
    _id?: string| mongoose.Types.ObjectId
}

