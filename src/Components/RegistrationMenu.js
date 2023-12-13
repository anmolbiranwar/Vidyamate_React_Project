import React from 'react'
import { Link} from "react-router-dom";
import "../CSS/RegistrationMenu.css"


const RegistrationMenu = () => {
  return (
    <div className="rounded border col-auto col-md-3 col-xl-2 px-sm-2 px-0 m-1">
          <nav className="d-flex flex-column align-items-left align-items-sm-start min-vh-100">
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          >
            <li className="w-100">
              <Link
                to="/dashboard/schoolregistration/addschool"
                className="navLink"
                activeClassName="activeLink"
              >
                Basic Info
              </Link >
            </li>
            <li className="w-100">
              <Link
                to="/dashboard/schoolregistration/feesheads"
                className="navLink"
                activeClassName="activeLink"
              >
                Fees Heads
              </Link>
            </li>
            <li className="w-100">
              <Link
                to="/dashboard/schoolregistration/classessection"
                className="navLink"
                activeClassName="activeLink"
              >
                Classes & Section                   
              </Link>
            </li>
            <li className="w-100">
              <Link
                to="/dashboard/schoolregistration/feesstructure"
                className="navLink"
                activeClassName="activeLink"
              >
                 Fees Structure
              </Link>
            </li>
          </ul>
        </nav>
          </div>
  )
}

export default RegistrationMenu