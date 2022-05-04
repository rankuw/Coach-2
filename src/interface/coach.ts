import { userInterface } from "./common.interface";
import {Types} from "mongoose"
export interface coachInterface extends userInterface{
    atheletes: [Types.ObjectId]
}