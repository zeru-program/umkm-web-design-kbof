import React from 'react'

const RequestToGreenAi = () => {
  const requestAi = async (history) => {
    history = history.map(({role, text}) => ({role, parts: [{text}]}))

    const optionReq = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history })
    }

    try {
      const res = await fetch(import.meta.env.VITE_GEMINI_URL, optionReq)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error.message || "error 1 bang") 
      
      const resBot = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim()

      return resBot
      // console.log(resBot)
    } catch (error) {
      throw error;
      console.error(error, "error 2 bang")
    }
  }
  return { requestAi }
}

export default RequestToGreenAi