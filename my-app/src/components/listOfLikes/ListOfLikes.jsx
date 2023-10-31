import React from 'react';
import { Link } from 'react-router-dom';

const ListOfLikes = ({ userLike }) => {
    const userId = JSON.parse(localStorage.getItem("userInfo")).user._id;
    const user = JSON.parse(localStorage.getItem("userInfo")).user;
    
    console.log(user.followers);
  return (
    <div className='flex items-center justify-between'>
        <Link to={`/profile/${userLike._id}`} className='flex items-center gap-1'>
            <div className="w-[50px] h-[50px] rounded-full p-1 border border-purple-700">
                <img className='w-full h-full rounded-full object-cover ' src={userLike.avatar.url} alt="user" />
            </div>
            <div>
                <h1 className='font-lobster tracking-wider text-md text-slate-600 dark:text-slate-300'>{userLike.fName} { userLike.lName }</h1>
                <div className="flex items-center gap-1">
                    <span className='font-lobster tracking-wider text-xs text-slate-600 dark:text-slate-400'>{userLike.followers.length} follower</span>
                    <span className='font-lobster tracking-wider text-xs text-slate-600 dark:text-slate-400'>{userLike.following.length} following</span>
                </div>
            </div>
        </Link>
        {
            userLike._id === userId || user.following?.includes(userLike._id) ? ""
                :
            !user.followers?.includes(userLike._id) && user.following?.includes(userLike._id) ? 
            <button className='font-lobster tracking-wider bg-purple-700 text-slate-100 px-2 rounded-sm'>Follow back</button>
                :
            <button className='font-lobster tracking-wider bg-purple-700 text-slate-100 px-2 rounded-sm'>Follow</button>
        }
    </div>
  );
}

export default ListOfLikes;
