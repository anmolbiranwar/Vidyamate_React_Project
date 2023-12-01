import React, { useEffect, useState } from "react";
import SchoolRegistration from "./SchoolRegistration";
import '../CSS/AddSchool.css'
import axios from "axios";

const AddSchool = () => {
  const data={
    organization_id:'',
    name:'',
    udise_no:'',
    address:'',
    state_id:'',
    city_id:'',
    pincode:'',
    status:'',
    contact_person:'',
    contact_number:'',
    contact_email:'',
    school_logo:''
  }
  const [addschool,setAddschool]=useState(data);

  const handleData=(e)=>{
    setAddschool({...addschool,[e.target.name]:e.target.value})
  }

  const handleSubmit=(e)=>{
    // console.log(addschool);
    // e.preventDefault();
    axios.post('https://api.vidyamate.in/MachineTest/register_school/',addschool)
    .then(response=>{
      console.log("post",response)
    })
    .catch(err=>{
      console.log(err);
    });
  }

const [organizations,setOrganizations]=useState([]);
const [states,setState]=useState([]);
const [cities,setCity]=useState([]);

function handleOrganization(){
  axios.get('https://api.vidyamate.in/MachineTest/get_organization/')
  .then(response=>{
    console.log(response.data.payload);
    setOrganizations(response.data.payload);
  })
  .catch(err=>{
    console.log(err);
  });
}

  function handleState(){
    axios.get('https://api.vidyamate.in/MachineTest/get_state_list/')
    .then(response=>{
      // console.log(response.data.payload);
      setState(response.data.payload)
    })
    .catch(err=>{
      console.log(err);
    });
  }

  function handleCity(){
    axios.post('https://api.vidyamate.in/MachineTest/get_city_list/')
    .then(response=>{
      // console.log(response.data.destrict_data);
      setCity(response.data.destrict_data)
    })
    .catch(err=>{
      console.log(err);
    });
  }

  useEffect(()=>{
    handleSubmit();
    handleState();
    handleCity();
    handleOrganization();
  },[]);

  return (
    <>
      <SchoolRegistration />
      <div className="container d-flex justify-content-center align-items-center mt-1">
        <div className=" rounded border  bg-white p-2">
          <h5 className="text-center">Add School</h5>
          <form className="row g-1 " >
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
                  onChange={handleOrganization}
                >
                  <option selected>Select</option>
                  {
                    organizations.map((org,i)=>
                       <option key={i} value={org.name}>{org.name}</option>
                    )
                  }
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
              <label htmlFor="inputUDISENo" className="col-sm-2 col-form-label fw-bold">
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
              <label htmlFor="inputAddress" className="col-sm-2 col-form-label fw-bold">
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
              <label htmlFor="inputState" className="col-sm-2 col-form-label fw-bold">
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
                  {
                    states.map((state,i)=>
                       <option key={i} value={state.name}>{state.name}</option>
                    )
                  }
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
                  name="city_id"
                  onChange={handleCity}
                >
                  <option selected>Select</option>
                  {
                    cities.map((city,i)=>
                    <option key={i} value={city.name}>{city.name}</option>
                    )
                  }
                </select>
              </div>
            </div>

            <div className="mb-1 row">
              <label htmlFor="inputPincode" className="col-sm-2 col-form-label fw-bold">
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
              <label htmlFor="inputStatus" className="col-sm-2 col-form-label fw-bold">
                Status
                <sup className="control-label">*</sup>
              </label>
              <div className="col-sm-10 form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  name="status"
                  value={addschool.status}
                  onChange={handleData}

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
              <label htmlFor="inputContactPerson" className="col-sm-2 col-form-label fw-bold">
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
                  name="contact_number"
                  value={addschool.contact_number}
                  onChange={handleData}

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
              <label htmlFor="inputLogo" className="col-sm-2 col-form-label fw-bold">
                School Logo
                <sup className="control-label">*</sup>
              </label>
              <div className="col-sm-10">
              <input className="form-control" type="file" name="school_logo"  value={addschool.school_logo} onChange={handleData} id="formFile"  />
              </div>
            </div>

            <div className="mb-1 row">
              <div className="col-sm-10">
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default AddSchool;
