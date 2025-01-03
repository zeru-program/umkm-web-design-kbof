import React from 'react'

const BoxDash = ({title, content, anyOptionBeetwen}) => {
  return (
    <div className='w-100 mt-4 justify-content-center d-flex text-satoshi'>
      <div className='box-dash'>
        <div className='d-flex justify-content-between contain-option'>
            <h3 className=' text-satoshi fw-bold text-muted'>{title}</h3>
            <div>
                {anyOptionBeetwen}
            </div>
        </div>
      <div>
        {content}
      </div>
      </div>
    </div>
  )
}

export default BoxDash