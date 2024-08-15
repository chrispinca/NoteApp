import express from 'express';
import Note from '../models/noteModel.js';

const router = express.Router();

//route to create a new note
router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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

export default router;