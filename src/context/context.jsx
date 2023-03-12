import axios from "axios";
import { useState, useContext, createContext } from "react";
import { toast } from "react-toastify";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const baseUrl = "https://syaapi-production.up.railway.app/api";
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [postData, setPostData] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );
  const register = async (userData, navigate) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${baseUrl}/user/register`, userData);
      setLoading(false);
      localStorage.setItem("token", data.accesToken);
      navigate("/");
      setToken(data.accesToken);
      setUser(data.data);
    } catch (error) {
      setLoading(false);
      console.log(error?.response?.data?.message);
      toast("error?.response?.data?.message");
      console.log(error);
    }
  };
  const logIn = async (userData, navigate) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${baseUrl}/user/login`, userData);
      setLoading(false);
      localStorage.setItem("token", data.accesToken);
      navigate("/");
      setToken(data.accesToken);
      setUser(data.data);
    } catch (error) {
      console.log(error?.response?.data?.message);
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const fetchAllPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/post`);
      setPostData(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        register,
        logIn,
        token,
        setToken,
        user,
        baseUrl,
        fetchAllPosts,
        postData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
