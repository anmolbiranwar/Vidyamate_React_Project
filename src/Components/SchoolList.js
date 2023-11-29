import React from 'react'
import SchoolRegistration from './SchoolRegistration'

const SchoolList = () => {
  return (
    <>
    <SchoolRegistration />
     <div className="container">
      <table className="table table-bordered container-fluid container my-2">
        <thead>
          <tr >
            <th>SR.NO.</th>
            <th>LOGO</th>
            <th>SCHOOL NAME</th>
            <th>CONTACT NO.</th>
            <th>EMAIL</th>
            <th>STATE</th>
            <th>CITY</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
      
        </tbody>
      </table>
      </div>
    </>
  )
}

export default SchoolList