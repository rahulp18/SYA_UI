import React, { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../context/context";
import { toast, ToastContainer } from "react-toastify";
const UploadModal = () => {
  const { token, baseUrl, fetchAllPosts } = useGlobalContext();
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const uploadPost = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("picture", image);
      formData.append("desc", desc);

      console.log(formData);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.post(
        `${baseUrl}/post/upload`,

        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      toast.success("Your post has been uploaded");
      fetchAllPosts();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <input type="checkbox" id="addPost" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="addPost"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Share your Status. !</h3>
          <form action="" className="mt-5" onSubmit={uploadPost}>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="desc" className="font-semibold">
                Description
              </label>
              <input
                type="text"
                id="desc"
                name="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Write description"
                className="border-none px-2 py-2 w-full outline-none rounded-md bg-gray-50"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="picture" className="font-semibold">
                Choose Your image
              </label>
              <input
                type="file"
                id="picture"
                name="picture"
                onChange={(e) => setImage(e.target.files[0])}
                placeholder="Choose your image"
                className="border-none px-2 py-2 w-full outline-none rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center justify-end gap-2 mt-5">
              <button
                type="submit"
                className="self-end bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-400 text-white font-semibold rounded-lg px-3 py-2"
              >
                {loading ? "Uploading..." : "Post"}
              </button>
              <button className="border-2 border-gradient-to-r from-sky-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-sky-600 font-semibold rounded-lg px-3 py-2">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
