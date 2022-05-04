import { Response } from "express";
import { STATUS_MSG } from "../constants";
import Logger from "../logger";

const logger = Logger("error handler");
export function errorHandler(err: any, res: Response){ //err should be in form of stauts statusinterface.
    logger.error(err.message);
    if(err.code === 11000){
        res.status(403).json({
            statusCode: 403,
            success: false,
            message: `${err.errmsg.split(':')[2].split('_')[0]} already exists`,
            type: "BAD_REQUEST"
        })
    }else if(err.status === 429 || (err.status === 400 && err.code === 60223)){
        res.status(500).json(STATUS_MSG.ERROR.CUSTOM_ERROR(500, "Server error could not send otp"))
    }
    else{
        res.status(err.statusCode || 500).json(err);
    }
}