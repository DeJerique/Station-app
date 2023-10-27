import React from 'react';

export default function Online({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <li className="flex items-center mb-[15px]">
            <div className="relative mr-2.5">
                <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/no-avatar.png"} alt="" className='w-10 h-10 object-cover rounded-[50%]' />
                <span className=' w-3 h-3 bg-[#FFD700] absolute rounded-[50%] border-2 border-solid border-[#fff] right-0 -top-0.5'></span>
            </div>
            <span className='font-semibold'>{user.username}</span>
        </li>
    );
}
