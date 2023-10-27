import React, { useContext, useEffect, useState } from 'react'
import { Users } from '../dummyData';
import Online from './Online';
import { AddCircle } from '@mui/icons-material'
import { RemoveCircle } from '@mui/icons-material'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id));


    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("/users/friends/" + user._id)
                setFriends(friendList.data);
            } catch (err) {
                console.log(err);
            }
        };
        getFriends();
    }, [user]);

    const followHandler = async () => {
        try {
            if (followed) {
                await axios.put("/users/" + user._id + "/unfollow", { userId: currentUser._id });
                dispatch({ type: "UNFOLLOW", payload: user._id })
            } else {
                await axios.put("/users/" + user._id + "/follow", { userId: currentUser._id });
                dispatch({ type: "FOLLOW", payload: user._id })
            }
        } catch (err) {
            console.log(err);
        }
        setFollowed(!followed)
    };



    const HomeRightbar = () => {
        return (
            <>
                <div className="flex items-center">
                    <img src={PF + "/person/_4c85bc61-196e-4668-9ab2-cc28f503487b.jpeg"} alt="" className='w-10 h-10 mr-5' />
                    <span><b>Emmy Willie </b>and <b>three others</b> Have a birthday today.</span>
                </div>
                <img src={PF + "/person/IMG_20220828_171122_800.jpg"} alt="" className='w-full mx-0 my-[30px] rounded-[10px]' />
                <h4 className="mb-5 font-[650]">e-Comrades</h4>
                <ul className="m-0 p-0">
                    {Users.map(u => (
                        <Online key={u.id} user={u} />
                    ))}
                </ul>
            </>
        );
    };

    const ProfileRightbar = () => {
        return (
            <>
                {user.username !== currentUser.username && (
                    <button
                        className="bg-fos text-[wheat] flex items-center text-base font-medium cursor-pointer mt-[30px] mb-2.5 px-2.5 py-[5px] rounded-[5px]"
                        onClick={followHandler}
                    >
                        {followed ? <RemoveCircle /> : <AddCircle />}
                        {followed ? "Unfollow" : "follow"}
                    </button>
                )}
                <h4 className="text-[25px] font-[600] mb-2.5">User Information</h4>
                <div className="mb-[30px]">
                    <div className="mb-[7px]">
                        <span className="font-medium text-[#555] mr-[15px]">City:</span>
                        <span className="font-[350]">{user.city}</span>
                    </div>
                    <div className="mb-[7px]">
                        <span className="font-medium text-[#555] mr-[15px]">From:</span>
                        <span className="font-[350]">{user.from}</span>
                    </div>
                    <div className="mb-[7px]">
                        <span className="font-medium text-[#555] mr-[15px]">Best Station</span>
                        <span className="font-[350]">{user.bestStation}</span>
                    </div>
                </div>
                <h4 className="">User Friends</h4>
                <div className="flex flex-wrap justify-between">
                    {friends.map(friend => (
                        <Link to={"/profile/" + friend.username}>
                            <div className="flex flex-col cursor-pointer mb-5">
                                <img src={friend.profilePicture ? PF + friend.profilePicture : PF+"person/no-avatar.png"} alt="" className=" w-[100px] h-[100px] object-cover rounded-[5px]" />
                                <span className="rightbarFollowingName">{friend.username}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        );
    }
    return (
        <div className='flex-[3.5]'>
            <div className="pl-0 pr-5 pt-5 pb-0">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    );
}
