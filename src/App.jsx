import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { DetailPost, Home, Login } from "./pages";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route index path="/login" element={<Login />} />
        <Route index path="/post/:id" element={<DetailPost />} />
      </Routes>
    </Router>
  );
};

export default App;
