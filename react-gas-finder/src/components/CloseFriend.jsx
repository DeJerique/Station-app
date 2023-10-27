import React from 'react'

export default function CloseFriend({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="flex items-center mb-[15px]">
            <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/no-avatar.png"} alt="" className="w-8 h-8 object-cover mr-2.5 rounded-[50%]" />
            <span className="sidebarFriendName">{user.username}</span>
        </li>
    );
}
