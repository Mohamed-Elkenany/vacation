import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import Logout from '@mui/icons-material/Logout';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Notification from "../notification/Notification";
import { logout } from '../../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserByIdMutation } from '../../slices/appApiSlice';
import { updateProfileContext } from '../../App';
const Navbar = ({socket}) => {
  const [getUser] = useGetUserByIdMutation();
  const updateProfileConsumer = useContext(updateProfileContext);
  const userId = JSON.parse(localStorage.getItem("userInfo")).user._id;
  const dispatch = useDispatch();
  const [user, setUser] = useState('');
  const element = document.documentElement;
  const iconNotifcationRef = useRef();
  const buttonIconRef = useRef();
  const profileRef = useRef();
  const [theme, setTheme] = useState(localStorage.getItem('theme'));
  const [search, setSearch] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  console.log(openNotification);
  const [changeNotification, setChangeNotification] = useState(false);
  const [notification, setNotification] = useState([]);
  const [notificationCount, setNotificationCount] = useState([]);
  const [viewProfile, setViewProfile] = useState(false);
  
  const handleNotification = () => {
    setNotificationCount([]);
    if (buttonIconRef.current.contains(iconNotifcationRef.current)) {
      setOpenNotification(!openNotification);
      console.log(true);
    } else {
      console.log(false);
    }
    
  }

  const customTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }
  function onWindowMatch(){
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        element.classList.add('dark');
    } else {
        element.classList.remove('dark');
}
  }
  onWindowMatch();
  useEffect(() => {
    if (theme === 'dark') {
      element.classList.add("dark");
      localStorage.setItem('theme', 'dark');
    } else if (theme === 'light') {
      element.classList.remove("dark")
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.removeItem('theme');
    }
  }, [theme])
  useEffect(() => {
    document.addEventListener("scroll", () => {
      setViewProfile(false);
    })
    document.addEventListener("click", (e) => {
      if (e.target !== buttonIconRef.contains(iconNotifcationRef.current)) {
        setOpenNotification(false);
      }
    })

  }, [])
  useEffect(() => {
    getUser(userId)
      .then(res => res.data)
      .then(resulte => setUser(resulte));
  }, [updateProfileConsumer.update]);
  useEffect(() => {
    socket?.on("sendEvent", (msg) => {
      setNotification(prev => [msg, ...prev]);
      setChangeNotification(true);
      setNotificationCount(prev => [msg, ...prev]);
    })
  },[])
  return (
    <div className='bg-white dark:bg-gray-800 w-full z-[999] sticky top-0 max-md:-top-8 left-0 shadow-md px-2 py-1'>
      <div className={`absolute bg-white dark:bg-gray-800 ${ viewProfile ?'active' : 'inActive'} transform duration-200 right-16 bg-white dark:bg-gray-800 rounded-sm dark:text-slate-300 text-purple-700 font-lobster tracking-widest text-sm`}>
        <ul onClick={()=>setViewProfile(false)}>
          <li className=''><Link to={`/profile/${user?._id}`} className=' w-full h-full px-2 py-2 hover:bg-purple-700 hover:text-slate-300 hover:dark:bg-gray-950 flex items-center gap-1 border-b dark:border-gray-5 rounded-t-sm'><VisibilityOutlinedIcon fontSize='inherit' />View Profile</Link></li>
          <li className=''><Link to={`/setting/${userId}`} className=' w-full h-full px-2 py-2 hover:bg-purple-700 hover:text-slate-300 hover:dark:bg-gray-950 flex items-center gap-1 border-b dark:border-gray-5 rounded-sm'><SettingsOutlinedIcon fontSize='inherit' />Setting</Link></li>
          <li className=' cursor-pointer' onClick={()=>dispatch(logout())}><div className=' w-full h-full px-2 py-2 hover:bg-purple-700 hover:text-slate-300 hover:dark:bg-gray-950 flex items-center gap rounded-b-sm'><Logout fontSize='inherit' />Logout</div></li>
        </ul>
      </div>
      <div className='w-full max-md:flex max-md:flex-col'>
          <div className='md:hidden w-full text-center'>
            <Link to="/" className='w-fit text-purple-700 dark:text-slate-300 text-2xl font-lobster font-semibold tracking-wider'>Vacation</Link>
          </div>
        <div className="w-full flex items-center justify-between max-md:justify-around">
          <div className={`${openNotification ? 'active' : 'inActive'} px-2 max-md:w-full max-md:left-0 transition-all duration-100 absolute flex flex-col gap-2 scrollbar-none top-14 left-6 bg-white dark:bg-gray-800 w-fit max-h-[300px] p-1 rounded-md overflow-y-scroll`}>
            {
              notification.length > 0 ?
              notification.map((not, index) => (
                <Notification not={not} key={index} />
              ))
                :
                <h1 className='text-center font-lobster tracking-widest text-purple-700 dark:text-slate-300 '>You don't have Notification yet</h1>
            }
          </div>
          <div className='flex-1 flex items-center justify-around max-md:justify-around max-md:gap-0gap-14 text-purple-700 dark:text-slate-300'>
            <Link to="/"><CottageOutlinedIcon /></Link>
            <div className='relative w-fit'>
              {
                notificationCount.length > 0 && <div className="absolute -top-2 -right-3 text-sm bg-purple-700 dark:bg-slate-300 text-slate-300 dark:text-gray-950 text-center w-5 h-5 rounded-full">{notificationCount?.length}</div>
              }
              {
                !changeNotification ?
                  <button ref={buttonIconRef} onClick={handleNotification} className='flex items-center justify-center'><NotificationsOutlinedIcon ref={iconNotifcationRef}/></button>
                :
                  <button ref={buttonIconRef} onClick={handleNotification} className='flex items-center justify-center'><NotificationsActiveIcon ref={iconNotifcationRef} /></button>
              }
            </div>
            <Link to={`/add-post/${userId}`}><AddIcon /></Link>
          </div>
          <div className='md:flex-[2] max-md:hidden flex items-center justify-center max-md:justify-start'>
            <Link to="/" className='text-purple-700 dark:text-slate-300 text-2xl font-lobster font-semibold tracking-wider max-md:hidden'>Vacation</Link>
          </div>
          <div className='flex-1 flex items-center justify-center max-md:justify-around gap-6'>
            <Link to='/search' className='md:hidden'><SearchIcon className='text-purple-700 dark:text-slate-300 cursor-pointer' onClick={()=>setSearch(!search)} /></Link>
            {theme === 'light' ? <DarkMode className=' cursor-pointer text-purple-700' onClick={customTheme} /> : <LightMode className=' cursor-pointer text-slate-300' onClick={customTheme} />}
            <div ref={profileRef} className='flex items-center gap-1 cursor-pointer select-none' onClick={()=>setViewProfile(!viewProfile)}>
            <div className='w-[50px] h-[50px] rounded-full p-1 border-[2px] border-purple-700'>
              <img className='w-full h-full rounded-full object-cover' src={user?.avatar?.url} alt="user" />
            </div>
              <h1 className='max-lg:hidden font-lobster tracking-wider text-purple-800 dark:text-slate-300'>{user?.userName}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
