import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';
import EntryNavbar from "../../components/entryNavbar/EntryNavbar"
import LeftHome from '../../components/leftHome/LeftHome';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useParams } from 'react-router-dom';
import {
  useDeleteUserAvatarMutation,
  useDeleteUserBannerMutation,
  useGetUserByIdMutation,
  useUpdateUserProfileMutation,
  useUploadUserAvatarMutation,
  useUploadUserBannerMutation
} from '../../slices/appApiSlice';
import { ToastContainer, toast } from 'react-toastify';
const Setting = () => {
  const settingToast = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  const [user, setUser] = useState('');
  const { id: userId } = useParams();
  const [bio, setBio] = useState('');
  const [userName, setUserName] = useState('');
  const [bioSetting, setBioSetting] = useState(false);
  const [userNameSetting, setUserNameSetting] = useState(false);
  const [getUser, { isLoading }] = useGetUserByIdMutation();
  const [bannerUpload, { isSuccess: sucessUploadBanner, isLoading: loadingUploadBanner }] = useUploadUserBannerMutation();
  const [avatarUpload, { isSuccess: sucessUploadAvatar, isLoading: loadingUploadAvatar }] = useUploadUserAvatarMutation();
  const [deleteAvatar, { isSuccess: sucessDeleteAvatar, isLoading: loadingDeleteAvatar }] = useDeleteUserAvatarMutation();
  const [deleteBanner, { isSuccess: sucessDeleteBanner, isLoading: loadingDeleteBanner }] = useDeleteUserBannerMutation();
  const [updateUser, { isSuccess: sucessUpdateUser, isLoading: loadingUpdateUser }] = useUpdateUserProfileMutation();
  const handleUploadBanner = async (e) => {
    const formData = new FormData();
    formData.append("banner", e.target.files[0]);
    formData.append("userId", userId);
    await bannerUpload(formData)
  }
  const handleUploadAvatar = async (e) => {
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);
    formData.append("userId", userId);
    await avatarUpload(formData)
      .then(res => res.data)
      .then(resulte => console.log(resulte));
  }
  const submitUpdateUser = async (e) => {
    e.preventDefault();
    if (!userName.length) {
      await updateUser({ userId, userName: user.userName, bio })
        .then((res) => res.data)
        .then(() => {
          setBioSetting(false);
          setUserNameSetting(false);
        });
    } else {
      await updateUser({ userId, userName, bio })
        .then((res) => res.data)
        .then(() => {
          setBioSetting(false);
          setUserNameSetting(false);
        });;
    }
  }
  useEffect(() => {
    getUser(userId)
      .then(res => res.data)
      .then(resulte => {
        setUser(resulte);
        setUserName(resulte.userName);
        setBio(resulte.bio);
      }
      )
  }, [sucessUploadBanner,
    sucessUploadAvatar,
    sucessDeleteBanner,
    sucessDeleteAvatar,
    sucessUpdateUser,
  ]
  );
  useEffect(() => {
    localStorage.getItem("theme") === 'dark' ?
      document.documentElement.classList.add("dark")
      :
      document.documentElement.classList.remove("dark");
  }, []);
  useLayoutEffect(() => {
    sucessDeleteAvatar && toast.success("Avatar deteted successfully", settingToast)
  }, [sucessDeleteAvatar]);
  useLayoutEffect(() => {
    sucessDeleteBanner && toast.success("Banner deteted successfully", settingToast)
  }, [sucessDeleteBanner]);
  return (
    <div className='w-full min-h-screen dark:bg-slate-900'>
      <EntryNavbar />
      <div className='setting flex pt-3'>
        <LeftHome />
        <div className='flex flex-col gap-2 min-h-full max-md:pb-2 max-md:px-0 px-2 flex-[6] pt-1 pb-1'>
          <div className="banner flex-2 relative bg-white dark:bg-gray-800 shadow-md w-full h-[200px] flex items-center justify-center rounded-md">
            {
              user?.banner?.url ? <img className='rounded-md w-full h-full object-cover object-right-top' src={user.banner.url} alt="banner" />
                :
                user?._id === userId ?
                  <div>
                    <div className='lg:hidden'>
                      <label htmlFor='upload_banner' className={`absolute right-2 top-2 w-fit text-slate-300 bg-purple-700  p-1 rounded-full flex items-center justify-center ${isLoading ? "cursor-progress" : "cursor-pointer"} z-50`}><AddAPhotoIcon /></label>
                      <input accept="image/png, image/jpg, image/gif, image/jpeg" type="file" id="upload_banner" className='hidden' />
                    </div>
                    <h1 className='font-lobster tracking-widest dark:text-slate-300 text-slate-900 text-3xl opacity-30 select-none'>Vacation</h1>
                  </div>
                  :
                  <h1 className='font-lobster tracking-widest dark:text-slate-300 text-slate-900 text-3xl opacity-30 select-none'>Vacation</h1>
            }
            <div className='absolute -bottom-[40px] left-1/2 -translate-x-1/2 w-[70px] h-[70px] rounded-full p-1 border border-purple-800 z-50'>
              <img className='h-full w-full rounded-full object-cover object-left-top' src={user?.avatar?.url} alt="user" />
            </div>
          </div>
          <div className="relative bg-white dark:bg-gray-800 shadow-md  rounded-md pt-8 px-1">
            <div className='absolute w-[75px] h-[35px] rounded-b-full bg-white dark:bg-gray-900 top-0 left-1/2 -translate-x-1/2'></div>
            <h1 className='mt-1 font-lobster tracking-widest dark:text-slate-200 text-slate-900 text-xl text-center opacity-80 dark:opacity-30 select-none max-md:text-sm mb-2'>{user?.userName}</h1>
            <div className='max-md:hidden flex flex-col items-center justify-center mb-2 w-full md:hidden'>
              {
                userNameSetting ?
                  <button className='font-lobster pl-1 tracking-widest text-slate-300 bg-purple-700 px-1 rounded-sm max-md:text-xs max-md:py-1 whitespace-nowrap' onClick={() => setUserNameSetting(false)}>Close</button>
                  :
                  <button className='font-lobster pl-1 tracking-widest text-slate-300  bg-purple-700 px-1 rounded-sm max-md:text-xs max-md:py-1 whitespace-nowrap' onClick={() => setUserNameSetting(true)}>Edit username</button>
              }
              {
                userNameSetting &&
                <form className='w-full'>
                  <div className='border-b dark:border-gray-700 mb-2 flex items-center gap-1'>
                    <input type='text' placeholder='Update username...' className='w-full dark:text-slate-300 bg-transparent max-h-[50px] h-[35px] resize-none outline-none' onChange={e => setUserName(e.target.value)}></input>
                  </div>
                </form>
              }
            </div>
            <div className='flex flex-col items-center gap-2 justify-between mb-2'>
              {
                userNameSetting ?
                  <button className='font-lobster pl-1 tracking-widest text-slate-300 bg-purple-700 px-1 rounded-sm max-md:text-xs max-md:py-1 whitespace-nowrap' onClick={() => setUserNameSetting(false)}>Close</button>
                  :
                  <button className='font-lobster pl-1 tracking-widest text-slate-300  bg-purple-700 px-1 rounded-sm max-md:text-xs max-md:py-1 whitespace-nowrap' onClick={() => setUserNameSetting(true)}>Edit username</button>
              }
            </div>
            {
              userNameSetting &&
              <form>
                <div className='border-b dark:border-gray-700 mb-2 flex items-center gap-1'>
                  <input type='text' placeholder='Enter new username...' className='w-full dark:text-slate-300 bg-transparent max-h-[50px] h-[35px] resize-none outline-none' onChange={e => setUserName(e.target.value)}></input>
                </div>
              </form>
            }
            <div className='w-full flex items-center justify-center'>
              <button onClick={submitUpdateUser} className={`max-md:hidden bg-purple-700 px-2 font-lobster tracking-widest text-slate-300 text-sm rounded-sm my-2 md:hidden`}>Submit</button>
            </div>
          </div>
          <div className="relative bg-white dark:bg-gray-800 shadow-md  rounded-md pt-4 px-1">
            <div className='max-md:hidden flex flex-col items-center justify-center mb-2 w-full md:hidden'>
              {
                userNameSetting ?
                  <button className='font-lobster pl-1 tracking-widest text-slate-300 text-sm bg-purple-700 px-1 rounded-sm max-md:text-xs max-md:py-1 whitespace-nowrap' onClick={() => setUserNameSetting(false)}>Close</button>
                  :
                  <button className='font-lobster pl-1 tracking-widest text-slate-300 text-sm  bg-purple-700 px-1 rounded-sm max-md:text-xs max-md:py-1 whitespace-nowrap' onClick={() => setUserNameSetting(true)}>Edit username</button>
              }
              {
                userNameSetting &&
                <form className='w-full'>
                  <div className='border-b dark:border-gray-700 mb-2 flex items-center gap-1'>
                    <input type='text' placeholder='Update username...' className='w-full dark:text-slate-300 bg-transparent max-h-[50px] h-[35px] resize-none outline-none' onChange={e => setUserName(e.target.value)}></input>
                  </div>
                </form>
              }
            </div>
            <h1 className='mt-1 font-lobster tracking-widest dark:text-slate-200 text-slate-900 text-xl text-center opacity-70 dark:opacity-30 select-none'>Edit bio</h1>
            <div className='flex flex-col items-center gap-2 justify-between mb-2'>
              {
                bioSetting ?
                  <button className='font-lobster pl-1 tracking-widest text-slate-300 text-sm bg-purple-700 px-1 rounded-sm max-md:text-xs max-md:py-1 whitespace-nowrap' onClick={() => setBioSetting(false)}>Close</button>
                  :
                  <button className='font-lobster pl-1 tracking-widest text-slate-300 text-sm  bg-purple-700 px-1 rounded-sm max-md:text-xs max-md:py-1 whitespace-nowrap' onClick={() => setBioSetting(true)}>{user?.bio ? 'Update bio' : 'Write bio'}</button>
              }
              <div className='flex items-start'>
                <h1 className='font-lobster pl-1 tracking-widest dark:text-gray-100 text-slate-900 text-sm max-md:text-xs opacity-60 dark:opacity-30 select-none'>bio: </h1>
                <span className='font-lobster pl-1 tracking-widest dark:text-gray-100 text-slate-900 text-sm max-md:text-xs opacity-60 dark:opacity-30 select-none'>{(user?.bio ? user.bio : 'Write something about yourself').slice(0, 1).toUpperCase() + (user?.bio ? user.bio : 'Write something about yourself').slice(1, user?.bio?.length)}</span>
              </div>
            </div>
            {
              bioSetting &&
              <form>
                <div className='border-b dark:border-gray-700 mb-2 flex items-center gap-1'>
                  <textarea placeholder='Update bio...' className='w-full dark:text-slate-300 bg-transparent max-h-[50px] h-[35px] resize-none outline-none' onChange={e => setBio(e.target.value)}></textarea>
                </div>
              </form>
            }
            <div className='w-full flex items-center justify-center'>
              <button onClick={submitUpdateUser} className={`max-md:hidden bg-purple-700 px-2 font-lobster tracking-widest text-slate-300 text-sm rounded-sm my-2 md:hidden`}>Submit</button>
            </div>
            <div className='w-full flex items-center justify-center'>
              <button onClick={submitUpdateUser} className={`bg-purple-700 px-2 font-lobster tracking-widest text-slate-300 text-sm rounded-sm my-2`}>Submit</button>
            </div>
          </div>
          <div className='md:hidden flex flex-col gap-2'>
            <div className='relative pt-2 px-3 h-full flex-1 bg-white dark:bg-gray-800 rounded-md'>
              <h1 className='font-lobster tracking-widest dark:text-slate-300 text-slate-900 text-2xl opacity-30 select-none text-center'>Banner</h1>
              <div className='flex flex-col gap-4 mt-10'>
                <button disabled={loadingDeleteBanner || loadingUploadBanner} className='w-full bg-slate-300 dark:bg-gray-900 text-gray-900 dark:text-slate-300 font-lobster tracking-widest py-2 rounded-md shadow-b-lg hover:bg-slate-100 hover:dark:bg-gray-950' onClick={() => deleteBanner(userId)}>{loadingUploadBanner ? 'loading...' : 'Delete banner'}</button>
                <label htmlFor='uploadBanner' className={`w-full bg-slate-300 dark:bg-gray-900 text-gray-900 dark:text-slate-300 font-lobster tracking-widest py-2 rounded-md shadow-b-lg hover:bg-slate-100 hover:dark:bg-gray-950 text-center ${loadingUploadBanner ? 'cursor-default bg-opacity-70' : 'cursor-pointer'}`}>{loadingUploadBanner ? 'loading...' : 'Updata banner'}</label>
                <label htmlFor='uploadBanner' className={`w-full mb-2 bg-slate-300 dark:bg-gray-900 text-gray-900 dark:text-slate-300 font-lobster tracking-widest py-2 rounded-md shadow-b-lg hover:bg-slate-100 hover:dark:bg-gray-950 text-center ${loadingUploadBanner ? 'cursor-default bg-opacity-70' : 'cursor-pointer'}`}>{loadingUploadBanner ? 'loading...' : 'Upload banner'}</label>
                <input id='uploadBanner' disabled={loadingUploadBanner} accept="image/png, image/jpg, image/gif, image/jpeg" type="file" className='hidden' onChange={handleUploadBanner} />
              </div>
            </div>
            <div className='pt-2 px-3 h-full flex-1 bg-white dark:bg-gray-800 rounded-md flex flex-col'>
              <h1 className='font-lobster tracking-widest dark:text-slate-300 text-slate-900 text-2xl opacity-30 select-none text-center'>Avatar</h1>
              <div className='flex flex-col gap-4 mt-10 h-full'>
                <button disabled={loadingDeleteAvatar || loadingUploadAvatar} className='w-full bg-slate-300 dark:bg-gray-900 text-gray-900 dark:text-slate-300 font-lobster tracking-widest py-2 rounded-md shadow-b-lg hover:bg-slate-100 hover:dark:bg-gray-950' onClick={() => deleteAvatar(userId)}>{loadingUploadAvatar ? 'loading...' : 'Delete avatar'}</button>
                <label htmlFor='uploadAvatar' className={`w-full bg-slate-300 dark:bg-gray-900 text-gray-900 dark:text-slate-300 font-lobster tracking-widest py-2 rounded-md shadow-b-lg hover:bg-slate-100 hover:dark:bg-gray-950 text-center ${loadingUploadAvatar ? 'cursor-default bg-opacity-70' : 'cursor-pointer'}`}>{loadingUploadAvatar ? 'loading...' : 'Update avatar'}</label>
                <label htmlFor='uploadAvatar' className={`w-full bg-slate-300 dark:bg-gray-900 text-gray-900 dark:text-slate-300 font-lobster tracking-widest py-2 rounded-md shadow-b-lg hover:bg-slate-100 hover:dark:bg-gray-950 text-center mb-2 ${loadingUploadAvatar ? 'cursor-default bg-opacity-70' : 'cursor-pointer'}`}>{loadingUploadAvatar ? 'loading...' : 'Upload avatar'}</label>
                <input id='uploadAvatar' disabled={loadingUploadAvatar} accept="image/png, image/jpg, image/gif, image/jpeg" type="file" className='hidden' onChange={handleUploadAvatar} />
              </div>
            </div>
          </div>
        </div>
        <div className='max-md:hidden flex-[4] sticky max-lg:top-[40px] lg:top-[45px] h-full pt-1 pb-1'>
          <div className='h-full rounded-l-md'>
            <div className='h-full flex-1 flex flex-col gap-2'>
            <div className='relative pt-2 px-3 h-full flex-1 bg-white dark:bg-gray-800 rounded-md'>
              <h1 className='font-lobster tracking-widest dark:text-slate-300 text-slate-900 text-2xl opacity-30 select-none text-center'>Banner</h1>
              <div className='flex flex-col gap-4 mt-10'>
                <button disabled={loadingDeleteBanner || loadingUploadBanner} className='w-full bg-slate-300 dark:bg-gray-900 text-gray-900 dark:text-slate-300 font-lobster tracking-widest py-2 rounded-md shadow-b-lg hover:bg-slate-100 hover:dark:bg-gray-950' onClick={() => deleteBanner(userId)}>{loadingUploadBanner ? 'loading...' : 'Delete banner'}</button>
                <label htmlFor='uploadBanner' className={`w-full bg-slate-300 dark:bg-gray-900 text-gray-900 dark:text-slate-300 font-lobster tracking-widest py-2 rounded-md shadow-b-lg hover:bg-slate-100 hover:dark:bg-gray-950 text-center ${loadingUploadBanner ? 'cursor-default bg-opacity-70' : 'cursor-pointer'}`}>{loadingUploadBanner ? 'loading...' : 'Updata banner'}</label>
                <label htmlFor='uploadBanner' className={`w-full bg-slate-300 dark:bg-gray-900 text-gray-900 dark:text-slate-300 font-lobster tracking-widest py-2 rounded-md shadow-b-lg hover:bg-slate-100 hover:dark:bg-gray-950 text-center ${loadingUploadBanner ? 'cursor-default bg-opacity-70' : 'cursor-pointer'}`}>{loadingUploadBanner ? 'loading...' : 'Upload banner'}</label>
                <input id='uploadBanner' disabled={loadingUploadBanner} accept="image/png, image/jpg, image/gif, image/jpeg" type="file" className='hidden' onChange={handleUploadBanner} />
              </div>
            </div>
            <div className='relative pt-2 px-3 h-full flex-1 bg-white dark:bg-gray-800 rounded-md flex flex-col'>
              <h1 className='font-lobster tracking-widest dark:text-slate-300 text-slate-900 text-2xl opacity-30 select-none text-center'>Avatar</h1>
              <div className='flex flex-col gap-4 mt-10 h-full'>
                <button disabled={loadingDeleteAvatar || loadingUploadAvatar} className='w-full bg-slate-300 dark:bg-gray-900 text-gray-900 dark:text-slate-300 font-lobster tracking-widest py-2 rounded-md shadow-b-lg hover:bg-slate-100 hover:dark:bg-gray-950' onClick={() => deleteAvatar(userId)}>{loadingUploadAvatar ? 'loading...' : 'Delete avatar'}</button>
                <label htmlFor='uploadAvatar' className={`w-full bg-slate-300 dark:bg-gray-900 text-gray-900 dark:text-slate-300 font-lobster tracking-widest py-2 rounded-md shadow-b-lg hover:bg-slate-100 hover:dark:bg-gray-950 text-center ${loadingUploadAvatar ? 'cursor-default bg-opacity-70' : 'cursor-pointer'}`}>{loadingUploadAvatar ? 'loading...' : 'Update avatar'}</label>
                <label htmlFor='uploadAvatar' className={`w-full bg-slate-300 dark:bg-gray-900 text-gray-900 dark:text-slate-300 font-lobster tracking-widest py-2 rounded-md shadow-b-lg hover:bg-slate-100 hover:dark:bg-gray-950 text-center ${loadingUploadAvatar ? 'cursor-default bg-opacity-70' : 'cursor-pointer'}`}>{loadingUploadAvatar ? 'loading...' : 'Upload avatar'}</label>
                <input id='uploadAvatar' disabled={loadingUploadAvatar} accept="image/png, image/jpg, image/gif, image/jpeg" type="file" className='hidden' onChange={handleUploadAvatar} />
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Setting;
