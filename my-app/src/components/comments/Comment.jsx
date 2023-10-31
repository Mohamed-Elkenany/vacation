import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from "moment";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAlt from '@mui/icons-material/ThumbUpOffAlt';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { useToggleCommentLikeMutation, useUpdateCommentPostMutation } from '../../slices/appApiSlice';
import ReplyComment from '../replyComment/ReplyComment';
import { ReplyContext } from './Comments';
const Comment = ({ comment, user, allComment }) => {
    console.log(comment);
    const ReplyConsumer = useContext(ReplyContext);
    const settingCommentRef = useRef();
    const [updateComment, { isLoading: loadingUpdate, isSuccess: successUpdate }] = useUpdateCommentPostMutation();
    const userId = JSON.parse(localStorage.getItem("userInfo")).user._id;
    const [like] = useToggleCommentLikeMutation();
    const [commentLike, setCommentLike] = useState(comment.likes);
    const [addLikeComment, setAddLikeComment] = useState(false);
    const [settingComment, setSettingComment] = useState(false);
    const [editComment, setEditComment] = useState(false);
    const [editCommentInput, setEditCommentInput] = useState("");
    const handleLike = async () => {
        await like(comment._id)
            .then(res => res.data)
            .then(resulte => {
                setCommentLike(resulte.likes)
                setAddLikeComment(!addLikeComment)
            });
    };
    const submitEditComment = async (e) => {
        e.preventDefault();
        await updateComment({ commentId: comment._id, comment: editCommentInput })
            .then(res => res.data)
            .then(resulte => {
                setEditComment(false);
            });
    }
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
    useEffect(() => {
        ReplyConsumer.setUpdateCommentSuccess(loadingUpdate);
    }, [loadingUpdate])
    return (
        <div className="max-w-[97%] w-fit">
            {
                editComment && <div className="overlay absolute z-[1000] top-0 left-0 bg-black bg-opacity-75 w-full h-full">
                    <div className='text-white fixed top-1/3 -translate-x-1/2 left-1/2 -translate-y-1/2 w-1/3'>
                        <div className={`${loadingUpdate && 'hidden'} absolute -right-4 -top-4 bg-gray-950 px-2 py-1 rounded-md cursor-pointer`} onClick={() => setEditComment(false)}>X</div>
                        <form onSubmit={submitEditComment} className='flex flex-col gap-2 bg-gray-800 w-full p-2 rounded-md'>
                            <input type="text" placeholder='Comment...' className='px-1 py-1 text-sm bg-transparent border-b border-gray-700 outline-none' onChange={(e) => setEditCommentInput(e.target.value)} />
                            <div className='flex items-center justify-center'><button disabled={loadingUpdate} className={`bg-gray-900 ${loadingUpdate && 'bg-opacity-20'} w-fit px-3 py-1 rounded-md font-lobster tracking-widest`}>Edit</button></div>
                        </form>
                    </div>
                </div>
            }
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
                            {(userId === comment?.userId?._id || userId === comment?.postId?.userId ) &&
                                <div className='relative text-purple-700 dark:text-slate-300 w-fit cursor-pointer z-50'>
                                    {settingComment && <div className=' absolute bg-slate-300 dark:bg-gray-900 rounded-md top-6 right-0' onClick={() => setSettingComment(false)}>
                                        <button className={`text-sm ${(userId !== comment?.userId?._id || comment?.userId?._id !== comment?.postId?.userId )} max-lg:text-xs whitespace-nowrap px-2 py-1 hover:bg-gray-800 rounded-t-md w-full`} onClick={() => setEditComment(true)}>Edit comment</button>
                                        <button className="text-sm max-lg:text-xs whitespace-nowrap px-2 py-1 hover:bg-gray-800 rounded-b-md w-full" onClick={() => ReplyConsumer.handleDeleteComment(comment._id)}>Delete comment</button>
                                    </div>}
                                    {<MoreHorizIcon ref={settingCommentRef} onClick={() => setSettingComment(!settingComment)} />}
                                </div>
                            }
                        </div>
                        <p className=' text-slate-700 dark:text-slate-400 text-sm'>{comment.comment}</p>
                    </div>
                    <div className="text-xs max-lg:text-[10px] flex items-center gap-4 text-purple-700 dark:text-slate-300 font-lobster tracking-widest">
                        <div className="flex items-center gap-1">{addLikeComment ? <ThumbUpAltIcon style={{ fontSize: '15px' }} className='LikeIcon cursor-pointer' onClick={() => handleLike()} /> : <ThumbUpOffAlt style={{ fontSize: '15px' }} className='LikeIcon cursor-pointer' onClick={() => handleLike()} />} <h1>{commentLike?.length > 0 ? commentLike?.length : ""} Like</h1></div>
                        <button className="flex items-center gap-1" onClick={() => ReplyConsumer.handleReplay({ commentId: comment._id, name: `${comment.userId.fName} ${comment.userId.lName}` })}><ReplyOutlinedIcon style={{ fontSize: '15px' }} className='LikeIcon cursor-pointer' onClick={() => setAddLikeComment(false)} /><h1>Reply</h1></button>
                        <div className="flex items-center gap-1 flex-nowrap"><h1>From:</h1> <span className=' whitespace-nowrap'>{moment(comment?.createdAt).fromNow().split(" ").splice(0, 1).concat(moment(comment?.createdAt).fromNow().split(" ").slice(1, 2).join("").slice(0, 1))}</span></div>
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
                            <ReplyComment comment={comment} key={index} user={user} allComment={allComment} />
                        ))
                }
            </div>
        </div>
    )
};

export default Comment;
