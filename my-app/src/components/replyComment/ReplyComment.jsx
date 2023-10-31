import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import moment from "moment";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAlt from '@mui/icons-material/ThumbUpOffAlt';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { useToggleCommentLikeMutation } from '../../slices/appApiSlice';
import Comment from '../comments/Comment';
import { ReplyContext } from '../comments/Comments';
const ReplyComment = ({ comment, user, allComment }) => {
  const ReplyConsumer = useContext(ReplyContext);
  const settingCommentRef = useRef();
  const userId = JSON.parse(localStorage.getItem("userInfo")).user._id;
  const [like] = useToggleCommentLikeMutation();
  const [commentLike, setCommentLike] = useState(comment.likes);
  const [addLikeComment, setAddLikeComment] = useState(false);
  const [settingComment, setSettingComment] = useState(false);
  const handleLike = async () => {
    await like(comment._id)
      .then(res => res.data)
      .then(resulte => {
        setCommentLike(resulte.likes)
        setAddLikeComment(!addLikeComment)
      });
  };
  useEffect(() => {
    if (comment.likes.includes(userId)) {
      setAddLikeComment(true);
    } else {
      setAddLikeComment(false);
    }
    document.addEventListener('click', (e) => {
      if (e.target !== settingCommentRef.current) {
        setSettingComment(false);
      }
    })
  }, [])
  return (
    <div className="max-w-[97%] w-fit ml-6">
      <div className='flex items-start gap-1'>
        <Link to={`/profile/${comment?.userId?._id}`} className='flex items-center gap-1'>
          <div className='w-[40px] max-lg:w-[35px] h-[40px] max-lg:h-[35px] rounded-full bg-transparent p-1 border border-purple-600'>
            <img className='w-full h-full rounded-full object-cover' src={comment.userId?.avatar?.url} alt="user" />
          </div>
        </Link>
        <div className='flex flex-col gap-1' >
          <div className="bg-slate-200 dark:bg-gray-700 px-1 pb-1 rounded-md w-fit">
            <div className="flex items-center gap-2">
              <Link to={`/profile/${comment?.userId?._id}`} className='hover:underline text-purple-700 dark:text-slate-300'>
                <h1 className='text-sm max-lg:text-xs font-lobster tracking-widest'>{comment?.userId?.fName} {comment?.userId?.lName}</h1>
              </Link>
              { (userId === comment?.userId?._id || userId === comment?.postId?.userId ) &&
                <div className='relative text-purple-700 dark:text-slate-300 w-fit cursor-pointer'>
                {settingComment && <div className=' absolute bg-slate-300  dark:bg-gray-900 rounded-md top-6 right-0 z-50'>
                  <button className={`${ (userId !== comment?.userId?._id || comment?.userId?._id !== comment?.postId?.userId ) && 'hidden' } text-sm max-lg:text-xs font-lobster tracking-widest whitespace-nowrap px-2 py-1 hover:bg-slate-200 hover:dark:bg-gray-800 rounded-t-md w-full`}>Edit comment</button>
                  <button className="text-sm max-lg:text-xs font-lobster tracking-widest whitespace-nowrap px-2 py-1 hover:bg-slate-200 hover:dark:bg-gray-800 rounded-b-md w-full" onClick={() => ReplyConsumer.handleDeleteComment(comment._id)}>Delete comment</button>
                </div>}
                <MoreHorizIcon ref={settingCommentRef} onClick={() => setSettingComment(!settingComment)} />
              </div>
              }
            </div>
            <p className=' text-slate-700 dark:text-slate-400 text-sm'>{comment.comment}</p>
          </div>
          <div className="text-xs max-lg:text-[10px] flex items-center gap-4 text-purple-700 dark:text-slate-300 font-lobster tracking-widest">
            <div className="flex items-center gap-1">{addLikeComment ? <ThumbUpAltIcon style={{ fontSize: '15px' }} className='LikeIcon cursor-pointer' onClick={() => handleLike()} /> : <ThumbUpOffAlt style={{ fontSize: '15px' }} className='LikeIcon cursor-pointer' onClick={() => handleLike()} />} <h1>{commentLike?.length > 0 ? commentLike?.length : ""} Like</h1></div>
            <button className="flex items-center gap-1" onClick={() => ReplyConsumer.handleReplay({ commentId: comment._id, name: `${comment.userId.fName} ${comment.userId.lName}` })}><ReplyOutlinedIcon style={{ fontSize: '15px' }} className='LikeIcon cursor-pointer' onClick={() => setAddLikeComment(false)} /><h1>Reply</h1></button>
            <div className="flex items-center gap-1 flex-nowrap "><h1>From:</h1> <span className=' whitespace-nowrap'>{moment(comment?.createdAt).fromNow().split(" ").splice(0,1).concat(moment(comment?.createdAt).fromNow().split(" ").slice(1,2).join("").slice(0,1))}</span></div>
          </div>
        </div>
      </div>
      <div className='mt-2'>
        {
          allComment.filter(ReplyComment => {
            if (ReplyComment.commentId === comment._id) {
              return ReplyComment
            }
          })
            .map((comment, index) => (
              <Comment comment={comment} key={index} user={user} allComment={allComment} />
            ))
        }
      </div>
    </div>
  )
};

export default ReplyComment;
