import React, { useState, useEffect } from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { IoSendSharp } from "react-icons/io5";
import { useGlobalContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Comment = ({ comment, fetchAllComments }) => {
  const navigate = useNavigate();
  const [isReply, setIsReply] = useState(false);
  const [userInfo, setuserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const { baseUrl, token } = useGlobalContext();
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

  const likeComment = async () => {
    try {
      if (!token) {
        return navigate("/login");
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.post(
        `${baseUrl}/post/comments/${comment._id}/like`
      );
      console.log(res);
      toast.success("You like this comment");
      fetchAllComments();
    } catch (error) {}
  };
  const disLikeComment = async () => {
    try {
      if (!token) {
        return navigate("/login");
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.post(
        `${baseUrl}/post/comments/${comment._id}/dislike`
      );
      console.log(res);
      toast.success("You dislike this comment");
      fetchAllComments();
    } catch (error) {
      console.log(error);
    }
  };
  const [text, setText] = useState("");
  const replyComment = async () => {
    try {
      if (!token) {
        return navigate("/login");
      }
      if (text === "") {
        return toast.warning("Write something to submit");
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.post(`${baseUrl}/post/${comment.post}/comments`, {
        text: text,
        parentCommentId: comment._id,
      });
      setText("");
      setIsReply(false);
      console.log(res);
      fetchAllComments();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserInfo(comment.user);
  }, [comment.user]);

  return (
    <div className="flex items-start gap-3">
      <div className="h-9 w-9 rounded-full flex items-center justify-center font-semibold font-md bg-orange-400 text-white">
        {userInfo?.name?.charAt(0)?.toUpperCase()}
      </div>
      <div className="flex w-full flex-col items-start gap-2">
        <div className="">
          <h1 className="text-md">{userInfo?.name}</h1>
          <p className="text-sm">{comment?.text}</p>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <div className="flex gap-1 items-center">
            <AiOutlineLike
              className="text-lg cursor-pointer"
              onClick={likeComment}
            />
            <span className="text-md">{comment.likes}</span>
          </div>
          <div className="flex gap-1 items-center">
            <AiOutlineDislike
              className="text-lg cursor-pointer"
              onClick={disLikeComment}
            />
            <span className="text-md">{comment.dislikes}</span>
          </div>
          <h1
            className="text-md font-semibold cursor-pointer"
            onClick={() => setIsReply((prev) => !prev)}
          >
            Reply
          </h1>
        </div>
        {isReply && (
          <div className="flex w-full items-center gap-2">
            <img
              src="https://source.unsplash.com/random"
              alt="okay"
              className="h-6 w-6 rounded-full object-cover"
            />
            <div className="flex items-center w-full gap-2 justify-center">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a reply"
                className=" outline-none w-full border-b-2 border-gray-300"
              />
              <button>
                <IoSendSharp className="text-gray-500" onClick={replyComment} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
