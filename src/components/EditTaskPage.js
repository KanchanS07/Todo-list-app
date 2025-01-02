// src/components/EditTaskPage.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../redux/tasksSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditTaskPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const task = useSelector((state) =>
    state.tasks.tasks.find((task) => task.id === parseInt(id))
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setCompleted(task.completed);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      id: task.id,
      title,
      description,
      completed,
    };
    dispatch(updateTask(updatedTask));
    navigate("/");
  };

  if (!task) {
    return <div className="container mx-auto p-4">Task not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Task</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Completed</span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTaskPage;
