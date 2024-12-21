import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

const DeleteTask = () => {
    const [taskId, setTaskId] = useState("");
    const [statusMessage, setStatusMessage] = useState("Waiting for response...");  // State for status message

    const handleDelete = async () => {
        if (taskId) {
            try {

                const response = await axios.delete(`${import.meta.env.VITE_BACKEND_PORT}/delete/${taskId}`);

                // Check for success message
                setStatusMessage(response.data.message);
                setTaskId("");
            } catch (error) {
                console.error("Error deleting task:", error);

                if (error.response && error.response.status === 404) {
                    setStatusMessage("Task not found.");
                } else {
                    setStatusMessage("Failed to delete task. Please try again.");
                }
            }
        } else {
            setStatusMessage("Please enter a task ID.");  // Set message for empty ID
        }
    };


    return (
        <div className="p-6 bg-gray-100 shadow-lg rounded-md space-y-6">
            {/* Navigation Buttons */}
            <div className="flex flex-wrap gap-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    <Link to="/TaskManager">All Tasks</Link>
                </button>
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    <Link to="/fetch">Fetch By Id</Link>
                </button>
                <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                    <Link to="/tasks">Add New Task</Link>
                </button>
                <button className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">
                    <Link to="/update">Update Task by ID</Link>
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    <Link to="/delete">Delete Task by ID</Link>
                </button>
                <button className="px-4 py-2 bg-cyan-300 text-black  rounded hover:bg-cyan-400">
                    <Link to="/">Log Out</Link>
                </button>
            </div>

            {/* Heading */}
            <h2 className="text-2xl font-bold text-gray-800">Delete Task by ID</h2>

            {/* Task ID Input */}
            <div className="flex items-center space-x-4">
                <input
                    type="number"
                    value={taskId}
                    onChange={(e) => setTaskId(e.target.value)}
                    placeholder="Enter Task ID"
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    Delete Task
                </button>
            </div>

            {/* Status Message */}
            {statusMessage && (
                <p
                    className={`mt-4 text-lg font-medium ${statusMessage === "Task deleted successfully" ? "text-green-600" : "text-red-600"
                        }`}
                >
                    {statusMessage}
                </p>
            )}
        </div>

    );
};

export default DeleteTask;
