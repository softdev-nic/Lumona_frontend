import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
function Registration(props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const Formdata = new FormData();
    Formdata.append('username', formData.name);
    Formdata.append('email', formData.email);
    Formdata.append('password', formData.password);
    try {
          const response = await API.post('/api/register',
      {
        username: formData.name,
        email: formData.email,
        password: formData.password
      }
    );
      console.log('Registration successful:', response.data);
      localStorage.setItem('token', response.data.token);
      setFormData({
        name: '',
        email: '',
        password: '',
      });
      
      navigate('/login');
      
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100-80px)] bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className='flex w-full justify-center item-center'>

          <img src={props.logo} alt="Lumona Logo" className='w-30 h-30 object-contain mix-blend-multiply'/>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete='off'
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registration;