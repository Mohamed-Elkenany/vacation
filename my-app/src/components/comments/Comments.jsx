import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Comment from './Comment';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useAddCommentMutation, useGetCommentPostMutation, useDeleteCommentPostMutation } from '../../slices/appApiSlice';
export const ReplyContext = createContext();
const Comments = ({ post, commentsPost }) => {
    const user = JSON.parse(localStorage.getItem("userInfo")).user;
    const postId = post._id;
    const inputRef = useRef();
    const [AddComment, { isLoading: loading, isSuccess: success }] = useAddCommentMutation();
    const [DeleteComment, { isLoading: loadingDelete, isSuccess: successDelete }] = useDeleteCommentPostMutation();
    const [getPostComment, { isSuccess, isLoading }] = useGetCommentPostMutation();
    const [addComment, setAddComment] = useState("");
    const [allComment, setAllComment] = useState([]);
    const [commentId, setCommentId] = useState(null);
    const [updateCommentSuccess, setUpdateCommentSuccess] = useState(false);
    console.log(updateCommentSuccess);
    const [commentOwner, setCommentOwner] = useState("");
    const handleReplay = (ReplyComment) => {
        inputRef.current.focus();
        setCommentId(ReplyComment.commentId);
        setCommentOwner(ReplyComment.name)
    };
    const handleSubmitComment = async(e) => {
        e.preventDefault();
        await AddComment({ postId, addComment, commentId })
            .then(res => res.data)
            .then(resulte => {
                inputRef.current.value = "";
                setCommentId(null);
                setAddComment("");
                commentsPost(resulte);
            });
    }
    const handleDeleteComment = async (commentId) => {
        await DeleteComment(commentId)
            .then(res => res.data)
            .then(resulte => {
                setAllComment(resulte);
                commentsPost(resulte);
            });
    };
    const value = {
        handleReplay,
        handleDeleteComment,
        setUpdateCommentSuccess,
    };
    useEffect(() => {
        getPostComment(postId)
            .then(res => res.data)
            .then(resulte => {
                setAllComment(resulte);
            })
            .catch(error => console.log(error.message));
    }, [success, successDelete, updateCommentSuccess]);
    return (
        <div className='max-h-[300px] overflow-y-scroll scrollbar-none px-5'>
            
            {commentId && <div className='bg-slate-200 dark:bg-gray-900 pl-2 text-sm flex items-center justify-between'><h1 className='font-lobster tracking-widest text-purple-700 dark:text-slate-300'>Reply to {commentOwner}</h1><button className={` ${loading && 'opacity-70'} bg-white dark:bg-gray-800 dark:text-slate-300 px-2 cursor-pointer`} onClick={() => setCommentId(null)} disabled={loading} >X</button></div>}
            <form onSubmit={handleSubmitComment} className={`${commentId && "border-purple-700 dark:border-purple-700"} flex items-center py-1 overflow-hidden border rounded-sm bg-white dark:border-slate-600 mb-2 sticky top-0 dark:bg-gray-800 dark:text-slate-400 z-50`}>
                <input ref={inputRef} type="text" placeholder={`Comment by ${user.fName} ${user.lName}...`} onChange={e => setAddComment(e.target.value)} className='w-full pl-2 outline-none bg-transparent max-lg:text-xs max-lg:placeholder:text-xs' />
                <button className='flex items-center justify-center' disabled={!addComment.length || loading}><SendOutlinedIcon fontSize='small' className={`${addComment.length ? 'text-purple-700' : 'text-slate-500'} ${loading && "opacity-50"} mr-1`} /></button>
            </form>
            <div className='flex flex-col gap-3 mb-2'>
                {
                    isLoading ?
                        <h1 className='text-center font-lobster tracking-widest dark:text-slate-300 mb-2'>Loading comments...</h1>
                        :
                        allComment?.length > 0 ?
                            allComment?.filter(comment => { if (comment.commentId === null) return comment })
                                .map((comment, index) => (
                                    <ReplyContext.Provider key={index} value={value}>
                                        <Comment comment={comment} user={user} allComment={allComment} />
                                    </ReplyContext.Provider>
                                ))
                            :
                            <h1 className='text-center font-lobster tracking-widest text-purple-700 dark:text-slate-300 mb-2'>No comment yet</h1>
                }
            </div>
        </div>
    );
}

export default Comments;
