import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from "../services/api"

function Register() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    role: "employee"
  })

  const navigate = useNavigate()

  const handleOnChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await API.post('/api/register', input)
      console.log(response.data)
    
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex w-full h-screen justify-center items-center bg-gray-50">
      <div className='flex w-full max-w-md p-8 bg-white rounded-lg shadow-md'>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="font-medium">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              value={input.username}
              onChange={handleOnChange}
              className="border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={input.email}
              onChange={handleOnChange}
              className="border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-medium">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={input.password}
              onChange={handleOnChange}
              className="border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="role" className="font-medium">Role</label>
            <select
              id="role"
              name="role"
              value={input.role}
              onChange={handleOnChange}
              className="border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="employee">employee</option>
              
              <option value="manager">Manager</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700 transition-colors"
          >
            Register
          </button>

          <p className="text-center text-sm text-gray-600 mt-2">
            Already have an account?{" "}
            <span 
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate('/login')}
            >Login</span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register