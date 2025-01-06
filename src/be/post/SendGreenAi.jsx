import React, { useEffect, useState } from "react";

const SendGreenAi = () => {
    const send = async (question) => {
        try {
          const payload = {
            question: question || "", // Or remove if not needed
            prompt: question,
            models: "grok-2",
          };
      
          console.log("Payload being sent:", payload);
      
          const res = await fetch(`${import.meta.env.VITE_API_GREENAI}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
      
          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`HTTP error! status: ${res.status}, details: ${errorText}`);
          }
      
          return await res.json();
        } catch (error) {
          console.error("Error while sending request:", error);
          throw error;
        }
      };      
  return { send };
};

export default SendGreenAi;
