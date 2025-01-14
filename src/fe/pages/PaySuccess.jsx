import React, { useEffect, useState } from 'react'
import N404 from './N404';
import Base from '../layouts/Base';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductsGet from '../../be/get/ProductsGet';
import PromoGet from '../../be/get/PromoGet';
import OrdersGet from '../../be/get/OrdersGet';

const DetailSuccess = ({ idPay, find, dataProducts }) => {
    return (
      <section className='position-relative mb-5 w-100 d-flex justify-content-center align-items-center pb-5'>
            {/* <span>{idPay}</span> */}
        <div className='position-absolute d-flex justify-content-center' style={{width: "100%", height: "auto", zIndex: "", left: "0", top: "-50px"}}>
          <i className='bi-check bg-primary text-light d-flex justify-content-center align-items-center' style={{borderRadius: "50%", width: "100px", height: "100px", fontSize: "4em"}}></i>
        </div>
        <div className='w-100 d-flex flex-column align-items-center pt-5 pb-3 h-100 rounded-3 bg-light shadow' style={{background: ""}}>
          <h1 className='text-center text-primary my-5'>Payment Successfully</h1>
          <img src={dataProducts.img} className='img-pay mb-5' alt="" />
          <div className='w-100 container-main text-satoshi pb-3 mb-5 d-flex justify-content-between'>
            <div className='d-flex flex-column'>
            <span>Order</span>
            <span>Status</span>
            <span>Item Ordered</span>
            <span>Total Item</span>
            <span className='fw-bold'>Totals (Include Tax)</span>
            </div>
            <div className='d-flex flex-column text-right'>
            <span>{idPay}</span>
            <span>{find.status}</span>
            <span>{dataProducts.name}</span>
            <span>x{find.qty}</span>
            <span className='fw-bold'>Rp{parseFloat(find.total).toLocaleString("id-ID")}</span>
            </div>
          </div>
            <div className='mb-5 pb-3'>
            <button className='btn bg-primary text-light' onClick={() => window.location.href = '/plants'}>Buy Another Plants</button>
            </div>
        </div>
      </section>
    )
}
const DetailFailed = ({ idPay, find, dataProducts }) => {
    return (
      <section className='position-relative mb-5 w-100 d-flex justify-content-center align-items-center pb-5'>
            {/* <span>{idPay}</span> */}
        <div className='position-absolute d-flex justify-content-center' style={{width: "100%", height: "auto", zIndex: "", left: "0", top: "-50px"}}>
          <i className='bi-x bg-danger text-light d-flex justify-content-center align-items-center' style={{borderRadius: "50%", width: "100px", height: "100px", fontSize: "4em"}}></i>
        </div>
        <div className='w-100 d-flex flex-column align-items-center pt-5 pb-3 h-100 rounded-3 bg-light shadow' style={{background: ""}}>
          <h1 className='text-center text-danger my-5'>Payment Failed</h1>
          <img src={dataProducts.img} className='img-pay mb-5' alt="" />
          <div className='w-100 container-main text-satoshi pb-3 mb-5 d-flex justify-content-between'>
            <div className='d-flex flex-column'>
            <span>Order</span>
            <span>Status</span>
            <span>Item Ordered</span>
            <span>Total Item</span>
            <span className='fw-bold'>Totals (Include Tax)</span>
            </div>
            <div className='d-flex flex-column text-right'>
            <span>{idPay}</span>
            <span>{find.status}</span>
            <span>{dataProducts.name}</span>
            <span>x{find.qty}</span>
            <span className='fw-bold'>Rp{parseFloat(find.total).toLocaleString("id-ID")}</span>
            </div>
          </div>
            <div className='mb-5 pb-3'>
            <button className='btn bg-danger text-light' onClick={() => window.location.href = '/detail/order/' + idPay}>Back To Detail Order</button>
            </div>
        </div>
      </section>
    )
}

const PaySuccess = () => {
    const [searchParams] = useSearchParams();
    const { idPay } = useParams();  
    const { dataProducts, loadProducts } = ProductsGet(); 
    const { dataOrders, loadOrders } = OrdersGet();
    const [find, setFind] = useState(null);
    const [findProduct, setFindProduct] = useState(null);
  
    useEffect(() => {
      if (dataOrders && dataOrders.length > 0) {
        const foundOrder = dataOrders.find((item) => item.id_order === idPay);
        if (foundOrder) {
          const findProduct = dataProducts.find((item) => item.id_product === foundOrder.id_product)
          setFindProduct(findProduct || null)
        }
        setFind(foundOrder || null); // Jika tidak ditemukan, set ke null
      }
    }, [dataOrders, dataProducts, idPay]);
  
    // Tampilkan spinner saat data sedang dimuat
    if (loadOrders) {
      return (
        <div className="py-2 w-100 vh-100 d-flex justify-content-center align-items-center mt-4 px-4">
          <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }
  
    // Tampilkan halaman 404 jika produk tidak ditemukan
    if (!find) {
      return <N404 />;
    }
  
    // Render halaman detail produk
    return (
      <Base
        mainContent={
          <section className="section-all-detail-product container-main">
            {
              find.status === 'success' ? (
                <DetailSuccess
                idPay={idPay}
                  find={find}
                  dataProducts={findProduct}
                />
              ) : (
                <DetailFailed
                idPay={idPay}
                  find={find}
                  dataProducts={findProduct}
                />
              )
            }
          </section>
        }
      />
    );
}

export default PaySuccess