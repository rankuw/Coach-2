
import dotenv from "dotenv";
dotenv.config({ path: process.cwd() + `/environments/.env.${process.env.NODE_ENV}` });

export const {
    PORT = 5000,
    MONGO_URL = "mongodb://<userName>:<password>@<adress>/<database>",
    TWILIO_ACCOUNT_SID = "",
    TWILIO_AUTH_TOKEN = "",
    SERVICE_SID="",
    JWT_SECRET="",
    GOOGLE_EMAIL="",
    GOOGLE_PASSWORD="",
    NODE_ENV="dev",
    HOST = "localhost",
    REDIS_HOST,
    REDIS_PORT
} = process.env;