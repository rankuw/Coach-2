import Base from "../base";
import Logger from "../../logger";
import ExerciseModel from "../../models/v1/exercise.model";

const logger = Logger("exercise-entity");

export class ExerciseEntity extends Base{
    constructor(){
        super(ExerciseModel);
    }


}

export const exerciseEntity = new ExerciseEntity();