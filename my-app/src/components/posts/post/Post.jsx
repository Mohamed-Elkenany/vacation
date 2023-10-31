import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SettingPost from '../../settingPost/SettingPost';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAlt from '@mui/icons-material/ThumbUpOffAlt';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import Comments from '../../comments/Comments';
import { useToggleLikePostMutation } from '../../../slices/appApiSlice';
import  moment  from "moment";
import { Success, listLike } from '../../../slices/postSlice';
import { useDispatch } from 'react-redux';
const Post = ({ post, handleListConsumer, suggestConsumer, deletePost }) => { 
  const settingPostRef = useRef();
  const commentsPost = (comments) => {
    setCommentList(comments)
  }
  const sliderContainerRef = useRef();
  const sliderRef = useRef();
  const handleSettingPost = () => {
    setSettingPost(false);
  }
  const dispatch = useDispatch();
  const mainUser = JSON.parse(localStorage.getItem("userInfo")).user;
  const [toggleLike, { isSuccess }] = useToggleLikePostMutation();
  const [settingPost, setSettingPost] = useState(false);
  const [addLike, setAddLike] = useState(false);
  const [likeList, setLikeList] = useState(post?.like);
  const [commentList, setCommentList] = useState([]);
  const [addComment, setAddComment] = useState(false);
  const likeAtPost = async (postId, type) => {
    const newData = await toggleLike(post._id)
      .then(res => res.data)
      .then(result => result.like);
    setLikeList(newData);
    if (newData.find(user=>user._id === mainUser._id)) {
      suggestConsumer.socket.emit("event", {
        sender: mainUser,
        receiver: post,
        type: type,
      })
    }
    dispatch(listLike(newData));
    setAddLike(!addLike);
  }
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setSettingPost(false);
    });
  }, []);
  useEffect(() => {
    if (post?.like?.includes(mainUser?._id)) {
      setAddLike(true);
    } else {
      setAddLike(false);
    }
    setCommentList(post.comments);
  }, []);
  return (
    <div className='w-full mx-auto rounded-md bg-white dark:bg-gray-800 shadow-md'>
      <div className='p-2 flex items-center justify-between'>
        <Link to={`/profile/${post?.userId?._id}`} className='flex items-center gap-1'>
            <div className='w-[55px] max-lg:w-[45px] h-[55px] max-lg:h-[45px] rounded-full bg-transparent p-1 border border-purple-600'>
              <img className='w-full h-full rounded-full object-cover' src={post.userId?.avatar?.url} alt="user" />
            </div>
          <div className='flex flex-col leading-4'>
            <span className='font-lobster tracking-widest text-purple-600 dark:text-slate-300 max-lg:text-sm'>{post?.userId?.userName}</span>
            <span className='font-lobster tracking-widest text-xs max-lg:text-[10px] text-slate-500'>From: {moment(post?.createdAt).fromNow()}</span>
          </div>
        </Link>
        <div className='relative'>
          <MoreHorizIcon ref={settingPostRef} className='text-slate-600 dark:text-slate-300 cursor-pointer' onClick={()=>setSettingPost(!settingPost)}/>
          <div className={`absolute z-[999] ${settingPost ? "visible" : "hidden"} right-0 -bottom-24 bg-white dark:bg-gray-800 shadow-lg rounded-md`}>
            <SettingPost post={post} handleSettingPost={handleSettingPost} suggestConsumer={suggestConsumer} deletePost={deletePost} />
          </div>
        </div>
      </div>
      <div className='px-3 my-2'>
        <p className='text-sm text-slate-500 dark:text-slate-300 select-none'>{post?.description}</p>
      </div>
      {
        post?.imageUrl?.length > 0
        &&
        <div ref={sliderContainerRef} className="slider-container w-full max-h-full bg-white dark:bg-gray-800 overflow-hidden flex flex-col">
            <div ref={sliderRef} className="slider w-full h-[400px] flex">
              {
                post.imageUrl.map((image, index) => (
                  image.url.endsWith(".mp4") ?
                    <div key={index} className="item w-full">
                      <video src={image.url} className='w-full h-full object-center object-scale-down' autoPlay loop muted/>
                    </div>
                    :
                    <div key={index} className="item min-w-full h-full relative">
                      <div className="overlay absolute top-0 left-0 bg-black w-full h-full bg-opacity-[0.01] select-none"></div>
                      <img src={image.url} alt='Poster'  className='w-full h-full object-contain'/>
                    </div>
                ))
              }
            </div>
        </div>
      }
      <div className='relative flex  items-center justify-around py-3 mt-3 mb-1 after:absolute after:bg-slate-400 after:dark:bg-slate-700 after:w-[90%] after:h-[1px] after:top-0'>
        <div className='flex items-center gap-1 text-purple-700 dark:text-slate-300 select-none'>
          {
            addLike ? <ThumbUpAltIcon fontSize='small' className='LikeIcon cursor-pointer'  onClick={()=>likeAtPost(post._id, 1)}/> : <ThumbUpOffAlt fontSize='small' className='LikeIcon cursor-pointer' onClick={()=>likeAtPost(post._id, "like")}/>
          }
          <span className='font-lobster tracking-widest cursor-pointer text-sm' onClick={()=>handleListConsumer(post._id)}>{likeList?.length > 0 ? likeList.length : ""}Like</span>
        </div>
        <div className='flex items-center gap-1 text-purple-700 dark:text-slate-300 cursor-pointer select-none' onClick={()=>setAddComment(!addComment)}>
          <CommentOutlinedIcon fontSize='small' className=''/>
          <span className='font-lobster tracking-widest text-sm'>{commentList?.length > 0 ? commentList.length : "" } Comment</span>
        </div>
        <div className='flex items-center gap-1 text-purple-700 dark:text-slate-300 cursor-pointer select-none'>
          <ShareOutlinedIcon fontSize='small' className=''/>
          <span className='font-lobster tracking-widest text-sm'>Share</span>
        </div>
      </div>
      <div>
        {
          addComment && <Comments post={post} commentsPost={commentsPost} />
        }
      </div>
      </div>
  );
}

export default Post;
