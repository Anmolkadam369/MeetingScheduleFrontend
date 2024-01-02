import { react, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';

const Home = () => {
  const navigate = useNavigate();
  const empReg = ()=>{
    navigate('/signup');
  }

  const empsignIn = ()=>{
    navigate('/login');
  }


  return (
    <div className='flex flex-col h-screen bg-blue-100 '>
    <Navbar />
    <div className="container mx-auto text-center mt-20 rounded-md bg-blue-100 w-1/2 p-20">
      <h1 className="text-3xl font-bold mb-4 sm:text-4xl md:mb-8">Welcome to Our Website</h1>
      <div className="mt-4 sm:mt-8 text-lg sm:mb-8">
      Be a member of trustworthy
property rental ecosystem.
      </div>
    </div>
  </div>

  );
};






export default Home;