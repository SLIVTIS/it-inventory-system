
import RoutesWithNotFound from './utils/RoutesWithNotFound.jsx';
import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login.jsx';

function App() {
  return (
    <>
      <div className="App">
          <BrowserRouter>
            <RoutesWithNotFound>
              <Route path="/" element={<Login />} />
            </RoutesWithNotFound>
          </BrowserRouter>
    </div>
    </>
  );
}

export default App
