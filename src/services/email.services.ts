import nodemailer from "nodemailer";
import { GOOGLE_EMAIL, GOOGLE_PASSWORD} from "../constants";
import Logger from "../logger/index";

const logger = Logger("emai-service");

export async function sendEmail(email: string, url: string, subject: string) : Promise<any> {
    logger.info(url);
    const tranporter = nodemailer.createTransport({
        name: "coach",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: GOOGLE_EMAIL,
            pass: GOOGLE_PASSWORD
        }
    });

    try{
        const info = await tranporter.sendMail({
            from: GOOGLE_EMAIL,
            to: email,
            subject: subject,
            html: url
        })
        return info;
    }catch(err){
        logger.error(err);
        return Promise.reject(err);
        
    }
}