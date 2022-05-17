import { createClient } from "redis";
import { REDIS_HOST, REDIS_PORT, STATUS_MSG } from "../constants";
import {ISession} from "../interface/"
import * as util from "util";
import Logger from "../logger/";
import { errorHandler } from "../utils";

const logger = Logger("redisDao");

class redisDAO {
    client = createClient({
        url: `redis://${REDIS_HOST}:${REDIS_PORT}`
    })
    readonly Session = "rsession";
    async connect(): Promise<void> {
        try {
            await this.client.connect();
            logger.info("Redis connectd");
        } catch (err: any) {
            logger.error(err.message);
            process.exit(1);
        }
    }
    async setSession(user_id: string, payLoad: any){
        const appendRedisHash = util.promisify(this.client.HSET).bind(this.client);
        logger.info(JSON.stringify(payLoad));
        await appendRedisHash(this.Session, user_id, JSON.stringify(payLoad));
    }

    async unsetSession(user_id:string){
        const remove = util.promisify(this.client.HDEL).bind(this.client);
        await remove(this.Session, user_id);
    }
    
    async createSession(user_id: string, payLoad: any){
        logger.info(JSON.stringify(payLoad));
        const prevSession = await this.findSession(user_id);
        prevSession.push(payLoad);
        this.setSession(user_id, prevSession)
    }

    async findSession(user_id: string): Promise<[ISession.Redis?]>{
        try{
            const user = await this.client.HGET(this.Session, user_id);
            logger.info(user);
            if(!user){
                return [];
            }else{
                return JSON.parse(user);
            }
        }catch(err: any){
            logger.error(err);
            return Promise.reject(err.message);
        }
    }

    async removeSession(user_id: string, deviceId: string){
        const prevSession = await this.findSession(user_id);
        let index = -1;
        for(let i = 0; i < prevSession.length; i++){
            if(prevSession[i]?.deviceId === deviceId){
                index = i;
                break;
            }
        }
        if(index === -1){
            return;
        }
        prevSession.splice(index,1);
        if(prevSession.length === 0){
            this.unsetSession(user_id);
        }else{
            this.setSession(user_id, prevSession);
        }
        
    }
}
export const redis = new redisDAO();