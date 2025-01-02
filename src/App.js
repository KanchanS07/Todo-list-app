// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import HomePage from "./components/HomePage";
import AddTaskPage from "./components/AddTaskPage";
import EditTaskPage from "./components/EditTaskPage";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddTaskPage />} />
            <Route path="/edit/:id" element={<EditTaskPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
