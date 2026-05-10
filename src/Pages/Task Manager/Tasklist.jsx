import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";

function Tasklist() {
    const [tasks,setTasks] =  useState([])
    const [score,setScore] = useState(0)

    const getScore = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:3000/api/score', {
            headers: {
              'x-auth-token': token
            }
          });
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
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:3000/api/score', {}, {
        headers: {
          'x-auth-token': token
        }
      })
      console.log("Score updated successfully")
      deleteTask(id);
      getScore();
      console.log(score)
      
    } catch (err) {
      console.log("Error updating score:", err);
    }
  };
  return (
   
   <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center py-10">
    <div className='flex w-full flex-row absoulute flex-wrap justify-end p-3 items-center h-20 '>
    <Link to='/taskmanager'>
    <button className='hover:border-2'>
        <IoAdd size={30}/>
    </button>
    </Link>
    
    </div>
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Tasks</h1>
        <div className="w-full max-w-md space-y-4 flex flex-row flex-wrap justify-center items-center">
            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <div key={task.id} className="bg-white p-4 rounded-lg w-half shadow-md flex justify-between items-center border-l-4 border-blue-500">
                        <div className="text-left" >
                            <h3 className="font-semibold text-gray-700">{task.taskInput}</h3>
                            <p className="text-sm text-gray-500">{`${task.time} min `}</p>
                        </div>
                        <button className="text-red-500 hover:text-red-700 transition-colors p-2 cursor-pointer" onClick={() => deleteTask(task.id)}>
                            <AiOutlineDelete size={20} />

                        </button>
                        <button className="text-green-500 hover:text-green-700 transition-colors p-2 cursor-pointer" onClick={() => taskCompleted(task.id)}>
                            <FaCheck size={20} />
                        </button>
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