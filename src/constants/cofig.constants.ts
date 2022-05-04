
import dotenv from "dotenv/config";
dotenv;

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
} = process.env;