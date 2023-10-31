import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
const Story = ({ story }) => {
  const dispatch = useDispatch();
  return (
    <Link to={`/`} className='relative w-[80px] h-full rounded-md shadow-md cursor-pointer select-none'>
      <div className='absolute w-[35px] h-[35px] rounded-full right-2 top-2 bg-transparent p-1 border border-purple-600'>
        <img className='w-full h-full rounded-full object-cover' src={story.image} alt="user" />
      </div>
      <video className='rounded-md w-full h-full object-cover' src={story.story} />
      <h1 className='absolute bottom-0 left-0 text-xs font-lobster tracking-wider text-slate-200 bg-black bg-opacity-40 rounded-b-md p-1'>{story. user_name}</h1>
    </Link>
  );
}

export default Story;
