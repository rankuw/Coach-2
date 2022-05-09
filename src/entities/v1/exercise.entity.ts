import Base from "../base";
import Logger from "../../logger";
import ExerciseModel from "../../models/v1/exercise.model";
import { exerciseInterface } from "../../interface";

const logger = Logger("exercise-entity");

class ExerciseEntity<T> extends Base<T>{
    constructor(){
        super(ExerciseModel);
    }


}

export const exerciseEntity = new ExerciseEntity<exerciseInterface>();