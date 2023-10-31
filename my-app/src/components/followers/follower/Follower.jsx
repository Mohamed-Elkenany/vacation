import React, { useContext, useEffect, useState } from 'react';
import Button from '../../button/Button';
import { Link } from 'react-router-dom';
import { suggestContext } from '../../../pages/profilePage/ProfilePage';
const Follower = ({ user }) => {
  const mainUserId = JSON.parse(localStorage.getItem("userInfo")).user._id;
  const suggestConsumer = useContext(suggestContext);
  const [follow, setFollow] = useState(user);
  const setUser = (updateUser) => {
    setFollow(updateUser)
  };
  return (
    <div className="flex flex-col gap-3">
        <div className='px-2 flex items-center justify-between'>
              <Link to={`/profile/${user?._id}`} className='flex items-center gap-1'>
                <div className="w-[50px] h-[50px] rounded-full p-1 border border-purple-700">
                  <img className='w-full h-full rounded-full object-cover' src={user?.avatar?.url} alt="user" />
                </div>
                <div>
                  <h1 className='font-lobster tracking-wider text-md text-slate-600 dark:text-slate-300'>{user?.fName} {user?.lName}</h1>
                  <div className="flex items-center gap-1">
                    <span className='font-lobster tracking-wider text-xs text-slate-600 dark:text-slate-400'>{follow?.followers?.length}followers</span>
                    <span className='font-lobster tracking-wider text-xs text-slate-600 dark:text-slate-400'>{follow?.following?.length}following</span>
                  </div>
                </div>
              </Link>
        {mainUserId !== user?._id && <Button userId={user?._id} setUser={setUser} user={user} suggestConsumer={suggestConsumer} />}
            </div>
      </div>
  );
}

export default Follower;
