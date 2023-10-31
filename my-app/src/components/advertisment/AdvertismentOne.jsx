import React from 'react';

const AdvertismentOne = () => {
  return (
    <div className='relative w-full h-1/2 bg-white rounded-md shadow-md'>
      <div className='absolute bg-opacity-40 bg-black top-0 left-0 w-full h-full rounded-md'></div>
      <video className='w-full h-full object-cover rounded-md' src="https://player.vimeo.com/external/308735032.sd.mp4?s=1eb70c0f0f328cfbaae7f5b03123a387aea10e50&profile_id=164&oauth2_token_id=57447761" autoPlay loop/>
    </div>
  );
}

export default AdvertismentOne;
