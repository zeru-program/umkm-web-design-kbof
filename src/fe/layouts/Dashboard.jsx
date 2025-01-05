import React, { useEffect, useState } from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import NavbarDashboard from '../components/dashboard/NavbarDashboard'
import Toast from '../components/Toast'

const Dashboard = ({content}) => {
    const [sideStatus, setSideStatus] = useState(false)
    const handleSide = () => {
        setSideStatus(!sideStatus)
    }

    useEffect(() => {
      if (window.innerWidth < 700) {
        setSideStatus(false);
      } else if (window.innerWidth > 700) {
        setSideStatus(true);
      }

      if (sessionStorage.getItem('success')) {
          Toast.fire({
            icon: "success",
            title: sessionStorage.getItem('success'),
          });
          sessionStorage.removeItem("success");
      }
      if (sessionStorage.getItem('error')) {
          Toast.fire({
            icon: "error",
            title: sessionStorage.getItem('error'),
          });
          sessionStorage.removeItem("error");
      }
    }, [])
  return (
    <div className=''>
        <NavbarDashboard handleClickNav={handleSide} sideStatus={sideStatus} />
        <Sidebar sideActive={sideStatus} handleSideClick={handleSide} />
        <main className='wrapper-main'>
          {content}
        </main>
    </div>
  )
}

export default Dashboard