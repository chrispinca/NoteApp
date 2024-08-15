import express from "express";
import mongoose from "mongoose";
import {PORT, mongoDBURL } from "./config.js";
import Note from "./models/noteModel.js";

//setup express
const app = express();

app.use(express.json());

//route for homepage
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

        return res.status(200).json({
            count: notes.length,
            data: notes
    });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to get a specific note
app.get('/notes/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const note = await Note.findById(id);

        return res.status(200).json(note);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//Route to update a specific note
app.put('/notes/:id', async (req, res) => {
    try {
        if (!req.body.title ||
            !req.body.note
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, note',
            });
        }
        const {id} = req.params;
        const result = await Note.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({message: 'Note not found'});
        }
        return res.status(200).send({message: 'Note updated successfully!'});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route to delete a specific book
app.delete('/notes/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Note.findByIdAndDelete(id);

        if (!result) {
            return response.status(200).send({message: error.message});
        }

        return res.status(200).send({message: 'Note deleted successfully'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

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









