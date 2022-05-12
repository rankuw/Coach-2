import {Types} from "mongoose";
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
        const workouts = await this.getModel().aggregate([
            {$match: payload},
            {$lookup: {
                from: 'workouts',
                localField: 'workout',
                foreignField: '_id',
                as: 'workouts'
            }},
        ]);
        console.log(workouts)
        return workouts;
    }

    async workoutDetailsCoach(payload: any, coach: string|Types.ObjectId){
        payload.athlete = new Types.ObjectId(payload.athlete);
        console.log(coach, 34343);
        coach = new Types.ObjectId(coach);
        const workouts = await this.getModel().aggregate([
            {$match: payload},
            {$lookup: {
                from: 'workouts',
                let: {"id": "$workout"},
                pipeline: [
                    {$match:{$expr:{ $and: [{$eq: ["$_id","$$id"]}]}, coach}}
                ],
                as: 'workouts'
            }},
            
        ]);
        return workouts;
    }
}

export const userWokoutEntity = new UserWorkoutEntity<userWorkoutInterface>();