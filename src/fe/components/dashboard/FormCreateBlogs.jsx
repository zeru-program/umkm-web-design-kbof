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
import BlogPost from '../../../be/post/BlogsPost';
const now = new Date();
const formattedDate = now.getFullYear() + "-" +
  String(now.getMonth() + 1).padStart(2, '0') + "-" +
  String(now.getDate()).padStart(2, '0') + "T" +
  String(now.getHours()).padStart(2, '0') + ":" +
  String(now.getMinutes()).padStart(2, '0');

const FormCreateBlogs = () => {
  const { trueFalse } = TrueFalse();
  const { statusOptBlogs } = StatusOption()
  const { ratingOpt } = Rating()
  const { handlePost } = BlogPost();
  const [fileCreate, setFileCreate] = useState(null)
  const [dtFormCreate, setDtFormCreate] = useState({
    id: GenerateString(8),
    title: '',
    short_desc: '',
    category: '',
    content: '',
    status: 'draft',
    created_by: sessionStorage.getItem('id'),
    created_at: formattedDate,
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
          title: "Please Input Thumbnail!",
        });
        var resPath = dtFormCreate.img || ""
        if (fileCreate) {
          try {
            const extension = fileCreate.name.split(".").pop(); // Extracts extension (e.g., "jpg" or "png")
            const filePath = `education-${Date.now()}.${extension}`;
            const { data, error } = await supabase.storage
              .from("educations")
              .upload(filePath, fileCreate, {
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
          }
        }
        
        const updatedForm = { ...dtFormCreate, img: resPath };
        setDtFormCreate(updatedForm)
        const res = await handlePost(updatedForm)
        if (res) {
            sessionStorage.setItem("success", "Success Create Educations")
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
                    <button className='btn bg-primary text-light'>Upload Thumbnail</button>
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
                <span className='text-decoration-underline' style={{cursor: "pointer"}} onClick={() => setDtFormCreate({...dtFormCreate, img: "https://scx1.b-cdn.net/csz/news/800a/2020/plant.jpg"})}>Or use default thumbnail</span>
            </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-3">
          <label>Blog ID</label>
          <input type="text" disabled placeholder='Generate Otomatic..' className="form-control" required />
        </div>
        <div className="col-12 mb-3">
          <label>Blog Title</label>
          <input type="text" name='title' value={dtFormCreate.title} onInput={handleInputChange} placeholder='Input Blog Title..' className="form-control" required />
        </div>
      </div>
      <div className="row">
        <div className="col-6 mb-3">
          <label>Blog Short Description</label>
          <input type="text" name='short_desc' value={dtFormCreate.short_desc} onInput={handleInputChange} placeholder='Max 200 length..' maxLength={200} required className="form-control" />
        </div>
        <div className="col-6 mb-3">
          <label>Blog Category</label>
          <input type="text" name='category' value={dtFormCreate.category} onInput={handleInputChange} placeholder='Input Blog category..' className="form-control" required />
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
            value={dtFormCreate.content}
            onInput={handleInputChange}
          ></textarea>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-3">
          <label>Status</label>
          <Select
            options={statusOptBlogs}
            onChange={(item) => {
                setDtFormCreate((prevState) => ({
                  ...prevState,
                  status: item.value
                }));
            }}
            value={statusOptBlogs.find((opt) => opt.value === dtFormCreate.status)}
            required
          />
        </div>
      </div>
    </form>
  );
};

export default FormCreateBlogs;