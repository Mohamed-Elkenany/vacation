import React from 'react';

const AdvertismentTwo = () => {
  return (
    <div className='relative w-full h-1/2 bg-white rounded-md shadow-md'>
      <div className='absolute bg-opacity-40 bg-black top-0 left-0 w-full h-full rounded-md'></div>
      <video className='w-full h-full object-cover rounded-md' src="https://player.vimeo.com/external/299230122.sd.mp4?s=a505811db3c8587b6bb9e52ca1d711e4d6b94952&profile_id=164&oauth2_token_id=57447761" autoPlay loop/>
    </div>
  );
}

export default AdvertismentTwo;
