import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import ProductsOption from '../../../be/options/ProductsOption';
import ProductsGet from '../../../be/get/ProductsGet';
import GenerateString from '../../../be/GenerateString';
import OrdersEdit from '../../../be/edit/OrdersEdit';
import StatusOption from '../../../be/options/StatusOption';
import UsersOption from '../../../be/options/UsersOption';

const FormEditOrders = ({dataEdit}) => {
  const { productOpt } = ProductsOption();
  const { statusOptOrders } = StatusOption();
  const { usersOpt } = UsersOption();
  const { dataProducts } = ProductsGet();
  const { handleEdit } = OrdersEdit();
  const [statusDisabled, setStatusDisabled] = useState(false)
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
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDtFormEdit((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (Array.isArray(dataEdit) && dataEdit.length == 1) {
      // console.log(dataEdit)
        setDtFormEdit({
            ...dtFormEdit,
            id_product: dataEdit[0].productID,
            id_order: dataEdit[0].orderID,
            id_user: dataEdit[0].id_user,
            location_client: dataEdit[0].location_client,
            recipient_name: dataEdit[0].recipient_name,
            payment_method: dataEdit[0].payment_method,
            order_note: dataEdit[0].order_note,
            qty: dataEdit[0].qty,
            status: dataEdit[0].status,
            token: dataEdit[0].token,
            total: dataEdit[0].total,
        })
        setStatusDisabled(dataEdit[0].status === "success" ? true : false)
    }
  }, [dataEdit])
  

  return (
    <form action="" id='formEditOrder' onSubmit={async (e) => {
        e.preventDefault()
        const res = await handleEdit(dtFormEdit, dataEdit[0].key)
        if (res) {
            sessionStorage.setItem("success", "Success Edit Orders")
            location.reload()
        } else {
            alert('opss, any problem')
        }
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
            isDisabled={statusDisabled}
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
            required
          />
          <span className='text-danger text-nowrap'>Please input the appropriate quantity and price</span>
        </div>
        <div className="col-6 mb-3">
          <label>Price Totals</label>
          <input
            type="number"
            name="total"
            placeholder="0"
            className="form-control"
            value={dtFormEdit.total}
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
            placeholder="Input order note"
            className="form-control"
            value={dtFormEdit.order_note}
            onInput={handleInputChange}
          ></textarea>
        </div>
      </div>
    </form>
  );
};

export default FormEditOrders;