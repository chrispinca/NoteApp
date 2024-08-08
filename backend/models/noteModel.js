import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        note: {
            type: String,
            required: true,
        },
        date: {
            type: Number,
            required: false,
        },
    },
    {
        timestamps: true,
    }
)

const Note = mongoose.model('Note', noteSchema);
export default Note;