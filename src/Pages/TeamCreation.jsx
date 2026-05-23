 import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import API from "../services/api"
function TeamCreation() {

    const [input,setInput] = useState({
        TeamName:"",
        OrganizationName:""
    })

    const navigate = useNavigate()

    const HandleOnchange = (e)=>{

        setInput({
            ...input,
            [e.target.name]:e.target.value
        })

    }

    const handleSubmit = async(e)=>{

        e.preventDefault()

        try {

            const response = await  API.post('/api/createteam',


               

                {
                    TeamName:input.TeamName,
                    OrganizationName:input.OrganizationName
                },

                 

            )

            console.log(response.data)

            navigate('/dashboard')

        } catch(error){

            console.log(error)

        }

    }

    return (

        <div className="flex w-full h-screen justify-center items-center bg-gray-50">

            <div className='flex w-full max-w-md p-8 bg-white rounded-lg shadow-md'>

                <form
                    className="w-full flex flex-col gap-4"
                    onSubmit={handleSubmit}
                >

                    <h2 className="text-2xl font-bold mb-4 text-center">
                        Create Team
                    </h2>

                    <div className="flex flex-col gap-2">

                        <label
                            htmlFor="TeamName"
                            className="font-medium"
                        >
                            Team Name
                        </label>

                        <input
                            type="text"
                            id="teamName"
                            name="TeamName"
                            placeholder="Enter team name"
                            value={input.TeamName}
                            onChange={HandleOnchange}
                            className="border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <div className="flex flex-col gap-2">

                        <label
                            htmlFor="OrganizationName"
                            className="font-medium"
                        >
                            Organization Name
                        </label>

                        <input
                            type="text"
                            id="orgName"
                            name="OrganizationName"
                            placeholder="Enter organization name"
                            value={input.OrganizationName}
                            onChange={HandleOnchange}
                            className="border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700 transition-colors"
                    >

                        Create Team

                    </button>

                </form>

            </div>

        </div>

    )

}

export default TeamCreation