import React, { createContext, useState } from 'react';
import SuggestFirend from '../suggestFirend/SuggestFriend';
import FrindsSearch from '../frindsSearch/FrindsSearch';
const RightHome = () => {
  return (
    <div className='max-md:hidden rightHome flex-[4] flex flex-col gap-2 sticky top-[60px] py-1'>
        <SuggestFirend />
        <FrindsSearch />
    </div>
  );
}

export default RightHome;
