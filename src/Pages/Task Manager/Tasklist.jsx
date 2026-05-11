import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import API from '../../services/api';

function Tasklist(props) {
    const [tasks,setTasks] =  useState([])
    const [score,setScore] = useState(0)
    const [completingId, setCompletingId] = useState(null);

    const getScore = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await API.get('/api/score')
          ;
          setScore(response.data.score);
        } catch (err) {
          console.log("Error fetching score:", err);
        }
      };
      useEffect(() => {
        getScore();
      }, []);

 useEffect(()=>{
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
    }
 },[])
 
const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
const taskCompleted = async (id) => {
    setCompletingId(id);
    try {
      const token = localStorage.getItem('token');
      await API.put('/api/score') 
      console.log("Score updated successfully")
      setTimeout(() => {
          deleteTask(id);
          getScore();
          setCompletingId(null);
      }, 1000);
      console.log(score)
      
      
    } catch (err) {
      console.log("Error updating score:", err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      tasks.forEach((task) => {
        const startTime = new Date(task.startTime).getTime();
        const durationMs = parseInt(task.time) * 60 * 1000;
        if (now > startTime + durationMs) {
          deleteTask(task.id);
          API.put('/api/penaltyscore')

        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [tasks]);

  return (
   
   <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center py-10">
    <nav className='flex w-full flex-row  p-3  h-20 bg-transparent top-0 flex-wrap justify-center items-center'><p>Score: {score}</p></nav>
    <div className='flex w-full flex-row absoulute flex-wrap justify-end p-3 items-center h-20 '>
    <Link to='/taskmanager'>
    <button className='hover:border-2'>
        <IoAdd size={30}/>
    </button>
    </Link>
    
    </div>
        
        <div className="w-full max-w-md space-y-4 flex flex-row flex-wrap justify-center items-center">
            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <div key={task.id} className="bg-white rounded-lg w-full shadow-md overflow-hidden border-l-4 border-blue-500">
                        <div className="p-4 flex justify-between items-center">
                            <div className="text-left w-full" >
                                <h3 className="font-semibold text-gray-700">{task.taskInput}</h3>
                                <div className="flex gap-2 items-center">
                                    <p className="text-sm text-gray-500">{`${task.time} min `}</p>
                                    <span className="text-xs font-mono text-red-500">
                                        Ends: {new Date(new Date(task.startTime).getTime() + parseInt(task.time) * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400">{new Date(task.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                            <button className="text-red-500 hover:text-red-700 transition-colors p-2 cursor-pointer" onClick={() => deleteTask(task.id)}>
                                <AiOutlineDelete size={20} />
                            </button>
                            <button className="text-green-500 hover:text-green-700 transition-colors p-2 cursor-pointer" onClick={() => taskCompleted(task.id)}>
                                <FaCheck size={20} />
                            </button>
                        </div>
                        {completingId === task.id && (
                            <div className="w-full bg-gray-200 h-1.5">
                                <div className="bg-green-500 h-1.5 transition-all duration-1000 ease-linear" 
                                     style={{ width: '100%' }}></div>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No tasks found. Add some in the Task Manager!</p>
            )}
        </div>
    </div>
  )
}

export default Tasklist