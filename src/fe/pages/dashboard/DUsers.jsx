import React from 'react'
import Dashboard from '../../layouts/Dashboard'
import Header from '../../components/dashboard/Header'

const DUsers = () => {
  return (
    <Dashboard content={<>
      <div className='mt-3'>
         <Header title={'Dashboard'} pageName={'Users'} />
      </div>
    </>} />
  )
}

export default DUsers