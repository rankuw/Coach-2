import {Types} from "mongoose";
import { paymentHistoryInterface, subscriptionInterface, userInterface } from "./common.interface";

export interface athleteInterface extends userInterface{
    subscriptionDetail?: subscriptionInterface,
    paymentHistory?: [paymentHistoryInterface],
    workoutHistory?: [Types.ObjectId] // points to exercies completed.
}