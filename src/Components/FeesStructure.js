import React from 'react'
import SchoolRegistration from './SchoolRegistration'
import RegistrationMenu from './RegistrationMenu'

const FeesStructure = () => {
  return (
    <>
    <SchoolRegistration />
    <div className='d-flex'>
      <RegistrationMenu />
      <div className='border rounded m-2 w-100'>
      <h1>Fees Structure</h1>
      </div>
    </div>
    </>
  )
}

export default FeesStructure