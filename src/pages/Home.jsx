import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components";
import MainPage from "../components/MainPage";
import { useGlobalContext } from "../context/context";
import { ToastContainer } from "react-toastify";
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="h-auto bg-white">
      {/* Navbar */}
      <Navbar />
      <main className="py-6">
        <ToastContainer />
        <MainPage />
      </main>
    </div>
  );
};

export default Home;
