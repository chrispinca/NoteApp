import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/notes')
            .then((res) => {
                console.log('Response:', res);  // Log the entire response
                console.log('Data:', res.data);  // Log the data field
                setNotes(res.data.data);  // Assuming res.data.data contains the notes
                setLoading(false);
            })
            .catch((error) => {
                console.log('Error:', error);
                setLoading(false);
            });
    }, []);
    
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Notes List</h1>
                <Link to="/notes/create">
                    <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <table className="w-full border-separate border-spacing-2">
                    <thead>
                        <tr>
                            <th className="border border-slate-600 rounded-md">No</th>
                            <th className="border border-slate-600 rounded-md">Title</th>
                            <th className="border border-slate-600 rounded-md max-md:hidden">Note</th>
                            <th className="border border-slate-600 rounded-md max-md:hidden">Year</th>
                            <th className="border border-slate-600 rounded-md">Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notes.map((note, index) => (
                            <tr key={note._id} className="h-8">
                                <td className="border border-slate-700 rounded-md text-center">
                                    {index + 1}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center">
                                    {note.title}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                                    {note.note}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                                    {formatDate(note.createdAt)}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center">
                                    <div className="flex justify-center gap-x-4">
                                        <Link to={`/notes/details/${note._id}`}>
                                            <BsInfoCircle className="text-2xl text-green-800" />
                                        </Link>
                                        <Link to={`/notes/edit/${note._id}`}>
                                            <AiOutlineEdit className="text-2xl text-blue-800" />
                                        </Link>
                                        <Link to={`/notes/delete/${note._id}`}>
                                            <MdOutlineDelete className="text-2xl text-red-800" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Home;
