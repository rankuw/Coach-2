import { Types } from "mongoose";
import { USERTYPE } from "../constants";

export interface sessionInterface {
  id: string,
  deviceToken?: string;
  isActive: boolean;
  isLoggedIn: boolean;
  userId: string;
  deviceId: string;
  userType: USERTYPE
}
export namespace ISession {
  export interface Redis{
    userType: USERTYPE;
    sessionId: string;
    deviceId: string
  }
    export interface CreateData {
      deviceId: string;
      deviceToken?: string;
    }
  export interface tokenDetails {
    deviceId: Types.ObjectId;
    sessionId: Types.ObjectId;


  }}
