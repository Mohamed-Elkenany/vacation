import React, { useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ArrowForward from '@mui/icons-material/ArrowForward';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { initialStatePost, reducer } from '../../services/addPostReducer';
import { useAddNewPostMutation } from '../../slices/appApiSlice';
import { ToastContainer, toast } from 'react-toastify';
import EntryNavbar from '../../components/entryNavbar/EntryNavbar';
const AddPost = () => {
    const user = JSON.parse(localStorage.getItem("userInfo")).user;
    const navigate = useNavigate()
    const [state, dispatch] = useReducer(reducer, initialStatePost);
    const [addNewPost, { error, isLoading, isSuccess }] = useAddNewPostMutation();
    const [toShowimages, setToShowImages] = useState([]);
    const handleFile = (e) => {
        const selectFile = e.target.files
        const arraySelectedFile = Array.from(selectFile);
        const addMorePhoto = state.imageUrl.concat(arraySelectedFile);
        const showImage = addMorePhoto.map(imageurl => {
            if (imageurl.type.startsWith("video")) {
                return {
                    url: URL.createObjectURL(imageurl),
                    isVideo: true,
                }
            } else {
                return {
                    url: URL.createObjectURL(imageurl),
                    isVideo: false,
                }
            }
        })
        setToShowImages(showImage);
        dispatch({ type: 'ADD_IMAGE', payload: addMorePhoto });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (state.description || state.imageUrl.length) {
            let formData = new FormData();
            formData.append("description", state.description);
            for (let file of state.imageUrl) {
                formData.append("imageUrl", file);
            }
            formData.append("userId", user._id);
            addNewPost(formData);
        } else {
            return toast.warning("Your title or photo is required", { autoClose: 2000, position: 'top-center' });
        }
    }
    if (error) {
        console.log(error);
    }
    const handleRemovePhoto = (e) => {
        e.preventDefault();
        const removeElementFRomState = state.imageUrl?.filter(element => {
            if (element !== state.imageUrl[e.target.value]) {
                return element;
            }
        });
        const removeElementToshow = toShowimages.filter(element => {
            if (element !== toShowimages[e.target.value]) {
                return element;
            }
        });
        setToShowImages(removeElementToshow)
        dispatch({ type: 'ADD_IMAGE', payload: removeElementFRomState });
    }
    useEffect(() => {
        localStorage.getItem("theme") === "dark" ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark")
    }, [])
    useEffect(() => {
        if (isSuccess) {
            toast.success("Post created successfully", { autoClose: 1500 });
            setTimeout(() => {
                navigate("/")
            }, 2100);
        };
}, [isSuccess, navigate]);
    return(
        <div className='bg-slate-100 dark:bg-gray-900 min-h-screen pb-6'>
            <EntryNavbar/>
            <div className='w-full h-full mt-4 max-md:px-4'>
                <form encType='multipart/form-data' className=' bg-slate-50 dark:bg-gray-800 w-3/4 mx-auto rounded-md shadow-md p-1 max-md:w-full'>
                    <h1 className="text-center font-lobster text-xl tracking-widest text-purple-800 dark:text-slate-300 font-semibold">Create post</h1>
                    <div className='border-b dark:border-gray-600 w-2/3 h-[150px] mx-auto max-md:w-10/12'>
                        <textarea className=' bg-transparent p-1 outline-none  resize-none w-full max-h-full text-slate-600 dark:text-slate-300' placeholder='Title...' cols="40" rows="5" onChange={(e)=>dispatch({type:"ADD_DESCRIPTION",payload:e.target.value})}/>
                    </div>
                    <div className={`w-2/3 mx-auto mt-6  h-[200px] flex flex-col items-center justify-center`}>
                        <div className='relative flex items-center justify-center border border-dashed border-purple-800 dark:border-slate-300 rounded-md w-full h-full'>
                            { toShowimages.length > 0 && <div className='absolute top-0 left-0 bg-white w-full h-full flex justify-center'>
                                {
                                    toShowimages.map((image, index) => (
                                        <div key={index} className='max-w-full h-full'>
                                            { image.isVideo ?
                                                <div className='max-w-full h-full relative'>
                                                    <video className='w-full h-full object-contain' src={image.url} alt="poster" autoPlay loop />
                                                    <button disabled={isLoading || isSuccess} value={index} onClick={handleRemovePhoto} className='absolute z-[999] bg-gray-900 text-white dark: text-sm w-6 h-6 flex items-center justify-center -top-4 left-2 rounded-md'>X</button>
                                                </div>
                                                :
                                                <div className='max-w-full h-full relative'>
                                                    <button disabled={isLoading || isSuccess} value={index} onClick={handleRemovePhoto} className='absolute z-[999] bg-gray-900 text-white dark: text-sm w-6 h-6 flex items-center justify-center -top-4 left-2 rounded-md'>X</button>
                                                    <img className='w-full h-full object-contain' src={image.url} alt="poster" />
                                                </div>
                                            }
                                        </div>
                                    ))
                                }
                            </div>}
                            <label htmlFor='file' className={`${ state.imageUrl?.length > 0 && 'hidden'} cursor-pointer text-purple-800 dark:text-slate-300`} ><PhotoLibraryIcon fontSize='large'/></label>
                            <input multiple name='imageUrl' type="file" id='file' accept="image/png, image/jpg, image/gif, image/jpeg, video/mp4, video/x-m4v, video/*" className='mb-2 hidden' onChange={handleFile}/>
                        </div>
                        <label htmlFor='file' className={`${ state.imageUrl?.length > 0 ? 'flex' : 'hidden'} items-center cursor-pointer dark:text-slate-300 mt-1 max-md:text-sm gap-1`}>
                            <PhotoLibraryIcon fontSize='small' />
                            <span>Add more photo / video</span>
                        </label>
                    </div>
                    <div className='flex items-center justify-center w-full my-3'><button className=' rounded-sm bg-slate-300 px-3 font-lobster tracking-widest text-purple-700 dark:text-gray-900' onClick={handleSubmit} disabled={isLoading}>{ isLoading ? "Loading..." : "Post" }</button></div>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default AddPost;