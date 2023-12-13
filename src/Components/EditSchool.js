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
  const handleModuleToggle = (moduleId) => {
    setSelectedModules((prevModules) => {
      const updatedModules = [...prevModules];
  
      if (updatedModules.includes(moduleId)) {
        const index = updatedModules.indexOf(moduleId);
        updatedModules.splice(index, 1);
      } else {
        updatedModules.push(moduleId);
      }
  
      return updatedModules;
    });
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
