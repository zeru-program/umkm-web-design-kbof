import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import ProductsOption from '../../../be/options/ProductsOption';
import ProductsGet from '../../../be/get/ProductsGet';
import OrdersPost from '../../../be/post/OrdersPost';
import GenerateString from '../../../be/GenerateString';
import Users from '../../../be/get/Users';
import UsersOption from '../../../be/options/UsersOption';
const now = new Date();
const formattedDate = now.getFullYear() + "-" +
  String(now.getMonth() + 1).padStart(2, '0') + "-" +
  String(now.getDate()).padStart(2, '0') + "T" +
  String(now.getHours()).padStart(2, '0') + ":" +
  String(now.getMinutes()).padStart(2, '0');

const FormCreateUsers = () => {
  const { productOpt } = ProductsOption();
  const { usersOpt } = UsersOption();
  const { dataProducts } = ProductsGet();
  const { dataUsers } = Users();
  const { handlePost } = OrdersPost();
//   console.log(GenerateString(9))

  const [dtFormCreate, setDtFormCreate] = useState({
    id_product: '',
    id_order: GenerateString(9),
    id_user: '',
    location_client: '',
    recipient_name: '',
    payment_method: 'cod',
    order_note: '',
    qty: '',
    status: 'pending',
    token: GenerateString(15),
    total: '',
    created_at: formattedDate,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setDtFormCreate((prevState) => {
      //   if (name === 'qty') {
      //       if (value <= 1) {
      //           return {
      //               ...prevState,
      //               [name]: 1
      //           }
      //       }
      //       const result = value * (prevState.total / (prevState.qty || 1));
      //       return {
      //           ...prevState,
      //           [name]: value,
      //           total: result || 0,
      //       };
      // }
  
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  

  return (
    <form action="" id='formCreateOrder' onSubmit={async (e) => {
        e.preventDefault()
        // console.log(dtFormCreate)
        const res = await handlePost(dtFormCreate)
        if (res) {
            sessionStorage.setItem("success", "Success Create Orders")
            location.reload()
        } else {
            alert('opss, any problem')
        }
    }}>
      <div className="row">
        <div className="col-12 mb-3">
          <label>Products</label>
          <Select
            options={productOpt}
            // onChange={(item) => {
            //     setDtFormCreate({ ...dtFormCreate, id_product: item.value })
            //     setDtFormCreate({...dtFormCreate, total: dataProducts.find((data) => data.id_product === item.value).price})
            //     setDtFormCreate({...dtFormCreate, qty: 1})
            // }}
            onChange={(item) => {
                const selectedProduct = dataProducts.find((data) => data.id_product === item.value);
            
                setDtFormCreate((prevState) => ({
                  ...prevState,
                  id_product: item.value,
                  total: selectedProduct ? selectedProduct.price : 0,
                  qty: 1
                }));
            }}
            value={productOpt.find((opt) => opt.value === dtFormCreate.id_product)}
            required
          />
        </div>
        <div className="col-12 mb-3">
          <label>Orderer</label>
          <Select
            options={usersOpt}
            onChange={(item) => {
                setDtFormCreate((prevState) => ({
                  ...prevState,
                  id_user: item.value
                }));
            }}
            value={usersOpt.find((opt) => opt.value === dtFormCreate.id_user)}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6 mb-3">
          <label>Qty</label>
          <input
            type="number"
            name="qty"
            placeholder="Input qty product"
            className="form-control"
            value={dtFormCreate.qty}
            onInput={handleInputChange}
            required
          />
        </div>
        <div className="col-6 mb-3">
          <label>Price Totals</label>
          <input
            type="number"
            name="total"
            disabled
            placeholder="0"
            className="form-control"
            value={dtFormCreate.total}
            onInput={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-3">
          <label>Recipient Name</label>
          <input
            type="text"
            name="recipient_name"
            placeholder="Input recipient name"
            className="form-control"
            value={dtFormCreate.recipient_name}
            onInput={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-3">
          <label>Location Client</label>
          <input
            type="text"
            name="location_client"
            placeholder="Input location client"
            className="form-control"
            value={dtFormCreate.location_client}
            onInput={handleInputChange}
            required
          />
        </div>
        <div className="col-12 mb-3">
          <label>Payment Method</label>
          <input
            type="text"
            name="payment_method"
            value={dtFormCreate.payment_method}
            disabled
            placeholder="Input payment method"
            className="form-control"
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-3">
          <label>Order Note</label>
          <textarea
            name="order_note"
            placeholder="Input order note"
            className="form-control"
            value={dtFormCreate.order_note}
            onInput={handleInputChange}
          ></textarea>
        </div>
      </div>
      {/* <button type='submit'>submit</button> */}
    </form>
  );
};

export default FormCreateUsers;