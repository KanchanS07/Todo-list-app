// src/components/HomePage.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/tasksSlice";
import { Link } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">To-Do List</h1>
      <Link
        to="/add"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Task
      </Link>
      <ul className="mt-4 space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="bg-white shadow-md rounded p-4 flex justify-between items-center"
          >
            <div>
              <h5 className="text-xl font-semibold">{task.title}</h5>
              <p
                className={`text-sm ${
                  task.completed ? "text-green-500" : "text-red-500"
                }`}
              >
                {task.completed ? "Completed" : "Pending"}
              </p>
            </div>
            <Link
              to={`/edit/${task.id}`}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
            >
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
