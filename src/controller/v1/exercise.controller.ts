import {Request, Response} from "express";
import { STATUS_MSG} from "../../constants";
import { coachAthleteEntity } from "../../entities/v1/coachAthlete.entity";
import { exerciseEntity } from "../../entities/v1/exercise.entity";
import { userExerciseEntity } from "../../entities/v1/userExercise.entity";
import { userWokoutEntity } from "../../entities/v1/userWorkout.entity";
import { sessionDetail, userExerciseInterface } from "../../interface";
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
            const result = await exerciseEntity.getValues();
            res.status(200).json(STATUS_MSG.SUCCESS.FETCH_SUCCESS({result}));
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
            const result = await exerciseEntity.getValues({difficulty});
            res.status(200).json(STATUS_MSG.SUCCESS.FETCH_SUCCESS({result}));
        }catch(err){
            errorHandler(err, res);
        }
    }

    // static async finishExercise(req: Request, res: Response){
    //     const {_id: athlete} = <sessionDetail>req.user;
    //     const {exercise, workout} = req.body;
    //     try{
    //         const userWorkout = await userWokoutEntity.getValue({_id: workout, athlete});
            
    //         if(userWorkout){
    //             const result = await userExerciseEntity.markComplete({user: workout, exercise});
    //             const unfinshedExercise: userExerciseInterface[] = await userExerciseEntity.getValues({user: workout, isCompleted: false});
    //             if(unfinshedExercise.length < 1){
    //                 const coach = await userWokoutEntity.getCoachId(workout);
    //                 await coachAthleteEntity.increaseFinishedExercises(coach, athlete);
    //                 await userWokoutEntity.update({_id: workout}, {status: 1});
    //             }
    //             res.status(201).json(STATUS_MSG.SUCCESS.CUSTOM_SUCCESS(201, "exercise status", {"finished": unfinshedExercise.length < 1}));
                
    //         }
    //         else{
    //             throw STATUS_MSG.ERROR.BAD_REQUEST("incorrect user or workout");
    //         }

            
    //     }catch(err){
    //         errorHandler(err, res);
    //     }
    // }

    static async finishMultipleExercise(req: Request, res: Response){
        const {_id: athlete} = <sessionDetail>req.user;
        const {exercises, userWorkoutId} = req.body;
        try{
            const userWorkout = await userWokoutEntity.getValue({_id: userWorkoutId, athlete});
            console.log(userWorkout)
            if(userWorkout){
                const result = await userExerciseEntity.markCompleteMultiple({user: userWorkoutId, exercises});
                const unfinshedExercise: userExerciseInterface[] = await userExerciseEntity.getValues({user: userWorkoutId, isCompleted: false});
                if(unfinshedExercise.length < 1){
                    const coach = await userWokoutEntity.getCoachId(userWorkout.workout);
                    await coachAthleteEntity.increaseFinishedExercises(coach, athlete);
                    await userWokoutEntity.update({_id: userWorkout._id}, {status: 1});
                }
                res.status(201).json(STATUS_MSG.SUCCESS.CUSTOM_SUCCESS(201, "exercise status", {"finished": unfinshedExercise.length < 1}));
                
            }
            else{
                throw STATUS_MSG.ERROR.BAD_REQUEST("incorrect user or workout");
            }

            
        }catch(err){
            errorHandler(err, res);
        }
    }

    static async queryExercises(req: Request, res: Response){
        const title = <string>req.params.exercise;
        try{
            const exercises = await exerciseEntity.query(title);
            res.status(200).json(STATUS_MSG.SUCCESS.FETCH_SUCCESS({exercises}, "Fetch successfull"));
        }catch(err){
            errorHandler(err, res);
        }
    }
}



