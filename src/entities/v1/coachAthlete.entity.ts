
import { coachAthleteInterface } from "../../interface";
import CoachAthleteModel from "../../models/v1/coachAthlete.model";
import Base from "../base";

class CoachAthleteEntity<T> extends Base<T>{
    constructor(){
        super(CoachAthleteModel);
    }
}

export const coachAthleteEntity = new CoachAthleteEntity<coachAthleteInterface>();