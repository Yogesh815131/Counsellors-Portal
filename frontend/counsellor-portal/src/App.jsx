import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import AddEnquiry from './pages/AddEnquiry';
import ViewEnquiries from './pages/ViewAllEnquiries';
import EditEnquiry from './pages/EditEnquiry';

function App() {
  //Lazy Loading
  // const UsersElement = React.lazy(() => import(''));
  // const UserItemElement = React.lazy(() => import(''));

  return (
    <>
      <BrowserRouter>      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path='/add-enquiry' element={<AddEnquiry />} />
          <Route path='/all-enquiries' element={<ViewEnquiries />} />
          <Route path='/edit-enquiry/:eid' element={<EditEnquiry />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
