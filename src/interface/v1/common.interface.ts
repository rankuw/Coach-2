import mongoose from "mongoose"
import { USERTYPE } from "../../constants/enum.constants"

export interface statusInterface{
    statusCode: number,
    success: Boolean,
    message: string,
    data?: any
}


