import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function SignUpPage() {

  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  ;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  function validateForm() {
    let valid = true;
    const errors = {};
    console.log(errors)

    if (!formData.name.trim() || /\d/.test(formData.name)) {
      errors.name = 'Name is required and should not contain numbers';
      valid = false;
    }    

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
      valid = false;
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
      valid = false;
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}/.test(formData.password)) {
      errors.password = 'Password must be at least 6 characters and include at least one uppercase letter, one lowercase letter, one digit, and one special character';
      valid = false;
    }


    setFormErrors(errors);
    return valid;
  }
  console.log("some", formData)
  function createAccount() {

    if (!validateForm()) {
      return;
    }

    console.log(formData);
    localStorage.setItem('formData', JSON.stringify(formData));

    fetch('http://localhost:3001/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === true) {
          setSuccessMessage(`${result.data.name} Registered successfully!`);
          setErrorMessage('');
          setTimeout(() => {
            navigate('/welcome');
          }, 3000);
        }
        else {
          setErrorMessage('this is already registered. Please choose a different.');
          setSuccessMessage('');
        }
      })
      .catch((error) => {
        console.error('error', error);
      });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(name, value);
  };

  return (
    <div>
       <Navbar />
      <div className='text-center'>
        <h1 className='text-center mt-10 text-3xl font-extrabold '>Join The Website</h1>
        <h1 className='text-center mt-5'>Sign up</h1>

        <input
          type="text"
          name="name"
          className='mt-5 box-content h-1 w-1/2 p-4 border-2 '
          placeholder='Name'
          onChange={handleInputChange}
          value={formData.name}
          required
        />
        {formErrors.name && <div className="text-red-500 mt-2">{formErrors.name}</div>}


        <input
          type="text"
          name="email"
          className='mt-5 box-content h-1 w-1/2 p-4 border-2 '
          placeholder='Email'
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <input
          type='password'
          name="password"
          className='mt-5 box-content h-1 w-1/2 p-4 border-2 '
          placeholder='Password'
          value={formData.password}
          onChange={handleInputChange}
          required
        />

        {formErrors.password && <div className="text-red-500 mt-2">{formErrors.password}</div>}

        {formErrors.email && <div className="text-red-500 mt-2">{formErrors.email}</div>}

        <button className='mt-10 h-10 w-1/2 text-white border-2 rounded-full bg-blue-900' onClick={createAccount}>Create Account</button>

        {errorMessage && (
          <div className="text-red-500 mt-2">
            {errorMessage}
          </div>
        )}
 {successMessage && (
          <h1 className="text-green-500 mt-2 font-bold text-m">
            {successMessage}
          </h1>
        )}
      </div>
    </div>
  );
}

export default SignUpPage;





