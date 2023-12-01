import React, { useEffect, useState } from 'react'
import SchoolRegistration from './SchoolRegistration'
import axios from 'axios';

const SchoolList = () => {

  const [state, setState]=useState([]);

  function LoadState(){
    axios.get('https://api.vidyamate.in/MachineTest/get_state_list/')
    .then(response=>{
      setState(response.data.payload)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    LoadState();
  },[]);

  return (
    <>
    <SchoolRegistration />
     <div className="container ">
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
        {state.map((item,index) => (
              <tr key={index}>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{item.name}</td>
                <td></td>
                <td></td>
                <td></td>

                
              </tr>
            ))}

        </tbody>
      </table>
      </div>
    </>
  )
}

export default SchoolList