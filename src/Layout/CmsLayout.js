import React from 'react'
import { Outlet } from 'react-router-dom';
import DashboardHeader from '../component/dashboard-header';
import SlideBar from '../component/sidebar/sidebar';
function CmsLayout() {
  return (
    <>  <DashboardHeader />
    <div className="main-content">
      <SlideBar />

      <Outlet />
      
      </div>
      </>
  )
}

export default CmsLayout