import express from "express";
import {serve, setup} from "swagger-ui-express"
import morgan from "morgan";

import connectDB from "./config/mongodb.config";
import {redis }from "./config/redis.config";
import userRoute from "./routes/v1/user.route";
import adminRoute from "./routes/v1/admin.route";
import workoutRoute from "./routes/v1/workout.route";
import {swaggerFunction} from "./lib/swagger";
import Logger from "./logger"
import {PORT} from "./constants/index";
import subscriptionRoute from "./routes/v1/subscription.route";
import exerciseRoute from "./routes/v1/exercise.route";
const logger = Logger("server");
connectDB(); // connect to database.
redis.connect();

const app = express();
app.use(express.json()); // for body parsing.
app.use(morgan('dev'));
app.use("/pictures",express.static("pictures"))

app.use("/api-docs", serve, setup(swaggerFunction())) //path for swagger api doc
app.use("/api/user/v1", userRoute, subscriptionRoute, exerciseRoute, workoutRoute);
app.use("/api/admin/v1", adminRoute);


app.all('*', (req, res, next) => { //to check if a user goes to a undocumented path.
    res.status(404).json({
      status: 'fail',
      message: `Can't find ${req.originalUrl} on this server!`
    });
  });

app.listen(PORT, () => {
    logger.info(`Server live on port ${PORT}`);
});