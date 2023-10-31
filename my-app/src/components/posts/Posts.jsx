import React, { useEffect, useState } from 'react';
import Post from './post/Post';
import { useGetAllPostsMutation } from '../../slices/appApiSlice';
const Posts = ({handleListConsumer, suggestConsumer}) => {
  const [getAllPosts, { error, isLoading, isSuccess }] = useGetAllPostsMutation();
  const [Posts, setPosts] = useState([]);
  const deletePost = (postId) => {
    const newPosts = Posts.filter(post => {
      if(post._id !== postId){
        return post;
      }
    });
    setPosts(newPosts);
  }
  useEffect(() => {
    getAllPosts()
      .then(res => res.data)
      .then(resulte => setPosts(resulte))
      .catch(error => console.log(error.message));
  }, []);
  return (
    <div className="flex flex-col gap-2 mt-4">
      {
        isLoading && <h1 className=' dark:text-slate-400 text-center font-lobster tracking-widest'>Loading...</h1>
      }
      {
        isSuccess && Posts.map((post, index) => (
          <div key={index}>
              <Post post={post} handleListConsumer={handleListConsumer} suggestConsumer={suggestConsumer} deletePost={deletePost} />
          </div>
        ))
      }
    </div>
  );
}

export default Posts;
