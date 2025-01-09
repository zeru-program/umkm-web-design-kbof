import React from 'react'
import Midtrans from 'midtrans-client';
const serverKey = import.meta.env.VITE_MIDTRANS_SERVER; // Ambil dari environment variable
const authorization = `Basic ${btoa(`${serverKey}:`)}`;


// let snap = new Midtrans.Snap({
//     isProduction: false,
//     serverKey: import.meta.env.VITE_MIDTRANS_SERVER,
//     clientKey: import.meta.env.VITE_MIDTRANS_CLIENT,
// })

const PostOrder = () => {
    const postPayment = async (idOrder, productId, productName, price, totals, qty, userId, userName) => {
        
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
                    userName
                })
            })
            const result = await response.json();
            console.log(result);
            return result        
        } catch (error) {
            return error
        }
        // let parameter = {
        //     item_details: {
        //         product_id: productId,
        //         product_name: productName,
        //         price: price,
        //         qty: qty
        //     },
        //     transaction_details: {
        //         order_id: idOrder,
        //         totals: totals
        //     }
        // }

        // const token = await snap.createTransaction(parameter)
        // console.log(token)
        // return token
    }
    return { postPayment }
}

export default PostOrder