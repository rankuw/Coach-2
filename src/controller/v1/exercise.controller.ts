import {Request, Response} from "express";
import { exerciseEntity } from "../../entities/v1/exercise.entity";
import Logger from "../../logger";
import { errorHandler } from "../../utils";

const logger = Logger("exercise-controller");

export default class ExerciseController{

    // @desc Add exercise 
    // @route POST /api/admin/v1/exercise/add
    // @access Private
    static async addExercise(req: Request, res: Response){
        try{
            const exercise = await exerciseEntity.addValue(req.body);
            res.status(201).json(exercise);
        }catch(err){
            errorHandler(err, res);
        }
    }

    // @desc Get all exercises.
    // @route GET /api/user/v1/exercise
    // @access Private
    static async getExercises(req: Request, res: Response){
        try{
            const exercises = await exerciseEntity.getValues();
            res.status(200).json(exercises);
        }catch(err){
            errorHandler(err, res);
        }
    }

    // @desc Get all exercises by difficulty level.
    // @route GET /api/user/v1/exercise/:difficulty
    // @access Private
    static async getExercise(req: Request, res: Response){
        try{
            const difficulty = req.params.difficulty
            const exercise = await exerciseEntity.getValues({difficulty});
            res.status(200).json(exercise);
        }catch(err){
            errorHandler(err, res);
        }
    }
}



