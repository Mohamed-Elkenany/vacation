import React, { useRef } from 'react';
import RightSidebarStory from '../../components/rightSidebarStory/RightSidebarStory';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { stories } from '../../constant';
import { useEffect } from 'react';
const Stories = () => {
  const videoRef = useRef();
  const storyId = useSelector(state => state.story.storyId);
  useEffect(() => {

  },[])
  return (
    <div className='w-screen max-h-screen h-screen dark:bg-gray-900 flex items-start'>
      <div className='lg:flex-[3] h-full w-full text-slate-300 flex items-center justify-center'>
        <div className='max-md:w-full max-md:h-[80%] relative shadow-lg rounded-lg h-5/6 w-1/3'>
          <Link to="/" className='absolute max-md:right-8 -top-5 lg:-right-4 flex items-center justify-center bg-gray-500 shadow-md rounded-full w-[30px] h-[30px]'><CloseIcon /></Link>
          {
            stories.filter(story => {
              if (story.id === storyId) {
                return story;
              }
            }).map((story, index) => (
              <div key={index} className='flex flex-col h-full w-full rounded-lg'>
                <Link to={`/profile/:id`} className='bg-gray-700 dark:bg-gray-950 p-2 flex items-center gap-1 rounded-t-lg'>
                  <div className="w-[55px] h-[55px] rounded-full p-1 border border-purple-800">
                    <img className='w-full h-full rounded-full object-cover' src={story.image} alt="user" />
                  </div>
                  <div className='flex flex-col leading-4'>
                    <h1 className='font-lobster tracking-widest'>{story.user_name}</h1>
                    <h1 className='text-sm text-gray-400 font-lobster tracking-widest'>Create_at: 1s</h1>
                  </div>
                </Link>
                <div className='h-full w-full rounded-b-lg overflow-hidden'>
                  <video ref={videoRef} className="w-full h-full object-cover rounded-b-lg" src={story.story} autoPlay loop controls controlsList={false} />
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <RightSidebarStory/>
    </div>
  );
}

export default Stories;
