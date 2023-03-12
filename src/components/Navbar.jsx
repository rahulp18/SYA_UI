import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SiAddthis } from "react-icons/si";
import UploadModal from "./UploadModal";

import { useEffect } from "react";
import { useGlobalContext } from "../context/context";

const Navbar = () => {
  const navigate = useNavigate();
  const { setToken, token } = useGlobalContext();
  const [isRegiater, setIsRegiater] = useState(true);
  useEffect(() => {
    if (token === null) {
      setIsRegiater(false);
    } else {
      setIsRegiater(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setToken(null);
  };

  return (
    <nav className="px-6 py-4 shadow-sm  ">
      <div className="flex justify-between items-center">
        <h1
          className="text-4xl font-semibold cursor-pointer  font-Ramprt "
          onClick={() => navigate("/")}
        >
          {" "}
          Rahul
        </h1>
        {isRegiater ? (
          <div className="flex gap-2 items-center justify-center">
            <label htmlFor="addPost">
              <div className="flex gap-2 items-center justify-center uppercase text-xl font-semibold cursor-pointer ">
                Upload
                <SiAddthis className="text-sky-600 text-3xl" />
              </div>
            </label>
            <button
              onClick={logout}
              className="bg-gradient-to-r from-red-400 to-red-600 hover:from-pink-500 hover:to-yellow-500 text-white font-semibold rounded-lg px-3 py-2"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-5">
            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-semibold rounded-lg px-3 py-2"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/login")}
              className="border-2 border-gradient-to-r from-sky-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-sky-600 font-semibold rounded-lg px-3 py-2"
            >
              Register
            </button>
          </div>
        )}
      </div>
      <UploadModal />
    </nav>
  );
};

export default Navbar;
