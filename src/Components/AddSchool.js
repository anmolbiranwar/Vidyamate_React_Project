import React, { useEffect, useState } from "react";
import SchoolRegistration from "./SchoolRegistration";
import "../CSS/AddSchool.css";
import RegistrationMenu from "./RegistrationMenu";

import BasicInfo from "./BasicInfo";


const AddSchool = () => {
  return (
    <>
      <SchoolRegistration />
      <div className="container-fluid">
        <div className="row flex-nowrap">
       <RegistrationMenu/>
          <div >
            <BasicInfo/>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSchool;
