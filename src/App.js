
import './App.css';
import  '../node_modules/bootstrap/dist/css/bootstrap.css';
import  '../node_modules/bootstrap-icons/font/bootstrap-icons.css';

import Login from './Components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Masters from './Components/Masters';
import Organization from './Components/Organization';
import AcademicSession from './Components/AcademicSession';
import SchoolRegistration from './Components/SchoolRegistration';
import Users from './Components/Users';



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard />}>
      <Route path='/dashboard/masters' element={<Masters/>} />
      <Route path='/dashboard/organization' element={<Organization/>} />
      <Route path='/dashboard/academicsession' element={<AcademicSession/>} />
      <Route path='/dashboard/schoolregistration' element={<SchoolRegistration/>} />
      <Route path='/dashboard/users' element={<Users/>} />
      </Route>

      {/* <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/masters' element={<Masters/>} />
      <Route path='/organization' element={<Organization/>} />
      <Route path='/academicsession' element={<AcademicSession/>} />
      <Route path='/schoolregistration' element={<SchoolRegistration/>} />
      <Route path='/users' element={<Users/>} /> */}



    </Routes>
    </BrowserRouter>
   
   
  
  );
}

export default App;
