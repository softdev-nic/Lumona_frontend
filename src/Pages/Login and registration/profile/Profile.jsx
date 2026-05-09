import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProfileComponent from './ProfileComponent';

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token')
            try {
                const response = await axios.get('http://localhost:3000/api/profile', {
                    headers: {
                        'x-auth-token': token
                    }
                })
                console.log(response.data)
                setUser(response.data)
            } catch (err) {
                console.error("Error fetching profile:", err)
            }
        }
        fetchProfile()
    }, [])

    return (
        <div className='text-center'>
            <h1 className='text-3xl text-bold'>profile</h1>
          
    {
    
          user?(
            <ProfileComponent id={user._id} name={user.username} email={user.email} date={user.date} streak = {user.streak} longeststreak = {user.longestStreak}/>
):(
    <p>Loading...</p>   )
    }
        </div>)
}

export default Profile