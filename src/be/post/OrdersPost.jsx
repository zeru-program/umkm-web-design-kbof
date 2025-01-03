import React, { useEffect, useState } from "react";

const OrdersPost = () => {
  const handlePost = async (data) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_DB}orders.json`, {
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
      console.log("error while created acount", error);
      throw error;
    }
  };
  return { handlePost };
};

export default OrdersPost;
