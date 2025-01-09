import React, { useEffect, useState, forwardRef } from 'react';
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
import CodeEdit from '../../../be/edit/CodeEdit';
const now = new Date();
const formattedDate = now.getFullYear() + "-" +
  String(now.getMonth() + 1).padStart(2, '0') + "-" +
  String(now.getDate()).padStart(2, '0') + "T" +
  String(now.getHours()).padStart(2, '0') + ":" +
  String(now.getMinutes()).padStart(2, '0');

const FormEditCode = forwardRef(({dataEdit}, ref) => {
  const { productOpt } = ProductsOption();
  const { statusOptPromo } = StatusOption()
  const { usersOpt } = UsersOption();
  const { dataProducts } = ProductsGet();
  const { dataUsers } = Users();
  const { handlePost } = CodePost();
  const { handleEdit } = CodeEdit()
//   console.log(GenerateString(9))

  const [dtFormEdit, setDtFormEdit] = useState({
    code_id: GenerateString(8),
    code_name: '',
    percentage_promo: '',
    status: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setDtFormEdit((prevState) => {
      if (name === "percentage_promo") {
        return {
          ...prevState,
          [name]: value,
          result_price: dtFormEdit.initial_price - ((value / 100) * dtFormEdit.initial_price)
        }
      }
       return {
        ...prevState,
        [name]: value,
      };
    });
  };
  // console.log(formattedDate.slice(0, 10))
   useEffect(() => {
      if (Array.isArray(dataEdit) && dataEdit.length == 1) {
        console.log(dataEdit)
          setDtFormEdit({
              ...dtFormEdit,
              code_id: dataEdit[0].code_id,
              code_name: dataEdit[0].code_name,
              percentage_promo: dataEdit[0].percentage_promo.replace('%', ''),
              status: dataEdit[0].status,
          })
      }
    }, [dataEdit])

  return (
    <form action="" id='formEditCode' ref={ref} onSubmit={async (e) => {
        e.preventDefault()
        const updatePercen = {...dtFormEdit, percentage_promo: dtFormEdit.percentage_promo + "%"}
        setDtFormEdit(updatePercen)

        const res = await handleEdit(updatePercen, dataEdit[0].key)
        if (res) {
            sessionStorage.setItem("success", "Success Edit Code")
            location.reload()
        } else {
            alert('opss, any problem')
        }
    }}>
      <div className="row">
        <div className="col-12 mb-3">
          <label>Code ID</label>
          <input type="text" disabled className='form-control' value={dtFormEdit.code_id} placeholder='Genereate Otomatic' required />
        </div>
        <div className="col-12 mb-3">
          <label>Code Name</label>
          <input type="text" className='form-control' name='code_name' placeholder='Input code name..' value={dtFormEdit.code_name} onInput={handleInputChange} required />
        </div>
        <div className="col-12 mb-3">
          <label>Percentage Promo</label>
          <div className='input-group'>
            <input type="number" value={dtFormEdit.percentage_promo} onInput={handleInputChange} name="percentage_promo" min={1} max={100} className='form-control' placeholder='Input percentage promo (0-100)' required />
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
                setDtFormEdit({...dtFormEdit, status: item.value})
            }}
            value={statusOptPromo.find((opt) => opt.value === dtFormEdit.status)}
            required
            />
        </div>
      </div>
    </form>
  );
})

export default FormEditCode;