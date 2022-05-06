import SessionModel from "../../models/v1/session.model";
import { USERTYPE } from "../../constants";
import { sessionInterface } from "../../interface";
import { redis } from "../../config/redis.config";
import Logger from "../../logger";

const logger = Logger("session-entity");
export class SessionEntity{
    static getModel(){
        return SessionModel;
    }
    static async createSession(userId: string, deviceId: string, userType: number): Promise<string>{
        try{
            let session = <sessionInterface>await SessionModel.findOneAndUpdate({userId, deviceId, userType}, {isLoggedIn: true, isActive: true}, {upsert: true, new: true});
            await redis.createSession(session.userId, {deviceId, userType});
            const sessionid = session.id;
            return sessionid;
        }catch(err){
            logger.info(err);
            return Promise.reject(err);
        }
    }

    static async checkSession(userId: string, deviceId: string, userType: USERTYPE[]): Promise<boolean>{
        try{
            const session_user = await redis.findSession(userId);
            if(session_user.length === 0){
                //check in mongodb;
                const mongo_session = <sessionInterface>await SessionModel.findOne({userId, deviceId, isActive: true, isLoggedIn: true});
                if(mongo_session){
                    this.createSession(userId, deviceId, mongo_session.userType);
                    return true;
                }else{
                    return false;
                }
            }else{
                for(const session of session_user){
                    if(session?.deviceId === deviceId && userType.includes(session.userType)){
                        return true
                    }
                }
                return false;
            }
        }catch(err: any){
            logger.info(err);
            return Promise.reject(err);
        }
    }
}