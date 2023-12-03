
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
import Home from './Components/Home';
import SchoolList from './Components/SchoolList';
import AddSchool from './Components/AddSchool';
import EditSchool from './Components/EditSchool';
import BasicInfo from './Components/BasicInfo'; 
import FeesHeads from './Components/FeesHeads';
import ClassesSection from './Components/ClassesSection';
import FeesStructure from './Components/FeesStructure';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard />}>
      <Route path='' element={<Home />} />
      <Route path='/dashboard/masters' element={<Masters/>} />
      <Route path='/dashboard/organization' element={<Organization/>} />
      <Route path='/dashboard/academicsession' element={<AcademicSession/>} />
      <Route path='/dashboard/schoolregistration' element={<SchoolRegistration/>} />
      <Route path='/dashboard/schoolregistration/schoollist' element={<SchoolList />}/>
      <Route path='/dashboard/schoollist' element={<SchoolList/>}/>
      <Route path='/dashboard/schoolregistration/addschool' element={<AddSchool/>}/>
      <Route path='/dashboard/schoolregistration/editschool' element={<EditSchool />}/>
      <Route path='/dashboard/schoolregistration/basicinfo' element={<BasicInfo />} />
      <Route path='/dashboard/schoolregistration/feesheads' element={<FeesHeads />}/>
      <Route path='/dashboard/schoolregistration/classessection' element={<ClassesSection/>}/>
      <Route path='/dashboard/schoolregistration/feesstructure' element={<FeesStructure />}/>
      <Route path='/dashboard/users' element={<Users/>} />
      </Route>
    </Routes>
    </BrowserRouter>
   
   
  
  );
}

export default App;
