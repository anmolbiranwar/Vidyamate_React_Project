import React, { useEffect, useState } from "react";
import SchoolRegistration from "./SchoolRegistration";
import RegistrationMenu from "./RegistrationMenu";
import axios from "axios";

const FeesHeads = () => {
  // const [feeHeadCode, setFeeHeadCode] = useState("");
  // const [feeHeads, setFeeHeads] = useState([]);
  // const [feeHeadName, setFeeHeadName] = useState("");

  const [values,setValues]=useState({
    name:'',
    code:'',
  });

  const [feeHeads, setFeeHeads] = useState([]);

  const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post("https://api.vidyamate.in/MachineTest/add_fee/",values)
    .then((res)=>{
      console.log(res.data.payload);
      // setFeeHeads([...feeHeads,res.data.payload]);
      // setValues({name:"",code:""});
    })
    .catch(err=>console.log(err));
  }

  useEffect(()=>{
// handleSubmit();
axios.post("https://api.vidyamate.in/MachineTest/get_school_fee/")
.then(res=>{
  console.log(res);
  setFeeHeads([res.data.payload])
})
.catch(err=>console.log(err));
  },[]);


  // const handleAddFeeHead = (e) => {
  //   e.preventDefault();
  //   setFeeHeads([...feeHeads, { code: feeHeadCode, name: feeHeadName }]);
  //   setFeeHeadCode("");
  //   setFeeHeadName("");
  // };

  // const handleDeleteFeeHead = (index) => {
    
  //   const updatedFeeHeads = [...feeHeads];
  //   updatedFeeHeads.splice(index, 1);
  //   setFeeHeads(updatedFeeHeads);
  // };

  return (
    <>
      <SchoolRegistration />
      <div className="d-flex">
        <RegistrationMenu />
        <div>
          <div className="border rounded m-2">
            <form onSubmit={handleSubmit}>
              <div className="d-flex m-3">
              <div className="me-4">
                  <label className="fw-bold">Fee Head Code</label>
                  <sup className="control-label me-5">*</sup>
                  <input
                    type="number"
                    name="feeHeadCode"
                    value={values.code}
                    onChange={(e) => setValues({...values,code:e.target.value})}
                    placeholder="Enter Fees Head Code"
                  />
                </div>
                <div className="me-4">
                  <label className="fw-bold">Fee Head Name</label>
                  <sup className="control-label me-5">*</sup>
                  <input
                    type="text"
                    name="feeHeadName"
                    value={values.name}
                    onChange={(e) => setValues({...values,name:e.target.value})}
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
                    {feeHeads.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.code}</td>
                        <td>
                          {/* <i
                            className="bi bi-trash3-fill text-danger ms-2"
                            onClick={() => handleDeleteFeeHead(index)}
                          ></i> */}
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
