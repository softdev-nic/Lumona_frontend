import React, { useState } from 'react';
import axios from 'axios';
import API from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';

function Login(props) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/api/login', {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/tasklist')

    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
          <div className='flex w-full justify-center item-center'>

          <img src={props.logo} alt="Lumona Logo" className='w-30 h-30 object-contain mix-blend-multiply'/>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="email@example.com"
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
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
          <p>
            <Link to="/resetpassword" className="text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </p>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <  Link to="/registration" className="text-blue-600 hover:underline">
            Sign Up
            </Link>
          
        </p>
      </div>
    </div>
  );
}

export default Login