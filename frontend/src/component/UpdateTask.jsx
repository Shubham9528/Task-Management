import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UpdateTask = () => {
    const [taskId, setTaskId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [statusMessage, setStatusMessage] = useState("");

    const handleFindTask = async () => {
        if (!taskId) {
            setStatusMessage("Please enter a task ID.");
            return;
        }
        if (taskId<0) {
            setStatusMessage("Please enter a valid task ID.");
            return;
        }
    
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_PORT}/fetchById/${taskId}`);
            const task = response.data;
    
            setName(task.name);
            setDescription(task.description);
            setStatus(task.status);
            setStatusMessage("Task found and loaded successfully.");
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setStatusMessage("Task not found.");
            } else {
                console.error("Error fetching task:", error);
                setStatusMessage("An error occurred while fetching the task. Please try again.");
            }
        }
    };
    const handleUpdate = async () => {
        if (taskId && name && description && status) {
            try {
                const updatedTask = { name, description, status };
                const response = await axios.put(
                    `${import.meta.env.VITE_APP_BACKEND_PORT}/update/${taskId}`,
                    updatedTask
                );
                setStatusMessage(response.data.message || "Task updated successfully.");
                clearFields();
            } catch (error) {
                console.error("Error updating task:", error);
                setStatusMessage("Error updating task. Please try again.");
            }
        } else {
            setStatusMessage("Please fill all fields.");
        }
    };

    const clearFields = () => {
        setTaskId("");
        setName("");
        setDescription("");
        setStatus("");
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
  </div>

  <h2 className="text-3xl font-bold text-gray-800">Update Task</h2>

  {/* Task ID Input */}
  <div className="flex items-center space-x-4">
    <input
      type="number"
      value={taskId}
      onChange={(e) => setTaskId(e.target.value)}
      placeholder="Enter Task ID to Find"
      className="flex-grow px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      onClick={handleFindTask}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Find Task
    </button>
  </div>

  {/* Status Message */}
  {statusMessage && (
    <p className="mt-4 text-lg text-green-600 font-semibold">{statusMessage}</p>
  )}

  {/* Update Task Form */}
  {(name || description || status) && (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label className="text-lg font-medium text-gray-700">Task Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Task Name"
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="text-lg font-medium text-gray-700">Task Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      <div className="flex flex-col space-y-2">
        <label className="text-lg font-medium text-gray-700">Task Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button
        onClick={handleUpdate}
        className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Update Task
      </button>
    </div>
  )}
</div>

    );
};

export default UpdateTask;
