 import React from "react"
 import Navbar from "./components/Navbar"
 import { Routes,Route, useLocation } from "react-router-dom"
import { useState,useEffect } from "react"
  
 
 
  
 import Logo from "./assets/LumonaLogo1.png"
 import Sidebar from "./components/Sidebar"
 
 
 import Message from "./components/Message"
 import { useNavigate } from "react-router-dom"
import PopUp from "./components/Pop Up/PopUP"
 
function App() {
  const [logged,setLogged] = useState(false)
  const location = useLocation();
  const Navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    setLogged(!!token)
  }, [location.pathname])
  return (
    <>
    {
      logged&&(
        <Sidebar/>
      )
    }
     <Navbar/>

     <Routes>
       
   
        
      
      
      
     
      </Routes>
    
    
    </>
  )
}

export default App
