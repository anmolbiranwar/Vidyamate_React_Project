import React from 'react'
import SchoolRegistration from './SchoolRegistration'

const EditSchool = () => {
  return (
    <>
    <SchoolRegistration/>
    <div className="container d-flex justify-content-center align-items-center mt-1">
        <div className=" rounded border  bg-white p-2">
          <h5 className="text-center">Edit School</h5>
          <form className="row g-1 " >
            
          <div className="mb-1 row">
              <label
                htmlFor="inputSrNo"
                className="col-sm-2 col-form-label fw-bold"
              >
                Sr.No
                <sup className="control-label">*</sup>
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputSrNo"
                  placeholder="Enter Serial Number"
                />
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
                  

                />
              </div>
            </div>


            <div className="mb-1 row">
              <label htmlFor="inputState" className="col-sm-2 col-form-label fw-bold">
                State
                <sup className="control-label">*</sup>
              </label>
              <div className="col-sm-10">
                <select
                  className="form-select "
                  aria-label="Default select example"
                 
                >
                  <option selected>Select</option>
                  <option value="1">State 1</option>
                  <option value="2">State 2</option>
                  <option value="3">State 3</option>
                </select>
              </div>
            </div>

            <div className="mb-1 row">
              <label htmlFor="inputCity" className="col-sm-2 col-form-label fw-bold">
                City
                <sup className="control-label">*</sup>
              </label>
              <div className="col-sm-10">
                <select
                  className="form-select "
                  aria-label="Default select example"
                 
                >
                  <option selected>Select</option>
                  <option value="1">City 1</option>
                  <option value="2">City 2</option>
                  <option value="3">City 3</option>
                </select>
              </div>
            </div>

            <div className="mb-1 row">
              <label htmlFor="inputStatus" className="col-sm-2 col-form-label fw-bold">
                Status
                <sup className="control-label">*</sup>
              </label>
              <div className="col-sm-10 form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                 
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  No
                </label>
              </div>
            </div>
            
            <div className="mb-1 row">
              <label htmlFor="inputContactNumber" className="col-sm-2 col-form-label fw-bold">
                Contact Number
                <sup className="control-label">*</sup>
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  id="inputContactNumber"
                  placeholder="Enter Contact Number"
                  
                />
              </div>
            </div>

            <div className="mb-1 row">
              <label htmlFor="inputContactEmail" className="col-sm-2 col-form-label fw-bold">
                Contact Email
                <sup className="control-label">*</sup>
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  id="inputContactEmail"
                  placeholder="Enter Contact Email"
                 
                />
              </div>
            </div>

            <div className="mb-1 row">
              <label htmlFor="inputLogo" className="col-sm-2 col-form-label fw-bold">
                School Logo
                <sup className="control-label">*</sup>
              </label>
              <div className="col-sm-10">
              <input className="form-control" type="file" id="formFile"  />
              </div>
            </div>

            <div className="mb-1 row">
              <div className="col-sm-10">
              <button type="button" className="btn btn-primary">Save</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </>
    
  )
}

export default EditSchool