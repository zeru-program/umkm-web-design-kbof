import React, { useEffect, useState } from "react";

const ReviewPost = () => {
  const handlePost = async (data) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_DB}reviews.json`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      return result;
    } catch (error) {
      console.log("error while created", error);
      throw error;
    }
  };
  return { handlePost };
};

export default ReviewPost;
