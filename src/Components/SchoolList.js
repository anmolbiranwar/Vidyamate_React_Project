import React, { useEffect, useState } from 'react'
import SchoolRegistration from './SchoolRegistration'
import axios from 'axios';
import '../CSS/SchoolList.css';
import { Link } from 'react-router-dom';

const SchoolList = () => {

  // const [state, setState]=useState([]);
  const [list, setList]=useState([]);

  // function LoadState(){
  //   axios.get('https://api.vidyamate.in/MachineTest/get_state_list/')
  //   .then(response=>{
  //     setState(response.data.payload)
  //   })
  //   .catch(err=>{
  //     console.log(err)
  //   })
  // }

  const handleDelete=(id)=>{
    console.log(id);
const confirmDelete=window.confirm("Would you like to Delete?");
if(confirmDelete){
  axios.post('https://api.vidyamate.in/MachineTest/delete_school_details/',{
    school_id:id
  })
  .then(res=>{
    window.location.reload()
    setList(prevList => prevList.filter(item => item.id !== id));
  })
  .catch(err=>{
    console.log(err);
  })
}
  }

  function LoadSchool(){
    axios.get('https://api.vidyamate.in/MachineTest/get_school_designation_list/')
    .then(response=>{
      setList(response.data.school_list)
    })
    .catch(err=>{
      console.log(err);
    })
  }

  useEffect(()=>{
    LoadSchool();
  },[]);
  return (
    <>
    <SchoolRegistration />
     <div className="container ">
    <div className='table-container'>
    <table className="table table-bordered container-fluid container my-2">
        <thead>
          <tr>
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
        {list.map((item,index) => (
              <tr key={index} className='wrap'>
                <td>{item.id}</td>
                <td><img src={item.school_logo} alt='schoolLogo' className='logoImage'/></td>
                <td>{item.name}</td>
                <td>{item.contact_number}</td>
                <td>{item.contact_email}</td>
                <td>{item.state}</td>
                <td>{item.city}</td>
                <td>{item.status}</td>
                <td className='d-flex'>
                  <Link to={`/dashboard/schoolregistration/editschool/${item.id}`} ><h3><i className="bi bi-pencil-square ms-2 me-3 text-success" ></i></h3></Link>
                  <h3><i onClick={(e)=>handleDelete(item.id)} className="bi bi-trash3-fill text-danger" ></i></h3>
                </td> 
              </tr>
            ))}

        </tbody>
      </table>
    </div>
      </div>
    </>
  )
}

export default SchoolList