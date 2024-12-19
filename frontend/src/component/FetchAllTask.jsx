import React, { useState, useEffect } from "react";
import axios from "axios";

const FetchAllTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_PORT}/fetchAll`); // Replace with your API endpoint
        setTasks(response.data.data);
        // console.log(response.data.data)
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-8 bg-white shadow-md rounded">
  <h2 className="text-2xl font-extrabold text-gray-800 mb-6 font-sans">All Tasks</h2>
  {tasks.length === 0 ? (
    <p className="text-gray-600 text-center font-medium text-lg">No tasks available</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-50 rounded-lg border border-gray-300 text-sm font-sans">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-base font-semibold text-gray-700 uppercase">ID</th>
            <th className="px-6 py-3 text-left text-base font-semibold text-gray-700 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-base font-semibold text-gray-700 uppercase">Description</th>
            <th className="px-6 py-3 text-left text-base font-semibold text-gray-700 uppercase">Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="even:bg-gray-100 odd:bg-white hover:bg-gray-200">
              <td className="px-6 py-4 text-base font-medium text-gray-800">{task.id}</td>
              <td className="px-6 py-4 text-base font-medium text-gray-800">{task.name}</td>
              <td className="px-6 py-4 text-base font-medium text-gray-800">{task.description}</td>
              <td className="px-6 py-4 text-base font-medium text-gray-800">{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>


  );
};

export default FetchAllTask;
