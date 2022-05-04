// check if the user is already logged in
import {Request, Response, NextFunction} from "express";
import { STATUS_MSG } from "../constants";
import { errorHandler } from "../utils";
export const guest = async (req: Request, res: Response, next: NextFunction) => {
    const token = <string|undefined> req.headers.authorization?.slice(7);
    if(!token){
        next();
    }else{
        errorHandler(STATUS_MSG.ERROR.USER_EXISTS, res);
    }
}