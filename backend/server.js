import express from "express";
import mongoose from "mongoose";
import {PORT, mongoDBURL } from "./config.js";
import Note from "./models/noteModel.js";
import noteRoute from './routes/notesRoute.js';

//setup express
const app = express();

app.use(express.json());

//route for homepage
app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send("Welcome to note app");
});

app.use('/notes', noteRoute);

//mongoDB database connection
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("connected to database");

        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    });









