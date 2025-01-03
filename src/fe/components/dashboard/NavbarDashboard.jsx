import React from 'react'

const NavbarDashboard = ({handleClickNav}) => {
  return (
    <>
    <div className='py-3 position-absolute top-0 w-100 text-satoshi header-navbar bg-primary text-light d-flex justify-content-between align-items-center px-5'>
      <div className='' data-bs-toggle="offcanvas" data-bs-target="#offcanvas" role="button">
        <i className='bi-list fw-bold cursor-pointer' style={{cursor: "pointer", fontSize: "25px"}} onClick={() => handleClickNav()}></i>
      </div>
      <div className='d-flex gap-3'>
        <i className='bi-bell-fill'></i>
        <div className='gap-3 d-flex align-items-center'>
          <i className='bi-person-fill'></i>
          <div className="dropdown">
            <div className='d-flex gap-1' data-bs-toggle="dropdown" aria-expanded="false" style={{cursor: "pointer"}}>
              <span className='fw-bold'>Hi, Admin</span>
              <i className='bi-caret-down-fill'></i>
            </div>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default NavbarDashboard