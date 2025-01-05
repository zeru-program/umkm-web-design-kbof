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
import BlogsEdit from '../../../be/edit/BlogsEdit';

const FormEditBlogs = forwardRef(({ dataEdit }, ref) => {
  const { trueFalse } = TrueFalse();
  const { statusOptBlogs } = StatusOption()
  const { ratingOpt } = Rating()
  const { handleEdit } = BlogsEdit();
  const [fileEdit, setFileEdit] = useState(null)
  const [dtFormEdit, setDtFormEdit] = useState({
    id: "",
    title: '',
    short_desc: '',
    category: '',
    content: '',
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
      // console.log(dataEdit)
        setDtFormEdit({
          ...dtFormEdit,
          id: dataEdit[0].blogID || GenerateString(8), // Gunakan data atau default
          title: dataEdit[0].blogTitle || '',
          img: dataEdit[0].img || '',
          short_desc: dataEdit[0].blogShortDesc || '',
          category: dataEdit[0].category || '',
          content: dataEdit[0].content || '',
          status: dataEdit[0].status || 'draft',
        });
      }      
    }, [dataEdit])

  return (
    <form action="" id='formEditProduct' ref={ref} onSubmit={async (e) => {
        e.preventDefault()
        if (!dtFormEdit.img) return Toast.fire({
          icon: "error",
          title: "Please Input Thumbnail!",
        });
        var resPath = dtFormEdit.img || ""
        if (fileEdit) {
          try {
            if (!dtFormEdit.img.toLowerCase().includes("news/800a/2020/plant")) {
              const oldFilePath = dataEdit[0].img.replace(
                `${
                  import.meta.env.VITE_SUPABASE_URL
                }/storage/v1/object/public/educations/`,
                ""
              );
              const { error } = await supabase.storage
              .from("educations")
              .remove([oldFilePath]); // Hapus file lama
              
              if (error) {
                throw new Error("Failed to delete old image.");
              }

              // console.log(oldFilePath)
              // return
            }
            const extension = fileEdit.name.split(".").pop(); // Extracts extension (e.g., "jpg" or "png")
            const filePath = `education-${Date.now()}.${extension}`;
            const { data, error } = await supabase.storage
              .from("educations")
              .upload(filePath, fileEdit, {
                cacheControl: "3600", // Cache file di browser selama 1 jam
                upsert: false, // Jangan timpa file jika sudah ada
              });
            resPath =
              import.meta.env.VITE_SUPABASE_URL +
              "/storage/v1/object/public/educations/" +
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

        if (!dataEdit[0].img.toLowerCase().includes("news/800a/2020/plant") && dtFormEdit.img === "https://scx1.b-cdn.net/csz/news/800a/2020/plant.jpg") {
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
            sessionStorage.setItem("success", "Success Edit Education")
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
                    <button className='btn bg-primary text-light'>Upload Thumbnail</button>
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
                <span className='text-decoration-underline' style={{cursor: "pointer"}} onClick={() => setDtFormEdit({...dtFormEdit, img: "https://scx1.b-cdn.net/csz/news/800a/2020/plant.jpg"})}>Or use default thumbnail</span>
            </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-3">
          <label>Blog ID</label>
          <input type="text" disabled placeholder='Generate Otomatic..' value={dtFormEdit.id} className="form-control" required />
        </div>
        <div className="col-12 mb-3">
          <label>Blog Title</label>
          <input type="text" name='title' value={dtFormEdit.title} onInput={handleInputChange} placeholder='Input Blog Title..' className="form-control" required />
        </div>
      </div>
      <div className="row">
        <div className="col-6 mb-3">
          <label>Blog Short Description</label>
          <input type="text" name='short_desc' value={dtFormEdit.short_desc} onInput={handleInputChange} placeholder='Max 200 length..' maxLength={200} required className="form-control" />
        </div>
        <div className="col-6 mb-3">
          <label>Blog Category</label>
          <input type="text" name='category' value={dtFormEdit.category} onInput={handleInputChange} placeholder='Input Blog category..' className="form-control" required />
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-3">
          <label>Content</label>
          <textarea
            name="content"
            placeholder="Input Content Blog here.."
            // maxLength={250}
            rows={10}
            className="form-control"
            value={dtFormEdit.content}
            onInput={handleInputChange}
          >{dtFormEdit.content}</textarea>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-3">
          <label>Status</label>
          <Select
            options={statusOptBlogs}
            onChange={(item) => {
                setDtFormEdit((prevState) => ({
                  ...prevState,
                  status: item.value
                }));
            }}
            value={statusOptBlogs.find((opt) => opt.value === dtFormEdit.status)}
            required
          />
        </div>
      </div>
    </form>
  );
});

export default FormEditBlogs;