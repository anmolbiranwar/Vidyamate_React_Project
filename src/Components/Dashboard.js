import React from "react";
import {Link, Outlet } from "react-router-dom";
import "../CSS/Dashboard.css";
import Logo from "../Images/Screenshot (366).png";

const Dashboard = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-primary">
            <div className="d-flex flex-column align-items-sm-end pt-2 text-white min-vh-100">
              <Link
                to="/dashboard"
                className="d-flex align-items-start pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
              >
                <img
                  src={Logo}
                  alt="Logo"
                  style={{
                    width: "40px",
                    height: "40px",
                    marginRight: "10px",
                    borderRadius: "20px",
                  }}
                />
                <span className="fs-5 fw-bolder d-none d-sm-inline">
                  Vidyamate
                </span>
              </Link>
              <div>
                  <span  className="bi bi-list">Super Admin</span>
                  <hr
                    style={{
                      width: "100%",
                      borderTop: "2px solid #fff",
                      margin: "10px 0",
                    }}
                  />
                </div>
             
              <ul
                className="nav nav-pills  px-3 flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                <li className="w-100">
                  <Link
                    to="/dashboard"
                    className="nav-link text-white px-0 align-middle"
                  >
                    <i className="fs-4 bi-speedometer2 ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                  </Link>
                </li>
                <li className="w-100">
                  <Link
                    to="/dashboard/masters"
                    className="nav-link text-white px-0 align-middle"
                  >
                    <i className="fs-4 bi-people-fill ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">Masters</span>
                  </Link>
                </li>
                <li className="w-100">
                  <Link
                    to="/dashboard/organization"
                    className="nav-link text-white px-0 align-middle"
                  >
                    <i className="fs-4 bi-building-fill ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">
                      Organization
                    </span>
                  </Link>
                </li>
                <li className="w-100">
                  <Link
                    to="/dashboard/academicsession"
                    className="nav-link text-white px-0 align-middle"
                  >
                    <i className="fs-4 bi-calendar-check ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">
                      Academic Session
                    </span>
                  </Link>
                </li>
                <li className="w-100">
                  <Link
                    to="/dashboard/schoollist"
                    className="nav-link text-white px-0 align-middle"
                  >
                    <i className="fs-4 bi-mortarboard-fill ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">
                      School Registration
                    </span>
                  </Link>
                </li>
                <li className="w-100">
                  <Link
                    to="/dashboard/users"
                    className="nav-link text-white px-0 align-middle"
                  >
                    <i className="fs-4 bi-person-circle ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">Users</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col p-0 m-0">
            <div className="p-3 d-flex justify-content-end shadow">
              <div className="search-container me-2">
                <input
                  className="border rounded-1"
                  type="text"
                  id="searchInput"
                  placeholder="Search..."
                />
                <button id="searchButton" className="border rounded-1">
                  <i className="bi bi-search"></i>
                </button>
              </div>
              <h5 style={{ position: "relative" }}>
                <i className="bi bi-bell-fill me-2"></i>
                <span className="notification-dot"></span>
              </h5>
              <button className="border rounded-5 ms-3 me-2">Admin</button>
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
