import React from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'

const Dashboard = () => {
  return (  
    <>
     <div className='container-fluid'>
        <div className='row flex-nowrap'>
            <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-primary'>
                <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
                    <Link to='/dashboard' className='d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none'>
                        <span className='fs-5 fw-bolder d-none d-sm-inline'>Vidyamate</span>
                    </Link>
                    <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start' id='menu'>
                        <li className='w-100'>
                            <Link to='/dashboard' className='nav-link text-white px-0 align-middle'><i className='fs-4 bi-speedometer2 ms-2'></i><span className='ms-2 d-none d-sm-inline'>Dashboard</span></Link>
                        </li>
                        <li className='w-100'>
                            <Link to='/masters' className='nav-link text-white px-0 align-middle'><i className='fs-4 bi-people-fill ms-2'></i><span className='ms-2 d-none d-sm-inline'>Masters</span></Link>
                        </li>
                        <li className='w-100'>
                            <Link to='/organization' className='nav-link text-white px-0 align-middle'><i className='fs-4 bi-building-fill ms-2'></i><span className='ms-2 d-none d-sm-inline'>Organization</span></Link>
                        </li>
                        <li className='w-100'>
                            <Link to='/academicsession' className='nav-link text-white px-0 align-middle'><i className='fs-4 bi-calendar-check ms-2'></i><span className='ms-2 d-none d-sm-inline'>Academic Session</span></Link>
                        </li>
                        <li className='w-100'>
                            <Link to='/schoolregistration' className='nav-link text-white px-0 align-middle'><i className='fs-4 bi-mortarboard-fill ms-2'></i><span className='ms-2 d-none d-sm-inline'>School Registration</span></Link>
                        </li>
                        <li className='w-100'>
                            <Link to='/users' className='nav-link text-white px-0 align-middle'><i className='fs-4 bi-person-circle ms-2'></i><span className='ms-2 d-none d-sm-inline'>Users</span></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  </>
  )
}

export default Dashboard