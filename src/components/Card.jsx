import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/context";
import axios from "axios";
const Card = ({ data }) => {
  const { baseUrl } = useGlobalContext();
  const [userInfo, setuserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchUserInfo = async (id) => {
      try {
        console.log(id);
        setLoading(true);
        const res = await axios.get(`${baseUrl}/user/${id}`);
        setLoading(true);
        setuserInfo(res.data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchUserInfo(data.user);
  }, [data._id]);
  console.log(userInfo);
  const navigate = useNavigate();

  return (
    <div className="px-4 shadow-md w-[400px] rounded-lg py-3 ">
      <div className="flex items-center justify-start py-2 gap-4">
        <img
          src="https://source.unsplash.com/random"
          alt="profile"
          className="h-12 w-12 object-cover rounded-full"
        />
        <h1 className="text-center font-semibold text-lg">{userInfo.name}</h1>
      </div>
      <img
        className="h-[300px] w-full object-cover"
        src={data.imageUrl}
        alt={data.desc}
      />
      <div className="px-4 py-3 flex justify-between items-center">
        <h1 className="text-lg">{data.desc}</h1>
        <button
          onClick={() => navigate(`/post/${data._id}`)}
          className="text-sm font-semibold bg-gradient-to-r from-sky-400 to-blue-500 px-2 py-1 rounded-lg text-white "
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default Card;
