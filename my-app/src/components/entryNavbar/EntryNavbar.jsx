import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { useGetUserByIdMutation } from '../../slices/appApiSlice';

const EntryNavbar = () => {
    const { id: userId } = useParams();
    const [user,setUser]=useState('')
    const [getUser] = useGetUserByIdMutation();
    useEffect(() => {
        getUser(userId)
            .then(res => res.data)
            .then(resulte => setUser(resulte));
        localStorage.getItem("theme") === "dark" ?
            document.documentElement.classList.add("dark")
            :
            document.documentElement.classList.remove("dark")
    }, []);
    return (
        <div className='sticky top-0 max-md:-top-8 z-[999]'>
            <div className='bg-white dark:bg-gray-800 shadow-md py-1 flex max-md:flex-col items-center px-8 z-[999] max-md:px-4'>
                <h1 className='flex-[3] select-none max-lg:text-[25px] font-lobster font-semibold text-3xl  text-purple-800 dark:text-slate-300 max-lg:text-2xl '>Vacation</h1>
                <div className='flex-[4] flex items-center justify-between max-md:w-full'>
                    <Link to={`/profile/${user?._id}`}><h1 className='max-lg:text-[25px] font-lobster font-semibold text-xl text-purple-800 dark:text-slate-300 max-lg:text-lg'>{user?.userName}</h1></Link>
                    <Link to='/'><ArrowForward className='text-purple-800 dark:text-slate-200' /></Link>
                </div>
            </div>
        </div>
    );
}

export default EntryNavbar;
