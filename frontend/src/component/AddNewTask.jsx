import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AddNewTask() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && description && status) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_PORT}/AddNewTask`, {
          name,
          description,
          status,
        });
        setResponseMessage(response.data.message || `${name} added successfully!`);
        setName("");
        setDescription("");
        setStatus("");
      } catch (error) {
        console.error("Error adding task:", error);
        setResponseMessage("Failed . Please try again.");
      }
    } else {
      setResponseMessage("Please fill in all fields.");
    }
  };

  return (
    <div className="p-8 bg-gray-100 shadow-md rounded-lg space-y-6">
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
        <button className="px-4 py-2 bg-cyan-300 text-black  rounded hover:bg-cyan-400">
          <Link to="/">Log Out</Link>
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-800">Add New Task</h1>

      {/* Task Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select Status
            </option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </form>

      {responseMessage && (
        <p className="mt-4 text-green-600 text-lg font-semibold">{responseMessage}</p>
      )}
    </div>

  );
}

export default AddNewTask;
