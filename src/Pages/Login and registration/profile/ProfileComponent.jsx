 import React, { useState } from 'react'
import axios from 'axios'

function ProfileComponent(props) {
  const [formdata, setFormdata] = useState({
    name: props.name,
    email: props.email,
    date: props.date,
    streak: props.streak,
    longeststreak: props.longeststreak,
    id: props.id,
  })
const [active,setActive] = useState(true)
  const HandleChange = async (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formdata, [name]: value };
    setFormdata(updatedData);

    const token = localStorage.getItem('token');
    try {
      const response = await axios.put('http://localhost:3000/api/profile', updatedData, {
        headers: {
          'x-auth-token': token
        }
      });
      console.log("Profile updated:", response.data);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  }

  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6'>

      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        <div className="bg-indigo-600 h-32 w-full"></div>
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-6 flex justify-center">
            <div className="bg-white p-2 rounded-full shadow-md">
              <div className="w-28 h-28 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-4xl font-bold border-4 border-white">
                {props.name?.charAt(0).toUpperCase() } 
                
              </div>
            </div>
          </div>

          <div className="text-center mb-8">

            <h2 className="text-2xl font-bold text-gray-800">{formdata.name}</h2>
            <p className="text-gray-500">{formdata.email}</p>
          </div>

          <div className="flex justify-end mb-2">
            <button className='border-none outline-none bg-transparent text-gray-400 hover:text-indigo-600 transition-colors p-3 hover:bg-gray-100 rounded-md' onClick={(e)=>{setActive(false)}}>Edit</button>
            <button className='border-none outline-none bg-transparent text-gray-400 hover:text-indigo-600 transition-colors p-3 hover:bg-gray-100 rounded-md ' onCanPlay={HandleChange} >Save</button>

          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-orange-50 p-4 rounded-xl text-center border border-orange-100">
              <p className="text-sm text-orange-600 font-medium uppercase tracking-wider">Current Streak</p>
              <p className="text-2xl font-bold text-orange-700">{formdata.streak || 0} 🔥</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100">
              <p className="text-sm text-blue-600 font-medium uppercase tracking-wider">Best Streak</p>
              <p className="text-2xl font-bold text-blue-700">{formdata.longeststreak || 0} 🏆</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-gray-400 uppercase ml-1 mb-1">User ID</label>
              <input 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 focus:outline-none" 
                value={formdata.id}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-gray-400 uppercase ml-1 mb-1">Full Name</label>
              <input 
                name="name"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none" 
                value={formdata.name} 
                onChange={HandleChange}
                disabled={active}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-gray-400 uppercase ml-1 mb-1">Member Since</label>
              <input 
                readOnly 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 focus:outline-none" 
                value={new Date(formdata.date).toLocaleDateString()} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileComponent