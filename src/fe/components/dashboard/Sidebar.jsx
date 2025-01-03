import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Sidebar = ({handleSideClick, sideActive}) => {
    // const [sideActive, setSideActive] = useState(false)
    const location = useLocation()
    const [imageNav, setImageNav] = useState(false)

    useEffect(() => {
        if (window.innerWidth < 700) {
            setImageNav(false);
        } else if (window.innerWidth > 700) {
            setImageNav(true);
        }
    }, [])

  return (
    <>
    <div className='bg-warning'>
        <div className="offcanvas sidebar offcanvas-start w-25" tabIndex={-1} id="offcanvas" data-bs-keyboard="false" data-bs-backdrop="false">
            <div className="offcanvas-header pt-4 d-flex flex-column">
            <div className='w-100 d-flex align-items-start justify-content-beetwen'>
                <div className={`align-items-${imageNav ? "start" : "center"} d-flex flex-column w-100`}>
                    <img src={imageNav ? "/images/logo-navbar.png" : "/images/logo.png"} style={{width: imageNav ? "180px" : "25px"}} className='logo-sidebar mb-4 pb-4' alt="" />
                    <h6 className="offcanvas-title d-none d-sm-block" id="offcanvas">Menu</h6>
                    <button type="button" className="btn-close mt-1 text-reset" style={{marginInline: 0, display: !imageNav ? 'flex' : 'none'}} data-bs-dismiss="offcanvas" aria-label="Close" />
                </div>
                <button type="button" className="btn-close mt-1 text-reset" style={{display: imageNav ? 'flex' : 'none'}} data-bs-dismiss="offcanvas" aria-label="Close" />
            </div>
            </div>
            <div className="offcanvas-body px-0">
            <div className='w-100 d-flex flex-column py-1'>
            <div className={`nav-link-dash ${location.pathname === "/dashboard" ? "active" : ""} d-flex gap-3 align-items-center py-3`} onClick={() => window.location.href = '/dashboard'}>
                <div className='content-link'>
                    <i className='bx bxs-dashboard'></i>
                    <span>Dashboard</span>
                </div>
            </div>
            <div className={`nav-link-dash ${location.pathname === "/dashboard/analytics" ? "active" : ""} d-flex gap-3 align-items-center py-3`} onClick={() => window.location.href = '/dashboard/analytics'}>
                <div className='content-link'>
                    <i className='bx bxs-pie-chart-alt-2'></i>
                    <span>Analytics</span>
                </div>
            </div>
            <div className={`nav-link-dash ${location.pathname === "/dashboard/orders" ? "active" : ""} d-flex gap-3 align-items-center py-3`} onClick={() => window.location.href = '/dashboard/orders'}>
                <div className='content-link'>
                    <i className='bx bxs-shopping-bag'></i>
                    <span>Orders</span>
                </div>
            </div>
            <div className={`nav-link-dash ${location.pathname === "/dashboard/products" ? "active" : ""} d-flex gap-3 align-items-center py-3`} onClick={() => window.location.href = '/dashboard/products'}>
                <div className='content-link'>
                    <i className='bx bxs-package'></i>
                    <span>Products</span>
                </div>
            </div>
            <div className={`nav-link-dash ${location.pathname === "/dashboard/blogs" ? "active" : ""} d-flex gap-3 align-items-center py-3`} onClick={() => window.location.href = '/dashboard/blogs'}>
                <div className='content-link'>
                    <i className='bx bxl-blogger'></i>
                    <span>Blog</span>
                </div>
            </div>
            <div className={`nav-link-dash ${location.pathname === "/dashboard/users" ? "active" : ""} d-flex gap-3 align-items-center py-3`} onClick={() => window.location.href = '/dashboard/users'}>
                <div className='content-link'>
                    <i className='bi bi-person-fill'></i>
                    <span>Users</span>
                </div>
            </div>
        </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Sidebar