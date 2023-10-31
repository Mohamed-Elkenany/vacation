import React, { createContext, useState } from 'react';
import LeftHome from '../../components/leftHome/LeftHome';
import MiddleHome from '../../components/middleHome/MiddleHome';
import RightHome from '../../components/rightHome/RightHome';
import { useSelector } from 'react-redux';
import { useGetPostByIdMutation } from '../../slices/appApiSlice';
import ListOfLikes from '../../components/listOfLikes/ListOfLikes';
export const handleListContext = createContext();
export const suggestContext = createContext();
export const EditCommentContext = createContext();
const HomePage = ({socket}) => {
  const [postById] = useGetPostByIdMutation();
  const [showLikeList, setShowLikeList] = useState(false);
  const newPost = useSelector(state => state.post);
  const [listOfLike, setListOfLike] = useState([]);
  const [success, setSucces] = useState(false);
  const value = {
    success,
    setSucces,
    setShowLikeList,
    socket
  };
  const handleListLike = async (postId) => {
    await postById(postId)
      .then(res => res.data)
      .then(result => setListOfLike(result.like))
      .catch(error => console.log(error.message));
    setShowLikeList(newPost.openListOfLike);
  }
  return (
    <div className='homePage max-md:px-0 w-full min-h-screen dark:bg-transparent px-2 flex'>
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
        <LeftHome />
        <handleListContext.Provider value={handleListLike}>
          <MiddleHome />
        </handleListContext.Provider>
        <RightHome />
      </suggestContext.Provider>
    </div>
  );
}

export default HomePage;
