import {Types} from "mongoose";
import Logger from "../../logger"
import { userExerciseInterface } from "../../interface";
import { userExerciseModel } from "../../models/v1/userExercise.model";
import Base from "../base";

const logger = Logger("userExercise-entity")
class UserExerciseEntity<T> extends Base<T>{
    constructor(){
        super(userExerciseModel);
    }
    async markComplete(payLoad: any){
        try{
            const updateStatus = await this.getModel().update(payLoad, {isCompleted: true});
            return updateStatus
        }catch(err){
            logger.error(err);            
            return err;
        }
    }

    // to mark multiple exercises as complete.
    async markCompleteMultiple(payload: any){
        try{
            const {exercises, user} = payload;
            const updateStatus = await this.getModel().update({
                exercise: {"$in": exercises},
                user
            },
            {isCompleted: true}
            )
            return updateStatus;
        }catch(err){
            logger.error(err);
            return err;
        }
    }

}

export const userExerciseEntity = new UserExerciseEntity<userExerciseInterface>();