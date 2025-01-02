// src/redux/tasksSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
});

export const updateTask = createAsyncThunk("tasks/updateTask", async (task) => {
  const response = await axios.put(`${API_URL}/${task.id}`, task);
  return response.data;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      });
  },
});

export default tasksSlice.reducer;
