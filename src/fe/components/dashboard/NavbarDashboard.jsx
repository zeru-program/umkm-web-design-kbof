import React, { useEffect, useState } from 'react'

const NavbarDashboard = ({handleClickNav, sideStatus}) => {
  return (
    <>
    <div className='py-3 position-absolute top-0 w-100 text-satoshi header-navbar bg-primary text-light d-flex justify-content-between align-items-center px-5'>
      <div className='' data-bs-toggle="offcanvas" data-bs-target="#offcanvas" role="button" id='iClick'>
        <i className='bi-list fw-bold cursor-pointer' style={{cursor: "pointer", fontSize: "25px"}} onClick={() => handleClickNav()}></i>
      </div>
      <div className='d-flex gap-3'>
        {/* <i className='bi-bell-fill'></i> */}
        <div className='gap-3 d-flex align-items-center'>
          {/* <i className='bi-person-fill'></i> */}
          <img className='img-nav-profile' src={sessionStorage.getItem('img') || "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"} alt="" />
          <div className="dropdown">
            <div className='d-flex gap-1' data-bs-toggle="dropdown" aria-expanded="false" style={{cursor: "pointer"}}>
              <span className='fw-bold'>Hi, {sessionStorage.getItem('username')}</span>
              <i className='bi-caret-down-fill'></i>
            </div>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" style={{cursor: "pointer"}} onClick={() => document.getElementById('iClick').click()}>Trigger Sidebar</a></li>
              <li><a className="dropdown-item" href="/">Home</a></li>
              <li><a className="dropdown-item text-danger" href="/auth/logout">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default NavbarDashboard