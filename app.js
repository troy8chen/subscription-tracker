import express from "express";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.route.js";
const app = express();

app.use(express.json()); // Parse JSON bodies in the request
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies in the request
app.use(cookieParser()); // Parse cookies in the request
app.use(arcjetMiddleware);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/workflows", workflowRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.send("Welcome to SubDub!");
});

app.listen(PORT, async () => {
    console.log(`SubDub is running on http://localhost:${PORT}`);

    await connectToDatabase();
});

export default app;