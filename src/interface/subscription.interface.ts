import { DIFFICULTY, SUBSCRIPTIONTYPE } from "../constants";
import {Types} from "mongoose";

export interface subscriptionInterface{
    level: DIFFICULTY,
    prices: [Object],
    noOfAthelete: Number,
    noOfCoach: Number,
    description: string
}

export interface subscriptionCostInterface{
    subscriptionId: Types.ObjectId, // id of parent
    type: SUBSCRIPTIONTYPE,
    cost: Number
}