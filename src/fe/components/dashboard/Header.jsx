import React from 'react'

const Header = ({title, pageName}) => {
  return (
    <div className='w-100 d-flex justify-content-center'>
      <div className='box-dash align-items-center d-flex justify-content-between'>
        <h3 className=' text-satoshi fw-bold text-muted'>{title}</h3>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
                <li className="breadcrumb-item active" aria-current="page">{pageName}</li>
            </ol>
        </nav>
      </div>
    </div>
  )
}

export default Header