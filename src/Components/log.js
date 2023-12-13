import React, { useEffect, useState } from "react";
import axios from "axios";
import SchoolRegistration from "./SchoolRegistration";
import { useNavigate, useParams } from "react-router-dom";

const EditSchool = ({ match }) => {
  const { schoolId } = useParams();
  // console.log(schoolId);
  const [addschool, setAddschool] = useState({
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
    modules: [],
    insert_by: 2,
  });
  // console.log(addschool);
  const [data, setData] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [states, setState] = useState([]);
  const [cities, setCity] = useState([]);
  const [module, setModule] = useState([]);
  const [image, setImage] = useState("");

  const handleFile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleOrganization = (e) => {
    const selectedOrganizationId = e.target.value;
    setAddschool((prevAddSchool) => ({
      ...prevAddSchool,
      organization_id: selectedOrganizationId,
    }));
  };

  const handleState = (e) => {
    const selectedStateId = e.target.value;

    axios
      .post("https://api.vidyamate.in/MachineTest/get_city_list/", {
        state_id: selectedStateId,
      })
      .then((response) => {
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

    setData((prevAddSchool) => ({
      ...prevAddSchool,
      city_id: selectedCityId,
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("organization_id", data.organization_id);
    formData.append("name", data.name);
    formData.append("udise_no", data.udise_no);
    formData.append("address", data.address);
    formData.append("state_id", data.state_id);
    formData.append("city_id", data.city_id);
    formData.append("pincode", data.pincode);
    formData.append("status", data.status);
    formData.append("contact_person", data.contact_person);
    formData.append("contact_number", data.contact_number);
    formData.append("contact_email", data.contact_email);
    formData.append("school_logo", image);

    const url = `https://api.vidyamate.in/MachineTest/edi_school_details/`;

    axios({
      method: "POST",
      url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("handleSubmit", response);
        navigate("/dashboard/schoolregistration/schoollist");
        // Additional logic after successful update
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // const schoolId = match && match.params && match.params.id;

    if (schoolId) {
      axios
        .get(
          `https://api.vidyamate.in/MachineTest/get_school_designation_list/
        `
        )
        .then((response) => {
          const schoolDetails = response.data.school_list;
          const selectedSchool = schoolDetails.find(
            (school) => school.id == schoolId
          );
          if (selectedSchool) {
            console.log(selectedSchool);
            setData(selectedSchool);
          } else {
            console.log("Data not found");
          }
          // console.log(selectedSchool);
          // setAddschool({
          //   ...schoolDetails,
          //   organization_id: String(schoolDetails.organization_id),
          //   state_id: String(schoolDetails.state_id),
          //   city_id: String(schoolDetails.city_id),
          // });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    axios
      .get("https://api.vidyamate.in/MachineTest/get_organization/")
      .then((response) => {
        setOrganizations(response.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://api.vidyamate.in/MachineTest/get_state_list/")
      .then((response) => {
        setState(response.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://api.vidyamate.in/MachineTest/module_list/")
      .then((response) => {
        setModule(response.data.payload);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [schoolId]);
  // console.log("data",data)
  return (
    <>
      <SchoolRegistration />
      <div className="row border rounded col-11 ms-5 mt-2">
        <h5 className="text-center">{`Edit School`}</h5>

        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-6 ms-5">
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
                  value={data.organization}
                >
                  <option value="">{data.organization}</option>
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
                  placeholder={"Enter School Name"}
                  name="name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
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
                  value={data.udise_no}
                  onChange={(e) =>
                    setData({ ...data, udise_no: e.target.value })
                  }
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
                  value={data.address}
                  onChange={(e) =>
                    setData({ ...data, address: e.target.value })
                  }
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
                  <option value="">{data.state}</option>
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
                  <option value="">{data.city}</option>
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
                  value={data.pincode}
                  onChange={(e) =>
                    setData({ ...data, pincode: e.target.value })
                  }
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
                  checked={data.status}
                  // value={addschool.status}
                  // onChange={handleData}
                  onChange={(e) =>
                    setData({ ...data, status: e.target.checked })
                  }
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  {data.status ? "Yes" : "No"}
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
                  value={data.contact_person}
                  // onChange={handleData}
                  onChange={(e) =>
                    setData({ ...data, contact_person: e.target.value })
                  }
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
                  value={data.contact_number}
                  // onChange={handleData}
                  onChange={(e) =>
                    setData({ ...data, contact_number: e.target.value })
                  }
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
                  value={data.contact_email}
                  // onChange={handleData}
                  onChange={(e) =>
                    setData({ ...data, contact_email: e.target.value })
                  }
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
                  // value={data.school_logo}
                  onChange={handleFile}
                  id="formFile"
                />
              </div>
            </div>

            <div className="mb-1 row">
              <div className="col-sm-10">
                <button type="submit" className="btn btn-success">
                  Update
                </button>
              </div>
            </div>
          </div>
          <div className="col-4 ms-5">
            <img style={{ width: "200px" }} alt="Person" />
            <h4>Module Access</h4>
            {module.map((l, i) => (
              <div className="form-check form-switch" key={i}>
                <label
                  className="form-check-label"
                  htmlFor={`flexSwitchCheckDefault_${i}`}
                >
                  {l.name}
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id={`flexSwitchCheckDefault_${i}`}
                  value={l.name}
                />
              </div>
            ))}
          </div>
        </form>
      </div>
    </>
  );
};

export default EditSchool;

import React, { useEffect, useState } from "react";
import axios from "axios";
import SchoolRegistration from "./SchoolRegistration";
import { useNavigate, useParams } from "react-router-dom";

const EditSchool = ({ match }) => {
  const { schoolId } = useParams();
  // console.log(schoolId);
  const [addschool, setAddschool] = useState({
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
    modules: [],
    insert_by: 2,
  });
  // console.log(addschool);
  const [data, setData] = useState({ 
  organization_id: "",  // Make sure to include this property
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
  modules: [],
  insert_by: 2,
});

  const [organizations, setOrganizations] = useState([]);
  const [states, setState] = useState([]);
  const [cities, setCity] = useState([]);
  const [module, setModule] = useState([]);
  const [image, setImage] = useState("");

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
  setImage(selectedFile);
  
  };

  const handleOrganization = (e) => {
    const selectedOrganizationId = e.target.value;
    setData((prevAddSchool) => ({
      ...prevAddSchool,
      organization_id: selectedOrganizationId,
    }));
  };

  const handleState = (e) => {
    const selectedStateId = e.target.value;

    axios
      .post("https://api.vidyamate.in/MachineTest/get_city_list/", {
        state_id: selectedStateId,
      })
      .then((response) => {
        setCity(response.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });

    setData((prevAddSchool) => ({
      ...prevAddSchool,
      state_id: selectedStateId,
    }));
  };

  const handleCity = (e) => {
    const selectedCityId = e.target.value;

    setData((prevAddSchool) => ({
      ...prevAddSchool,
      city_id: selectedCityId,
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("organization_id", data.organization_id);
    formData.append("name", data.name);
    formData.append("udise_no", data.udise_no);
    formData.append("address", data.address);
    formData.append("state_id", data.state_id);
    formData.append("city_id", data.city_id);
    formData.append("pincode", data.pincode);
    formData.append("status", data.status);
    formData.append("contact_person", data.contact_person);
    formData.append("contact_number", data.contact_number);
    formData.append("contact_email", data.contact_email);
    if (image) {
      formData.append("school_logo", image, image.name);
    }
    const url = `https://api.vidyamate.in/MachineTest/edi_school_details/`;

    axios({
      method: "POST",
      url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("handleSubmit", response);
        navigate("/dashboard/schoolregistration/schoollist");
        // Additional logic after successful update
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // const schoolId = match && match.params && match.params.id;

    if (schoolId) {
      axios
        .get(
          `https://api.vidyamate.in/MachineTest/get_school_designation_list/
        `
        )
        .then((response) => {
          const schoolDetails = response.data.school_list;
          const selectedSchool = schoolDetails.find(
            (school) => school.id == schoolId
          );
          if (selectedSchool) {
            console.log(selectedSchool);
            const {
              organization_id,
              name,
              udise_no,
              address,
              state_id,
              city_id,
              pincode,
              status,
              contact_person,
              contact_number,
              contact_email,
              school_logo,
            } = selectedSchool;

            setData({
              organization_id,
              name,
              udise_no,
              address,
              state_id,
              city_id,
              pincode,
              status,
              contact_person,
              contact_number,
              contact_email,
              school_logo,
              modules: [],  // Make sure to include this property if needed
              insert_by: 2,  // Make sure to include this property if needed
            });
            // setData(selectedSchool);
          } else {
            console.log("Data not found");
          }
          // console.log(selectedSchool);
          // setAddschool({
          //   ...schoolDetails,
          //   organization_id: String(schoolDetails.organization_id),
          //   state_id: String(schoolDetails.state_id),
          //   city_id: String(schoolDetails.city_id),
          // });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    axios
      .get("https://api.vidyamate.in/MachineTest/get_organization/")
      .then((response) => {
        setOrganizations(response.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://api.vidyamate.in/MachineTest/get_state_list/")
      .then((response) => {
        setState(response.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://api.vidyamate.in/MachineTest/module_list/")
      .then((response) => {
        setModule(response.data.payload);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [schoolId]);
  // console.log("data",data)
  return (
    <>
      <SchoolRegistration />
      <div className="row border rounded col-11 ms-5 mt-2">
        <h5 className="text-center">{`Edit School`}</h5>

        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-6 ms-5">
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
                  value={data.organization_id}
                >
                  <option value="">{data.organization_id}</option>
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
                  placeholder={"Enter School Name"}
                  name="name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
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
                  value={data.udise_no}
                  onChange={(e) =>
                    setData({ ...data, udise_no: e.target.value })
                  }
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
                  value={data.address}
                  onChange={(e) =>
                    setData({ ...data, address: e.target.value })
                  }
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
                  <option value="">{data.state_id}</option>
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
                  <option value="">{data.city_id}</option>
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
                  value={data.pincode}
                  onChange={(e) =>
                    setData({ ...data, pincode: e.target.value })
                  }
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
                  checked={data.status}
                  // value={addschool.status}
                  // onChange={handleData}
                  onChange={(e) =>
                    setData({ ...data, status: e.target.checked })
                  }
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  {data.status ? "Yes" : "No"}
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
                  value={data.contact_person}
                  // onChange={handleData}
                  onChange={(e) =>
                    setData({ ...data, contact_person: e.target.value })
                  }
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
                  value={data.contact_number}
                  // onChange={handleData}
                  onChange={(e) =>
                    setData({ ...data, contact_number: e.target.value })
                  }
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
                  value={data.contact_email}
                  // onChange={handleData}
                  onChange={(e) =>
                    setData({ ...data, contact_email: e.target.value })
                  }
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
                  // value={data.school_logo}
                  onChange={handleFile}
                  id="formFile"
                />
              </div>
            </div>

            <div className="mb-1 row">
              <div className="col-sm-10">
                <button type="submit" className="btn btn-success">
                  Update
                </button>
              </div>
            </div>
          </div>
          <div className="col-4 ms-5">
            <img style={{ width: "200px" }} alt="Person" />
            <h4>Module Access</h4>
            {module.map((l, i) => (
              <div className="form-check form-switch" key={i}>
                <label
                  className="form-check-label"
                  htmlFor={`flexSwitchCheckDefault_${i}`}
                >
                  {l.name}
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id={`flexSwitchCheckDefault_${i}`}
                  value={l.name}
                />
              </div>
            ))}
          </div>
        </form>
      </div>
    </>
  );
};

export default EditSchool;


import React, { useEffect, useState } from "react";
import SchoolRegistration from "./SchoolRegistration";
import "../CSS/AddSchool.css";
import axios from "axios";
// import { Link, Outlet } from "react-router-dom";
import RegistrationMenu from "./RegistrationMenu";
import Person from "../Images/person.jpg";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AddSchool = () => {
  return (
    <>
      <SchoolRegistration />
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="rounded border col-auto col-md-3 col-xl-2 px-sm-2 px-0 m-1">
          <nav className="d-flex flex-column align-items-left align-items-sm-start min-vh-100">
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
        </nav>
          </div>
          <div className="rounded border col p-0 m-0">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSchool;


import React, { useState } from "react";
import SchoolRegistration from "./SchoolRegistration";
import RegistrationMenu from "./RegistrationMenu";

const FeesHeads = () => {
  const [feeHeadCode, setFeeHeadCode] = useState("");
  const [feeHeads, setFeeHeads] = useState([]);
  const [feeHeadName, setFeeHeadName] = useState("");

  const handleAddFeeHead = (e) => {
    e.preventDefault();
    setFeeHeads([...feeHeads, { code: feeHeadCode, name: feeHeadName }]);
    setFeeHeadCode("");
    setFeeHeadName("");
  };

  const handleDeleteFeeHead = (index) => {
    
    const updatedFeeHeads = [...feeHeads];
    updatedFeeHeads.splice(index, 1);
    setFeeHeads(updatedFeeHeads);
  };

  return (
    <>
      <SchoolRegistration />
      <div className="d-flex">
        <RegistrationMenu />
        <div>
          <div className="border rounded m-2">
            <form onSubmit={handleAddFeeHead}>
              <div className="d-flex m-3">
              <div className="me-4">
                  <label className="fw-bold">Fee Head Code</label>
                  <sup className="control-label me-5">*</sup>
                  <input
                    type="number"
                    name="feeHeadCode"
                    value={feeHeadCode}
                    onChange={(e) => setFeeHeadCode(e.target.value)}
                    placeholder="Enter Fees Head Code"
                  />
                </div>
                <div className="me-4">
                  <label className="fw-bold">Fee Head Name</label>
                  <sup className="control-label me-5">*</sup>
                  <input
                    type="text"
                    name="feeHeadName"
                    value={feeHeadName}
                    onChange={(e) => setFeeHeadName(e.target.value)}
                    placeholder="Enter Fees Head Name"
                  />
                </div>
                <div className="ms-2 me-3">
                  <button type="submit" className="btn btn-success">
                    ADD
                  </button>
                </div>
              </div>
            </form>

            {feeHeads.length > 0 && (
              <div className="m-3">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>SR.NO.</th>
                      <th>FEE HEAD NAME</th>
                      <th>FEE HEAD CODE</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeHeads.map((feeHead, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{feeHead.name}</td>
                        <td>{feeHead.code}</td>
                        <td>
                          <i
                            className="bi bi-trash3-fill text-danger ms-2"
                            onClick={() => handleDeleteFeeHead(index)}
                          ></i>
                          <i className="bi bi-pencil-square ms-4 me-3 text-success"></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeesHeads;



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
    modules:'[1,2,6]',
    insert_by:"2",

  };
  const [addschool, setAddschool] = useState(data);

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
    formData.append('module',addschool.modules);
    formData.append('inserted_by',addschool.insert_by);
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
                    {module.map((l,i) => (
                      <div class="form-check form-switch" key={i}>
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckDefault"
                        >
                          {l.name}
                        </label>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckDefault"
                          value={l.name}
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

---------updated EditSchool-------------------------------------------------------

import React, { useEffect, useState } from "react";
import axios from "axios";
import SchoolRegistration from "./SchoolRegistration";
import { useNavigate, useParams } from "react-router-dom";

const EditSchool = ({ match }) => {
  const { schoolId } = useParams();

  const [addschool, setAddschool] = useState({
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
    modules: [],
    remove_modules: "[]",
    insert_by: 2,
  });
  // console.log(addschool);
  const [data, setData] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [states, setState] = useState([]);
  const [cities, setCity] = useState([]);
  const [allModules, setAllModules] = useState([]);
  const [image, setImage] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [selectedModules, setSelectedModules] = useState([]);
  const [selectedImageURL, setSelectedImageURL] = useState("");

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    const imageURL = URL.createObjectURL(selectedFile);
    setSelectedImageURL(imageURL);
  };
  const handleModuleToggle = (moduleName) => {
    const updatedModules = [...selectedModules];

    if (updatedModules.includes(moduleName)) {
      const index = updatedModules.indexOf(moduleName);
      updatedModules.splice(index, 1);
    } else {
      updatedModules.push(moduleName);
    }

    setSelectedModules(updatedModules);
  };

  const handleOrganization = (e) => {
    const selectedOrganizationId = e.target.value;
    console.log("org", selectedOrganizationId);
    setData((prevAddSchool) => ({
      ...prevAddSchool,
      organization_id: selectedOrganizationId,
    }));
  };

  const handleState = (e) => {
    const selectedStateId = e.target.value;
    console.log("state", selectedStateId);
    axios
      .post("https://api.vidyamate.in/MachineTest/get_city_list/", {
        state_id: selectedStateId,
      })
      .then((response) => {
        setCity(response.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });

    setData((prevAddSchool) => ({
      ...prevAddSchool,
      state_id: selectedStateId,
    }));
  };

  const handleCity = (e) => {
    const selectedCityId = e.target.value;
    console.log("city", selectedCityId);
    setData((prevAddSchool) => ({
      ...prevAddSchool,
      city_id: selectedCityId,
    }));
  };
  // console.log(data.organization_id)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("school_id", schoolId);
    formData.append("organization_id", data.organization_id);
    formData.append("name", data.name);
    formData.append("udise_no", data.udise_no);
    formData.append("address", data.address);
    formData.append("state_id", data.state_id);
    formData.append("city_id", data.city_id);
    formData.append("pincode", data.pincode);
    formData.append("status", data.status);
    formData.append("contact_person", data.contact_person);
    formData.append("contact_number", data.contact_number);
    formData.append("contact_email", data.contact_email);
    // formData.append('modules',data.module_list);
    formData.append("modules", JSON.stringify(selectedModules));
    formData.append("remove_module", addschool.remove_modules);

    formData.append("school_logo", image);

    const url = `https://api.vidyamate.in/MachineTest/edi_school_details/`;

    axios({
      method: "POST",
      url,
      data: formData,
    })
      .then((response) => {
        console.log("handleSubmit", response);
        navigate("/dashboard/schoolregistration/schoollist");
        // Additional logic after successful update
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (schoolId) {
      axios
        .get(
          `https://api.vidyamate.in/MachineTest/get_school_designation_list/
        `
        )
        .then((response) => {
          const schoolDetails = response.data.school_list;
          const selectedSchool = schoolDetails.find(
            (school) => school.id == schoolId
          );
          if (selectedSchool) {
            console.log(selectedSchool);
            setData(selectedSchool);
            setPrevImage(selectedSchool.school_logo || "");

            const initialModuleIds = selectedSchool.modules.map((mod) => mod.id);
          setSelectedModules(initialModuleIds);

            // const moduleNames = selectedSchool.modules.map((mod) => mod.name);
            // setSelectedModules(moduleNames || []);
            // console.log(moduleNames)
          } else {
            console.log("Data not found");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    axios
      .get("https://api.vidyamate.in/MachineTest/get_organization/")
      .then((response) => {
        setOrganizations(response.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://api.vidyamate.in/MachineTest/get_state_list/")
      .then((response) => {
        setState(response.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://api.vidyamate.in/MachineTest/module_list/")
      .then((response) => {
        setAllModules(response.data.payload);

        if (schoolId) {
          const initialModuleIds = allModules
            .filter((mod) => selectedModules.includes(mod.id))
            .map((mod) => mod.id);
          setSelectedModules(initialModuleIds);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [schoolId]);

  useEffect(() => {
    return () => {
      if (selectedImageURL) {
        URL.revokeObjectURL(selectedImageURL);
      }
    };
  }, [selectedImageURL]);
  // console.log("module",selectedModules)
  return (
    <>
      <SchoolRegistration />
      <div className="row border rounded col-11 ms-5 mt-2">
        <h5 className="text-center">{`Edit School`}</h5>

        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-6 ms-5">
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
                  value={data.organization_id}
                >
                  <option value="">{data.organization}</option>
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
                  placeholder={"Enter School Name"}
                  name="name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
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
                  value={data.udise_no}
                  onChange={(e) =>
                    setData({ ...data, udise_no: e.target.value })
                  }
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
                  value={data.address}
                  onChange={(e) =>
                    setData({ ...data, address: e.target.value })
                  }
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
                  <option value="">{data.state}</option>
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
                  <option value="">{data.city}</option>
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
                  value={data.pincode}
                  onChange={(e) =>
                    setData({ ...data, pincode: e.target.value })
                  }
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
                  checked={data.status}
                  // value={addschool.status}
                  // onChange={handleData}
                  onChange={(e) =>
                    setData({ ...data, status: e.target.checked })
                  }
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  {data.status ? "Yes" : "No"}
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
                  value={data.contact_person}
                  // onChange={handleData}
                  onChange={(e) =>
                    setData({ ...data, contact_person: e.target.value })
                  }
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
                  value={data.contact_number}
                  // onChange={handleData}
                  onChange={(e) =>
                    setData({ ...data, contact_number: e.target.value })
                  }
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
                  value={data.contact_email}
                  // onChange={handleData}
                  onChange={(e) =>
                    setData({ ...data, contact_email: e.target.value })
                  }
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
                  // value={data.school_logo}
                  onChange={handleFile}
                  id="formFile"
                />
              </div>
            </div>

            <div className="mb-1 row">
              <div className="col-sm-10">
                <button type="submit" className="btn btn-success">
                  Update
                </button>
              </div>
            </div>
          </div>
          <div className="col-4 ms-5">
            <img
              style={{
                width: "200px",
                height: "170px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              src={selectedImageURL || prevImage}
              alt="School Logo"
            />
            <h4>Module Access</h4>
            {allModules.map((mod, index) => (
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
                  id={`moduleSwitch${index}`}
                  checked={selectedModules.includes(mod.id)}
                  onChange={() => handleModuleToggle(mod.id)}
                />
              </div>
            ))}
          </div>
        </form>
      </div>
    </>
  );
};

export default EditSchool;
