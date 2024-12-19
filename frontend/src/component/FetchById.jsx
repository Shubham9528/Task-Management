import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FetchById = () => {
    const [id, setId] = useState('');
    const [fetchedData, setFetchedData] = useState(null);

    const handleFetch = async () => {
        if (parseInt(id) > 0) {
            try {

                const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_PORT}/fetchById/${id}`);
                setFetchedData(response.data);
            } catch (error) {
                console.error("Error fetching task:", error);

                if (error.response && error.response.status === 404) {
                    alert(error.response.data.message || "Task not found");
                } else {
                    alert("Failed to fetch task. Please try again.");
                }
            }
        } else {
            alert("Please enter a valid ID.");
        }
    };

    return (
        <div className="p-8 bg-white shadow-md rounded space-y-6">
            <div className="flex space-x-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    <Link to="/TaskManager">All Tasks</Link>
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    <Link to="/fetch">Fetch By Id</Link>
                </button>
                <button className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">
                    <Link to="/tasks">Add New Task</Link>
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                    <Link to="/update">Update Task by ID</Link>
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                    <Link to="/delete">Delete Task by ID</Link>
                </button>
            </div>

            <h2 className="text-2xl font-bold text-gray-700">Fetch Task by ID</h2>

            <div className="flex items-center space-x-4">
                <input
                    type="number"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="Enter Task ID"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleFetch}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Fetch
                </button>
            </div>

            {fetchedData && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Task Details</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-gray-50 rounded-lg border border-gray-300 text-sm font-sans">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-base font-semibold text-gray-700 uppercase">Field</th>
                                    <th className="px-6 py-3 text-left text-base font-semibold text-gray-700 uppercase">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="even:bg-gray-100 odd:bg-white">
                                    <td className="px-6 py-4 font-medium text-gray-800">ID</td>
                                    <td className="px-6 py-4 text-gray-800">{fetchedData.id}</td>
                                </tr>
                                <tr className="even:bg-gray-100 odd:bg-white">
                                    <td className="px-6 py-4 font-medium text-gray-800">Name</td>
                                    <td className="px-6 py-4 text-gray-800">{fetchedData.name}</td>
                                </tr>
                                <tr className="even:bg-gray-100 odd:bg-white">
                                    <td className="px-6 py-4 font-medium text-gray-800">Description</td>
                                    <td className="px-6 py-4 text-gray-800">{fetchedData.description}</td>
                                </tr>
                                <tr className="even:bg-gray-100 odd:bg-white">
                                    <td className="px-6 py-4 font-medium text-gray-800">Status</td>
                                    <td className="px-6 py-4 text-gray-800">{fetchedData.status}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>

    );
};

export default FetchById;
