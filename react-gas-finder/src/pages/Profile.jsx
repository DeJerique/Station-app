import React, { useEffect, useState } from 'react';
import Topbar from '../components/Topbar';
import Leftbar from '../components/Leftbar';
import StationFeed from '../components/StationFeed';
import Rightbar from '../components/Rightbar';
import axios from 'axios';
import { useParams } from "react-router"

export default function Profile() {
    const [user, setUser] = useState({});
    const username = useParams().username;

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`http://localhost:8800/api/users/?username=${username}`);
            setUser(res.data)
        };
        fetchUser();
    }, [username]);


    return (
        <>
            <Topbar />
            <div className="flex w-full">
                <Leftbar />
                <div className="flex-[9]">
                    <div className="profileRightTop">
                        <div className="h-80 relative">
                            <img src={user.coverPicture || "/assets/persons/DeJerique-Incorp.png"} alt="" className='w-full h-[250px] object-cover' />
                            <img src={user.profilePicture || "/assets/persons/no-avatar.png"} alt="" className=' w-[150px] h-[150px] object-cover absolute m-auto rounded-[50%] border-[3px] border-solid border-[wheat] top-[150px] inset-x-0' />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h1 className='text-2xl font-[650]'>{user.username}</h1>
                            <p>{user.desc}</p>
                        </div>
                    </div>
                    <div className="flex">
                        <StationFeed username={username} />
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    )
};
