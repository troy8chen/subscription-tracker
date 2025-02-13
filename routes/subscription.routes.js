import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => res.send({title: "GET all subscriptions"}));

subscriptionRouter.get("/:id", (req, res) => res.send({title: "GET subscription details"}));

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (req, res) => res.send({title: "UPDATE subscription by id"}));

subscriptionRouter.delete("/:id", (req, res) => res.send({title: "DELETE subscription by id"}));

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", (req, res) => res.send({title: "CANCEL subscription by id"}));

subscriptionRouter.get("/upcoming-renewals", (req, res) => res.send({title: "GET upcoming renewals"}));

export default subscriptionRouter;