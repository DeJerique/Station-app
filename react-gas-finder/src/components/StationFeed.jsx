import React, { useContext, useEffect, useState } from 'react';
import Share from './Share';
import Post from './Post';
import axios from "axios";
import { AuthContext } from '../context/AuthContext';

export default function StationFeed({ username }) {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext)

    useEffect(() => {
        const fetchPosts = async () => {
            const res = username
                ? await axios.get("http://localhost:8800/api/posts/profile/" + username)
                : await axios.get("http://localhost:8800/api/posts/timeline/" + user._id)
            setPosts(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }))
        };
        fetchPosts();
    }, [username, user._id]);


    return (
        <div className='flex-[5.5]'>
            <div className="p-5">
                {(!username || username === user.username) && <Share />}
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
    )
}
