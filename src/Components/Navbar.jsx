import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBars, faHomeAlt, faHomeUser, faHomeLg } from '@fortawesome/free-solid-svg-icons';
import rentofly from '../images/rentofly.png';
const Navbar = () => {



  return (
    <nav className="bg-yellow-300 shadow-lg w-full">
      <div className="bg-white shadow-lg h-15
       border-b-4 border-blue-900">
        <div className="mx-auto ">
          <div className="flex justify-between items-center ">
            <div className="lg:flex items-center hidden md:flex">
            <Link to="/" title="rentofly">
                <img src={rentofly} className="h-20 ml-10 p-4" alt="logo-img" />
              </Link>
            </div>
            <div className="lg:flex items-center space-x-2 hidden md:flex m-10">
              {/* Navigation links for large screens */}
              <Link
                to="/"
                className="font-semibold p-2 text-red-700   hover:bg-blue-900 hover:text-white hover:rounded-lg"
              >
                <FontAwesomeIcon icon={faHomeLg} size='xl' />
              </Link>
             
              
              <div className="group">
                <button style={{  fontFamily: 'Rubik',fontWeight: '600' }}className="text-white bg-blue-900 px-4 py-2  rounded-lg hover:bg-red-500 mr-4">
                  Login/Register
                </button>
                <ul  style={{  fontFamily: 'Rubik',fontWeight: '600' }} className="absolute hidden bg-white shadow-lg text-gray-600 space-y-3  py-5 px-6  rounded-lg group-hover:block">
                  <li className="hover:text-white hover:bg-blue-900 
                  hover:rounded-lg 
                   px-2 py-2">
                    <Link to="/signup">
                      Register
                    </Link>
                  </li>
                  <li className="hover:text-white hover:bg-blue-900 
                  hover:rounded-lg px-2 py-2 ">
                    <Link to="/login">Login</Link>
                  </li>
                 
                 
                  
                </ul>
              </div>
            </div>

           
          </div>
        </div>
      </div>

   
   
          </nav >
          );
};

export default Navbar;