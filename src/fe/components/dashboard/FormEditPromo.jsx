import React, { useEffect, useState, forwardRef } from 'react';
import Select from 'react-select';
import ProductsOption from '../../../be/options/ProductsOption';
import ProductsGet from '../../../be/get/ProductsGet';
import GenerateString from '../../../be/GenerateString';
import OrdersEdit from '../../../be/edit/OrdersEdit';
import StatusOption from '../../../be/options/StatusOption';
import UsersOption from '../../../be/options/UsersOption';
import PromoEdit from '../../../be/edit/PromoEdit';
import ProductsEdit from '../../../be/edit/ProductsEdit';

const FormEditPromo = forwardRef(({ dataEdit }, ref) => {
  const { productOpt } = ProductsOption();
  const { statusOptPromo } = StatusOption();
  const { usersOpt } = UsersOption();
  const { dataProducts } = ProductsGet();
  const { handleEdit } = PromoEdit();
  const { handleEditProduct } = ProductsEdit();
  const [dtFormEdit, setDtFormEdit] = useState({
    id_product: '',
    percentage_promo: '',
    initial_price: '',
    result_price: '',
    periode_start: '',
    periode_end: '',
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

  useEffect(() => {
    if (Array.isArray(dataEdit) && dataEdit.length == 1) {
        setDtFormEdit({
            ...dtFormEdit,
            id_product: dataEdit[0].id_product,
            percentage_promo: dataEdit[0].percentage_promo.replace('%', ''),
            initial_price: dataEdit[0].initial_price,
            result_price: dataEdit[0].result_price,
            periode_start: dataEdit[0].periode_start,
            periode_end: dataEdit[0].periode_end,
            status: dataEdit[0].status,
        })
    }
  }, [dataEdit])
  

  return (
    <form action="" id='formEditPromo' ref={ref} onSubmit={async (e) => {
        e.preventDefault()
        const updatePercen = {...dtFormEdit, percentage_promo: dtFormEdit.percentage_promo + "%"}
        setDtFormEdit(updatePercen)
        const find = dataProducts.find((data) => data.id_product === dtFormEdit.id_product);

        if (dtFormEdit.status === "active") {
          const dataEditIsPromo = {
            is_discount: true
          }
          handleEditProduct(dataEditIsPromo, find.key)
        } else if (dtFormEdit.status === "draft") {
          const dataEditIsPromo = {
            is_discount: false
          }
          handleEditProduct(dataEditIsPromo, find.key)
        }

        const res = await handleEdit(updatePercen, dataEdit[0].key)
        if (res) {
            sessionStorage.setItem("success", "Success Edit Promo")
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
          
              setDtFormEdit((prevState) => ({
                ...prevState,
                id_product: item.value,
                initial_price: selectedProduct ? selectedProduct.price : 0,
                percentage_promo: 1
              }));
          }}
          isDisabled
          value={productOpt.find((opt) => opt.value === dtFormEdit.id_product)}
          required
        />
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
      <div className="col-6 mb-3">
        <label>Initial Price</label>
        <input
          type="number"
          name="initial_price"
          disabled
          className="form-control"
          value={dtFormEdit.initial_price}
          onInput={handleInputChange}
          required
        />
      </div>
      <div className="col-6 mb-3">
        <label>Result Price</label>
        <input
          type="number"
          name="result_price"
          placeholder="0"
          className="form-control"
          value={dtFormEdit.result_price}
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
          value={dtFormEdit.periode_start}
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
          value={dtFormEdit.periode_end}
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
            setDtFormEdit({...dtFormEdit, status: item.value})
        }}
        value={statusOptPromo.find((opt) => opt.value === dtFormEdit.status)}
        required
        />
      </div>
    </div>
    </form>
  );
});

export default FormEditPromo;