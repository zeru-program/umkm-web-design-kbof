import React, { useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import './Auth.css'
import Users from '../../../be/get/Users'
import Swal from 'sweetalert2'

const SideInput = () => {
    const { dataUsers } = Users()
    const [dataForm, setDataForm] = useState({
        username_or_email: "",
        password: "",
    })
    const [isEyePass, setIsEyePass] = useState(false)
    const handleEyePass = () => {
        setIsEyePass(!isEyePass)
    }

    const handleSubmit = () => {
        const matchedUser = dataUsers.find(
            (item) =>
                (item.username === dataForm.username_or_email || item.email === dataForm.username_or_email) &&
                item.password === dataForm.password
        );
    
        if (matchedUser) {
            sessionStorage.setItem('isLogin', true)
            sessionStorage.setItem('username', matchedUser.username)
            sessionStorage.setItem('password', matchedUser.password)
            sessionStorage.setItem('email', matchedUser.email)
            sessionStorage.setItem('phone', matchedUser.phone)
            sessionStorage.setItem('id', matchedUser.id)
            sessionStorage.setItem('key', matchedUser.key)
            sessionStorage.setItem('role', matchedUser.role)
            Swal.fire('Success', 'Logged in successfully', 'success').then((result) => {
                if (result.isConfirmed) {
                    if (matchedUser.role === 'admin' || matchedUser.role === 'developer') {
                        window.location.href = '/dashboard'
                    } else {
                        window.location.href = '/'
                    }
                }
            })
        } else {
            Swal.fire('Error', 'Invalid username or password', 'error');
        }        
    }

    return (
        <section className='d-flex text-primary justify-content-center align-items-center auth-side-input'>
            <div className='con-auth'>
                <img src="/images/logo.png" className='img-back-auth' onClick={() => window.location.href = '/'} style={{cursor :"pointer"}} alt="" />
                <h2 className='text-font-color' style={{paddingRight: "100px"}}>Welcome Back!</h2>
                <p>Start Your Journey with Aesthetic Plants.</p>
                <form className='w-100' onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}>
                 <div className="mb-3">
                    <label className="form-label">Email / Username</label>
                    <input type="text" className="form-control input-auth" onChange={(e) => setDataForm({...dataForm, username_or_email: e.target.value})} placeholder='Enter Your Email/Username' id="exampleInputEmail1" />
                 </div>
                <div className="mb-3">
                    <label  className="form-label">Password</label>
                    <div className='position-relative'>
                        <input type={isEyePass ? "text" : "password"} onChange={(e) => setDataForm({...dataForm, password: e.target.value})} className="form-control input-auth" style={{paddingRight: "50px"}} placeholder='Enter Your Password' id="exampleInputPassword1" />
                        <i className={`bi-${isEyePass ? "eye" : "eye-slash"}-fill position-absolute`} onClick={() => handleEyePass()} style={{right: "20px", top: "9px", cursor: "pointer"}}></i>
                    </div>
                </div>
                <button type="submit" className="btn bg-primary text-light w-100 py-2 mt-2">Sign In</button>
                </form>
                <div className='d-flex gap-2 align-items-center mt-3'>
                    <div className='line'></div>
                    <span>Or</span>
                    <div className='line'></div>
                </div>
                <button type="submit" className="btn bg-transparent text-primary w-100 py-2 mt-2" onClick={() => window.location.href = '/auth/sign-up'} style={{border: "2px solid #496653"}}>Sign Up</button>
            </div>
        </section>
    )
}

const SideBackground = () => {
    return (
        <section className='auth-side-background text-light position-relative'>
            <div className='px-4 position-absolute' style={{bottom: "40px", left: "40px"}}>
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

const Login = () => {
  return (
    <AuthLayout mainContent={<>
    <div className='contain-auth' style={{width: "100%", height: "100vh"}}>
        <SideInput />
        <SideBackground />
    </div>
    </>} />
  )
}

export default Login