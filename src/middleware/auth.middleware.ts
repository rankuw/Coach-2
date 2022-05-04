import { Request, Response, NextFunction } from "express"
import * as jwt from "jsonwebtoken";
import { STATUS_MSG } from "../constants/app.constants";
import { JWT_SECRET } from "../constants";
import SessionEntity from "../entities/v1/session.entity";
import Logger from "../logger";
import { errorHandler } from "../utils";
const logger = Logger("auth-middleware");

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = <string> req.headers.authorization?.slice(7);
    const deviceId = <string> req.headers["device-id"];
    try{
        const {_id, sessionId} = <jwt.JwtPayload> jwt.verify(token, JWT_SECRET);
        logger.info(_id, sessionId);
        const user_exists = await SessionEntity.checkSession(_id, deviceId, []);
        if(!user_exists){
            res.status(401).json(STATUS_MSG.ERROR.UNAUTHORIZED);
        }else{
            logger.info(_id);
            req.user = _id;
            next();
        }
    }catch(err: any){
        logger.error(err);
        errorHandler(err, res);
    }
}
    
export default authMiddleware