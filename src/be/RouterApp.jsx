import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Home from '../fe/pages/Home'
import Auth from '../fe/pages/Auth'
import Login from '../fe/pages/auth/Login'
import Register from '../fe/pages/auth/Register'
import Product from '../fe/pages/Product'
import ProductDetail from '../fe/pages/ProductDetail'
import Education from '../fe/pages/Education'
import EducationDetail from '../fe/pages/EducationDetail'
import AboutUs from '../fe/pages/AboutUs'
import DHome from '../fe/pages/dashboard/DHome'
import DOrders from '../fe/pages/dashboard/DOrders'
import DProducts from '../fe/pages/dashboard/DProducts'
import DAnalytics from '../fe/pages/dashboard/DAnalytics'
import DBlogs from '../fe/pages/dashboard/DBlogs'
import DUsers from '../fe/pages/dashboard/DUsers'
import OrdersDummy from './dummy/OrdersDummy'
import N404 from '../fe/pages/N404'
import Checkout from '../fe/pages/Checkout'
import OrderDetail from '../fe/pages/DetailOrder'
import Profile from '../fe/pages/Profile'
import MyOrder from '../fe/pages/MyOrder'

const PrivateRoute = ({element}) => {
  const cekLogin = sessionStorage.getItem('isLogin')
  const cekAdmin = sessionStorage.getItem('username')
    if (!cekLogin && (cekAdmin !== "admin" || cekAdmin !== "developer")) {
      return <Navigate to='/auth/sign-in' replace />
    }
    return element;
}

const AuthRoute = ({element}) => {
  const cekLogin = sessionStorage.getItem('isLogin')
    if (cekLogin) {
      return <Navigate to='/' replace />
    }
    return element;
}
const AuthNotRoute = ({element}) => {
  const cekLogin = sessionStorage.getItem('isLogin')
    if (!cekLogin) {
      return <Navigate to='/auth/sign-in' replace />
    }
    return element;
}

const AuthLogout = () => {
  useEffect(() => {
    sessionStorage.removeItem('isLogin')
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('password')
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('phone')
    sessionStorage.removeItem('id')
    sessionStorage.removeItem('key')
    sessionStorage.removeItem('role')
    window.location.href = "/auth/sign-in"
  })
  return (
    <></>
  )
}

const RouterApp = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/plants' element={<Product/>} />
            <Route path='/plants/:idP' element={<ProductDetail/>} />
            <Route path='/checkout/:idC' element={<AuthNotRoute element={<Checkout />}/>} />
            <Route path='/detail/order/:idO' element={<OrderDetail/>} />
            <Route path='/education' element={<Education/>} />
            <Route path='/education/:idE' element={<EducationDetail/>} />
            <Route path='/about-us' element={<AboutUs/>} />
            <Route path='/dummy/orders' element={<OrdersDummy/>} />
            <Route path='/auth/sign-in' element={<AuthRoute element={<Login/>} />} />
            <Route path='/auth/sign-up' element={<AuthRoute element={<Register/>} />} />
            <Route path='/auth/logout' element={<AuthLogout />} />
            <Route path='/profile' element={<AuthNotRoute element={<Profile />}/>} />
            <Route path='/profile/my-order' element={<AuthNotRoute element={<MyOrder />}/>} />
            <Route path='/dashboard' element={<PrivateRoute element={<DHome />}/>} />
            <Route path='/dashboard/analytics' element={<PrivateRoute element={<DAnalytics />}/>} />
            <Route path='/dashboard/orders' element={<PrivateRoute element={<DOrders />}/>} />
            <Route path='/dashboard/products' element={<PrivateRoute element={<DProducts />}/>} />
            <Route path='/dashboard/blogs' element={<PrivateRoute element={<DBlogs />}/>} />
            <Route path='/dashboard/users' element={<PrivateRoute element={<DUsers />}/>} />
            <Route path='*' element={<N404/>} />
        </Routes>
    </Router>
  )
}

export default RouterApp