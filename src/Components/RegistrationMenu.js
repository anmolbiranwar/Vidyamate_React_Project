import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const RegistrationMenu = () => {
  return (
    <div >
      <div >
        <div className="d-flex flex-column align-items-left align-items-sm-start min-vh-100">
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          >
            <li className="w-100">
              <Link
                to="/dashboard/schoolregistration/basicinfo"
                className="navLink"
              >
                Basic Info
              </Link>
            </li>
            <li className="w-100">
              <Link
                to="/dashboard/schoolregistration/feesheads"
                className="navLink"
              >
                Fees Heads
              </Link>
            </li>
            <li className="w-100">
              <Link
                to="/dashboard/schoolregistration/classessection"
                className="navLink"
              >
                Classes & Section                   
              </Link>
            </li>
            <li className="w-100">
              <Link
                to="/dashboard/schoolregistration/feesstructure"
                className="navLink"
              >
                 Fees Structure
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className='col p-0 m-0'>
        <Outlet />
    </div>
    </div>
  )
}

export default RegistrationMenu