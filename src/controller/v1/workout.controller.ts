import {Request, Response} from "express";
import { userWokoutEntity } from "../../entities/v1/userWorkout.entity";
import { userExerciseEntity } from "../../entities/v1/userExercise.entity";
import { workoutEntity } from "../../entities/v1/workout.entity";
import {exerciseEntity} from "../../entities/v1/exercise.entity"
import Logger from "../../logger";
import { errorHandler } from "../../utils";
import { UserEntity } from "../../entities";
import { STATUS_MSG, WORKOUT } from "../../constants";
import { sessionDetail } from "../../interface";
import { coachAthleteEntity } from "../../entities/v1/coachAthlete.entity";

const logger = Logger("workout-controller");

export default class WorkoutController{


    // @desc Add exercise 
    // @route POST /api/admin/v1/exercise/add
    // @access Private
    static async addWorkout(req: Request, res: Response){
        try{
            const exercises = <string[]>[... new Set(req.body.exercises)];
            const allExercisesExists = await exerciseEntity.exercisesExists(exercises);
            if(allExercisesExists){
                const workout = await workoutEntity.addValue(req.body);
                res.status(201).json(workout);
            }else{
                res.status(400).json(STATUS_MSG.ERROR.BAD_REQUEST("some exercises entered don't exist"));
            }
            
        }catch(err){
            logger.error(err);
            errorHandler(err, res);
        }
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
            res.status(200).json(workouts);
        }catch(err){
            logger.error(err);
            errorHandler(err, res);
        }
    }

    static async getWorkoutsByCoach(req: Request, res: Response){
        const coach = <string>req.query.coach;
        console.log(coach);
        const date = new Date(<string> req.query.date);
        const {_id: athlete} = <sessionDetail>req.user;
        try{
            const workouts = await userWokoutEntity.workoutDetailsCoach({athlete, startDate: date, status: WORKOUT.ONGOING}, coach)
            res.send(workouts);
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
}