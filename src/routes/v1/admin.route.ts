import {Router} from "express";
import AdminController from "../../controller/v1/admin.controller";

const adminRoute = Router();

adminRoute.post("/subscriptionPlan",
    AdminController.addSubscriptionPlan
);

adminRoute.post("/subscriptionCost",
    AdminController.addSubscriptionCost
);

export default adminRoute;


