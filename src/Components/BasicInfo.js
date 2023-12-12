import React, { useEffect, useState } from 'react'
import SchoolRegistration from './SchoolRegistration'
import AddSchool from './AddSchool'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Person from "../Images/person.jpg";


const BasicInfo = () => {
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
    modules:[],
    // insert_by:"2",

  };
  const [addschool, setAddschool] = useState(data);
  const [selectedModules, setSelectedModules]=useState([]);

  const handleData = (e) => {
    const { name, value } = e.target;

    const isCheckbox = e.target.type === "checkbox";

    setAddschool((prevAddSchool) => ({
      ...prevAddSchool,
      [name]: isCheckbox ? e.target.checked : value,
      organization_id: name === "organization_id" ? value : prevAddSchool.organization_id,
      state_id: name === "state_id" ? value : prevAddSchool.state_id,
      city_id: name === "city_id" ? value : prevAddSchool.city_id,
      school_logo: name==="school_logo" ? value: prevAddSchool.school_logo
    }));
  };

  const [organizations, setOrganizations] = useState([]);
  const [states, setState] = useState([]);
  const [cities, setCity] = useState([]);
  const [module, setModule] = useState([]);
  const [image, setImage]=useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFile=(e)=>{
    const file=e.target.files[0];
    // console.log(e.target.files);

    setImage(file);
    setSelectedImage(URL.createObjectURL(file));
  };

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

const navigate=useNavigate();

  const handleSubmit = (e) => {
    const formData = new FormData();
    formData.append('organization_id', addschool.organization_id);
    formData.append('name', addschool.name);
    formData.append('udise_no', addschool.udise_no);
    formData.append('address', addschool.address);
    formData.append('state_id', addschool.state_id);
    formData.append('city_id', addschool.city_id);
    formData.append('pincode', addschool.pincode);
    formData.append('status', addschool.status);
    formData.append('contact_person', addschool.contact_person);
    formData.append('contact_number', addschool.contact_number);
    formData.append('contact_email', addschool.contact_email);
    formData.append('modules',JSON.stringify(selectedModules));
    // formData.append('inserted_by',addschool.insert_by);
    formData.append('school_logo', image);

    axios
      .post("https://api.vidyamate.in/MachineTest/register_school/", formData)
      .then((response) => {
        console.log("post", response);
        navigate("/dashboard/schoolregistration/schoollist");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleModuleToggle=(moduleName)=>{
    const updatedModules=[...selectedModules];

    if(updatedModules.includes(moduleName)){
      const index=updatedModules.indexOf(moduleName);
      updatedModules.splice(index,1);
    }else{
      updatedModules.push(moduleName);
    }
    setSelectedModules(updatedModules);
  };

  useEffect(() => {
    // handleSubmit();   
    axios
      .get("https://api.vidyamate.in/MachineTest/get_organization/")
      .then((response) => {
        // console.log(response.data.payload);
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

    axios
      .get("https://api.vidyamate.in/MachineTest/module_list/")
      .then((response) => {
        console.log("modules",response);
        setModule(response.data.payload);
      })
      .catch((error) => {
        console.log(error);
      });
      
  }, []);
  return (
   <>
       <div className="rounded border col-10 row ps-3 m-0">
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
                        // value={addschool.school_logo}
                        onChange={handleFile}
                        id="formFile"
                      />
                    </div>
                  </div>

                  <div className="mb-1 row">
                    <div className="col-sm-10">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleSubmit}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <img
                    style={{ width: "200px",height:"170px", borderRadius: "50%", objectFit: "cover" }}
                    src={selectedImage ||Person}
                    alt="Person image"
                  />
                  <h4>Module Access</h4>
                    {module.map((mod,index) => (
                      <div className="form-check form-switch" key={index}>
                        <label
                          className="form-check-label"
                          htmlFor={`moduleSwitch${index}`}
                        >
                          {mod.name}
                        </label>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id={`moduleSwitch${index}`}
                          checked={selectedModules.includes(mod.id)}
                          onChange={()=>handleModuleToggle(mod.id)}
                        />
                      </div>
                    ))}
                </div>
              </form>
            </div>
          </div>
   </>
    )
}

export default BasicInfo