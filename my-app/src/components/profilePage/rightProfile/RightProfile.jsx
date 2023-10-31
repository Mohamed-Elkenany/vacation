import React from 'react';
import SettingPage from './settingPage/SettingPage';
import AdvertismentOne from '../../advertisment/AdvertismentOne';
import AdvertismentTwo from '../../advertisment/AdvertismentTwo';
import { useParams } from 'react-router-dom';
const RightProfile = () => {
  const { id: userId } = useParams();
  const mainUserId = JSON.parse(localStorage.getItem("userInfo")).user._id;
  return (
    <div className='max-lg:hidden rightHome flex-[4] flex flex-col gap-2 sticky top-[60px] py-1'>
      {
        userId === mainUserId
        ?
          <SettingPage />
          :
          ""
      }
      <AdvertismentOne/>
      <AdvertismentTwo/>
    </div>
  );
}

export default RightProfile;
