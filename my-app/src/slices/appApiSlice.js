import { useRadioGroup } from '@mui/material';
import {  createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const appApiSlice = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
    endpoints: builder => ({
        register: builder.mutation({
            query: user => ({
                url: "/api/register",
                method: "POST",
                prepareHeaders: headers => {
                    headers.set("Content-Type", "multipart/form-data");
                    return headers;
                },
                body: user
            })
        }),
        login: builder.mutation({
            query: user => ({
                url: '/api/login',
                method: 'POST',
                body: user,
            })
        }),
        suggestUser: builder.mutation({
            query: user => {
                const token = user.token;
                return {
                    url: "/api/suggest-user",
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            }
        }),
        getUserProfile: builder.mutation({
            query: id => ({
                url: `/api/profile/${id}`,
                method: "GET",
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`}
            })
        }),
        getUserById: builder.mutation({
            query: id => ({
                url: `/api/profile/${id}`,
                method: "GET",
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`}
            })
        }),
        updateUserProfile: builder.mutation({
            query: userUpdate => ({
                url: `/api/profile/${userUpdate.userId}`,
                method: "PATCH",
                body: userUpdate,
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}` },
            })
        }),
        deleteUserAvatar: builder.mutation({
            query: avatarId => ({
                url: `/api/delete-profile-photo/${avatarId}`,
                method: "PATCH",
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}` },
            })
        }),
        uploadUserAvatar: builder.mutation({
            query: avatar => ({
                url: `/api/upload-profile-photo/${avatar.get("userId")}`,
                method:"PUT",
                body: avatar,
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}` },
                prepareHeaders: headers => {
                    headers.set("Content-Type", "multipart/form-data");
                    return headers;
                }
            })
        }),
        uploadUserBanner: builder.mutation({
            query: banner => ({
                url: `/api/upload-profile-banner/${banner.get("userId")}`,
                method:"PUT",
                body: banner,
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}` },
                prepareHeaders: headers => {
                    headers.set("Content-Type", "multipart/form-data");
                    return headers;
                }
            })
        }),
        deleteUserBanner: builder.mutation({
            query: bannerId => ({
                url: `/api/delete-profile-banner/${bannerId}`,
                method: "PATCH",
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}` },
            })
        }),
        searchFrind: builder.mutation({
            query: search => ({
                    url: "/api/search-friend",
                    method: "POST",
                    body: search,
                    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`}
            })
        }),
        togglefollow: builder.mutation({
            query: userId => ({
                    url:`/api/following/${userId}`,
                    method: "PUT",
                    body:userId,
                    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`}
            })
        }),
        addNewPost: builder.mutation({
            query: post => ({
                url: `/api/create-post/${post.get("userId")}`,
                method: "POST",
                body: post,
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}` },
                prepareHeaders: headers => {
                    headers.set("Content-Type", "multipart/form-data");
                    return headers;
                }
            })
        }),
        updatePost: builder.mutation({
            query: post => ({
                url: `/api/update-post/${post.get("postId")}`,
                method: "PUT",
                body: post,
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}` },
                prepareHeaders: headers => {
                    headers.set("Content-Type", "multipart/form-data");
                    return headers;
                }
            })
        }),
        getAllPosts: builder.mutation({
            query: posts => ({
                url: "/api/posts",
                method: "GET",
                body: posts,
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}` },
                prepareHeaders: headers => {
                    headers.set("Content-Type", "multipart/form-data");
                    return headers;
                }
            })
        }),
        getPostProfile: builder.mutation({
            query: userId => ({
                url: `/api/profile-post/${userId}`,
                method: "GET",
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}` },
            })
        }),
        getPostById: builder.mutation({
            query: post => ({
                url: `/api/post/${post}`,
                method: "GET",
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}` },
            })
        }),
        toggleLikePost: builder.mutation({
            query: post => ({
                url: `/api/likes/${post}`,
                method: "PUT",
                body: post,
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}` }
            })
        }),
        addComment: builder.mutation({
            query: comment => ({
                url: `/api/create-comment/${comment.postId}`,
                method: "POST",
                body: comment,
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}` }
            })
        }),
        getCommentPost: builder.mutation({
            query: postId => ({
                url: `/api/post-comments/${postId}`,
                method: "POST",
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}` }
            })
        }),
        updateCommentPost: builder.mutation({
            query: newComment => ({
                url: `/api/update-comment/${newComment.commentId}`,
                method: "PUT",
                body: newComment,
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}` }
            })
        }),
        deleteCommentPost: builder.mutation({
            query: commentId => ({
                url: `/api/remove-comment/${commentId}`,
                method: "DELETE",
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}` }
            })
        }),
        toggleCommentLike: builder.mutation({
            query: commentId => ({
                url: `/api/like-comment/${commentId}`,
                method: "PUT",
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}` }
            })
        }),
        createReplyComment: builder.mutation({
            query: ReplyComment => ({
                url: `/api/create-replyComment/${ReplyComment.commentId}`,
                method: "POST",
                body: ReplyComment,
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}` }
            })
        }),
        deleteMyPost: builder.mutation({
            query: postId => ({
                url: `/api/remove-post/${postId}`,
                method: "DELETE",
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}` }
            })
        }),
    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useGetUserProfileMutation,
    useUpdateUserProfileMutation,
    useGetUserByIdMutation,
    useSearchFrindMutation,
    useTogglefollowMutation,
    useDeleteUserAvatarMutation,
    useUploadUserAvatarMutation,
    useUploadUserBannerMutation,
    useDeleteUserBannerMutation,
    useAddNewPostMutation,
    useSuggestUserMutation,
    useGetAllPostsMutation,
    useToggleLikePostMutation,
    useGetPostByIdMutation,
    useGetPostProfileMutation,
    useUpdatePostMutation,
    useDeleteMyPostMutation,
    useAddCommentMutation,
    useGetCommentPostMutation,
    useUpdateCommentPostMutation,
    useDeleteCommentPostMutation,
    useToggleCommentLikeMutation,
    useCreateReplyCommentMutation} = appApiSlice;
export default appApiSlice;