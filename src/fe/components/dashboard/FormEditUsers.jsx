import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import ProductsOption from '../../../be/options/ProductsOption';
import ProductsGet from '../../../be/get/ProductsGet';
import GenerateString from '../../../be/GenerateString';
import OrdersEdit from '../../../be/edit/OrdersEdit';
import StatusOption from '../../../be/options/StatusOption';
import UsersOption from '../../../be/options/UsersOption';
import RoleOption from '../../../be/options/RoleOption';
import UsersEdit from '../../../be/edit/UsersEdit';
import TrueFalse from '../../../be/options/TrueFalse';

const FormEditUsers = ({dataEdit}) => {
  const { productOpt } = ProductsOption();
  const { statusOptOrders } = StatusOption();
  const { usersOpt } = UsersOption();
  const { dataProducts } = ProductsGet();
  const { handleEdit } = UsersEdit();
  const { roleOpt } = RoleOption()
  const { maleFemale } = TrueFalse()
  const [dtFormEdit, setDtFormEdit] = useState({
    id: '',
    email: '',
    phone: '',
    role: '',
    gender: '',
    username: '',
    password: '',
    img: '',
    status: 'active',
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
      console.log(dataEdit)
        setDtFormEdit({
            ...dtFormEdit,
            id: dataEdit[0].id_user,
            email: dataEdit[0].email,
            phone: dataEdit[0].phone,
            role: dataEdit[0].role,
            gender: dataEdit[0].gender,
            img: dataEdit[0].img,
            username: dataEdit[0].username,
            password: dataEdit[0].password,
            status: dataEdit[0].status,
        })
    }
  }, [dataEdit])
  

  return (
    <form action="" id='formEditUser' onSubmit={async (e) => {
        e.preventDefault()
        const res = await handleEdit(dtFormEdit, dataEdit[0].key)
        if (res) {
            sessionStorage.setItem("success", "Success Edit User")
            location.reload()
        } else {
            alert('opss, any problem')
        }
    }}>
    <div className="row">
      <div className="col-12 mb-3">
        <label>Img</label>
        <input
          type="text"
          name="img"
          placeholder="The image is not cahnged"
          className="form-control"
          value={dtFormEdit.img}
          disabled
          onInput={handleInputChange}
          required
        />
      </div>
      <div className="col-12 mb-3">
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Input user name"
          className="form-control"
          value={dtFormEdit.username}
          onInput={handleInputChange}
          required
        />
      </div>
      <div className="col-12 mb-3">
        <label>Password</label>
        <input
          type="password"
          autoComplete='true'
          disabled
          className="form-control"
          value={dtFormEdit.password}
          onInput={handleInputChange}
          required
        />
      </div>
      <div className="col-12 mb-3">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Input Email Account"
          className="form-control"
          value={dtFormEdit.email}
          onInput={handleInputChange}
          required
        />
      </div>
      <div className="col-12 mb-3">
        <label>Phone</label>
        <input
          type="number"
          name="phone"
          placeholder="Input Phone Account"
          className="form-control"
          value={dtFormEdit.phone}
          onInput={handleInputChange}
          required
        />
      </div>
        <div className="col-12 mb-3">
          <label>Gender</label>
          <Select
            options={maleFemale}
            onChange={(item) => {
                setDtFormEdit((prevState) => ({
                  ...prevState,
                  gender: item.value
                }));
            }}
            value={maleFemale.find((opt) => opt.value === dtFormEdit.gender)}
            required
          />
        </div>
      <div className="col-12 mb-3">
        <label>Role</label>
        <Select
          options={roleOpt}
          onChange={(item) => {
              setDtFormEdit((prevState) => ({
                ...prevState,
                role: item.value
              }));
          }}
          value={roleOpt.find((opt) => opt.value === dtFormEdit.role)}
          required
        />
      </div>
    </div>
    </form>
  );
};

export default FormEditUsers;