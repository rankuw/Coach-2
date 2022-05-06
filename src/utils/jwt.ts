import * as jwt from "jsonwebtoken";
import { JWT_SECRET, STATUS_MSG } from "../constants";
import Logger from "../logger";
const logger = Logger("jwt");
export function createToken(payload: { [key: string]: any }, expiresIn?: number): string{
    if(!expiresIn){
        expiresIn = 60 * 60
    }
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn
    })
}
export async function extractToken(token: string): Promise<any>{
    try{
        const payLoad = await jwt.verify(token, JWT_SECRET);
        return payLoad
    }catch(err){
        logger.error(JSON.stringify(err));
        return Promise.reject(STATUS_MSG.ERROR.INVALID_TOKEN);
    }

}