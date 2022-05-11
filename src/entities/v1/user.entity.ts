import { loginInterface, statusInterface, userInterface } from "../../interface";
import UserModel from "../../models/v1/user.model";
import {STATUS_MSG} from "../../constants/app.constants"
import {HydratedDocument, Types} from  "mongoose";
import Logger from "../../logger";
import { passwordHash } from "../../utils";

const logger = Logger("user-entity");
export class UserEntity{

    static getModel(){
        return UserModel;
    }
    
    /**
     * @description Function to add a new user to the database.
     * @param name Name of user
     * @param email Email of user
     * @param phoneNumber Phone number of user
     * @param password Password of user
     * @param userType User type(0 for coach, 1 for athlete)
     * @returns user id if user added, error other wise.
     */
    static async addUser(name: string, email: string, phoneNumber: number, password: String, userType: Number): Promise<string>{
        try{
            const newUser: HydratedDocument<userInterface> = await this.getModel().create({name, phoneNumber, email, password, userType});
            const userId: string = newUser.id; // send id as string
            return userId;
        }catch(err){
            logger.error(err);
            return Promise.reject(err);
        }
    }


    /**
     * @description Find user details
     * @param loginDetail email, phone number.
     * @returns user deatils.
     */
    static async findUserDetails(loginDetail: loginInterface): Promise<userInterface|null> { 
        try{
            delete loginDetail.password;
            const user: HydratedDocument<userInterface>|null = await this.getModel().findOne({...loginDetail, active: true});
            if(user){
                return user;   
            }
            else{
                return null;
            }
        }catch(err){
            logger.error(err);
            return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
        }
    }

    /**
     * @description Function to update a user based on params provided.
     * @param loginDetail email and phone number or _id
     * @returns true if user updated, false if user not found.
     */
    static async updateUser(loginDetail: loginInterface, payLoad: any): Promise<null|userInterface>{
        try{
            if(payLoad.password){
                payLoad.password = await passwordHash(payLoad.password);
            }
            const updatedUser: userInterface|null = await this.getModel().findOneAndUpdate(loginDetail, {$set: payLoad}, {new: true});
            if(updatedUser){
                return updatedUser;
            }else{
                return null;
            }
        }catch(err){
            logger.error(err);
            return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
        }
    }

    /**
     * @description Find user status if he exists and is verified(true), is not verified(id), or does not exists(false)
     * @param email email of user
     * @param phoneNumber phone number of user.
     * @returns user details in [email_status, phone_status] form.
     */
    static async userStatus(email: string, phoneNumber: string): Promise<(boolean|string)[]>{
        try{
            
                const validation = await Promise.all([
                    this.getModel().findOne({email}),
                    this.getModel().findOne({phoneNumber})
                ])
                const status : (boolean|string)[]= [false, false];
                if(validation[0]){
                    if(validation[0].emailVerified){
                        status[0] = true
                    }else{
                        status[0] = validation[0].id;
                    }
                }
                if(validation[1]){
                    if(validation[1].emailVerified){
                        status[1] = true
                    }else{
                        status[1] = validation[1].id;
                    }
                }
               return status
 
            
        } catch(err: any){
            logger.error(err);
            return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
        }
    }

    /**
     * @description Function to check if a user exists.
     * @param payLoad any model feature to query on.
     * @returns true if user found, false other wise.
     */
    static async userExists(payLoad: any): Promise<boolean>{
        try{
            const userExists = await this.getModel().findOne(payLoad);
            if(userExists){
                return true;
            }else{
                return false
            }
        }catch(err){
            logger.error(err);
            return Promise.reject(STATUS_MSG.ERROR.DB_ERROR);
        }
    }

    static async getUser(payLoad: any): Promise<userInterface|null>{
        try{
            const user = await UserModel.findOne(payLoad);
            return user;
        }catch(err: any){
            logger.error(err);
            return Promise.reject(STATUS_MSG.ERROR.DB_ERROR(err.message));
        }
    }

}

