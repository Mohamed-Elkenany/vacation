import React, { useEffect, useRef } from 'react';
import Story from './story/Story';
import { stories } from "../../constant";
import { users } from "../../constant";
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
const Stories = () => {
  const scrollRef = useRef();
  let cursor = false;
  useEffect(() => {
    scrollRef.current.addEventListener('mousemove', (e) => {
      if (!cursor) return;
      scrollRef.current.scrollLeft -= e.movementX;
    })
    scrollRef.current.addEventListener('mousedown', () => cursor = true )
    document.addEventListener('mouseup', () => cursor = false )
  },[cursor])
  return (
    <div ref={scrollRef} className='relative bg-white dark:bg-gray-800 w-full max-h-[150px] h-[160px] rounded-md shadow-md overflow-x-scroll scrollbar-none'>
      <div  className='absolute top-0 left-0 min-w-full h-full rounded-md pl-2 py-3 flex items-center gap-3'>
        <Link to="/stories/create" className=' w-[80px] h-full rounded-md shadow-md cursor-pointer select-none'>
            <div className = 'relative h-2/3 w-full rounded-t-md'>
              <div className='absolute bg-opacity-20 bg-black top-0 left-0 w-full h-full rounded-t-md overflow-x-hidden'></div>
              <img className='w-full h-full object-cover rounded-t-md' src={users[0].image} alt="user" />
            </div>
            <div className='relative w-full h-1/3 bg-slate-200 dark:bg-gray-700 rounded-b-md pt-3'>
                <div className='absolute bg-slate-300 dark:bg-gray-700 rounded-full -top-2 left-1/2 -translate-x-1/2 flex items-center justify-center border border-black'><AddIcon fontSize='small' className='text-slate-900'/></div>
                <h1 className='font-lobster font-semibold tracking-wider text-sm text-slate-700 dark:text-slate-200 text-center select-none'>Add story</h1>
            </div>
        </Link>
        {
          stories.map((story, index) => (
            <Story story={story} key={index}/>
          ))
        }
      </div>
    </div>
  );
}

export default Stories;
