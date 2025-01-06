import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import ProductsOption from '../../../be/options/ProductsOption';
import ProductsGet from '../../../be/get/ProductsGet';
import OrdersPost from '../../../be/post/OrdersPost';
import GenerateString from '../../../be/GenerateString';
import Users from '../../../be/get/Users';
import UsersOption from '../../../be/options/UsersOption';
import PromoPost from '../../../be/post/PromoPost';
import StatusOption from '../../../be/options/StatusOption';
import ProductsEdit from '../../../be/edit/ProductsEdit';
const now = new Date();
const formattedDate = now.getFullYear() + "-" +
  String(now.getMonth() + 1).padStart(2, '0') + "-" +
  String(now.getDate()).padStart(2, '0') + "T" +
  String(now.getHours()).padStart(2, '0') + ":" +
  String(now.getMinutes()).padStart(2, '0');

const FormCreatePromo = () => {
  const { productOpt } = ProductsOption();
  const { statusOptPromo } = StatusOption()
  const { usersOpt } = UsersOption();
  const { dataProducts } = ProductsGet();
  const { dataUsers } = Users();
  const { handlePost } = PromoPost();
  const { handleEdit } = ProductsEdit()
//   console.log(GenerateString(9))

  const [dtFormCreate, setDtFormCreate] = useState({
    id_product: '',
    percentage_promo: '',
    initial_price: '',
    result_price: '',
    periode_start: '',
    periode_end: '',
    status: 'draft',
    create_at: formattedDate,
    create_by: sessionStorage.getItem('username'),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setDtFormCreate((prevState) => {
      if (name === "percentage_promo") {
        return {
          ...prevState,
          [name]: value,
          result_price: dtFormCreate.initial_price - ((value / 100) * dtFormCreate.initial_price)
        }
      }
       return {
        ...prevState,
        [name]: value,
      };
    });
  };
  // console.log(formattedDate.slice(0, 10))
  

  return (
    <form action="" id='formCreatePromo' onSubmit={async (e) => {
        e.preventDefault()
        const updatePercen = {...dtFormCreate, percentage_promo: dtFormCreate.percentage_promo + "%"}
        setDtFormCreate(updatePercen)

        if (dtFormCreate.status === "active") {
          const dataEditIsPromo = {
            is_discount: true
          }
          const find = dataProducts.find((data) => data.id_product === dtFormCreate.id_product);
          handleEdit(dataEditIsPromo, find.key)
        }

        const res = await handlePost(updatePercen)
        if (res) {
            sessionStorage.setItem("success", "Success Create Promo")
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
            onChange={(item) => {
                const selectedProduct = dataProducts.find((data) => data.id_product === item.value);
            
                setDtFormCreate((prevState) => ({
                  ...prevState,
                  id_product: item.value,
                  initial_price: selectedProduct ? selectedProduct.price : 0,
                  percentage_promo: 1
                }));
            }}
            value={productOpt.find((opt) => opt.value === dtFormCreate.id_product)}
            required
          />
        </div>
        <div className="col-12 mb-3">
          <label>Percentage Promo</label>
          <div className='input-group'>
            <input type="number" value={dtFormCreate.percentage_promo} onInput={handleInputChange} name="percentage_promo" min={1} max={100} className='form-control' placeholder='Input percentage promo (0-100)' required />
            <span className="input-group-text">%</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6 mb-3">
          <label>Initial Price</label>
          <input
            type="number"
            name="initial_price"
            disabled
            className="form-control"
            value={dtFormCreate.initial_price}
            onInput={handleInputChange}
            required
          />
        </div>
        <div className="col-6 mb-3">
          <label>Result Price</label>
          <input
            type="number"
            name="result_price"
            disabled
            placeholder="0"
            className="form-control"
            value={dtFormCreate.result_price}
            onInput={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6 mb-3">
          <label>Periode Start</label>
          <input
            type="date"
            name="periode_start"
            className="form-control"
            value={dtFormCreate.periode_start}
            onInput={handleInputChange}
            required
          />
        </div>
        <div className="col-6 mb-3">
          <label>Periode End</label>
          <input
            type="date"
            name="periode_end"
            className="form-control"
            value={dtFormCreate.periode_end}
            onInput={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-3">
          <label>Status</label>
            <Select
            options={statusOptPromo}
            onChange={(item) => {
                setDtFormCreate({...dtFormCreate, status: item.value})
            }}
            value={statusOptPromo.find((opt) => opt.value === dtFormCreate.status)}
            required
            />
        </div>
      </div>
    </form>
  );
};

export default FormCreatePromo;