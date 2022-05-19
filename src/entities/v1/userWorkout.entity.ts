import {Types, HydratedDocument} from "mongoose";
import { STATUS_MSG } from "../../constants";
import { userWorkoutInterface, workoutInterface } from "../../interface";
import { userWorkoutModel } from "../../models/v1/userWorkout.model";
import Base from "../base";

// use aggregate
class UserWorkoutEntity<T> extends Base<T>{
    constructor(){
        super(userWorkoutModel);
    }
    async getTotalExercises(workouts: workoutInterface[], athlete: string|Types.ObjectId){
        const exercises = await this.getValues({
            athlete,
            workout: {$in: workouts}
        });

       this.getModel().aggregate()
        const exerciseCount = exercises.length;
        return exerciseCount;
    }

    async workoutDetails(payload: any){
        payload.athlete = new Types.ObjectId(payload.athlete);
        const workouts: HydratedDocument<any>[] = await this.getModel().aggregate([
            {$match: payload},
            {$lookup: {
                from: 'workouts',
                localField: 'workout',
                foreignField: '_id',
                as: 'workout'
            }},
            {$unwind: "$workout"},
            {$lookup: {
                from: 'users',
                localField: 'workout.coach',
                foreignField: '_id',
                as: 'workout.coach'
            }},
            {$unwind: "$workout.coach"},
            {$project: {"workout.__v": 0, "__v": 0, "workout.coach.__v": 0, "workout.coach.userType": 0, "workout.coach.active": 0, "workout.coach.password": 0, "workout.coach.createdAt": 0, "workout.coach.updatedAt": 0, "workout.coach.emailVerified": 0, "workout.coach.phoneVerified": 0}},
        ]);
        console.log(workouts)
        return workouts;
    }

    async workoutDetailsCoach(payload: any, coach: string|Types.ObjectId){
        payload.athlete = new Types.ObjectId(payload.athlete);
        coach = new Types.ObjectId(coach);
        const workouts = await this.getModel().aggregate([
            {$match: payload},
            {$lookup: {
                from: 'workouts',
                let: {"id": "$workout"},
                pipeline: [
                    {$match:{$expr:{ $and: [{$eq: ["$_id","$$id"]}]}, coach}}
                ],
                as: 'workout'
            }},
            {$unwind: "$workout"},
            {$lookup: {
                from: 'users',
                localField: 'workout.coach',
                foreignField: '_id',
                as: 'workout.coach'
            }},
            {$unwind: "$workout.coach"},
            {$project: {"workout.__v": 0, "__v": 0, "workout.coach.__v": 0, "workout.coach.userType": 0, "workout.coach.active": 0, "workout.coach.password": 0, "workout.coach.createdAt": 0, "workout.coach.updatedAt": 0, "workout.coach.emailVerified": 0, "workout.coach.phoneVerified": 0}}
        ]);
        return workouts;
    }

    async getCoachId(_id: string){
        const doc = await this.getModel().findOne({workout: _id});
        console.log(doc)
        const workout = await doc.populate({path: 'workout', select: "coach -_id"});
        
        return workout.workout.coach;
    }

    async getCompletedStats(athlete: string){
        
        try{
            const stats = await this.getModel().aggregate([
                {$match: {athlete : new Types.ObjectId(athlete), status: 1}},
                {$project: {workout: 1}},
                {$lookup: {
                    from: 'workouts',
                    localField: 'workout',
                    foreignField: '_id',
                    as: 'workout'
                }},
                {$unwind: '$workout'},
                {$group: {
                    _id: '',
                    "duration": {$sum: "$workout.duration"},
                    "calories": {$sum: "$workout.calories"},
                    "total": {$sum: 1}
                }},
                // {$project: {durartion: "$duration", calories: "$calories", total: "$total"}}
            ])
            console.log(stats);
            return stats;
        }catch(err){
            console.log(err);
        }
    }
}

export const userWokoutEntity = new UserWorkoutEntity<userWorkoutInterface>();