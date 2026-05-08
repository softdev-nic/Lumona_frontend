import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
                setUser(response.data)
            } catch (err) {
                console.error("Error fetching profile:", err)
            }
        }
        fetchProfile()
    }, [])

    return (
        <div>
            <h1>Profile</h1>
            {user ? (
                <pre>{JSON.stringify(user)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>)
}

export default Profile