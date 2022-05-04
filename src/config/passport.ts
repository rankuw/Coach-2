// import {Strategy, ExtractJwt} from "passport-jwt";
// import UserModel from "../models/v1/user.model";
// import { userInterface} from "../interface/common.interface";
// import passport from "passport";
// import { JWT_SECRET } from "../constants";
// import {HydratedDocument} from "mongoose"
// import SessionModel from "../models/v1/session.model";
// import { sessionInterface } from "../interface/session.interface";
// import SessionEntity from "../entities/v1/session.entity";
// import {Request} from "express";
// const options = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: JWT_SECRET,
//     deviceId: (req: Request) => {
//         return req.body.deviceId;
//     }
// };

// export default function initialize(passport: passport.PassportStatic){
//     async function authentication(jwt_payload: any, done: any){
        
//         try{
//             const user  =  <boolean> await SessionEntity.checkSession(jwt_payload.id, "sdf");
//             console.log(1, jwt_payload);
//             console.log(user);
//             if(!user){
//                 return done(null, false, "User not authorized");
//             }else{
//                 return done(null, jwt_payload.id);
//             }
//         }catch(err){
//             return done(err, false);
//         }
//     }
//     passport.use(new Strategy(options, authentication));
// }