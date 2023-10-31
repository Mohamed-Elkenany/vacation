import React, { useEffect, useState } from 'react';
import { useTogglefollowMutation, useGetUserByIdMutation } from '../../slices/appApiSlice';
const Button = ({ userId, setUser, user, suggestConsumer }) => {
  const mainUser = JSON.parse(localStorage.getItem("userInfo")).user;
  const [toggleFollow, { isSuccess, isLoading }] = useTogglefollowMutation();
  const [getUserById] = useGetUserByIdMutation();
  const [follow, setFollow] = useState("Follow");
  const handleToggleFollow = async () => {
    await toggleFollow(userId)
      .then(res => res.data)
      .then(result => {
        setUser(result.userFollow);
        // if (result.user.following.includes(userId)) {
        //   setFollow("Unfollow")
        // }else if(result.user.followers.includes(userId) && !result.user.following.includes(userId)){
        //   setFollow("Follow back");
        // } else {
        //   setFollow("Follow");
        // }
      });
  };
  useEffect(() => {
    getUserById(userId)
      .then(res => res.data)
      .then(result => {
        setUser(result);
        const following = result.following.find(user => user._id === mainUser._id);
        const followers = result.followers.find(user => user._id === mainUser._id);
        if (followers) {
          setFollow("Unfollow")
        } else if (following && !followers) {
          setFollow("Follow back")
        } else {
          setFollow("Follow")
        }
      })
      .catch(error => console.error(error.message));
  }, [suggestConsumer.success]);
  useEffect(() => {
    suggestConsumer.setSucces(isSuccess);
  }, [isSuccess]);
  useEffect(() => {
    
  }, []);
  return (
    <div>
      <button disabled={isLoading}  className={`${isLoading && 'opacity-60'} text-sm font-lobster tracking-wider bg-purple-700 text-slate-100 p-1 rounded-sm`} onClick={handleToggleFollow}>{follow}</button>
    </div>
  );
}
export default Button;
