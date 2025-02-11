import express from "express";
import { PORT } from "./config/env.js";

const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to SubDub!");
});

app.listen(PORT, () => {
    console.log(`SubDub is running on http://localhost:${PORT}`);
});

export default app;