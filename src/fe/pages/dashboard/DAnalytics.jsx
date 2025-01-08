import React from 'react'
import Dashboard from '../../layouts/Dashboard'
import Header from '../../components/dashboard/Header'
import BoxDash from '../../components/dashboard/BoxDash'
import OrdersChart from '../../components/dashboard/chart/OrdersChart'
import ProductsChart from '../../components/dashboard/chart/ProductsChart'

const SegmenAnalyticOrders = () => {
  return (
    <>
    <BoxDash title={"Orders Analytic"} content={<>
      <OrdersChart />
    </>} />
    </>
  )
}

const SegmenAnalyticProducts = () => {
  return (
    <>
    <BoxDash title={"Products Analytic"} content={<>
      <ProductsChart />
    </>} />
    </>
  )
}

const DAnalytics = () => {
  return (
    <Dashboard content={<>
      <div className='mt-3'>
         <Header title={'Analytics'} pageName={'Analytics'} />
         <SegmenAnalyticOrders />
         <SegmenAnalyticProducts />
      </div>
    </>} />
  )
}

export default DAnalytics