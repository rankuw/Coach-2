import {Types} from "mongoose";
import { USERTYPE } from "../constants";

export interface userSubscriptionInterface{
    _id: Types.ObjectId,
    userId: Types.ObjectId,
    subscriptionId: Types.ObjectId,
    noOfSelectedUsers: number,
    type?: USERTYPE,
    autoRenew: boolean
}