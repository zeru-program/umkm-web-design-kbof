import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import ProductsOption from '../../../be/options/ProductsOption';
import GenerateString from '../../../be/GenerateString';
import TrueFalse from '../../../be/options/TrueFalse';
import StatusOption from '../../../be/options/StatusOption';
import Rating from '../../../be/options/Rating';
import ProductsEdit from '../../../be/edit/ProductsEdit';

const FormDetailProducts = ({dataDetail}) => {
  const { productOpt } = ProductsOption();
  const { trueFalse } = TrueFalse();
  const { statusOptProducts } = StatusOption()
  const { ratingOpt } = Rating()
  const { handleEdit } = ProductsEdit();
  const [dtFormEdit, setDtFormEdit] = useState({
    id_product: GenerateString(8),
    name: '',
    description: '',
    img: '',
    is_discount: false,
    is_popular: false,
    price: '',
    type: '',
    rating: 1,
    spesification: {
        weight: '',
        is_fresh: true,
        height: '',
    },
    status: 'draft',
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
          id_product: dataDetail[0].productID || GenerateString(8), // Gunakan data atau default
          name: dataDetail[0].productName || '',
          description: dataDetail[0].description || '',
          img: dataDetail[0].img || '',
          is_discount: dataDetail[0].promo || false,
          is_popular: dataDetail[0].popular || false,
          price: dataDetail[0].price || '',
          type: dataDetail[0].type || '',
          rating: dataDetail[0].rating || 1,
          spesification: {
            weight: dataDetail[0].spesification?.weight || '',
            is_fresh: dataDetail[0].spesification?.is_fresh || true,
            height: dataDetail[0].spesification?.height || '',
          },
          status: dataDetail[0].status || 'draft',
        });
      }      
    }, [dataDetail])

  return (
    <form action="" id='formEditProduct' onSubmit={async (e) => {
        e.preventDefault()
    }}>
      <div className="row">
        <div className="col-12 mb-3">
          <div className='w-100 d-flex justify-content-center'>
            <img src={dtFormEdit.img} className='img-thumbnail img-detail' alt="" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-3">
          <label>Product ID</label>
          <input type="text" disabled value={dtFormEdit.id_product} placeholder='Generate Otomatic..' className="form-control" required />
        </div>
        <div className="col-12 mb-3">
          <label>Product Name</label>
          <input type="text" name='name' disabled value={dtFormEdit.name} onInput={handleInputChange} placeholder='Input Product Name..' className="form-control" required />
        </div>
      </div>
      <div className="row">
        <div className="col-6 mb-3">
          <label>Product Type</label>
          <input type="text" name='type' disabled value={dtFormEdit.type} onInput={handleInputChange} placeholder='Input Product Type.. (optional)' className="form-control" />
        </div>
        <div className="col-6 mb-3">
          <label>Product Price</label>
          <input type="number" name='price' disabled value={dtFormEdit.price} onInput={handleInputChange} placeholder='Input Product Price Per Unit..' className="form-control" required />
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-3">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Input Description Product.."
            maxLength={250}
            className="form-control"
            value={dtFormEdit.description}
            onInput={handleInputChange}
            disabled
          ></textarea>
        </div>
      </div>
      <div className="row">
        <div className="col-6 mb-3">
          <label>Product Is Popular</label>
          <Select
            options={trueFalse}
            onChange={(item) => {
                setDtFormEdit((prevState) => ({
                  ...prevState,
                  is_popular: item.value
                }));
            }}
            isDisabled
            value={trueFalse.find((opt) => opt.value === dtFormEdit.is_popular)}
            required
          />
        </div>
        <div className="col-6 mb-3">
          <label>Product Is Promo</label>
          <Select
            options={trueFalse}
            onChange={(item) => {
                setDtFormEdit((prevState) => ({
                  ...prevState,
                  is_discount: item.value
                }));
            }}
            isDisabled
            value={trueFalse.find((opt) => opt.value === dtFormEdit.is_discount)}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6 mb-3">
          <label>Status</label>
          <Select
            options={statusOptProducts}
            onChange={(item) => {
                setDtFormEdit((prevState) => ({
                  ...prevState,
                  status: item.value
                }));
            }}
            isDisabled
            value={statusOptProducts.find((opt) => opt.value === dtFormEdit.status)}
            required
          />
        </div>
        <div className="col-6 mb-3">
          <label>Rating</label>
          <Select
            options={ratingOpt}
            onChange={(item) => {
                setDtFormEdit((prevState) => ({
                  ...prevState,
                  rating: item.value
                }));
            }}
            isDisabled
            value={ratingOpt.find((opt) => opt.value === dtFormEdit.rating)}
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-2 fw-bold mt-2">
          <label>Spesification</label>
        </div>
      </div>
      <div className="row">
        <div className="col-6 mb-3">
          <label>Weight</label>
          <div className="input-group">
            <input type="number" disabled name='weight' value={dtFormEdit.spesification.weight} onInput={handleInputChange} placeholder='Ex.. 4Kg' className="form-control" required />
            <span className="input-group-text">Kg</span>
          </div>
        </div>
        <div className="col-6 mb-3">
          <label>Height</label>
          <div className="input-group">
            <input type="number" disabled name='height' value={dtFormEdit.spesification.height} onInput={handleInputChange} placeholder='Ex.. 4cm' className="form-control" required />
            <span className="input-group-text">Cm</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-3">
          <label>Is Fresh</label>
          <Select
            options={trueFalse}
            onChange={(item) => {
                setDtFormEdit((prevState) => ({
                  ...prevState,
                  spesification: {
                    ...prevState.spesification,
                    is_fresh: item.value
                  }
                }));
            }}
            isDisabled
            value={trueFalse.find((opt) => opt.value === dtFormEdit.spesification.is_fresh)}
            required
          />
        </div>
      </div>
    </form>
  );
};

export default FormDetailProducts;