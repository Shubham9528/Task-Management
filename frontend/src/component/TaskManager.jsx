import React from "react";
import { Link } from 'react-router-dom';
import FetchAllTask from "./FetchAllTask";


const TaskManager = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 text-center mb-8 animate__animated animate__fadeIn animate__delay-1s pb-3">
                VE3 Task Manager
            </h1>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
                <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600">
                    <Link to="/TaskManager">All Tasks</Link>
                </button>
                <button className="px-4 py-2 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-600">
                    <Link to="/fetch">Fetch By Id</Link>
                </button>
                <button className="px-4 py-2 bg-purple-500 text-white font-semibold rounded shadow hover:bg-purple-600">
                    <Link to="/tasks">Add New Task</Link>
                </button>
                <button className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded shadow hover:bg-yellow-600">
                    <Link to="/update">Update Task by ID</Link>
                </button>
                <button className="px-4 py-2 bg-red-500 text-white font-semibold rounded shadow hover:bg-red-600">
                    <Link to="/delete">Delete Task by ID</Link>
                </button>
            </div>
            <div className="bg-white shadow-md rounded p-6">
                <FetchAllTask />
            </div>
        </div>
    );
};

export default TaskManager;