import React, { useEffect, useState } from 'react'
import Base from "../layouts/Base";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useLocation } from 'react-router-dom';
import UsersEdit from '../../be/edit/UsersEdit';
import Users from '../../be/get/Users';
import Toast from '../components/Toast';
import SidebarProfile from '../components/SidebarProfile';
import { supabase } from '../../be/supabaseConfig';

const ButtonTrigSidebar = () => {
    return (
        <div className='d-flex container-main gap-3 w-100 bg-primary text-light py-3 align-items-center'>
            <div className='' data-bs-toggle="offcanvas" data-bs-target="#offcanvas" role="button" id='iClick'>
            <i className='bi-list fw-bold cursor-pointer' style={{cursor: "pointer", fontSize: "25px"}} ></i>
            </div>
            {/* <div className='d-flex align-items-center gap-2' style={{cursor: "pointer"}} onClick={() => history.back()}>
                <i className='bi bi-arrow-left'></i>
                <span>Back</span>
            </div> */}
        </div>
    )
}

const ProfileContent = () => {
      const [btnClick, setBtnClick] = useState(false)
      const [fileEdit, setFileEdit] = useState(null)
      const [fileUrl, setFileUrl] = useState(sessionStorage.getItem('img') || "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg")
      const { handleEdit } = UsersEdit()
      const handleSave = async () => {
        if (!fileUrl) return Toast.fire({
            icon: "error",
            title: "Please Input Thumbnail!",
          });
          var resPath = fileUrl || ""
          if (fileEdit) {
            try {
                setBtnClick(true)
                if (sessionStorage.getItem('img')) {
                if (!sessionStorage.getItem('img').includes("default")) {
                    const oldFilePath = sessionStorage.getItem('img').replace(
                    `${
                        import.meta.env.VITE_SUPABASE_URL
                    }/storage/v1/object/public/user_profile/`,
                    ""
                    );
                    const { error } = await supabase.storage
                    .from("user_profile")
                    .remove([oldFilePath]); // Hapus file lama
                    
                    if (error) {
                    throw new Error("Failed to delete old image.");
                    }
    
                    // console.log(oldFilePath)
                    // return
                }}
              const extension = fileEdit.name.split(".").pop(); // Extracts extension (e.g., "jpg" or "png")
              const filePath = `user-${Date.now()}.${extension}`;
              const { data, error } = await supabase.storage
                .from("user_profile")
                .upload(filePath, fileEdit, {
                  cacheControl: "3600", // Cache file di browser selama 1 jam
                  upsert: false, // Jangan timpa file jika sudah ada
                });
              resPath =
                import.meta.env.VITE_SUPABASE_URL +
                "/storage/v1/object/public/user_profile/" +
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

            const res = await handleEdit({ img: resPath }, sessionStorage.getItem('key'))

            if (res) {
                sessionStorage.setItem('img', resPath)
                sessionStorage.setItem('success', 'success changed profile')
                location.reload()
            } else {
                alert('ups something wrong.')
            }

      }
    }

      useEffect(() => {
        if (sessionStorage.getItem('success')) {
            Toast.fire({
            icon: "success",
            title: sessionStorage.getItem('success'),
            });
            sessionStorage.removeItem("success");
        }
        if (sessionStorage.getItem('error')) {
            Toast.fire({
            icon: "error",
            title: sessionStorage.getItem('error'),
            });
            sessionStorage.removeItem("error");
        }
      })

    return (
        <>
        <div className='container-main w-100 py-5'>
            <div className='w-100 d-flex py-3 mt-5'>
                <div className='d-flex align-items-center align-left-desktop text-center w-100 gap-5 flex-wrap'>
                    <div className=' w100-responsive2'>
                        <div className='position-relative d-flex flex-column align-items-center'>
                            <img style={{borderRadius: "50%", width: "200px", height: "200px", objectFit: "cover", background: "gray"}} src={fileUrl || ""} data-aos="zoom-in" alt="" />
                            <div className='d-block mt-3'>
                                <button disabled={btnClick ? true : false} className='btn bg-primary position-relative' data-aos="zoom-in" data-aos-delay="500" onClick={() => handleSave()}>
                                    <input type="file" style={{cursor: "pointer", display: fileEdit ? "none" : "flex"}} className='w-100 h-100 opacity-0 position-absolute top-0 start-0'  accept='image/*' onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                        const fileURL = URL.createObjectURL(file); // Membuat URL lokal untuk pratinjau
                                        setFileEdit(file);
                                        setFileUrl(fileURL); // Simpan URL ke state
                                        }
                                    }}  
                                    />
                                   {fileEdit ? "Save Changes" : "Upload New Image"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex flex-column w100-responsive'>
                        <h2 data-aos="fade-right">{sessionStorage.getItem('username')}</h2>
                        <h4 data-aos="fade-right" data-aos-delay="300">{sessionStorage.getItem('email')}</h4>
                        <h4 data-aos="fade-right" data-aos-delay="500">{sessionStorage.getItem('role')}</h4>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

const FormEditProfile = () => {
    const { handleEdit } = UsersEdit()
    // const { dataUsers } = Users()
    const [formEdit, setFormEdit] = useState({
        username: sessionStorage.getItem('username'),
        email: sessionStorage.getItem('email'),
        phone: sessionStorage.getItem('phone'),
        gender: sessionStorage.getItem('gender') || false,
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target;
      
        setFormEdit((prevState) => {
           return {
            ...prevState,
            [name]: value,
          };
        });
      };
    const handleSubmit = async (e) => {
        e.preventDefault()
        const updateGender = {...formEdit, gender: formEdit.gender === 'true' ? true : formEdit.gender === 'false' ? false : formEdit.gender}
        setFormEdit(updateGender)

        try {
            const res = await handleEdit(formEdit, sessionStorage.getItem('key'))

            if (res) {
                sessionStorage.setItem('username', formEdit.username)
                sessionStorage.setItem('email', formEdit.email)
                sessionStorage.setItem('phone', formEdit.phone)
                sessionStorage.setItem('gender', formEdit.gender)
                sessionStorage.setItem("success", "Success edited profile")
                location.reload()
            } else {
                alert('ups something wrong')
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className='py-3 w-100 mt-1 container-main mb-5'>
            <div className='w-100 d-flex flex-column'>
                <form className='form text-satoshi' onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-12 mb-3'>
                            <label>Change Your Username</label>
                            <input type="text" className='form-control mt-2 py-2 bg-transparent input-form-edit-profile' onInput={handleInputChange} value={formEdit.username} style={{border: "2px solid var(--primary)"}} required placeholder='Enter A Username..' name='username' />
                        </div>
                        <div className='col-12 mb-3'>
                            <label>Email Address</label>
                            <input type="email" className='form-control mt-2 py-2 bg-transparent input-form-edit-profile' onInput={handleInputChange} value={formEdit.email} style={{border: "2px solid var(--primary)"}} required placeholder='Enter A Valid Email Address..' name='email' />
                        </div>
                        <div className='col-12 mb-3'>
                            <label>Phone</label>
                            <input type="number" className='form-control mt-2 py-2 bg-transparent input-form-edit-profile' onInput={handleInputChange} value={formEdit.phone} style={{border: "2px solid var(--primary)"}} required placeholder='Enter A Valid Phone..' name='phone' />
                        </div>
                        <div className="col-12 mb-3">
                            <label>Gender</label>
                            <div
                                className="w-100 rounded-2 py-3 px-4 mt-2"
                                style={{ backgroundColor: "#E8EFEA" }}
                            >
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        value="true"
                                        id="flexRadioDefault1"
                                        onChange={handleInputChange}
                                        checked={formEdit.gender === "true" || formEdit.gender == true}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="flexRadioDefault1"
                                    >
                                        Male
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        value="false"
                                        id="flexRadioDefault2"
                                        onChange={handleInputChange}
                                        checked={formEdit.gender === "false" || formEdit.gender == false}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="flexRadioDefault2"
                                    >
                                        Female
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <button className='btn bg-primary text-light'>Save Changes</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

const Profile = () => {
    useEffect(() => {
        
      if (sessionStorage.getItem('success')) {
        Toast.fire({
          icon: "success",
          title: sessionStorage.getItem('success'),
        });
        sessionStorage.removeItem("success");
    }

      AOS.init({
          duration: 1000,
          once: true,
      })
  }, [])
    return (
      <Base
      isHide={true}
        mainContent={
          <>
          <SidebarProfile/>
          <ButtonTrigSidebar />
          <section className='' style={{background: "url('/images/bekron.png')"}}>
            <ProfileContent />
            <FormEditProfile />
          </section>
          </>
        }
      />
    );
}

export default Profile