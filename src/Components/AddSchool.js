import React, { useEffect, useState } from "react";
import SchoolRegistration from "./SchoolRegistration";
import "../CSS/AddSchool.css";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import RegistrationMenu from "./RegistrationMenu";
import Person from "../Images/person.jpg";

const AddSchool = () => {
  const data = {
    organization_id: "",
    name: "",
    udise_no: "",
    address: "",
    state_id: "",
    city_id: "",
    pincode: "",
    status: "",
    contact_person: "",
    contact_number: "",
    contact_email: "",
    school_logo: "",
  };
  const [addschool, setAddschool] = useState(data);

  const handleData = (e) => {
    const { name, value } = e.target;

    const isCheckbox = e.target.type === "checkbox";

    setAddschool((prevAddSchool) => ({
      ...prevAddSchool,
      [name]: isCheckbox ? e.target.checked : value,
      organization_id:
        name === "organization_id" ? value : prevAddSchool.organization_id,
      state_id: name === "state_id" ? value : prevAddSchool.state_id,
      city_id: name === "city_id" ? value : prevAddSchool.city_id,
    }));
  };

  const [organizations, setOrganizations] = useState([]);
  const [states, setState] = useState([]);
  const [cities, setCity] = useState([]);

  const handleOrganization = (e) => {
    const selectedOrganizationId = e.target.value;

    console.log("Selected Organization ID:", selectedOrganizationId);

    setAddschool((prevAddSchool) => ({
      ...prevAddSchool,
      organization_id: selectedOrganizationId,
    }));
  };

  const handleState = (e) => {
    const selectedStateId = e.target.value;

    console.log("Selected State ID:", selectedStateId);

    axios
      .post("https://api.vidyamate.in/MachineTest/get_city_list/", {
        state_id: selectedStateId,
      })
      .then((response) => {
        console.log(response);
        setCity(response.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });

    setAddschool((prevAddSchool) => ({
      ...prevAddSchool,
      state_id: selectedStateId,
    }));
  };

  const handleCity = (e) => {
    const selectedCityId = e.target.value;

    console.log("Selected City ID:", selectedCityId);

    setAddschool((prevAddSchool) => ({
      ...prevAddSchool,
      city_id: selectedCityId,
    }));
  };

  const handleSubmit = (e) => {
    axios
      .post("https://api.vidyamate.in/MachineTest/register_school/", addschool)
      .then((response) => {
        console.log("post", response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleSubmit();

    axios
      .get("https://api.vidyamate.in/MachineTest/get_organization/")
      .then((response) => {
        // console.log(response.data.payload);
        // console.log("Organization ID", e.target.value);
        setOrganizations(response.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://api.vidyamate.in/MachineTest/get_state_list/")
      .then((response) => {
        // console.log(response.data.payload);
        // console.log("State ID",e.target.value)
        setState(response.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <SchoolRegistration />
      <div className="container-fluid">
        <div className="row flex-nowrap">
          {/* <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-primary'>
                <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
                    <Link to='/dashboard' className='d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none'>
                        <span className='fs-5 fw-bolder d-none d-sm-inline'>Vidyamate</span>
                    </Link>
                    <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start' id='menu'>
                        <li className='w-100'>
                            <Link to='/dashboard' className='nav-link text-white px-0 align-middle'><i className='fs-4 bi-speedometer2 ms-2'></i><span className='ms-2 d-none d-sm-inline'>Dashboard</span></Link>
                        </li>
                        <li className='w-100'>
                            <Link to='/dashboard/masters' className='nav-link text-white px-0 align-middle'><i className='fs-4 bi-people-fill ms-2'></i><span className='ms-2 d-none d-sm-inline'>Masters</span></Link>
                        </li>
                        <li className='w-100'>
                            <Link to='/dashboard/organization' className='nav-link text-white px-0 align-middle'><i className='fs-4 bi-building-fill ms-2'></i><span className='ms-2 d-none d-sm-inline'>Organization</span></Link>
                        </li>
                        <li className='w-100'>
                            <Link to='/dashboard/academicsession' className='nav-link text-white px-0 align-middle'><i className='fs-4 bi-calendar-check ms-2'></i><span className='ms-2 d-none d-sm-inline'>Academic Session</span></Link>
                        </li>
                        <li className='w-100'>
                            <Link to='/dashboard/schoollist' className='nav-link text-white px-0 align-middle'><i className='fs-4 bi-mortarboard-fill ms-2'></i><span className='ms-2 d-none d-sm-inline'>School Registration</span></Link>
                        </li>
                        <li className='w-100'>
                            <Link to='/dashboard/users' className='nav-link text-white px-0 align-middle'><i className='fs-4 bi-person-circle ms-2'></i><span className='ms-2 d-none d-sm-inline'>Users</span></Link>
                        </li>
                    </ul>
                </div>
            </div> */}
          <div className="rounded border col-2 col-md-3 col-xl-2 px-sm-2 px-0 m-1">
            <RegistrationMenu />
          </div>
          <div className="rounded border col-10 row p-0 m-0">
            <div className="row">
              <h5 className="text-center">Add School</h5>
              <form className="row g-1">
                <div className="col-8">
                  <div className="mb-1 row">
                    <label
                      htmlFor="inputOrganization"
                      className="col-sm-2 col-form-label fw-bold"
                    >
                      Organization
                      <sup className="control-label">*</sup>
                    </label>
                    <div className="col-sm-10">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="organization_id"
                        onChange={handleOrganization}
                      >
                        <option value="">Select</option>
                        {organizations.map((org) => (
                          <option key={org.id} value={org.id}>
                            {org.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-1 row">
                    <label
                      htmlFor="inputOrganization"
                      className="col-sm-2 col-form-label fw-bold"
                    >
                      School Name
                      <sup className="control-label">*</sup>
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="inputSchoolName"
                        placeholder="Enter School Name"
                        name="name"
                        value={addschool.name}
                        onChange={handleData}
                      />
                    </div>
                  </div>

                  <div className="mb-1 row">
                    <label
                      htmlFor="inputUDISENo"
                      className="col-sm-2 col-form-label fw-bold"
                    >
                      U-DISE No
                      <sup className="control-label">*</sup>
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="inputUDISENo"
                        placeholder="Please Enter U-DISE Number"
                        name="udise_no"
                        value={addschool.udise_no}
                        onChange={handleData}
                      />
                    </div>
                  </div>

                  <div className="mb-1 row">
                    <label
                      htmlFor="inputAddress"
                      className="col-sm-2 col-form-label fw-bold"
                    >
                      Address
                      <sup className="control-label">*</sup>
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        placeholder="Enter Address"
                        name="address"
                        value={addschool.address}
                        onChange={handleData}
                      />
                    </div>
                  </div>

                  <div className="mb-1 row">
                    <label
                      htmlFor="inputState"
                      className="col-sm-2 col-form-label fw-bold"
                    >
                      State
                      <sup className="control-label">*</sup>
                    </label>
                    <div className="col-sm-10">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="state_id"
                        onChange={handleState}
                      >
                        <option value="">Select</option>
                        {states.map((state) => (
                          <option key={state.id} value={state.id}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-1 row">
                    <label
                      htmlFor="inputCity"
                      className="col-sm-2 col-form-label fw-bold"
                    >
                      City
                      <sup className="control-label">*</sup>
                    </label>
                    <div className="col-sm-10">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="city_id"
                        onChange={handleCity}
                      >
                        <option value="">Select</option>
                        {cities.map((city, i) => (
                          <option key={i} value={city.id}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-1 row">
                    <label
                      htmlFor="inputPincode"
                      className="col-sm-2 col-form-label fw-bold"
                    >
                      Pincode
                      <sup className="control-label">*</sup>
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="inputPincode"
                        placeholder="Enter Pincode"
                        name="pincode"
                        value={addschool.pincode}
                        onChange={handleData}
                      />
                    </div>
                  </div>

                  <div className="mb-1 row">
                    <label
                      htmlFor="inputStatus"
                      className="col-sm-2 col-form-label fw-bold"
                    >
                      Status
                      <sup className="control-label">*</sup>
                    </label>
                    <div className="col-sm-10 form-check checkbox-xl form-switch">
                      <input
                        className="form-check-input "
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        name="status"
                        checked={addschool.status}
                        // value={addschool.status}
                        onChange={handleData}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckDefault"
                      >
                        {addschool.status ? "Yes" : "No"}
                      </label>
                    </div>
                  </div>

                  <div className="mb-1 row">
                    <label
                      htmlFor="inputContactPerson"
                      className="col-sm-2 col-form-label fw-bold"
                    >
                      Contact Person
                      <sup className="control-label">*</sup>
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="inputContactPerson"
                        placeholder="Enter Contact Person"
                        name="contact_person"
                        value={addschool.contact_person}
                        onChange={handleData}
                      />
                    </div>
                  </div>

                  <div className="mb-1 row">
                    <label
                      htmlFor="inputContactNumber"
                      className="col-sm-2 col-form-label fw-bold"
                    >
                      Contact Number
                      <sup className="control-label">*</sup>
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="number"
                        className="form-control"
                        id="inputContactNumber"
                        placeholder="Enter Contact Number"
                        name="contact_number"
                        value={addschool.contact_number}
                        onChange={handleData}
                      />
                    </div>
                  </div>

                  <div className="mb-1 row">
                    <label
                      htmlFor="inputContactEmail"
                      className="col-sm-2 col-form-label fw-bold"
                    >
                      Contact Email
                      <sup className="control-label">*</sup>
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="email"
                        className="form-control"
                        id="inputContactEmail"
                        placeholder="Enter Contact Email"
                        name="contact_email"
                        value={addschool.contact_email}
                        onChange={handleData}
                      />
                    </div>
                  </div>

                  <div className="mb-1 row">
                    <label
                      htmlFor="inputLogo"
                      className="col-sm-2 col-form-label fw-bold"
                    >
                      School Logo
                      <sup className="control-label">*</sup>
                    </label>
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        type="file"
                        name="school_logo"
                        value={addschool.school_logo}
                        onChange={handleData}
                        id="formFile"
                      />
                    </div>
                  </div>

                  <div className="mb-1 row">
                    <div className="col-sm-10">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-4 ">
                  <img
                    style={{ width: "200px" }}
                    src={Person}
                    alt="Person image"
                  />
                  <h4>Module Access</h4>
                  <div className="mb-1 row">
                    <div className="col-8">
                      <label
                        htmlFor="inputStatus"
                        className="col-auto col-form-label fw-bold"
                      >
                        Administration
                      </label>
                    </div>
                    <div className="col-4 form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        name="status"
                        // checked={addschool.status}
                        // value={addschool.status}
                        // onChange={handleData}
                      />
                    </div>
                  </div>
                  <div className="mb-1 row">
                    <div className="col-8">
                      <label
                        htmlFor="inputStatus"
                        className="col-auto col-form-label fw-bold"
                      >
                        Admission
                      </label>
                    </div>
                    <div className="col-4 form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        name="status"
                        // checked={addschool.status}
                        // value={addschool.status}
                        // onChange={handleData}
                      />
                    </div>
                  </div>
                  <div className="mb-1 row">
                    <div className="col-8">
                      <label
                        htmlFor="inputStatus"
                        className="col-auto col-form-label fw-bold"
                      >
                        Attendance
                      </label>
                    </div>
                    <div className="col-4 form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        name="status"
                        // checked={addschool.status}
                        // value={addschool.status}
                        // onChange={handleData}
                      />
                    </div>
                  </div>
                  <div className="mb-1 row">
                    <div className="col-8">
                      <label
                        htmlFor="inputStatus"
                        className="col-auto col-form-label fw-bold"
                      >
                        Communication
                      </label>
                    </div>
                    <div className="col-4 form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        name="status"
                        // checked={addschool.status}
                        // value={addschool.status}
                        // onChange={handleData}
                      />
                    </div>
                  </div>
                  <div className="mb-1 row">
                    <div className="col-8">
                      <label
                        htmlFor="inputStatus"
                        className="col-auto col-form-label fw-bold"
                      >
                        Examination
                      </label>
                    </div>
                    <div className="col-4 form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        name="status"
                        // checked={addschool.status}
                        // value={addschool.status}
                        // onChange={handleData}
                      />
                    </div>
                  </div>
                  <div className="mb-1 row">
                    <div className="col-8">
                      <label
                        htmlFor="inputStatus"
                        className="col-auto col-form-label fw-bold"
                      >
                        Fees
                      </label>
                    </div>
                    <div className="col-4 form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        name="status"
                        // checked={addschool.status}
                        // value={addschool.status}
                        // onChange={handleData}
                      />
                    </div>
                  </div>
                  <div className="mb-1 row">
                    <div className="col-8">
                      <label
                        htmlFor="inputStatus"
                        className="col-auto col-form-label fw-bold"
                      >
                        Hostel
                      </label>
                    </div>
                    <div className="col-4 form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        name="status"
                        // checked={addschool.status}
                        // value={addschool.status}
                        // onChange={handleData}
                      />
                    </div>
                  </div>
                  <div className="mb-1 row">
                    <div className="col-8">
                      <label
                        htmlFor="inputStatus"
                        className="col-auto col-form-label fw-bold"
                      >
                        LMS
                      </label>
                    </div>
                    <div className="col-4 form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        name="status"
                        // checked={addschool.status}
                        // value={addschool.status}
                        // onChange={handleData}
                      />
                    </div>
                  </div>
                  <div className="mb-1 row">
                    <div className="col-8">
                      <label
                        htmlFor="inputStatus"
                        className="col-auto col-form-label fw-bold"
                      >
                        Time Table
                      </label>
                    </div>
                    <div className="col-4 form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        name="status"
                        // checked={addschool.status}
                        // value={addschool.status}
                        // onChange={handleData}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container d-flex justify-content-center align-items-center mt-2 col">
        <div className="rounded border col-2 m-1 p-2">
          <RegistrationMenu/>
        </div>
        <div className=" rounded border row col-10 bg-white m-1 p-2">
         <div className="col-8">
         <h5 className="text-center">Add School</h5>
          <form className="row g-1 ">
            <div className="mb-1 row">
              <label
                htmlFor="inputOrganization"
                className="col-sm-2 col-form-label fw-bold"
              >
                Organization
                <sup className="control-label">*</sup>
              </label>
              <div className="col-sm-10">
                <select
                  className="form-select "
                  aria-label="Default select example"
                  name="organization_id"
                  // value={addschool.organization_id}
                  onChange={handleOrganization}
                >
                  <option value="" selected>
                    Select
                  </option>
                  {organizations.map((org, i) => (
                    <option key={i} value={org.id} name="organization_id">
                      {org.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-1 row">
              <label
                htmlFor="inputOrganization"
                className="col-sm-2 col-form-label fw-bold"
              >
                School Name
                <sup className="control-label">*</sup>
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputSchoolName"
                  placeholder="Enter School Name"
                  name="name"
                  value={addschool.name}
                  onChange={handleData}
                />
              </div>
            </div>

            <div className="mb-1 row">
              <label
                htmlFor="inputUDISENo"
                className="col-sm-2 col-form-label fw-bold"
              >
                U-DISE No
                <sup className="control-label">*</sup>
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputUDISENo"
                  placeholder="Please Enter U-DISE Number"
                  name="udise_no"
                  value={addschool.udise_no}
                  onChange={handleData}
                />
              </div>
            </div>

            <div className="mb-1 row">
              <label
                htmlFor="inputAddress"
                className="col-sm-2 col-form-label fw-bold"
              >
                Address
                <sup className="control-label">*</sup>
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="Enter Address"
                  name="address"
                  value={addschool.address}
                  onChange={handleData}
                />
              </div>
            </div>

            <div className="mb-1 row">
              <label
                htmlFor="inputState"
                className="col-sm-2 col-form-label fw-bold"
              >
                State
                <sup className="control-label">*</sup>
              </label>
              <div className="col-sm-10">
                <select
                  className="form-select "
                  aria-label="Default select example"
                  name="state_id"
                  onChange={handleState}
                >
                  <option selected>Select</option>
                  {states.map((state, i) => (
                    <option key={i} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-1 row">
              <label
                htmlFor="inputCity"
                className="col-sm-2 col-form-label fw-bold"
              >
                City
                <sup className="control-label">*</sup>
              </label>
              <div className="col-sm-10">
                <select
                  className="form-select "
                  aria-label="Default select example"
                  name="city_id"
                  onChange={handleCity}
                >
                  <option selected>Select</option>
                  {cities.map((city, i) => (
                    <option key={i} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-1 row">
              <label
                htmlFor="inputPincode"
                className="col-sm-2 col-form-label fw-bold"
              >
                Pincode
                <sup className="control-label">*</sup>
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputPincode"
                  placeholder="Enter Pincode"
                  name="pincode"
                  value={addschool.pincode}
                  onChange={handleData}
                />
              </div>
            </div>

            <div className="mb-1 row">
              <label
                htmlFor="inputStatus"
                className="col-sm-2 col-form-label fw-bold"
              >
                Status
                <sup className="control-label">*</sup>
              </label>
              <div className="col-sm-10 form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  name="status"
                  checked={addschool.status}
                  // value={addschool.status}
                  onChange={handleData}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  {addschool.status ? "Yes" : "No"}
                </label>
              </div>
            </div>

            <div className="mb-1 row">
              <label
                htmlFor="inputContactPerson"
                className="col-sm-2 col-form-label fw-bold"
              >
                Contact Person
                <sup className="control-label">*</sup>
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputContactPerson"
                  placeholder="Enter Contact Person"
                  name="contact_person"
                  value={addschool.contact_person}
                  onChange={handleData}
                />
              </div>
            </div>

            <div className="mb-1 row">
              <label
                htmlFor="inputContactNumber"
                className="col-sm-2 col-form-label fw-bold"
              >
                Contact Number
                <sup className="control-label">*</sup>
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  id="inputContactNumber"
                  placeholder="Enter Contact Number"
                  name="contact_number"
                  value={addschool.contact_number}
                  onChange={handleData}
                />
              </div>
            </div>

            <div className="mb-1 row">
              <label
                htmlFor="inputContactEmail"
                className="col-sm-2 col-form-label fw-bold"
              >
                Contact Email
                <sup className="control-label">*</sup>
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  id="inputContactEmail"
                  placeholder="Enter Contact Email"
                  name="contact_email"
                  value={addschool.contact_email}
                  onChange={handleData}
                />
              </div>
            </div>

            <div className="mb-1 row">
              <label
                htmlFor="inputLogo"
                className="col-sm-2 col-form-label fw-bold"
              >
                School Logo
                <sup className="control-label">*</sup>
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  type="file"
                  name="school_logo"
                  value={addschool.school_logo}
                  onChange={handleData}
                  id="formFile"
                />
              </div>
            </div>

            <div className="mb-1 row">
              <div className="col-sm-10">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
         </div>
          <div className="col-4">
          Biranwar
        </div>
        </div>      
      </div> */}
    </>
  );
};

export default AddSchool;
