import {Request, Response} from "express";
import { Result } from "express-validator";
import { workoutEntity } from "../../entities/v1/workout.entity";
import Logger from "../../logger";
import { errorHandler } from "../../utils";

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
}