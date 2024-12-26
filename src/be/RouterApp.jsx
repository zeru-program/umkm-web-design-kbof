import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Home from '../fe/pages/Home'
import Auth from '../fe/pages/Auth'

const PrivateRoute = ({element}) => {
  const cekLogin = sessionStorage.getItem('hasLogin')
    if (!cekLogin) {
      return <Navigate to='/auth' replace />
    }
    return element;
}

const RedirectRoute = () => {
  useEffect(() => {
    window.location.href = "/"
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
            <Route path='/auth' element={<Auth/>} />
            <Route path='*' element={<RedirectRoute/>} />
        </Routes>
    </Router>
  )
}

export default RouterApp