import React from 'react';
import { useRef } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();


    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords Mismatch!")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                await axios.post("/auth/register", user);
                navigate('/login');
            } catch (err) {
                console.log(err);
            }
        }
    };






    return (
        <div className='w-screen h-screen bg-[#130C35] flex items-center justify-center'>
            <div className="w-[70%] h-[70%] flex">
                <div className="flex-1 flex flex-col justify-center">
                    <h1 className="text-[50px] font-extrabold text-[#6B41CF] mb-2.5">DeJerique Incorp</h1>
                    <span className="text-[25px]">Connect with Mates to know which station fills best near You.</span>
                </div>
                <div className="wflex-1 flex flex-col justify-center">
                    <form className="h-[400px] bg-[#AA8DF5] flex flex-col justify-between p-5 rounded-[10px]" onSubmit={handleClick}>
                        <input
                            placeholder="Username"
                            required
                            ref={username}
                            className="h-[50px] border text-lg pl-5 rounded-[10px] border-[wheat] focus:outline-none"
                        />
                        <input
                            placeholder="Email"
                            required
                            ref={email}
                            className="h-[50px] border text-lg pl-5 rounded-[10px] border-[wheat] focus:outline-none"
                            type="email"
                        />
                        <input
                            placeholder="Password"
                            required
                            ref={password}
                            className="h-[50px] border text-lg pl-5 rounded-[10px] border-[wheat] focus:outline-none"
                            type="password"
                        />
                        <input
                            placeholder="retype password"
                            required
                            ref={passwordAgain}
                            className="h-[50px] border text-lg pl-5 rounded-[10px] border-[wheat] focus:outline-none"
                            type="password"
                            minLength={6}
                        />
                        <button className="h-[50px] bg-[black] text-[whitesmoke] text-xl font-medium cursor-pointer rounded-[10px]" type="submit">Join the Community</button>
                        <Link to="/login">
                            <button className="h-[50px] w-full bg-[grey] text-[#6B41CF] text-xl font-medium cursor-pointer rounded-[10px]">Member? Check in</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
