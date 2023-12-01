import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'


const SchoolRegistration = () => {
  const location=useLocation();
  return (
    <>
    <div className='container-fluid'>
    <div className='d-flex justify-content-between mt-3'>
      <div className='fw-bold'>School Registration</div>
      <div>
        <Link to='/dashboard/schoolregistration/schoollist' className={`text-decoration-none m-2 ${location.pathname === '/dashboard/schoolregistration/schoollist' ? 'text-blue' : 'text-black'}`}>
          <span className='fw-bold'>School List</span>
        </Link>
        <Link to='/dashboard/schoolregistration/addschool' className={`text-decoration-none m-3 ${location.pathname === '/dashboard/schoolregistration/addschool' ? 'text-blue' : 'text-black'}`}>
          <span className='fw-bold'>Add School</span>
        </Link>
      </div>
    </div>
    <Outlet />
    </div>
      </>
  )
}

export default SchoolRegistration