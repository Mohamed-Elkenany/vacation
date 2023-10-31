import React from 'react';
import AdvertismentOne from '../advertisment/AdvertismentOne';
import AdvertismentTwo from '../advertisment/AdvertismentTwo';

const LeftHome = () => {
  return (
    <div className='max-lg:hidden leftHome flex-[4] flex flex-col gap-2 sticky top-[60px] py-1 '>
      <AdvertismentOne/>
      <AdvertismentTwo/>
    </div>
  );
}

export default LeftHome;
