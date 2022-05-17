import { Request, Response, NextFunction } from "express";
import { STATUS_MSG } from "../constants";

export default function updateSanitize(req: Request, res: Response, next: NextFunction){
    const allowedFields = ["name", "DOB", "password"];
    for(let key of Object.keys(req.body)){
        if(!allowedFields.includes(key)){
            delete req.body[key];
        }
    }
    if(Object.keys(req.body).length === 0){
        res.status(400).json(STATUS_MSG.ERROR.BAD_REQUEST("no valid updates"));
    }
    else{
        next();
    }
    
}