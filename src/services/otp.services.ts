import twilio from "twilio";
import { VerificationCheckInstance } from "twilio/lib/rest/verify/v2/service/verificationCheck";
import { STATUS_MSG } from "../constants/app.constants";
import Logger from "../logger";

const logger = Logger("twilio-otp");
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, SERVICE_SID } from "../constants";
const accountSid = TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
const serviceSID = SERVICE_SID;

const client = twilio(accountSid, authToken, {
    lazyLoading: true
});

export const sendOTP = async (phoneNumber: string) => {
    try{
        const status = await client.verify.services(<string>serviceSID)
             .verifications
             .create({to: <string>phoneNumber, channel: 'sms'})
        return status
        
    }catch(err: any){
        if(err.status === 400){
            return Promise.reject(STATUS_MSG.ERROR.BAD_REQUEST("Invalid number"));
        }
        return Promise.reject(err);
    }

}

export const verifyOTP = async (phoneNumber: string, code: string): Promise<boolean> => {
    try{
        const data: VerificationCheckInstance = await client.verify.services(<string>serviceSID).verificationChecks.create({to: <string>phoneNumber, code: <string>code});
        logger.info(data);
        return data.valid;
    }catch(err: any){
        logger.error(JSON.stringify(err));
        return false;
    }
}
