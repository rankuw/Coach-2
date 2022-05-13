import Base from "../base";
import Logger from "../../logger";
import ExerciseModel from "../../models/v1/exercise.model";
import { exerciseInterface } from "../../interface";

const logger = Logger("exercise-entity");

class ExerciseEntity<T> extends Base<T>{
    constructor(){
        super(ExerciseModel);
    }
    
    async exercisesCount(exercises: string[]): Promise<number>{
        const exercisesFound = await this.getModel().find({_id: {$in: exercises}});
        const foundExercisesCount = exercisesFound.length;
        return foundExercisesCount;
    }
    
}

export const exerciseEntity = new ExerciseEntity<exerciseInterface>();