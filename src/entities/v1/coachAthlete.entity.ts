
import { coachAthleteInterface } from "../../interface";
import CoachAthleteModel from "../../models/v1/coachAthlete.model";
import Base from "../base";
import Logger from "../../logger";
import mongoose from "mongoose";

const logger = Logger("coachAthlete-entity");
class CoachAthleteEntity<T> extends Base<T>{
    constructor(){
        super(CoachAthleteModel);
    }

    async changeTotalExercises(coach: string, athlete: string){
        try{
            const date = new Date().toDateString();
            const status = await this.getModel().findOneAndUpdate({athlete, coach}, {$inc: {"totalExercises": 1}, lastAssigned: date});
            return status;
        }catch(err){
            logger.error(err);
            return Promise.reject(err);
        }
    }

    async getAllAthlete(coach: string){
        try{
            const athleteData = this.getModel().aggregate([
                {$match: {coach: new mongoose.Types.ObjectId(coach)}},
                {$lookup: {
                    from: 'users',
                    localField: 'athlete',
                    foreignField: '_id',
                    as: 'athlete'
                }},
                {$unwind: "$athlete"},
                {$project: {"athlete.name": 1, "athlete._id": 1, "athlete.profilePicUrl": 1, totalExercises: 1, totalExercisesCompleted: 1, lastAssigned: 1, _id: 1, 
                            progress: {
                                $cond: {if: { $eq: ["$totalExercises", "0"]}, then: {$multiply:  [{$divide: ["$totalExercisesCompleted", "$totalExercises"]}, 100]}, else: 0}
                            }}},

            ])
            return athleteData;
        }catch(err){
            logger.error(err);
            return Promise.reject(err);
        }
    }

    async getAllCoach(athlete: string){
        try{
            const coachData = await this.getModel().aggregate([
                {$match: {athlete: new mongoose.Types.ObjectId(athlete)}},
                {$lookup: {
                    from: 'users',
                    localField: 'coach',
                    foreignField: '_id',
                    as: 'coach'
                }},
                {$unwind: "$coach"},
                // {$project: {coach: "$coach.name", coachId: "$coach._id"}}
                {$addFields: { age: { $subtract: [new Date(), "$coach.DOB"] }}}
            ])
            return coachData;
        }catch(err){
            logger.error(err);
            return Promise.reject(err);
        }
    }
}

export const coachAthleteEntity = new CoachAthleteEntity<coachAthleteInterface>()