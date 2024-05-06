
import RoutesWithAuthentication from './utils/RoutesWithAuthentication.jsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login.jsx';
import { useState } from 'react';
import SideBar from './components/SideBar.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Users from './pages/Users/Users.jsx';
import AddUser from './pages/Users/AddUser.jsx';
import Suppliers from './pages/Suppliers/Suppliers.jsx';
import Countries from './pages/Countries/Countries.jsx';
import Models from './pages/Models/Models.jsx';

function App() {

  const routes = [
    { path: "/about", element: <div>Hola about</div> },
    { path: "/login", element: <Login /> }
  ];

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <RoutesWithAuthentication routes={routes}>
            <Route path="/" element={<SideBar />} >
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/users'>
                <Route index element={<Users />} />
                <Route path='/users/addUser' element={<AddUser />} />
              </Route>
              <Route path='/suppliers'>
                <Route index element={<Suppliers />} />
              </Route>
              <Route path='/countries' element={<Countries />} />
              <Route path='/models' element={<Models />} />
            </Route>
          </RoutesWithAuthentication>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App
