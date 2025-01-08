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
        console.log(authorization)
        
        let parameter = {
            item_details: {
                product_id: productId,
                product_name: productName,
                price: price,
                qty: qty
            },
            transaction_details: {
                order_id: idOrder,
                totals: totals
            }
        }
        try {
            const response = await fetch('https://app.sandbox.midtrans.com/snap/v1/transactions', {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Accept": "application/json",
                    "Authorization": authorization,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(parameter)
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