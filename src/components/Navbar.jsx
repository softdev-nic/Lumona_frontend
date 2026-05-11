import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect,useState } from 'react'
import Logo from '../assets/LumonaLogo1.png'
import { useLocation } from 'react-router-dom'
function Navbar() {
const [notlogged,setNotLogged] = useState(true)
 const location = useLocation();

useEffect(() => {
  const token = localStorage.getItem('token')
  if(token)
  setNotLogged(false)
  else
  setNotLogged(true)
}, [location.pathname])

  return (
    <div className='w-full h-20 bg-white shadow-md flex flex-row gap-2 items-center'>
      <img src={Logo} alt="Lumona Logo" className='w-30 h-30 object-contain mix-blend-multiply'/>
        <nav className='flex flex-row gap-4 list-none justify-center items-center w-[50%]'>
             <Link to='/tasklist'>
            <li>
             Home
            </li>
             </Link>   
           
        </nav>
     
       
       {

       notlogged&& (
          <div className="flex flex-row gap-5">
        <button className='p-5'>
         <Link to='/login'>  login</Link> 
        </button>
        
        <button className='p-5'>
            <Link to="./registration">Register</Link>
        </button>
      </div>
      
        )
       } 



    
    
        
    </div>
  )
}

export default Navbar