import React, { useContext, useEffect, useState } from 'react';
import { useSuggestUserMutation } from '../../slices/appApiSlice';
import { useSelector } from 'react-redux';
import SuggestFr from "./SuggestFr";
import { suggestContext } from '../../pages/homePage/HomePage'; 
const SuggestFirend = () => {
  const suggestConsumer = useContext(suggestContext);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [suggest, setSuggest] = useState([]);
  const [Suggest, { isLoading, isSuccess }] = useSuggestUserMutation();
  useEffect(() => {
    Suggest(user)
      .then(res=>res.data)
      .then(result => {
        setSuggest(result)
      });
  },[suggestConsumer.success])
  return (
    <div className='w-full flex-1 bg-white dark:bg-gray-800 rounded-md shadow-md overflow-y-scroll scrollbar-none'>
      <h1 className='sticky top-0 font-lobster tracking-wider text-slate-200 dark:text-gray-900 text-center bg-purple-800 dark:bg-slate-300 rounded-t-md py-1 mb-2'>Suggest firend</h1>
      {isLoading && <h1 className='text-center font-lobster tracking-widest dark:text-slate-300'>Loading...</h1>}
      {isSuccess && <div className="flex flex-col gap-3">
        {
          suggest.map((user, index) => (
            <SuggestFr user={user} key={index} />
          ))
        }
      </div>}
    </div>
  );
}

export default SuggestFirend;
