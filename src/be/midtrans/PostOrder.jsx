import React from 'react'

const PostOrder = () => {
    const postPayment = async (idOrder, productId, productName, price, totals, qty, userId, userName, discPrice) => {
        
        try {
            // console.log(price)
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/create-transaction`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    idOrder,
                    productId,
                    productName,
                    price,
                    totals,
                    qty,
                    userId,
                    userName,
                    discPrice
                })
            })
            const result = await response.json();
            console.log(result);
            return result        
        } catch (error) {
            return error
        }
    }
    return { postPayment }
}

export default PostOrder