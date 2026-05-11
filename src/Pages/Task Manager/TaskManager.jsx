import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function TaskManager() {
  const Navigator = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      Navigator('/login')
    }
  }, [])
  
  
const [formdata,setFormdata] = useState({
    taskInput:'',
    time:''
})
const HandleChange = (e) => {
    const {name,value} = e.target;
    setFormdata({...formdata,[name]:value})
}
const HandleSubmit = (e) => {
    e.preventDefault();
    if(formdata.taskInput === '' || formdata.time === '')
    {
        console.log("input is invalid")
        return;
    }
    try
    {
        
        const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const newTask = { ...formdata, id: Date.now() };
        const updatedTasks = [...existingTasks, newTask];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setFormdata({ taskInput: '', time: '' });
        Navigator('/tasklist')
    }
    catch(err)
    {
        console.log(err)
    }
}

 
  return (
    <div className='flex flex-col w-screen justify-center items-center bg-gray-100 h-screen'>
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg shadow-gray-200">
        <form className='flex flex-col gap-6'>
          <div className="flex flex-col gap-2">
            <label htmlFor="taskInput" className="font-semibold text-gray-700">Task:</label>
            <input type="text" name="taskInput" id="taskInput" placeholder="Enter your task" className='p-3 border-0.5 outline-none border-2 focus:border-blue-500 transition-all' value={formdata.taskInput} onChange={HandleChange} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="time" className="font-semibold text-gray-700">Duration:</label>
            <input type="text" name="time" id="time" placeholder="e.g. 30 mins" className='p-3 outline-none border-2 focus:border-blue-500 transition-all' value={formdata.time} onChange={HandleChange} />
          </div>
          <button onClick={HandleSubmit} className='w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition-colors'>
            Add Task
          </button>
        </form>
        </div>
    </div>
  )
}

export default TaskManager;
  