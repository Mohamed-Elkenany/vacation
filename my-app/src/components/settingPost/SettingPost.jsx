import React, { useState } from 'react';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PersonAddDisabledOutlinedIcon from '@mui/icons-material/PersonAddDisabledOutlined';
import { useDeleteMyPostMutation } from '../../slices/appApiSlice';
import Button from '../button/Button';
const SettingPost = ({ post, handleSettingPost, suggestConsumer, deletePost: DeletePost }) => {
    const userId = JSON.parse(localStorage.getItem("userInfo")).user._id;
    const [deleteMyPost] = useDeleteMyPostMutation();
    const [follow, setFollow] = useState(post.userId);
    const setUser = (updateUser) => {
        setFollow(updateUser)
    }
    const deletePost = () => {
        handleSettingPost();
        Swal.fire({
            title: 'Are you sure?',
            text: "You will delete this post!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMyPost(post._id)
                    .then(res => res.data)
                    .then(result => {
                        DeletePost(post._id);
                        Swal.fire(
                            'Deleted!',
                            `${result.message}`,
                            'success'
                        )
                    })
                    .catch(error => {
                        Swal.fire(
                            'error!',
                            `${error.message}`,
                            'error'
                        )
                    });
            };
        });
    };
  return (
    <div className='dark:text-slate-300 whitespace-nowrap'>
    {
        post.userId?._id === userId ? 
        <div className='flex flex-col'>
            <Link to={`/edit-post/${post._id}`} className='p-2 hover:bg-slate-400 dark:hover:bg-gray-700 font-lobster tracking-widest text-slate-700 dark:text-slate-300 rounded-t-md'><EditOutlinedIcon/> <span>Edit post</span></Link>
            <div className='p-2 hover:bg-slate-400 dark:hover:bg-gray-700 font-lobster tracking-widest text-slate-700 dark:text-slate-300 rounded-b-md cursor-pointer select-none' onClick={deletePost}><DeleteOutlineOutlinedIcon/> <span className='select-none'>Delete post</span></div>
        </div> 
        : 
        <div className='flex flex-col'>
            <div className='p-2 hover:bg-slate-400 dark:hover:bg-gray-700 font-lobster tracking-widest text-slate-700 dark:text-slate-300 rounded-t-md cursor-pointer'>
                <div className='flex items-center w-fit bg-purple-700 rounded-md px-2 py-1'>
                {
                    follow?.followers?.includes(userId) ? <PersonAddDisabledOutlinedIcon/> : <PersonAddAltOutlinedIcon/>
                }
                    <Button userId={post.userId?._id} setUser={setUser} user={post.userId} suggestConsumer={suggestConsumer}/>
                </div>
            </div>
            <div className='p-2 hover:bg-slate-400 dark:hover:bg-gray-700 font-lobster tracking-widest text-slate-700 dark:text-slate-300 rounded-b-md cursor-pointer'><VisibilityOffOutlinedIcon/> <span>Hidden post</span></div>
        </div>
    }
    </div>
  );
}

export default SettingPost;
