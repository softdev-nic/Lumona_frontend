import React from 'react'
import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
    const [formData, setFormData] = useState({
    email: '',
  });
  const navigate = useNavigate();
const HandleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/api/resetpassword', {
        email: formData.email,
        
}
  )
   
  return(
    <div className='flex items-center justify-center  min-h-[calc(100vh-80px)] bg-gray-100 p-4'>
     <p>check your email</p>
    
      </div>
  )

} catch (error) {
  console.error('reset Link error:', error);
}
  };        

  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100 p-4'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg'>
       <h1 className='text-center '>Reset passWord</h1>
       <label htmlFor="email">Enter Email:</label>
       <input type="text" name='email' value={formData.email} onChange={HandleChange} />
       <button onClick={handleSubmit} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Reset Password</button>
    </div>

    </div>
  )
}

export default ResetPassword;
