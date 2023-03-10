import {unlinkSync} from "fs"
import {Request, Response} from "express";
import { userWokoutEntity } from "../../entities/v1/userWorkout.entity";
import { userExerciseEntity } from "../../entities/v1/userExercise.entity";
import { workoutEntity } from "../../entities/v1/workout.entity";
import {exerciseEntity} from "../../entities/v1/exercise.entity"
import Logger from "../../logger";
import { errorHandler } from "../../utils";
import { UserEntity } from "../../entities";
import { HOST, PORT, STATUS_MSG, WORKOUT } from "../../constants";
import { sessionDetail } from "../../interface";
import { coachAthleteEntity } from "../../entities/v1/coachAthlete.entity";
import { uploadWorkoutPic } from "../../middleware/multer.middleware";

const logger = Logger("workout-controller");

export default class WorkoutController{


    // @desc Add exercise 
    // @route POST /api/admin/v1/exercise/add
    // @access Private
    static async addWorkout(req: Request, res: Response){
        uploadWorkoutPic(req, res, async function(err){
            try{
                console.log(req.body);
                if(err){
                    throw STATUS_MSG.ERROR.BAD_REQUEST(err.message);
                }
                else{
                    if(req.file?.path === undefined){
                        throw STATUS_MSG.DATA_RESPONSE(400, false, "Image not provided", {});
                    }
                    const {_id: coach} = <sessionDetail>req.user;
                    const photoURL: string = `${HOST}/${req.file?.path}`;
                    let exercises;
                    if(typeof req.body.exercises === "string"){
                        exercises = new Array(req.body.exercises);
                    }else{
                        exercises = <string[]>[... new Set(req.body.exercises)];
                    }
                    const exercisesCount = exercises.length;
                    const allExercisesCount = await exerciseEntity.exercisesCount(exercises);
                    if(allExercisesCount === exercisesCount){
                        const workout = await workoutEntity.addValue({...req.body, photoURL, coach});
                        res.status(201).json(STATUS_MSG.DATA_RESPONSE(201, true, "Workout added", {workout: workout.id}));
                    }else{
                        throw STATUS_MSG.ERROR.BAD_REQUEST("some exercises entered don't exist");
                    }
                }
                    
                }catch(err){
                    if(req.file?.path){
                        unlinkSync(req.file.path);
                    }
                    logger.error(err);
                    errorHandler(err, res);
                }
            })
    }

    
    static async assignWorkout(req: Request, res: Response){
        try{
            const {_id: coach} = <sessionDetail> req.user;
            const {athlete, workout, startDate, repetation, performAt} = req.body;
            const workoutDetails = await workoutEntity.getValue({_id: workout});
            if(!workoutDetails){
                throw STATUS_MSG.ERROR.BAD_REQUEST("No such exercise found");
            }
            const coachAthleteWorkoutInc = await coachAthleteEntity.changeTotalExercises(coach, athlete);
            if(!coachAthleteWorkoutInc){
                throw STATUS_MSG.ERROR.BAD_REQUEST("Invalid athlete id");
            }
            const userworkout = await userWokoutEntity.addValue({athlete, workout, startDate, repetation, performAt});
            workoutDetails.exercises.forEach(async (exercise) => {
                const userexercise = await userExerciseEntity.addValue({user: userworkout._id , exercise});
            });
            res.status(201).json(STATUS_MSG.DATA_RESPONSE(201, true, "Exercise assigned", {}));
            
        }catch(err){
            logger.error(err);
            errorHandler(err, res);
        }
    }

    static async getWorkouts(req: Request, res: Response){
        const date = new Date(<string>req.query.date);
        const {_id: athlete} = <sessionDetail>req.user;
        try{
            const workouts = await userWokoutEntity.workoutDetails({athlete, startDate: date, status: WORKOUT.ONGOING});
            console.log(workouts);
            if(workouts.length === 0){
                throw STATUS_MSG.ERROR.BAD_REQUEST("No exercise");
            }
            res.status(200).json(STATUS_MSG.SUCCESS.FETCH_SUCCESS(workouts));
        }catch(err){
            logger.error(err);
            errorHandler(err, res);
        }
    }

    static async getWorkoutsByCoach(req: Request, res: Response){
        const coach = <string>req.params.coach;
        const date = new Date(<string> req.query.date);
        const {_id: athlete} = <sessionDetail>req.user;
        try{
            const workouts = await userWokoutEntity.workoutDetailsCoach({athlete, startDate: date, status: WORKOUT.ONGOING}, coach)
            res.status(200).json(STATUS_MSG.SUCCESS.FETCH_SUCCESS(workouts));
        }catch(err){
            logger.error(err);
            errorHandler(err, res);
        }
    }

    static async removeWorkout(req: Request, res: Response){
        const _id = req.params.workout;
        try{
            const workoutRemoved = await userExerciseEntity.removeValue({_id});
            if(!workoutRemoved){
                throw STATUS_MSG.ERROR.BAD_REQUEST("No workout with the given _id found");
            }else{
                res.send(201).json(STATUS_MSG.SUCCESS.DELETED)
            }
        }catch(err){
            logger.error(err);
            errorHandler(err, res);
        }
    }

    static async queryWorkouts(req: Request, res: Response){
        const title = <string>req.params.title;
        try{
            const workouts = await workoutEntity.query(title);
            res.status(200).json(STATUS_MSG.SUCCESS.FETCH_SUCCESS({workouts}, "Fetch successfull"));
        }catch(err){
            errorHandler(err, res);
        }
    }

    static async getAllWorkouts(req: Request, res: Response){
        const {_id} = <sessionDetail> req.user;
        try{
            const workouts = await userWokoutEntity.getAllWorkouts(_id);
            res.status(201).json(STATUS_MSG.SUCCESS.FETCH_SUCCESS(workouts));
        }catch(err){
            errorHandler(err, res);
        }
    }

    static async getAllWorkoutsByCoach(req: Request, res: Response){
        const {_id: coach} = <sessionDetail> req.user;
        try{
            const workouts = await workoutEntity.getValues({coach});
            res.status(200).json(STATUS_MSG.SUCCESS.FETCH_SUCCESS(workouts));
        }catch(err){
            errorHandler(err, res);
        }
    }
}