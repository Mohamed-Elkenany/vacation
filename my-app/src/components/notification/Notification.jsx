import React from 'react';
import { Link } from 'react-router-dom';

const Notification = ({ not }) => {
  return (
    <div className='font-lobster tracking-wider w-fit flex items-center gap-1 px-2'>
      <Link to={`/profile/${not.sender._id}`} className='w-fit'>
        <div className='border border-purple-700 max-w-fit w-10 h-10 max-md:w-12 rounded-full p-1'>
          <img src={not.sender.avatar.url} alt="avatar" className=' object-cover w-full h-full rounded-full'/>
        </div>
      </Link>
      <div className='flex items-center gap-2 text-sm dark:text-slate-300'>
        <Link to={`/profile/${not.sender._id}`}>
          <h1 className='text-sm max-md:text-md text-purple-700 dark:text-slate-300'>{not.sender.userName}</h1>
        </Link>
        <div>
          {
            not.type === 'follow' ? 
              <h1 className='text-sm max-md:text-md text-purple-700 dark:text-slate-300'>start following you</h1>
              :
              <h1 className='text-sm max-md:text-md text-purple-700 dark:text-slate-300'>{not.type === 'like' ? 'like' : 'comment'} your post</h1>
          }
        </div>
      </div>
    </div>
  );
}

export default Notification;
