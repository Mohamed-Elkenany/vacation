import React, { useContext } from 'react';
import Stories from '../stories/Stories';
import Posts from '../posts/Posts';
import { handleListContext, suggestContext } from '../../pages/homePage/HomePage';

const MiddleHome = () => {
  const handleListConsumer = useContext(handleListContext);
  const suggestConsumer = useContext(suggestContext);
  return (
    <div className='middleHome max-md:px-0 px-2 flex-[6] pt-2 pb-3'>
      <Stories/>
      <Posts handleListConsumer={handleListConsumer} suggestConsumer={suggestConsumer} />
    </div>
  );
}

export default MiddleHome;
