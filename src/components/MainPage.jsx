import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { textVariant } from "../motion";
import "react-vertical-timeline-component/style.min.css";
import Card from "./Card";
import { useGlobalContext } from "../context/context";

const MainPage = () => {
  const { fetchAllPosts, loading, postData } = useGlobalContext();

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <div className="h-full px-6 py-8">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>Welcome to</p>
        <h2 className={`${styles.sectionHeadText} text-center`}>Blog Post.</h2>
      </motion.div>
      <div className="">
        {postData.length === 0 ? (
          <h1 className="text-lg font-Roboto font-semibold mt-5">
            No post available ! Start your sharing now
          </h1>
        ) : (
          <div className="mt-20 flex justify-center flex-wrap gap-5 items-center">
            {postData.map((data, index) => (
              <Card key={`experience-${index}`} data={data} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
