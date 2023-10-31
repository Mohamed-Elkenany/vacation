import React, { createContext, useContext, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import EntryNavbar from '../../components/entryNavbar/EntryNavbar';
import { useSearchFrindMutation } from '../../slices/appApiSlice';
import Searching from '../../components/frindsSearch/Search';
const Search = () => {
    const userId = JSON.parse(localStorage.getItem("userInfo")).user._id;
    const [searchFrind, { isLoading, isSuccess }] = useSearchFrindMutation();
    const [success, setSucces] = useState(false);
    const suggestContext = createContext({ success, setSucces });
    const suggestConsumer = useContext(suggestContext);
    console.log(suggestConsumer);
    const [userName, setUserName] = useState('');
    const [frindsSearch, setFrindsSearch] = useState([]);
    console.log(frindsSearch);
    useEffect(() => {
        localStorage.getItem("theme") === "dark" ?
            document.documentElement.classList.add("dark")
            :
            document.documentElement.classList.remove("dark")
    }, []);
    const handleSearch = (e) => {
        e.preventDefault();
        searchFrind({ userName })
            .then(res => res.data)
            .then(result => setFrindsSearch(result))
            .catch(error => console.log(error.message));
    }
    useEffect(() => {
        searchFrind({ userName })
            .then(res => res.data)
            .then(result => setFrindsSearch(result))
            .catch(error => console.log(error.message));
    }, [!userName]);
    return (
        <div className='min-h-screen'>
            <div className=' sticky -top-8'>
                <EntryNavbar />
                <div className=' md:hidden dark:bg-slate-800'>
                    <form onSubmit={handleSearch} className='p-2'>
                        <div className='dark:border-gray-800'>
                            <div className='flex items-center border-b border-gray-700'>
                                <input type="text" placeholder='Search...' className=' bg-transparent outline-none w-full pl-2 text-purple-700 dark:text-slate-300 text-sm' onChange={(e) => setUserName(e.target.value)} />
                                <button disabled={!userName} className={`${!userName && 'bg-opacity-80'} bg-purple-700 dark:bg-slate-200 text-slate-100 dark:text-purple-700 flex items-center justify-center w-fit p-[2px] rounded-full mb-[1px]`}><SearchIcon fontSize='small' /></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className='md:hidden'>
                {
                    frindsSearch?.length > 0 ?
                        <div className='mt-2 flex flex-col gap-2'>
                            {
                                frindsSearch.map((user, index) => (
                                    <Searching key={index} user={user} suggestConsumer={suggestConsumer} />
                                ))
                            }
                        </div>
                        :
                        isLoading ? <div><h1 className='text-center font-lobster tracking-widest dark:text-slate-300'>Loading...</h1></div> :
                            <div><h1 className='text-center font-lobster tracking-widest dark:text-slate-300'>Not found!</h1></div>
                }
            </div>
        </div>
    )
};

export default Search;
