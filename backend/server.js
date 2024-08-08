import express from "express";
import mongoose from "mongoose";
import {PORT, mongoDBURL } from "./config.js";
import Note from "./models/noteModel.js";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send("Welcome to note app");
});

//route to create a new note
app.post('/notes', async (req, res) => {
    try {
        if (!req.body.title ||
            !req.body.note
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, note',
            });
        }
        const newNote = {
            title: req.body.title,
            note: req.body.note,
            date: req.body.date,
        };

        const note = await Note.create(newNote);

        return res.status(201).send(note);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

//route to get all notes
app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find({});

        return res.status(200).json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});


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









