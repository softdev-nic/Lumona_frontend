import React from 'react'
import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
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
      const response = await API.post(`/api/auth/reset-password/${token}`, {
        newpassword: formData.newpassword,
      });
      console.log('Password reset successful:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Reset password error:', error);
    }
  };

  return (
    <div className='flex flex-row items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100 p-4'>  
        <div>
        <div className='flex flex-col h-[80%] w-[80%] justify-center item-center'>
            <form action="">
                <div className='flex w-full'>

                <input type="password" placeholder='New Password' name='newpassword' value={formData.newpassword}/>
                </div>
                 <div className='flex w-full'>

                <input type="password" placeholder='New Password' name='confirmpassword' onChange={Handlechange}  value={formData.confirmpassword}/>
                </div>
            </form>
            <button  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onChange={Handlechange} onClick={handleSubmit} >Reset Password</button>
        </div>
        </div>
    </div>
  )
}

export default ResetPasswordPage