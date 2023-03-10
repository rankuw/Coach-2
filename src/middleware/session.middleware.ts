import { Request, Response, NextFunction } from "express";
import { USERTYPE } from "../constants";
import { STATUS_MSG } from "../constants/app.constants";
import {SessionEntity} from "../entities/";
import Logger from "../logger";
import { errorHandler, extractToken } from "../utils";
import { sessionDetail } from "../interface";
const logger = Logger("session-middleware");

export default function session(users: USERTYPE[]){
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = <string> req.headers.authorization?.slice(7);
        const deviceId = <string> req.headers["device-id"];
        try{
            const {_id, sessionId, userType} = await extractToken(token);
            if(!users.includes(userType)){
                throw STATUS_MSG.ERROR.UNAUTHORIZED;
            }
            logger.info(_id, sessionId);
            const user_exists = await SessionEntity.checkSession(_id, deviceId, users);
            if(!user_exists){
                res.status(401).json(STATUS_MSG.ERROR.UNAUTHORIZED);
            }else{
                logger.info(_id);
                const userDetails: sessionDetail = {
                    _id,
                    userType
                }
                req.user = userDetails;
                next();
            }
        }catch(err: any){
            logger.error(err);
            errorHandler(err, res);
        }
    }
}