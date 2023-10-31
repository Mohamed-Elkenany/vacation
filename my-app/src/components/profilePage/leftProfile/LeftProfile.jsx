import React from 'react';
import Followers from '../../followers/Followers';
import Following from '../../following/Following';
const LeftProfile = () => {
  return (
    <div className='max-md:hidden leftHome flex-[4] flex flex-col gap-2 sticky top-[60px] py-1'>
      <Followers/>
      <Following/>
    </div>
  );
}

export default LeftProfile;
