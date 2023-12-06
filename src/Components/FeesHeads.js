import React from "react";
import SchoolRegistration from "./SchoolRegistration";
import RegistrationMenu from "./RegistrationMenu";

const FeesHeads = () => {
  return (
    <>
      <SchoolRegistration />
      <div>
        <div className="border rounded m-2">
          <form>
       <div className="row   ">
       <div className="col">
              <label>Fee Head Code</label>
              <input type="text" name="" id="" />
            </div>
            <div className="col">
              <label>Fee Head Name</label>
              <input type="text" name="" id="" />
            </div>
            <div className="col">
              <button>ADD</button>
            </div>
       </div>
          </form>
        </div>
        <div>Biranwar</div>
      </div>
    </>
  );
};

export default FeesHeads;
