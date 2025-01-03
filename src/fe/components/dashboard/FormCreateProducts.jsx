import React, { useState } from 'react';
import Select from 'react-select';
import Toast from '../Toast';
import { supabase } from '../../../be/supabaseConfig';
import ProductsOption from '../../../be/options/ProductsOption';
import GenerateString from '../../../be/GenerateString';
import ProductsPost from '../../../be/post/ProductsPost';
import TrueFalse from '../../../be/options/TrueFalse';
import StatusOption from '../../../be/options/StatusOption';
import Rating from '../../../be/options/Rating';

const FormCreateProducts = () => {
  const { productOpt } = ProductsOption();
  const { trueFalse } = TrueFalse();
  const { statusOptProducts } = StatusOption()
  const { ratingOpt } = Rating()
  const { handlePost } = ProductsPost();
  const [fileCreate, setFileCreate] = useState(null)
  const [dtFormCreate, setDtFormCreate] = useState({
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
    created_at: new Date().toISOString().slice(0, 16),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDtFormCreate((prevState) => {
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
  

  return (
    <form action="" id='formCreateProduct' onSubmit={async (e) => {
        e.preventDefault()
        if (!dtFormCreate.img) return Toast.fire({
          icon: "error",
          title: "Please Input Image Product!",
        });
        var resPath = dtFormCreate.img || ""
        if (fileCreate) {
          try {
            const extension = fileCreate.name.split(".").pop(); // Extracts extension (e.g., "jpg" or "png")
            const filePath = `product-${Date.now()}.${extension}`;
            const { data, error } = await supabase.storage
              .from("products")
              .upload(filePath, fileCreate, {
                cacheControl: "3600", // Cache file di browser selama 1 jam
                upsert: false, // Jangan timpa file jika sudah ada
              });
            resPath =
              import.meta.env.VITE_SUPABASE_URL +
              "/storage/v1/object/public/products/" +
              filePath;
    
            if (error) {
              throw error;
            }

          } catch (error) {
            Toast.fire({
              icon: "error",
              title: "An error while uploading a file, check the console",
            });
            console.log(error.message);
          }
        }
        
        const updatedForm = { ...dtFormCreate, img: resPath };
        setDtFormCreate(updatedForm)
        const res = await handlePost(updatedForm)
        if (res) {
            sessionStorage.setItem("success", "Success Create Products")
            location.reload()
        } else {
            alert('opss, any problem')
        }
    }}>
      <div className="row">
        <div className="col-12 mb-3">
            <div className='w-100 flex-column d-flex align-items-center gap-2'>
                <img src={dtFormCreate.img || "https://via.placeholder.com/150"} className='img-thumbnail img-detail' alt="" />
                <div className='position-relative'>
                    <button className='btn bg-primary text-light'>Upload Image Product</button>
                    <input type="file" accept='image/*' onChange={(e) => {
                         const file = e.target.files[0];
                         if (file) {
                           const fileURL = URL.createObjectURL(file); // Membuat URL lokal untuk pratinjau
                           setFileCreate(file);
                           setDtFormCreate((prev) => ({ ...prev, img: fileURL })); // Simpan URL ke state
                         }
                     }} 
                      className='position-absolute top-0 opacity-0 start-0 z-3 w-100 h-100' style={{cursor: "pointer"}} />
                </div>
                <span className='text-decoration-underline' style={{cursor: "pointer"}} onClick={() => setDtFormCreate({...dtFormCreate, img: "https://speptdrwxksyzfydiuzf.supabase.co/storage/v1/object/public/products/plants3.jpg"})}>Or use default product img</span>
            </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-3">
          <label>Product ID</label>
          <input type="text" disabled placeholder='Generate Otomatic..' className="form-control" required />
        </div>
        <div className="col-12 mb-3">
          <label>Product Name</label>
          <input type="text" name='name' value={dtFormCreate.name} onInput={handleInputChange} placeholder='Input Product Name..' className="form-control" required />
        </div>
      </div>
      <div className="row">
        <div className="col-6 mb-3">
          <label>Product Type</label>
          <input type="text" name='type' value={dtFormCreate.type} onInput={handleInputChange} placeholder='Input Product Type.. (optional)' className="form-control" />
        </div>
        <div className="col-6 mb-3">
          <label>Product Price</label>
          <input type="number" name='price' value={dtFormCreate.price} onInput={handleInputChange} placeholder='Input Product Price Per Unit..' className="form-control" required />
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
            value={dtFormCreate.description}
            onInput={handleInputChange}
          ></textarea>
        </div>
      </div>
      <div className="row">
        <div className="col-6 mb-3">
          <label>Product Is Popular</label>
          <Select
            options={trueFalse}
            onChange={(item) => {
                setDtFormCreate((prevState) => ({
                  ...prevState,
                  is_popular: item.value
                }));
            }}
            value={trueFalse.find((opt) => opt.value === dtFormCreate.is_popular)}
            required
          />
        </div>
        <div className="col-6 mb-3">
          <label>Product Is Promo</label>
          <Select
            options={trueFalse}
            onChange={(item) => {
                setDtFormCreate((prevState) => ({
                  ...prevState,
                  is_discount: item.value
                }));
            }}
            value={trueFalse.find((opt) => opt.value === dtFormCreate.is_discount)}
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
                setDtFormCreate((prevState) => ({
                  ...prevState,
                  status: item.value
                }));
            }}
            value={statusOptProducts.find((opt) => opt.value === dtFormCreate.status)}
            required
          />
        </div>
        <div className="col-6 mb-3">
          <label>Rating</label>
          <Select
            options={ratingOpt}
            onChange={(item) => {
                setDtFormCreate((prevState) => ({
                  ...prevState,
                  rating: item.value
                }));
            }}
            value={ratingOpt.find((opt) => opt.value === dtFormCreate.rating)}
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
            <input type="number" name='weight' value={dtFormCreate.spesification.weight} onInput={handleInputChange} placeholder='Ex.. 4Kg' className="form-control" required />
            <span className="input-group-text">Kg</span>
          </div>
        </div>
        <div className="col-6 mb-3">
          <label>Height</label>
          <div className="input-group">
            <input type="number" name='height' value={dtFormCreate.spesification.height} onInput={handleInputChange} placeholder='Ex.. 4cm' className="form-control" required />
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
                setDtFormCreate((prevState) => ({
                  ...prevState,
                  spesification: {
                    ...prevState.spesification,
                    is_fresh: item.value
                  }
                }));
            }}
            value={trueFalse.find((opt) => opt.value === dtFormCreate.spesification.is_fresh)}
            required
          />
        </div>
      </div>
    </form>
  );
};

export default FormCreateProducts;