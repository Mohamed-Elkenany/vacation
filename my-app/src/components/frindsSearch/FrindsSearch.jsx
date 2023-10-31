import React, { useContext, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchFrindMutation } from '../../slices/appApiSlice';
import { useSelector } from 'react-redux';
import Search from './Search';
import { suggestContext } from '../../pages/homePage/HomePage';
const FrindsSearch = () => {
  const suggestConsumer = useContext(suggestContext);
  const [searchFriends, { isLoading, isSuccess }] = useSearchFrindMutation();
  const [frindsSearch, setFrindsSearch] = useState([]);
  const [userName, setUserName] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    searchFriends({userName})
      .then(res => res.data)
      .then(result => {
        setFrindsSearch(result)
      })
      .catch(error => console.log(error.message));
  }
  useEffect(() => {
    searchFriends({ userName })
      .then(res => res.data)
      .then(result => setFrindsSearch(result))
      .catch(error => console.log(error.message));
  }, [!userName]);
  return (
    <div className='vacation w-full flex-1 bg-white dark:bg-gray-800 rounded-md shadow-md overflow-y-scroll scrollbar-none'>
      <div className='sticky top-0 w-full flex flex-col gap-4 rounded-t-md bg-white dark:bg-gray-800 py-1'>
        <h1 className='font-lobster tracking-wider text-md text-purple-700 dark:text-gray-300 text-center'>Search for friends</h1>
        <form onSubmit={(e)=>e.preventDefault()} onChange={handleSearch} className='max-md:border-none w-3/4 mx-auto flex items-center border-b dark:border-gray-600'>
          <input type="text" placeholder='Search...' onChange={(e)=>setUserName(e.target.value)} className='w-full bg-transparent outline-none text-slate-600 dark:text-slate-300'/>
          <button className={`${userName && 'bg-slate-300 dark:bg-purple-700 rounded-full flex items-center justify-center p-1'} w-fit`}><SearchIcon fontSize='small' className={`text-purple-700 dark:text-slate-300 cursor-pointer`} /></button>
        </form>
      </div>
      {
        frindsSearch?.length > 0 ?
        <div className='mt-2 flex flex-col gap-2'>
        {
          frindsSearch.map((user, index) => (
            <Search key={index} user={user} suggestConsumer={suggestConsumer} />
          ))
        }
        </div>
          :
          isLoading ? <div><h1 className='text-center font-lobster tracking-widest dark:text-slate-300'>Loading...</h1></div> :
        <div><h1 className='text-center font-lobster tracking-widest dark:text-slate-300'>Not found!</h1></div>
      }
    </div>
  );
}

export default FrindsSearch;
