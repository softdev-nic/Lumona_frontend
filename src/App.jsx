 import React from "react"
 import Navbar from "./components/Navbar"
 import { Routes,Route, useLocation } from "react-router-dom"
import { useState,useEffect } from "react"
 import Registration from "./Pages/Login and registration/Registration"
 import Login from "./Pages/Login and registration/Login"
 import Profile from "./Pages/Login and registration/profile/Profile"
 import TaskManager from "./Pages/Task Manager/TaskManager"
 import Tasklist from "./Pages/Task Manager/Tasklist"
 import Logo from "./assets/LumonaLogo1.png"
 import Sidebar from "./components/Sidebar"
 import ResetPassword from "./Pages/ResetPassword"

function App() {
  const [logged,setLogged] = useState(false)
  const location = useLocation();

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
       
       <Route path="/registration" element={<Registration logo={Logo} />}/> 
       <Route path="/login" element={<Login logo={Logo} />}/>
       <Route path="/profile" element={<Profile logo={Logo} />}/> 
       <Route path="/taskmanager" element={<TaskManager logo={Logo} />}/> 
      <Route path="/tasklist" element={<Tasklist logo={Logo} />}/> 
      <Route path="/resetpassword" element={<ResetPassword logo={Logo} />}/> 
     </Routes>
    </>

  )
}

export default App
