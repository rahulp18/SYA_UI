import React, { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import registerLogo from "../assets/register.json";
import { useGlobalContext } from "../context/context";
import loginLogo from "../assets/login.json";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const Login = () => {
  const { register, loading, logIn } = useGlobalContext();
  const initialState = {
    name: "",
    email: "",
    password: "",
  };
  const [isRegiater, setIsRegiater] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);

  const toggle = () => {
    setIsRegiater((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      if (!isRegiater) {
        register(formData, navigate);
      } else {
        logIn(formData, navigate);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen bg-gradient-to-r from-sky-400 to-blue-800 ">
      <ToastContainer />
      <div className="flex justify-center items-center h-full px-4">
        <div className="h-[450px] w-[700px] rounded-lg shadow-md flex-row flex bg-white">
          <div className="md:flex none  md:basis-1/2 basis-0 items-center justify-center ">
            <Player
              autoplay
              loop
              src={isRegiater ? registerLogo : loginLogo}
              style={{ height: "100%", width: "100%" }}
            ></Player>
          </div>
          <div className="flex md:basis-1/2 basis-2/2 flex-col px-4 py-3 w-full ">
            <div className="flex items-center justify-center">
              <h1 className=" border-b-4 font-bold font-Ramprt text-start uppercase   text-2xl">
                {isRegiater ? "Login" : "Register"}
              </h1>
            </div>

            <form
              action=""
              onSubmit={handleSubmit}
              className="font-Roboto flex-col   flex gap-3"
            >
              {!isRegiater && (
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="name" className="font-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter Name"
                    className="border-none px-2 py-2 w-full outline-none rounded-md bg-sky-50"
                  />
                </div>
              )}

              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="email" className="font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="border-none px-2 py-2 w-full outline-none rounded-md bg-sky-50"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="password" className="font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  id="paddword"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="border-none px-2 py-2 w-full outline-none rounded-md bg-sky-50"
                />
              </div>
              <button className=" mt-5 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-400 text-white font-semibold rounded-lg px-3 py-2">
                {!isRegiater
                  ? loading
                    ? "Loading..."
                    : "Register"
                  : loading
                  ? "Loading..."
                  : "Login"}
              </button>

              <h1 className="text-md text-sm ">
                {isRegiater
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <span
                  className="text-sky-600 font-semibold cursor-pointer"
                  onClick={toggle}
                >
                  {isRegiater ? "Register" : "Login"}
                </span>
              </h1>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
