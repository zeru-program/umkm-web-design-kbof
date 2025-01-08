import React from 'react'
import PostOrder from '../../be/midtrans/PostOrder'

const CheckoutTest = () => {
    const { postPayment } = PostOrder()
    const handleClick = async () => {
       const res = await postPayment("OR-29839", "Bz7xPurV", "buku", "2000", "4000", "2", "U8sfjcs", "Justine")

       if (res) {
        console.log(res)
       }
    }
  return (
    <button className='btn bg-primary text-light' onClick={handleClick}>payment</button>
  )
}

export default CheckoutTest