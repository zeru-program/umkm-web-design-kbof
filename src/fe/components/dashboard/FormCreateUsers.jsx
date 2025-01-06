import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import ProductsOption from '../../../be/options/ProductsOption';
import ProductsGet from '../../../be/get/ProductsGet';
import OrdersPost from '../../../be/post/OrdersPost';
import GenerateString from '../../../be/GenerateString';
import Users from '../../../be/get/Users';
import UsersOption from '../../../be/options/UsersOption';
import RoleOption from '../../../be/options/RoleOption';
import UsersPost from '../../../be/post/Users';
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
  const { handlePost } = UsersPost();
  const { roleOpt } = RoleOption()
//   console.log(GenerateString(9))

  const [dtFormCreate, setDtFormCreate] = useState({
    id: '',
    email: '',
    phone: '',
    role: '',
    username: '',
    password: '',
    img: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
    status: 'active',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setDtFormCreate((prevState) => {
  
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  

  return (
    <form action="" id='formCreateUser' onSubmit={async (e) => {
        e.preventDefault()
        const res = await handlePost(dtFormCreate)
        if (res) {
            sessionStorage.setItem("success", "Success Create User")
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
            value={dtFormCreate.img}
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
            value={dtFormCreate.username}
            onInput={handleInputChange}
            required
          />
        </div>
        <div className="col-12 mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            autoComplete='true'
            placeholder="Input Password Account"
            className="form-control"
            value={dtFormCreate.password}
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
            value={dtFormCreate.email}
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
            value={dtFormCreate.phone}
            onInput={handleInputChange}
            required
          />
        </div>
        <div className="col-12 mb-3">
          <label>Role</label>
          <Select
            options={roleOpt}
            onChange={(item) => {
                setDtFormCreate((prevState) => ({
                  ...prevState,
                  status: item.value
                }));
            }}
            value={roleOpt.find((opt) => opt.value === dtFormCreate.role)}
            required
          />
        </div>
      </div>
      {/* <button type='submit'>submit</button> */}
    </form>
  );
};

export default FormCreateUsers;