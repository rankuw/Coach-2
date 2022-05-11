import { userWorkoutInterface } from "../../interface";
import { userWorkoutModel } from "../../models/v1/userWorkout.model";
import Base from "../base";

class UserWorkoutEntity<T> extends Base<T>{
    constructor(){
        super(userWorkoutModel);
    }
}

export const userWokoutEntity = new UserWorkoutEntity<userWorkoutInterface>();