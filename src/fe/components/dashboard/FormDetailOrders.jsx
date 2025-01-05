import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import ProductsOption from '../../../be/options/ProductsOption';
import GenerateString from '../../../be/GenerateString';
import TrueFalse from '../../../be/options/TrueFalse';
import StatusOption from '../../../be/options/StatusOption';
import Rating from '../../../be/options/Rating';
import ProductsEdit from '../../../be/edit/ProductsEdit';
import UsersOption from '../../../be/options/UsersOption';

const FormDetailOrders = ({dataDetail}) => {
  const { productOpt } = ProductsOption();
  const { trueFalse } = TrueFalse();
  const { statusOptOrders } = StatusOption()
  const { usersOpt } = UsersOption()
  const { ratingOpt } = Rating()
  const { handleEdit } = ProductsEdit();
  const [dtFormEdit, setDtFormEdit] = useState({
    id_product: '',
    id_order: "",
    id_user: '',
    location_client: '',
    recipient_name: '',
    payment_method: '',
    order_note: '',
    qty: '',
    status: 'pending',
    token: '',
    total: '',
    created_at: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setDtFormEdit((prevState) => {
        if (name === "weight" || name === "height") {
            return {
                ...prevState,
                spesification: {
                    ...prevState.spesification,
                    [name]: value
                }
            }
        }
        return {
        ...prevState,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (Array.isArray(dataDetail) && dataDetail.length === 1) {
        setDtFormEdit({
          ...dtFormEdit,
          id_product: dataDetail[0].productID,
          id_order: dataDetail[0].orderID,
          id_user: dataDetail[0].id_user,
          location_client: dataDetail[0].location_client,
          recipient_name: dataDetail[0].recipient_name,
          payment_method: dataDetail[0].payment_method,
          order_note: dataDetail[0].order_note,
          qty: dataDetail[0].qty,
          status: dataDetail[0].status,
          token: dataDetail[0].token,
          total: dataDetail[0].total,
          created_at: dataDetail[0].created_at
        });
      }      
    }, [dataDetail])

  return (
    <form action="" id='formEditProduct' onSubmit={async (e) => {
        e.preventDefault()
    }}>
    <div className="row">
      <div className="col-12 mb-3">
          <label>Order ID</label>
          <input
              type="text"
              name="id_order"
              disabled
              placeholder="Input orderer id"
              className="form-control"
              value={dtFormEdit.id_order}
              onInput={handleInputChange}
              required
          />
          </div>
      <div className="col-12 mb-3">
          <label>Status</label>
          <Select
          options={statusOptOrders}
          isDisabled
          onChange={(item) => {
              setDtFormEdit({...dtFormEdit, status: item.value})
          }}
          value={statusOptOrders.find((opt) => opt.value === dtFormEdit.status)}
          required
          />
          </div>
      </div>
    <div className="row">
      <div className="col-12 mb-3">
        <label>Products</label>
        <Select
          options={productOpt}
          isDisabled
          onChange={(item) => {
              const selectedProduct = dataProducts.find((data) => data.id_product === item.value);
          
              setDtFormEdit((prevState) => ({
                ...prevState,
                id_product: item.value,
                total: selectedProduct ? selectedProduct.price : 0,
                qty: 1
              }));
          }}
          value={productOpt.find((opt) => opt.value === dtFormEdit.id_product)}
          required
        />
      </div>
      <div className="col-12 mb-3">
        <label>Orderer</label>
          <Select
          options={usersOpt}
          isDisabled
          onChange={(item) => {
              setDtFormEdit({...dtFormEdit, id_user: item.value})
          }}
          value={usersOpt.find((opt) => opt.value === dtFormEdit.id_user)}
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
          value={dtFormEdit.qty}
          onInput={handleInputChange}
          disabled
          required
        />
      </div>
      <div className="col-6 mb-3">
        <label>Price Totals</label>
        <input
          type="number"
          name="total"
          placeholder="0"
          className="form-control"
          value={dtFormEdit.total}
          disabled
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
          disabled
          value={dtFormEdit.recipient_name}
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
          value={dtFormEdit.location_client}
          disabled
          onInput={handleInputChange}
          required
        />
      </div>
      <div className="col-12 mb-3">
        <label>Payment Method</label>
        <input
          type="text"
          name="payment_method"
          value={dtFormEdit.payment_method}
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
          disabled
          placeholder="Input order note"
          className="form-control"
          value={dtFormEdit.order_note}
          onInput={handleInputChange}
        ></textarea>
      </div>
      <div className="col-12 mb-3">
        <label>Created At</label>
        <input
          type="text"
          name="created_at"
          value={dtFormEdit.created_at}
          disabled
          placeholder="Input payment method"
          className="form-control"
          required
        />
      </div>
    </div>
    </form>
  );
};

export default FormDetailOrders;