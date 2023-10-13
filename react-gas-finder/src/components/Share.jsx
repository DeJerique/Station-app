import React, { useContext, useRef } from 'react';
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material"
import { AuthContext } from '../context/AuthContext';
import { useState } from 'react';
import axios from 'axios';

export default function Share() {
    const { user } = useContext(AuthContext);
    const desc = useRef();
    const [file, setFile] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault()
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("file", file);
            data.append("name", fileName);
            newPost.img = fileName;
            try {
                await axios.post("http://localhost:8800/api/upload", data);
            } catch (err) {
                console.log(err);
            }
        }

        try {
            await axios.post("http://localhost:8800/api/posts", newPost);
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='w-full h-[170px] rounded-[10px] shadow-[0px_0px_16px_-8px_rgba(0,0,0,0.68)] border-[1px]'>
            <div className="p-2.5">
                <div className="flex items-center">
                    <img src={user.profilePicture ? user.profilePicture : "/assets/persons/no-avatar.png"} alt="" className='w-[50px] h-[50px] rounded-[50%] object-cover mr-2.5' />
                    <input placeholder={"what station you thinking " + user.username + "?"} className='w-4/5 border-[none] focus:outline-none' ref={desc} />
                </div>
                <hr className='m-5' />
                <form className="flex items-center justify-between" onSubmit={submitHandler}>
                    <div className="flex ml-5">
                        <label htmlFor='file' className="flex items-center cursor-pointer mr-[15px]">
                            {/* <PermMedia className='text-lg mr-[3px] text-red-600' /> */}
                            {/* <span className='text-[17px] font-semibold'>Photo or Video</span> */}
                            <input type="file" id='file' name='file' accept='.png,.jpeg,.jpg' onChange={e => setFile(e.target.files[0])} className='hidden' />
                        </label>
                        <div className="flex items-center cursor-pointer mr-[15px]">
                            <Room className='text-lg mr-[3px] text-indigo-900' />
                            <span className='text-[17px] font-semibold'>Location</span>
                        </div>
                        <div className="flex items-center cursor-pointer mr-[15px]">
                            <Label className='text-lg mr-[3px] text-lime-800' />
                            <span className='text-[17px] font-semibold'>Tag</span>
                        </div>
                        <div className="flex items-center cursor-pointer mr-[15px]">
                            <EmojiEmotions className='text-lg mr-[3px] text-amber-700' />
                            <span className='text-[17px] font-semibold'>State of mind</span>
                        </div>
                    </div>
                    <button className='bg-[#6B41CF] font-medium cursor-pointer text-[wheat] mr-[10px] p-[7px] rounded-[5px] border-[none]' type='submit'>Share</button>
                </form>
            </div>
        </div>
    )
}
