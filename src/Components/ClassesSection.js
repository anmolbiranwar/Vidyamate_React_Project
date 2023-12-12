import React from 'react'
import SchoolRegistration from './SchoolRegistration'
import RegistrationMenu from './RegistrationMenu'

const ClassesSection = () => {
  return (
    <>
    <SchoolRegistration />
    <div className='d-flex'>
      <RegistrationMenu/>
      <div className='border rounded m-2 w-100'>
      <h1>class and section</h1>
      </div>
    </div>
    </>
   
  )
}

export default ClassesSection