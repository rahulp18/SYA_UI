import React, { useState } from "react";
import { Comment, Navbar } from "../components";
import axios from "axios";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";
import { IoSendSharp } from "react-icons/io5";
import { useGlobalContext } from "../context/context";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const DetailPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { baseUrl, token } = useGlobalContext();
  const [postInfo, setPostInfo] = useState({});
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchInfo = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/post/${id}`);
      setLoading(false);
      setPostInfo(res.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Like Logic
  const likePost = async () => {
    try {
      if (!token) {
        return navigate("/login");
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.post(`${baseUrl}/post/${id}/like`);
      toast.success("Liked Post");
      fetchInfo();
    } catch (error) {
      console.log(error);
    }
  };
  const disLikePost = async () => {
    try {
      if (!token) {
        return navigate("/login");
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.post(`${baseUrl}/post/${id}/dislike`);
      console.log(res);
      toast.success("dislike Post");
      fetchInfo();
    } catch (error) {
      console.log(error);
    }
  };

  const submitComment = async () => {
    try {
      if (!token) {
        return navigate("/login");
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.post(`${baseUrl}/post/${id}/comments`, {
        text: commentText,
      });
      console.log(res);
      toast.success("Comment added successfully");
      setCommentText("");
      fetchAllComments();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const [comments, setComments] = useState([]);
  const fetchAllComments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/post/${id}/comments`);
      console.log(res);
      setComments(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInfo();
    fetchAllComments();
  }, [id]);

  return (
    <div className="h-screen">
      <Navbar />
      <main className="md:px-0 px-3 mt-5 flex md:items-center items-start justify-start md:justify-center ">
        <div className="md:w-[900px] w-[97%]">
          <img
            src={postInfo?.imageUrl}
            alt="image"
            className="w-full h-[400px] object-contain"
          />
          <h1 className="text-lg  py-2 font-Roboto font-semibold">
            {postInfo?.desc}
          </h1>
          <div className="flex md:flex-row   items-start justify-start   flex-col md:justify-between md:items-center px-4 py-2">
            <div className="flex items-center gap-3 justify-center">
              <div className="flex items-center justify-center gap-2">
                <AiOutlineLike
                  className="text-2xl text-sky-600 cursor-pointer "
                  onClick={likePost}
                />

                <span className="text-lg font-semibold">
                  {postInfo?.likes} Likes
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <AiOutlineDislike
                  className="text-2xl text-sky-600 cursor-pointer "
                  onClick={disLikePost}
                />

                <span className="text-lg font-semibold">
                  {postInfo?.dislikes} Dislike
                </span>
              </div>
            </div>

            <div className="flex md:mt-0 mt-3 items-center gap-2 justify-center bg-gray-50 px-3 ">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                type="text"
                placeholder="Write some comment."
                name="comment"
                className="text-lg border-none px-4 py-1 outline-none bg-gray-50"
              />
              <IoSendSharp
                className="text-xl cursor-pointer"
                onClick={submitComment}
              />
            </div>
          </div>
          {comments.length === 0 ? (
            <h1>No comment yet .</h1>
          ) : (
            <div className="px-4 py-5">
              <h1 className="text-lg font-semibold">See comments</h1>
              <div className="flex flex-col gap-3 mt-3">
                {comments.map((comment) => (
                  <Comment
                    comment={comment}
                    key={comment._id}
                    fetchAllComments={fetchAllComments}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DetailPost;
