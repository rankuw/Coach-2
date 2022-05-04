import {connect, Mongoose, set} from "mongoose";
import Logger from "../logger";
import { MONGO_URL } from "../constants/index";
const logger = Logger("mongodb");
export default async function connectDB(){
    try{
        const connection: Mongoose = await connect(<string>MONGO_URL);
        set("debug", true);
        logger.info(`Databasae ${connection.connections[0].name} running`);
    }catch(err: any){
        console.error(err.message);
        process.exit();
    }
}