import React, { createContext, useEffect, useState } from 'react';
import LeftProfile from '../../components/profilePage/leftProfile/LeftProfile';
import Middleprofile from '../../components/profilePage/middleprofile/Middleprofile';
import RightProfile from '../../components/profilePage/rightProfile/RightProfile';
import { useGetPostByIdMutation, useGetUserProfileMutation } from '../../slices/appApiSlice';
import { useSelector } from 'react-redux';
import ListOfLikes from '../../components/listOfLikes/ListOfLikes';
import { useParams } from 'react-router-dom';
export const handleListContext = createContext();
export const suggestContext = createContext();

const ProfilePage = () => {
  const { id } = useParams();
  const [postById] = useGetPostByIdMutation();
  const [user, { isLoading, isSuccess }] = useGetUserProfileMutation();
  const [showLikeList, setShowLikeList] = useState(false);
  const newPost = useSelector(state => state.post);
  const [listOfLike, setListOfLike] = useState([]);
  const [success, setSucces] = useState(false);
  const value = {
    success,
    setSucces,
    setShowLikeList
  };
  const handleListLike = async (postId) => {
    await postById(postId)
      .then(res => res.data)
      .then(result => setListOfLike(result.like))
      .catch(error => console.log(error.message));
    setShowLikeList(newPost.openListOfLike);
  }
  useEffect(() => {
    user(id);
  }, [useParams]);
  return (
    <div className='profilePage min-h-screen max-md:px-0 w-full  dark:bg-transparent max-lg:px-1 px-4 flex'>
      {showLikeList &&
        <div className='absolute z-[1000] left-0 top-0 min-h-full w-full bg-black bg-opacity-70 '>
          <div className=' max-md:w-11/12 md:w-1/3 max-h-[500px] rounded-sm bg-white dark:bg-gray-700 fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 py-1 px-2'>
            <div className='text-white absolute -right-4 -top-4 bg-black w-7 h-7 rounded-sm flex items-center justify-center cursor-pointer' onClick={() => setShowLikeList(false)}>X</div>
            <div className=' bg-transparent w-full max-h-[490px] overflow-y-scroll scrollbar-none'>
              {
                listOfLike.length ?
                  <div className='max-h-full w-full flex flex-col gap-[10px]'>
                    {
                      listOfLike.map((userLike, index) => (
                        <ListOfLikes userLike={userLike} key={index} />
                      ))
                    }
                  </div>
                  :
                  <h1 className="text-center text-gray-900 dark:text-slate-300 font-lobster tracking-wider">There are no likes for this post yet</h1>
              }
            </div>
          </div>
        </div>}
      <suggestContext.Provider value={value}>
          <RightProfile />
        <handleListContext.Provider value={handleListLike}>
          <Middleprofile/>
        </handleListContext.Provider>
          <LeftProfile />
      </suggestContext.Provider>
    </div>
  );
}

export default ProfilePage;