import React, { useContext } from 'react'
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Topbar() {


    const { user } = useContext(AuthContext)
    // const 
    return (
        <div className=' bg-fos h-[50px] w-full flex items-center sticky z-[999] top-0'>
            <div className="flex-[3]">
                <Link to="/">
                    <span className='text-2xl font-[bold] text-[white] cursor-pointer ml-5'>Dejerique Incorp</span>
                </Link>
            </div>
            <div className="flex-[5]">
                <div className="w-full h-[30px] bg-[whitesmoke] flex items-center rounded-[30px]">
                    <Search className='text-xl ml-2.5' />
                    <input placeholder='Explore Nearby Stations' className="placeholder:italic bg-[whitesmoke] w-[70%] border-[none] focus:outline-none" />
                </div>
            </div>
            <div className="flex-[4] flex items-center justify-around text-[whitesmoke]">
                <div className="topbarLinks">
                    <span className="text-sm cursor-pointer mr-2.5">Station Pages</span>
                    <span className="text-sm cursor-pointer mr-2.5">Station Timeline</span>
                </div>
                <div className="flex">
                    <div className="cursor-pointer relative mr-[15px]">
                        <Person />
                        <span className="w-[15px] h-[15px] bg-[red] text-[whitesmoke] absolute top-[-5px] right-[-5px] flex items-center justify-center text-xs rounded-[50%]">1</span>
                    </div>
                    <div className="cursor-pointer relative mr-[15px]">
                        <Chat />
                        <span className="w-[15px] h-[15px] bg-[red] text-[whitesmoke] absolute top-[-5px] right-[-5px] flex items-center justify-center text-xs rounded-[50%]">2</span>
                    </div>
                    <div className="cursor-pointer relative mr-[15px]">
                        <Notifications />
                        <span className="w-[15px] h-[15px] bg-[red] text-[whitesmoke] absolute top-[-5px] right-[-5px] flex items-center justify-center text-xs rounded-[50%]">1</span>
                    </div>
                </div>
                <Link to={`profile/${user.username}`}>
                    <img src={user.profilePicture ? user.profilePicture : "/assets/persons/no-avatar.png"} alt="" className="w-8 h-8 object-cover cursor-pointer rounded-[50%]" />
                </Link>
            </div>
        </div>
    )
}
