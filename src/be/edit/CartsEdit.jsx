import React, { useEffect, useState } from 'react'

const CartsEdit = () => {
    const handleEdit = async (data, key) => {
        // console.log(data)
        try {
            const res = await fetch(`${import.meta.env.VITE_DB}carts/${key}.json`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
    
            const result = await res.json();
            return result; 
        } catch (error) {
            console.log("error while edited", error)
            throw error
        }
    }
    
    return { handleEdit }
}

export default CartsEdit