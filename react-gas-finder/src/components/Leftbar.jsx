import React from 'react';
import { RssFeed, Bookmarks, HelpOutline, Work, EventNote, LocalLibrary, Chat, PlayCircle, Diversity3 } from "@mui/icons-material";
import { Users } from '../dummyData';
import CloseFriend from './CloseFriend';

export default function Leftbar() {
    return (
        <div className='flex-[3] h-[calc(100vh_-_50px)] sticky top-[50px] overflow-y-scroll scrollbar-w-[5px] scrollbar-track-bg-paleturquoise scrollbar-thumb-bg-[paleturquoise]'>
            <div className="p-5 ">
                <ul className="m-0 p-0 list-none">
                    <li className="flex items-center mb-5">
                        <RssFeed className='mr-[15px]' />
                        <span className="sidebarListItemText">StationFeeds</span>
                    </li>
                    <li className="flex items-center mb-5">
                        <Chat className='mr-[15px]' />
                        <span className="sidebarListItemText">Chats</span>
                    </li>
                    <li className="flex items-center mb-5">
                        <Diversity3 className='mr-[15px]' />
                        <span className="sidebarListItemText">Your Groups</span>
                    </li>
                    <li className="flex items-center mb-5">
                        <PlayCircle className='mr-[15px]' />
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="flex items-center mb-5">
                        <Bookmarks className='mr-[15px]' />
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    <li className="flex items-center mb-5">
                        <Work className='mr-[15px]' />
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="flex items-center mb-5">
                        <EventNote className='mr-[15px]' />
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="flex items-center mb-5">
                        <HelpOutline className='mr-[15px]' />
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="flex items-center mb-5">
                        <LocalLibrary className='mr-[15px]' />
                        <span className="sidebarListItemText">Courses</span>
                    </li>
                </ul>
                <button className='w-[150px] font-semibold p-2.5 rounded-[5px] border-[lighterfos] border-[2px]'>Explore</button>
                <hr className='mx-0 my-5' />
                <ul className="m-0 p-0">
                    {Users.map(u => (
                        <CloseFriend key={u.id} user={u}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}
