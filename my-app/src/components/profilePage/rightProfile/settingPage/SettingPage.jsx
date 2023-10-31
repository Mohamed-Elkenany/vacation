import React, { useContext, useEffect, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import EditIcon from '@mui/icons-material/Edit';
import { useDeleteUserAvatarMutation, useDeleteUserBannerMutation, useGetUserProfileMutation, useUploadUserAvatarMutation, useUploadUserBannerMutation } from '../../../../slices/appApiSlice';
import { useParams } from 'react-router-dom';
import { updateProfileContext } from '../../../../App';

const SettingPage = () => {
    const { id } = useParams();
    const updateConsumer = useContext(updateProfileContext);
    const [deleteBanner, { isLoading, isSuccess }] = useDeleteUserBannerMutation();
    const [uploadBanner, { isLoading: loadingUploadBanner, isSuccess: successUploadBanner }] = useUploadUserBannerMutation();
    const [deleteAvatar, { isLoading: loadingDeleteAvatar, isSuccess: successDeleteAvatar }] = useDeleteUserAvatarMutation();
    const [uploadAvatar, { isLoading: loadingUploadAvatar, isSuccess: successUploadAvatar }] = useUploadUserAvatarMutation();
    const [user] = useGetUserProfileMutation();
    const [openSetting, setOpenSetting] = useState(false);
    const handleDeleteBanner = () => {
        deleteBanner(id).then(res=>res.data).then(resulte=>console.log(resulte));
    }
    const handleDeleteAvatar = () => {
        deleteAvatar(id).then(res=>res.data).then(resulte=>console.log(resulte));
    }
    const handleUploadBanner = (e) => {
        const formData = new FormData();
        formData.append("banner", e.target.files[0]);
        formData.append("userId", id);
        uploadBanner(formData)
            .then(res => res.data)
            .then(resulte => console.log(resulte));
    }
    const handleUploadAvatar = (e) => {
        const formData = new FormData();
        formData.append("avatar", e.target.files[0]);
        formData.append("userId", id);
        uploadAvatar(formData)
            .then(res => res.data)
            .then(resulte => console.log(resulte));
    }
    useEffect(() => {
        user(id);
        
    }, [isSuccess, successUploadBanner, successDeleteAvatar, successUploadAvatar]);
    useEffect(() => {
        updateConsumer.setUpdate(successUploadAvatar)
    },[successUploadAvatar])
    useEffect(() => {
        updateConsumer.setUpdate(successDeleteAvatar)
    },[successDeleteAvatar])
  return (
      <div className='bg-white dark:bg-slate-800 rounded-md shadow-md max-h-1/3 overflow-y-scroll scrollbar-none'>
        <div className='sticky top-0 bg-purple-800 dark:bg-slate-300 w-full cursor-pointer rounded-sm' onClick={()=>setOpenSetting(!openSetting)}>
            <h1 className='text-slate-200 dark:text-slate-900 text-center font-lobster tracking-widest font-semibold select-none'>Setting</h1>
        </div>
        {
            openSetting && <div className='p-1 flex flex-col gap-3'>
                <label htmlFor='upload_avatar' className='flex items-center gap-1 p-1 font-lobster tracking-widest dark:text-slate-200 hover:bg-purple-500 hover:text-slate-200 rounded-sm select-none cursor-pointer'>
                    <div><PhotoAlbumIcon fontSize='small' className='text-slate-300 mr-1'/>Update avatar</div>
                    <input disabled={isLoading || loadingDeleteAvatar || loadingUploadBanner || loadingUploadAvatar} onChange={handleUploadAvatar} type="file" accept="image/png, image/jpg, image/gif, image/jpeg"   id="upload_avatar" className='hidden' />
                </label>
                <label htmlFor='upload_banner' className='flex items-center gap-1 p-1 font-lobster tracking-widest dark:text-slate-200 hover:bg-purple-500 hover:text-slate-200 rounded-sm select-none cursor-pointer'>
                    <div><PhotoAlbumIcon fontSize='small' className='text-slate-300 mr-1'/>Update banner</div>
                    <input disabled={isLoading || loadingDeleteAvatar || loadingUploadBanner || loadingUploadAvatar} onChange={handleUploadBanner} type="file" accept="image/png, image/jpg, image/gif, image/jpeg"   id="upload_banner" className='hidden' />
                </label>
                <div className='flex items-center gap-1 p-1 font-lobster tracking-widest dark:text-slate-200 hover:bg-purple-500 hover:text-slate-200 rounded-sm select-none cursor-pointer'>
                    <span><EditIcon fontSize='small' className='text-slate-300'/></span>
                    <span className='text-sm'>Edit bio</span>
                </div>
                <button disabled={isLoading || loadingDeleteAvatar || loadingUploadBanner || loadingUploadAvatar} onClick={handleDeleteBanner} className='flex items-center gap-1 p-1 font-lobster tracking-widest dark:text-slate-200 hover:bg-purple-500 hover:text-slate-200 rounded-sm select-none'>
                    <span><DeleteOutlineIcon fontSize='small' className='text-slate-300'/></span>
                    <span className='text-sm'>Delete banner</span>
                </button>
                <button disabled={isLoading || loadingDeleteAvatar || loadingUploadBanner || loadingUploadAvatar} onClick={handleDeleteAvatar} className='flex items-center gap-1 p-1 font-lobster tracking-widest dark:text-slate-200 hover:bg-purple-500 hover:text-slate-200 rounded-sm select-none'>
                    <span><DeleteOutlineIcon fontSize='small' className='text-slate-300'/></span>
                    <span className='text-sm'>Delete avatar</span>
                </button>
            </div>
        }
    </div>
  );
}

export default SettingPage;
