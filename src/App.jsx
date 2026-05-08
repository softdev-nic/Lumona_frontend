 import React from "react"
 import Navbar from "./components/Navbar"
 import { Routes,Route } from "react-router-dom"

 import Registration from "./Pages/Login and registration/Registration"
 import Login from "./Pages/Login and registration/Login"
 import Profile from "./Pages/Login and registration/profile/Profile"

function App() {

  return (
    <>
      <Navbar />
     <Routes>
       
       <Route path="/registration" element={<Registration />}/> 
       <Route path="/login" element={<Login />}/> 
       <Route path="/profile" element={<Profile />}/> 
       
     </Routes>
    </>
  )
}

export default App
