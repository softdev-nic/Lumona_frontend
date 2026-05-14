import React from 'react'
import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
function ResetPasswordPage() {
  const { token } = useParams();
  console.log(token)
  const navigate = useNavigate();
  console.log(token)
  const [formData, setFormData] = useState({
    newpassword: '',
    confirmpassword: '',
  });
  const Handlechange =(e)=>{
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.newpassword !== formData.confirmpassword){
    const Error = new Error("Passwords do not match");
    throw Error
    return;
    }
    try {
      const response = await API.put(`/api/auth/resetpassword/${token}`, {
        newpassword: formData.newpassword,
    
      });
      console.log('Password reset successful:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Reset password error:', error);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100 p-4'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg'>
        <h1 className='text-2xl font-bold text-center'>Reset Password</h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='flex flex-col'>
            <label className='mb-1'>New Password:</label>
            <input className='border p-2 rounded' type="password" placeholder='New Password' name='newpassword' onChange={Handlechange} value={formData.newpassword} required />
          </div>
          <div className='flex flex-col'>
            <label className='mb-1'>Confirm Password:</label>
            <input className='border p-2 rounded' type="password" placeholder='Confirm Password' name='confirmpassword' onChange={Handlechange} value={formData.confirmpassword} required />
          </div>
          <button type="submit" className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Update Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPasswordPage