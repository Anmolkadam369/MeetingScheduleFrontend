// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import SignUpPage from "./Components/SignUpPage";
import WelcomePage from './Components/WelcomePage';
import LoginPage from './Components/LoginPage';
import UserDashoard from './Components/UserDashboard';


const App = () => {
  return (
      <div>
        <Routes> 
          <Route path="/nav" element={<Navbar/>}/>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/welcome" element={<WelcomePage/>}/>
          <Route path='/dashboard' element={<UserDashoard/>}/>


        </Routes>
      </div>
  );
};

export default App;




