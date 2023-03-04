import express, { Express } from "express";

const PORT: number = 3000;

const app: Express = express();


app.listen(PORT, () => {
    console.info("Server running at port " + PORT);
});