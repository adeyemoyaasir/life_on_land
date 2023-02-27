import express, { Express } from "express";
import EmergencySerializer from "./serializers/emergency";

const PORT: number = 3000;

const app: Express = express();

app.post('/emergency/listen/', (request, response) => {
    const serializer = new EmergencySerializer(request.body);
    serializer.isValid(true);
    // do something with data 

    return response.json();
});

app.listen(PORT, () => {
    console.info("Server running at port " + PORT);
});