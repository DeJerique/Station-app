import React from 'react';
import Topbar from '../components/Topbar';
import Leftbar from '../components/Leftbar';
import StationFeed from '../components/StationFeed';
import Rightbar from '../components/Rightbar';

export default function Home() {
    return (
        <>
            <Topbar />
            <div className="flex w-full">
                <Leftbar />
                <StationFeed />
                <Rightbar />
            </div>
        </>
    )
}
