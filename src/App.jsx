
import RoutesWithAuthentication from './utils/RoutesWithAuthentication.jsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Users from './pages/Users/Users.jsx';
import AddUser from './pages/Users/AddUser.jsx';
import Suppliers from './pages/Suppliers/Suppliers.jsx';
import Locations from './pages/Locations/Locations.jsx';
import Countries from './pages/Locations/Countries.jsx';
import Models from './pages/Models/Models.jsx';
import Store from './pages/stores/Store.jsx';
import StockGeneral from './pages/Stock/StockGeneral.jsx';
import StoreStock from './pages/stores/StoreStock.jsx';
import NewSideBar from './components/NewSideBar.jsx';

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
            <Route path="/" element={<NewSideBar />} >
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/users'>
                <Route index element={<Users />} />
                <Route path='/users/addUser' element={<AddUser />} />
              </Route>
              <Route path='/suppliers'>
                <Route index element={<Suppliers />} />
              </Route>
              <Route path='/locations' element={<Locations />} />
              <Route path='/countries' element={<Countries />} />
              <Route path='/store' element={<Store />} />
              <Route path='/store/:storeId/:title' element={<StoreStock />} />
              <Route path='/models' element={<Models />} />
              <Route path='/stock' element={<StockGeneral />} />
            </Route>
          </RoutesWithAuthentication>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App
