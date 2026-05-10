 import React from "react"
 import Navbar from "./components/Navbar"
 import { Routes,Route } from "react-router-dom"

 import Registration from "./Pages/Login and registration/Registration"
 import Login from "./Pages/Login and registration/Login"
 import Profile from "./Pages/Login and registration/profile/Profile"
 import TaskManager from "./Pages/Task Manager/TaskManager"
 import Tasklist from "./Pages/Task Manager/Tasklist"

function App() {

  return (
    <>
      <Navbar />
     <Routes>
       
       <Route path="/registration" element={<Registration />}/> 
       <Route path="/login" element={<Login />}/> 
       <Route path="/profile" element={<Profile />}/> 
       <Route path="/taskmanager" element={<TaskManager />}/> 
      <Route path="/tasklist" element={<Tasklist />}/> 
     </Routes>
    </>
  )
}

export default App
