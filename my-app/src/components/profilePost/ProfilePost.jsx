import React, { useContext, useEffect, useState } from 'react';
import Post from '../posts/post/Post';
import { useParams } from 'react-router-dom';
import { useGetPostProfileMutation } from '../../slices/appApiSlice';
import { postLengthContext } from '../profilePage/middleprofile/Middleprofile';
const ProfilePost = ({ handleListConsumer, suggestConsumer }) => {
  const { id } = useParams();
  const postLengthConsumer = useContext(postLengthContext);
  const [getprofilePost, { isLoading, isSuccess }] = useGetPostProfileMutation();
  const [posts, setPosts] = useState([]);
  const deletePost = (postId) => {
    const newPosts = posts.filter(post => {
      if(post._id !== postId){
        return post;
      }
    });
    setPosts(newPosts);
    postLengthConsumer.setPostLength(newPosts.length);
  }
  useEffect(() => {
    getprofilePost(id)
      .then(res => res.data)
      .then(resulte => {
        setPosts(resulte.posts);
        postLengthConsumer.setPostLength(resulte.posts?.length);
      })
      .catch(error => console.log(error));
  }, [id, getprofilePost]);
  return (
    <div className="flex flex-col gap-2 mt-1">
    {
        isLoading ?
          <h1 className='text-center font-lobster tracking-widest text-purple-700 dark:text-slate-300'>Loading...</h1>
          :
        (
          posts?.length > 0 ? posts.map((post, index) => (
            <div key={index}>
                <Post post={post} handleListConsumer={handleListConsumer} suggestConsumer={suggestConsumer} deletePost={deletePost} />
            </div>
          ))
            :
          <h1 className="text-center text-2xl text-purple-700 dark:text-slate-300 font-lobster tracking-wider select-none">No posts yet</h1>
      )
    }
    </div>
  );
}

export default ProfilePost;




