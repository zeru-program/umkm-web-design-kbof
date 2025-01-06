import React, { useEffect, useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import './Auth.css'
import UsersPost from '../../../be/post/Users'
import Swal from 'sweetalert2'

const SideInput = () => {
    const { handlePost } = UsersPost()
    const [dataForm, setDataForm] = useState({
        username: '',
        password: '',
        email: ''
    })
    const handleSubmit = async () => {
        try {
            // console.log(dataForm)
            const res = await handlePost(dataForm)
            // console.log(res)
            if (res) {
                sessionStorage.setItem('register_done', true)
                Swal.fire('Success', 'Register in successfully', 'success').then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/auth/sign-in'
                    }
                })
            }
        } catch (error) {
            throw error
        }
    }
    const [isEyePass, setIsEyePass] = useState(false)
    const handleEyePass = () => {
        setIsEyePass(!isEyePass)
    }

    useEffect(() => {
        if (sessionStorage.getItem("register_done")) {
            Swal.fire({
                title: 'Error',
                text: 'Oops, you have created an account, please log in',
                icon: 'error',
                timer: 2000, 
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    window.location.href = '/auth/sign-in'; // Redirect setelah timer selesai
                }
            });
        }
    }, [])

    return (
        <section className='d-flex text-primary justify-content-center align-items-center auth-side-input'>
            <div className='con-auth'>
                <img src="/images/logo.png" className='img-back-auth' onClick={() => window.location.href = '/'} style={{cursor :"pointer"}} alt="" />
                <h2 className='text-font-color'>Create Your Account</h2>
                <p>Access Your Personalized Plant Recommendations.</p>
                <form className='w-100' onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}>
                 <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" onChange={(e) => setDataForm({...dataForm, username: e.target.value})} className="form-control input-auth" placeholder='Enter Your Username' required />
                 </div>
                 <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" autoComplete='current-email' onChange={(e) => setDataForm({...dataForm, email: e.target.value})} className="form-control input-auth" placeholder='Enter Your Email' required />
                 </div>
                <div className="mb-3">
                    <label  className="form-label">Password</label>
                    <div className='position-relative'>
                        <input type={isEyePass ? "text" : "password"} autoComplete='current-password' onChange={(e) => setDataForm({...dataForm, password: e.target.value})} className="form-control input-auth" style={{paddingRight: "50px"}} placeholder='Enter Your Password' required  />
                        <i className={`bi-${isEyePass ? "eye" : "eye-slash"}-fill position-absolute`} onClick={() => handleEyePass()} style={{right: "20px", top: "9px", cursor: "pointer"}}></i>
                    </div>
                </div>
                <button type="submit" className="btn bg-primary text-light w-100 py-2 mt-2">Sign Up</button>
                </form>
                <div className='d-flex gap-2 align-items-center mt-3'>
                    <div className='line'></div>
                    <span>Or</span>
                    <div className='line'></div>
                </div>
                <button type="submit" className="btn bg-transparent text-primary w-100 py-2 mt-2" onClick={() => window.location.href = '/auth/sign-in'} style={{border: "2px solid #496653"}}>Sign In</button>
            </div>
        </section>
    )
}

const SideBackground = () => {
    return (
        <section className='auth-side-background text-light position-relative'>
            <div className='px-4 position-absolute bottom-0'>
                <h2 className='fw-bold'>Handpicked Aesthetic PlantsHandpicked Aesthetic Plants</h2>
                <div className='d-flex align-items-center gap-3 mb-4'>
                    <img src="/images/man1.jpg" className='img-side-background' alt="" />
                    <div>
                        <h3 className='mb-0'>Discover our curated</h3>
                        <p className='mb-0'>Discover our curated</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

const Register = () => {
  return (
    <AuthLayout mainContent={<>
    <div className='contain-auth' style={{width: "100%", height: "100vh"}}>
        <SideInput />
        <SideBackground />
    </div>
    </>} />
  )
}

export default Register