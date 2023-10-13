import React from 'react'

export default function CloseFriend({user}) {
    return (
        <li className="flex items-center mb-[15px]">
            <img src={user.profilePicture} alt="" className="w-8 h-8 object-cover mr-2.5 rounded-[50%]" />
            <span className="sidebarFriendName">{user.username}</span>
        </li>
    );
}
