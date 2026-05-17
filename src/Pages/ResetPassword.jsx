import React from 'react'
import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import PopUp from '../components/Pop Up/PopUP';

function ResetPassword() {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [popup, setPopup] = useState({
    show: false,
    message: '',
    type: ''
  });
  const navigate = useNavigate();

  const HandleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/resetpassword', {
        email: formData.email,
      });
      setPopup({
        show: true,
        message: 'Reset link sent to your email!',
        type: 'success'
      });
    } catch (error) {
      console.error('reset Link error:', error);
      setPopup({
        show: true,
        message: error.response?.data?.message || 'Failed to send reset link',
        type: 'error'
      });
    }
  };

  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100 p-4'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg'>
        <h1 className='text-2xl font-bold text-center'>Reset Password</h1>
        <div className='flex flex-col space-y-4'>
          <div className='flex flex-col'>
            <label className='mb-1' htmlFor="email">Enter Email:</label>
            <input className='border p-2 rounded' type="email" name='email' placeholder='email@example.com' value={formData.email} onChange={HandleChange} required />
          </div>
          <button onClick={handleSubmit} className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Send Reset Link
          </button>
        </div>
      </div>
      {popup.show && (
        <PopUp 
          message={popup.message} 
          type={popup.type} 
          onClose={() => setPopup({ ...popup, show: false })} 
        />
      )}
    </div>
  );
}

export default ResetPassword;
