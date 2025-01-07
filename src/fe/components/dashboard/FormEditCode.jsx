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
import CodePost from '../../../be/post/CodePost';
const now = new Date();
const formattedDate = now.getFullYear() + "-" +
  String(now.getMonth() + 1).padStart(2, '0') + "-" +
  String(now.getDate()).padStart(2, '0') + "T" +
  String(now.getHours()).padStart(2, '0') + ":" +
  String(now.getMinutes()).padStart(2, '0');

const FormEditCode = () => {
  const { productOpt } = ProductsOption();
  const { statusOptPromo } = StatusOption()
  const { usersOpt } = UsersOption();
  const { dataProducts } = ProductsGet();
  const { dataUsers } = Users();
  const { handlePost } = CodePost();
  const { handleEdit } = ProductsEdit()
//   console.log(GenerateString(9))

  const [dtFormCreate, setDtFormCreate] = useState({
    code_id: GenerateString(8),
    code_name: '',
    percentage_promo: '',
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
    <form action="" id='formCreateCode' onSubmit={async (e) => {
        e.preventDefault()
        const updatePercen = {...dtFormCreate, percentage_promo: dtFormCreate.percentage_promo + "%"}
        setDtFormCreate(updatePercen)

        const res = await handlePost(updatePercen)
        if (res) {
            sessionStorage.setItem("success", "Success Create Code")
            location.reload()
        } else {
            alert('opss, any problem')
        }
    }}>
      <div className="row">
        <div className="col-12 mb-3">
          <label>Code ID</label>
          <input type="number" disabled className='form-control' placeholder='Genereate Otomatic' required />
        </div>
        <div className="col-12 mb-3">
          <label>Code Name</label>
          <input type="text" className='form-control' name='code_name' placeholder='Input code name..' value={dtFormCreate.code_name} onInput={handleInputChange} required />
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

export default FormEditCode;