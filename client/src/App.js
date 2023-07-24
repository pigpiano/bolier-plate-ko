import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import './App.css';
import NewLandingPage from './componets/views/LandingPage/LandingPage';
import NewLoginPage from './componets/views/LoginPage/LoginPage';
import NewRegister from './componets/views/Register/Register';
import Auth from './hoc/auth'


function App() {
  const LandingPage = Auth(NewLandingPage, null)
  const LoginPage = Auth(NewLoginPage, false);
  const Register = Auth(NewRegister, false);
  return (

    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
