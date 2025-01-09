import React, { useEffect } from 'react'
import PostOrder from '../../be/midtrans/PostOrder'

const CheckoutTest = () => {
    const { postPayment } = PostOrder()
    const handleClick = async () => {
       const res = await postPayment("OPR-21sdssd8943s9", "Bz7xPurV", "buku", "2000", "4000", "2", "U8sfjcs", "Justine")

       if (res) {
        console.log(res)
        snap.pay(res.token, {
          onSuccess: function(result){console.log('success');console.log(result);},
          onPending: function(result){console.log('pending');console.log(result);},
          onError: function(result){console.log('error');console.log(result);},
          onClose: function(){console.log('customer closed the popup without finishing the payment');}
        })
        // snap.pay(res.token)
       }
    }
    
    useEffect(() => {
      const snapJs = "https://app.sandbox.midtrans.com/snap/snap.js"
      const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT
      const script = document.createElement('script')
      script.src = snapJs
      script.setAttribute('data-client-key', clientKey)
      script.async = true

      document.body.appendChild(script)

      return () => {
        document.body.removeChild(script)
      }
    }, [])
  return (
    <div className='d-flex gap-3'>
      <button className='btn bg-primary text-light' onClick={handleClick}>payment</button>
    </div>
  )
}

export default CheckoutTest