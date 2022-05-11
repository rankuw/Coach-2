import {Request, Response} from "express";
import { userWokoutEntity } from "../../entities/v1/userWorkout.entity";
import { userExerciseEntity } from "../../entities/v1/userExercise.entity";
import { workoutEntity } from "../../entities/v1/workout.entity";
import Logger from "../../logger";
import { errorHandler } from "../../utils";
import { UserEntity } from "../../entities";
import { STATUS_MSG } from "../../constants";
import { sessionDetail } from "../../interface";

const logger = Logger("workout-controller");

export default class WorkoutController{


    // @desc Add exercise 
    // @route POST /api/admin/v1/exercise/add
    // @access Private
    static async addWorkout(req: Request, res: Response){
        try{
            const workout = await workoutEntity.addValue(req.body);
            res.status(201).json(workout);
        }catch(err){
            logger.error(err);
            errorHandler(err, res);
        }
    }

    static async assignWorkout(req: Request, res: Response){
        try{
            const {_id: user} = <sessionDetail>req.user;
            const {workout, startDate, repetation, performAt} = req.body;
            const validation = await Promise.all([
                await workoutEntity.getValue({_id: workout}),
                await UserEntity.userExists({_id: user})
            ])
            if(validation[0] && validation[1]){
                const userworkout = await userWokoutEntity.addValue({user, workout, startDate, repetation, performAt});
                validation[0].exercises.forEach(async (exercise) => {
                    const userexercise = await userExerciseEntity.addValue({user, exercise})
                });
            
                res.status(200).json(userworkout);
            }
            else{
                throw STATUS_MSG.ERROR.BAD_REQUEST("invalid user id or workout id");
            }
            
        }catch(err){
            logger.error(err);
            errorHandler(err, res);
        }
    }
}