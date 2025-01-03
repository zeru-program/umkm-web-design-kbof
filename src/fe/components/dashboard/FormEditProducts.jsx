import React, { useState, useEffect, forwardRef } from 'react';
import Toast from '../Toast';
import Swal from 'sweetalert2';
import { supabase } from '../../../be/supabaseConfig';
import Select from 'react-select';
import ProductsOption from '../../../be/options/ProductsOption';
import GenerateString from '../../../be/GenerateString';
import TrueFalse from '../../../be/options/TrueFalse';
import StatusOption from '../../../be/options/StatusOption';
import Rating from '../../../be/options/Rating';
import ProductsEdit from '../../../be/edit/ProductsEdit';

const FormEditProducts = forwardRef(({ dataEdit }, ref) => {
  const { trueFalse } = TrueFalse();
  const { statusOptProducts } = StatusOption()
  const { ratingOpt } = Rating()
  const { handleEdit } = ProductsEdit();
  const [fileEdit, setFileEdit] = useState(null)
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
    if (Array.isArray(dataEdit) && dataEdit.length === 1) {
        setDtFormEdit({
          ...dtFormEdit,
          id_product: dataEdit[0].productID || GenerateString(8), // Gunakan data atau default
          name: dataEdit[0].productName || '',
          description: dataEdit[0].description || '',
          img: dataEdit[0].img || '',
          is_discount: dataEdit[0].promo || false,
          is_popular: dataEdit[0].popular || false,
          price: dataEdit[0].price || '',
          type: dataEdit[0].type || '',
          rating: dataEdit[0].rating || 1,
          spesification: {
            weight: dataEdit[0].spesification?.weight || '',
            is_fresh: dataEdit[0].spesification?.is_fresh || true,
            height: dataEdit[0].spesification?.height || '',
          },
          status: dataEdit[0].status || 'draft',
        });
      }      
    }, [dataEdit])

  return (
    <form action="" id='formEditProduct' ref={ref} onSubmit={async (e) => {
        e.preventDefault()
        if (!dtFormEdit.img) return Toast.fire({
          icon: "error",
          title: "Please Input Image Product!",
        });
        var resPath = dtFormEdit.img || ""
        if (fileEdit) {
          try {
            if (!dtFormEdit.img.toLowerCase().includes("default")) {
              const oldFilePath = dataEdit[0].img.replace(
                `${
                  import.meta.env.VITE_SUPABASE_URL
                }/storage/v1/object/public/products/`,
                ""
              );
              const { error } = await supabase.storage
              .from("products")
              .remove([oldFilePath]); // Hapus file lama
              
              if (error) {
                throw new Error("Failed to delete old image.");
              }
            }
            const extension = fileEdit.name.split(".").pop(); // Extracts extension (e.g., "jpg" or "png")
            const filePath = `product-${Date.now()}.${extension}`;
            const { data, error } = await supabase.storage
              .from("products")
              .upload(filePath, fileEdit, {
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
            return
          }
        }

        if (!dataEdit[0].img.toLowerCase().includes("default") && dtFormEdit.img === "https://speptdrwxksyzfydiuzf.supabase.co/storage/v1/object/public/products/default-plant2.jpg") {
          const oldFilePath = dataEdit[0].img.replace(
            `${
              import.meta.env.VITE_SUPABASE_URL
            }/storage/v1/object/public/products/`,
            ""
          );
          const { error } = await supabase.storage
          .from("products")
          .remove([oldFilePath]); // Hapus file lama
          
          if (error) {
            throw new Error("Failed to delete old image.");
          }
        }
        
        const updatedForm = { ...dtFormEdit, img: resPath };
        setDtFormEdit(updatedForm)
        const res = await handleEdit(updatedForm, dataEdit[0].key)
        if (res) {
            sessionStorage.setItem("success", "Success Edit Products")
            location.reload()
        } else {
            alert('opss, any problem')
        }
    }}>
      <div className="row">
        <div className="col-12 mb-3">
            <div className='w-100 flex-column d-flex align-items-center gap-2'>
                <img src={dtFormEdit.img || "https://via.placeholder.com/150"} className='img-thumbnail img-detail' alt="" />
                <div className='position-relative'>
                    <button className='btn bg-primary text-light'>Upload Image Product</button>
                    <input type="file" accept='image/*' onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const fileURL = URL.createObjectURL(file); // Membuat URL lokal untuk pratinjau
                          setFileEdit(file);
                          setDtFormEdit((prev) => ({ ...prev, img: fileURL })); // Simpan URL ke state
                        }
                    }} 
                      className='position-absolute top-0 opacity-0 start-0 z-3 w-100 h-100' style={{cursor: "pointer"}} />
                </div>
                <span className='text-decoration-underline' style={{cursor: "pointer"}} onClick={() => setDtFormEdit({...dtFormEdit, img: "https://speptdrwxksyzfydiuzf.supabase.co/storage/v1/object/public/products/default-plant2.jpg"})}>Or use default product img</span>
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
          <input type="text" name='name' value={dtFormEdit.name} onInput={handleInputChange} placeholder='Input Product Name..' className="form-control" required />
        </div>
      </div>
      <div className="row">
        <div className="col-6 mb-3">
          <label>Product Type</label>
          <input type="text" name='type' value={dtFormEdit.type} onInput={handleInputChange} placeholder='Input Product Type.. (optional)' className="form-control" />
        </div>
        <div className="col-6 mb-3">
          <label>Product Price</label>
          <input type="number" name='price' value={dtFormEdit.price} onInput={handleInputChange} placeholder='Input Product Price Per Unit..' className="form-control" required />
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
            <input type="number" name='weight' value={dtFormEdit.spesification.weight} onInput={handleInputChange} placeholder='Ex.. 4Kg' className="form-control" required />
            <span className="input-group-text">Kg</span>
          </div>
        </div>
        <div className="col-6 mb-3">
          <label>Height</label>
          <div className="input-group">
            <input type="number" name='height' value={dtFormEdit.spesification.height} onInput={handleInputChange} placeholder='Ex.. 4cm' className="form-control" required />
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
            value={trueFalse.find((opt) => opt.value === dtFormEdit.spesification.is_fresh)}
            required
          />
        </div>
      </div>
    </form>
  );
});

export default FormEditProducts;