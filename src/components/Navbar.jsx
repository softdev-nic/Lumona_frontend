import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <div className='w-full h-20 bg-white shadow-md flex flex-row gap-2'>
        <nav className='flex flex-row gap-4 list-none justify-center items-center w-[50%]'>
            <li>
                Home
            </li>
            <li>
                About
            </li>
            <li>
                Contact
            </li>
        </nav>
      <div className="flex flex-row gap-5">
        <button className='p-5'>
         <Link to='/login'>  login</Link> 
        </button>
        
        <button className='p-5'>
            <Link to="./registration">Register</Link>
        </button>
      </div>
    
        
    </div>
  )
}

export default Navbar