import { createSlice } from "@reduxjs/toolkit";
import appApiSlice from "./appApiSlice";
const initialState = {
    post: null,
    openListOfLike: true,
}
const postSlice = createSlice({
    name: "postSlice",
    initialState,
    reducers: {
        listLike: (state, action) => {
            state.listLike = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addMatcher(appApiSlice.endpoints.toggleLikePost.matchFulfilled, (state, action ) => {
            state.post = action.payload;
        }
        );
        builder.addMatcher(appApiSlice.endpoints.getPostById.matchFulfilled, (state, action ) => {
            state.post = action.payload;
        }
        );
    }
});

export const { updateForLike, listLike } = postSlice.actions;
export default postSlice.reducer;