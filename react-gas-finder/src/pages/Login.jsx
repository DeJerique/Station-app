import React, { useContext, useRef } from 'react';
import { loginCall } from '../apiCalls';
import { AuthContext } from "../context/AuthContext";
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';

export default function Login() {
    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext)

    const handleClick = (e) => {
        e.preventDefault()
        loginCall({ email: email.current.value, password: password.current.value }, dispatch)
    };

    console.log(user);
    return (
        <div className='w-screen h-screen bg-[#130C35] flex items-center justify-center'>
            <div className="w-[70%] h-[70%] flex">
                <div className="flex-1 flex flex-col justify-center">
                    <h1 className="text-[50px] font-extrabold text-[#6B41CF] mb-2.5">DeJerique Incorp</h1>
                    <span className="text-[25px]">Connect with Mates to know which station fills best near You.</span>
                </div>
                <div className="wflex-1 flex flex-col justify-center">
                    <form className="h-[300px] bg-[#AA8DF5] flex flex-col justify-between p-5 rounded-[10px]" onSubmit={handleClick}>
                        <input
                            placeholder="Email"
                            type='email'
                            required
                            className="h-[50px] border text-lg pl-5 rounded-[10px] border-[wheat] focus:outline-none"
                            ref={email}
                        />
                        <input
                            placeholder="Password"
                            type='password'
                            required
                            minLength={6}
                            className="h-[50px] border text-lg pl-5 rounded-[10px] border-[wheat] focus:outline-none"
                            ref={password}
                        />
                        <button className="h-[50px] bg-[black] text-[whitesmoke] text-xl font-medium cursor-pointer rounded-[10px] disabled:cursor-not-allowed" type='submit' disabled={isFetching}>{isFetching ? <LinearProgress /> : "Check In"}</button>
                        <span className='text-center text-[black]'>Forgot Password?</span>
                        <Link to="/register">
                            <button className="h-[50px] w-full bg-[grey] text-[#6B41CF] text-xl font-medium cursor-pointer rounded-[10px] disabled:cursor-not-allowed" disabled={isFetching}>
                                {isFetching ? <LinearProgress /> : "New? Join the Community"}
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
