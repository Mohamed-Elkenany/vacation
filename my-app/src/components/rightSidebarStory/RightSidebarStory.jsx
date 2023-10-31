import React from 'react';
import { stories } from '../../constant';
const RightSidebarStory = () => {
  return (
    <div className='max-md:hidden max-h-screen flex-1 bg-white dark:bg-gray-800 shadow-md overflow-y-scroll scrollbar-none'>
        <div className='sticky top-0 z-[100] bg-white dark:bg-gray-800 w-full h-[10%] mx-auto mb-8 flex items-center justify-center'><h1 className='text-center text-2xl font-lobster tracking-wider text-purple-800 dark:text-slate-300 border-b dark:border-slate-600 pb-2'>All Story</h1></div>
        <div className='flex flex-col gap-4 '>
            {
                stories.map((story, index) => (
                    <div key={index} className='flex items-center'>
                        <div className='w-[55px] h-[55px] rounded-full bg-transparent p-1 border border-purple-700'>
                            <img className='w-full h-full rounded-full object-cover' src={story.image} alt="user" />
                        </div>
                        <h1 className='font-lobster tracking-widest dark:text-slate-300'>{story.user_name}</h1>
                    </div>
                ))
            }
        </div>
    </div>
  );
}

export default RightSidebarStory;
