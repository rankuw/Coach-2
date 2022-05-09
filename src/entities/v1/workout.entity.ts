import Base from "../base";
import Logger from "../../logger";
import WorkoutModel from "../../models/v1/workout.model";
import { workoutInterface } from "../../interface";

const logger = Logger("workout-entitiy");

class WorkoutEntity<T> extends Base<T>{
    constructor(){
        super(WorkoutModel);
    }


}

export const workoutEntity = new WorkoutEntity<workoutInterface>();