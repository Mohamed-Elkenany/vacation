import React, { useEffect, useReducer, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ArrowForward from '@mui/icons-material/ArrowForward';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { initialStatePost, reducer } from '../../services/addPostReducer';
import { useGetPostByIdMutation, useUpdatePostMutation } from '../../slices/appApiSlice';
import { ToastContainer, toast } from 'react-toastify';
import EntryNavbar from '../../components/entryNavbar/EntryNavbar';
const EditPost = () => {
    const navigate = useNavigate();
    const { id: postId } = useParams();
    const [getPost, { isLoading, isSuccess }] = useGetPostByIdMutation();
    const [updatePost, { isLoading: loading, isSuccess: success }] = useUpdatePostMutation();
    const [state, dispatch] = useReducer(reducer, initialStatePost);
    const [showImage, setShowImage] = useState([]);
    const [selectFile, setSelectFile] = useState("");
    const [newUpdatePost, setNewUpdatePost] = useState("");
    const [post, setPost] = useState("");
    const handleRemoveimage = (e) => {
        e.preventDefault();
        dispatch({type: "ADD_IMAGE", payload: []});
        dispatch({ type: "ADD_PUBLICID", payload: post.imageUrl[0].publicId });
        setSelectFile("");
        setShowImage([])
    }
    const handleFile = (e) => {
        setSelectFile(e.target.files);
    }
    const hadleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("description", state.description);
        formData.append("imageUrl", state.imageUrl);
        formData.append("publicId", state.publicId);
        formData.append("postId", postId);
        updatePost(formData).then(res => res.data).then(result => setNewUpdatePost(result));
    }
    useEffect(() => {
        const arrayOfFile = Array.from(selectFile);
        dispatch({ type: 'ADD_IMAGE', payload: arrayOfFile });
        const newArrayOfFile = arrayOfFile.map(imageUrl => {
            if (imageUrl.type.startsWith("video")) {
                return {
                    url: URL.createObjectURL(imageUrl),
                    isVideo: true,
                }
            } else {
                return {
                    url: URL.createObjectURL(imageUrl),
                    isVideo: false,
                }
            }
        });
        setShowImage(newArrayOfFile)
    }, [selectFile]);
    useEffect(() => {
        if (localStorage.getItem("Theme") === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        getPost(postId)
            .then(res => res.data)
            .then(result => {
                setPost(result);
                dispatch({ type: "ADD_DESCRIPTION", payload: result.description });
                setShowImage(result.imageUrl)
            });
    }, []);
    useEffect(() => {
        if (success) {
            toast.success("Success edit", { autoClose: 1500 });
            setTimeout(() => {
                navigate("/");
            },2000)
        }
    }, [newUpdatePost,navigate]);
    return (
        <div className='bg-slate-100 dark:bg-gray-900 min-h-screen pb-6'>
            <EntryNavbar/>
            <div className='w-full h-full mt-4 max-md:px-4'>
                <form onSubmit={hadleSubmit} encType='multipart/form-data' className=' bg-slate-50 dark:bg-gray-800 w-3/4 mx-auto rounded-md shadow-md p-1 max-md:w-full'>
                    <h1 className="text-center font-lobster text-xl tracking-widest text-purple-800 dark:text-slate-300 font-semibold">Edit post</h1>
                    <div className='border-b dark:border-gray-600 w-2/3 h-[150px] mx-auto max-md:w-10/12'>
                        <textarea disabled={isLoading} defaultValue={state.description} className=' bg-transparent p-1 outline-none  resize-none w-full max-h-full text-slate-600 dark:text-slate-300' placeholder={`${isLoading ? 'Loading...' : 'Title...'}`} cols="40" rows="5" onChange={(e)=>dispatch({type:"ADD_DESCRIPTION",payload:e.target.value})}/>
                    </div>
                    <div className={`w-2/3 mx-auto mt-6  h-[200px] flex flex-col items-center justify-center`}>
                        <div className='relative flex items-center justify-center border border-dashed border-purple-800 dark:border-slate-300 rounded-md w-full h-full'>
                            {isLoading && <h1 className=' text-center text-purple-700 dark:text-slate-300 font-lobster tracking-widest'>Loading...</h1>}
                            {showImage.length > 0 && <div className='absolute top-0 left-0 bg-white w-full h-full flex justify-center'>
                                {
                                    showImage.map((image, index) => (
                                        <div key={index} className='max-w-full h-full'>
                                            {image.isVideo ?
                                                <div className='max-w-full h-full relative'>
                                                    <video className='w-full h-full object-contain' src={image.url} alt="poster" autoPlay loop />
                                                    <button disabled={isLoading || isSuccess} value={index} className='absolute z-[999] bg-gray-900 text-white dark: text-sm w-6 h-6 flex items-center justify-center -top-4 left-2 rounded-md' onClick={handleRemoveimage}>X</button>
                                                </div>
                                                :
                                                <div className='max-w-full h-full relative'>
                                                    <button disabled={isLoading} value={index} className='absolute z-[999] bg-gray-900 text-white dark: text-sm w-6 h-6 flex items-center justify-center -top-4 left-2 rounded-md' onClick={handleRemoveimage}>X</button>
                                                    <img className='w-full h-full object-contain' src={image.url} alt="poster" />
                                                </div>
                                            }
                                        </div>
                                    ))
                                }
                            </div>}
                            <label htmlFor='file' className={`${isLoading && 'hidden'} cursor-pointer text-purple-800 dark:text-slate-300`} ><PhotoLibraryIcon fontSize='large' /></label>
                            <input  name='imageUrl' type="file" id='file' accept="image/png, image/jpg, image/gif, image/jpeg, video/mp4, video/x-m4v, video/*" className='mb-2 hidden' onChange={handleFile} />
                        </div>
                    </div>
                    <div className='flex items-center justify-center w-full my-3'><button disabled={!state.description && !state.imageUrl.length || loading || success} className=' rounded-sm bg-slate-300 px-3 font-lobster tracking-widest text-purple-700 dark:text-gray-900'>{loading ? "Loading..." : "Post"}</button></div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default EditPost;