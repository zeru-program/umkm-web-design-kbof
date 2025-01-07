import React, { useEffect, useState } from 'react'
// import randomstring from 'randomstring'
import stringRandom from 'string-random'

const UsersPost = () => {
    const handlePost = async (data) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_DB}users.json`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: stringRandom(10),
                    username: data.username,
                    password: data.password,
                    email: data.email,
                    role: data.role || "pembeli",
                    gender: data.gender || "",
                    phone: data.phone || "",
                    img: data.img || "",
                })
            })

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
    
            const result = await res.json();
            return result; 
        } catch (error) {
            console.log("error while created acount", error)
            throw error
        }
    }
    return { handlePost }
}

export default UsersPost