import React, { useContext, useEffect, useState } from 'react'
import { MoreVert } from '@mui/icons-material';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';



export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes])

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data)
        };
        fetchUser();
    }, [post.userId]);

    const likeHandler = () => {
        try {
            axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
        } catch (err) {

        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };
    return (
        <div className='w-full mx-0 my-[30px] rounded-[10px] shadow-[0px_0px_16px_-8px_rgba(0,0,0,0.68)]'>
            <div className="p-2.5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to={`profile/${user.username}`}>
                            <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/no-avatar.png"} alt='' className='w-8 h-8 object-cover rounded-[50%]' />
                        </Link>
                        <span className='text-[20px] font-[650] mx-2.5 my-0'>{user.username}</span>
                        <span className='text-[15px]'>{moment(post.createdAt).fromNow()}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="mx-0 my-5">
                    <span className='postText'>{post?.desc}</span>
                    <img src={PF + post.img} alt="" className='w-full max-h-[500px] object-contain mt-5' />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        {/* <img src="/assets/persons/icons8-like-94.png" onClick={likeHandler} alt="" className='w-[27px] h-[27px] cursor-pointer mr-[5px]' /> */}
                        <img src={`${PF}person/icons8-like-64.png`} onClick={likeHandler} alt="" className='w-[27px] h-[27px] cursor-pointer mr-[5px]' />
                        <span className="text-[16px] font-[650]">{like} People liked it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="cursor-pointer text-base border-b-[gainsboro] border-b border-dashed">{post.comment} Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
