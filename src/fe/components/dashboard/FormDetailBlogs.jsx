import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import ProductsOption from '../../../be/options/ProductsOption';
import GenerateString from '../../../be/GenerateString';
import TrueFalse from '../../../be/options/TrueFalse';
import StatusOption from '../../../be/options/StatusOption';
import Rating from '../../../be/options/Rating';

const FormDetailBlogs = ({dataDetail}) => {
  const { productOpt } = ProductsOption();
  const { trueFalse } = TrueFalse();
  const { statusOptBlogs } = StatusOption()
  const { ratingOpt } = Rating()
  const [dtFormDetail, setDtFormDetail] = useState({
    id: "",
    title: '',
    short_desc: '',
    category: '',
    content: '',
    status: 'draft',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setDtFormDetail((prevState) => {
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
        setDtFormDetail({
          ...dtFormDetail,
          id: dataDetail[0].blogID || GenerateString(8), // Gunakan data atau default
          title: dataDetail[0].blogTitle || '',
          img: dataDetail[0].img || '',
          short_desc: dataDetail[0].blogShortDesc || '',
          category: dataDetail[0].category || '',
          content: dataDetail[0].content || '',
          status: dataDetail[0].status || 'draft',
        });
      }      
    }, [dataDetail])

  return (
    <form action="" id='formDetailProduct' onSubmit={async (e) => {
        e.preventDefault()
    }}>
      <div className="row">
        <div className="col-12 mb-3">
          <div className='w-100 d-flex justify-content-center'>
            <img src={dtFormDetail.img} className='img-thumbnail img-detail' alt="" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-3">
          <label>Blog ID</label>
          <input type="text" disabled placeholder='Generate Otomatic..' value={dtFormDetail.id} className="form-control" required />
        </div>
        <div className="col-12 mb-3">
          <label>Blog Title</label>
          <input type="text" name='title' disabled value={dtFormDetail.title} onInput={handleInputChange} placeholder='Input Blog Title..' className="form-control" required />
        </div>
      </div>
      <div className="row">
        <div className="col-6 mb-3">
          <label>Blog Short Description</label>
          <input type="text" name='short_desc' disabled value={dtFormDetail.short_desc} onInput={handleInputChange} placeholder='Max 200 length..' maxLength={200} required className="form-control" />
        </div>
        <div className="col-6 mb-3">
          <label>Blog Category</label>
          <input type="text" name='category' disabled value={dtFormDetail.category} onInput={handleInputChange} placeholder='Input Blog category..' className="form-control" required />
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-3">
          <label>Content</label>
          <textarea
            name="content"
            placeholder="Input Content Blog here.."
            // maxLength={250}
            disabled
            rows={10}
            className="form-control"
            value={dtFormDetail.content}
            onInput={handleInputChange}
          >{dtFormDetail.content}</textarea>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mb-3">
          <label>Status</label>
          <Select
            options={statusOptBlogs}
            onChange={(item) => {
                setDtFormDetail((prevState) => ({
                  ...prevState,
                  status: item.value
                }));
            }}
            isDisabled
            value={statusOptBlogs.find((opt) => opt.value === dtFormDetail.status)}
            required
          />
        </div>
      </div>
    </form>
  );
};

export default FormDetailBlogs;