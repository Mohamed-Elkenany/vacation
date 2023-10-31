import { createSlice } from "@reduxjs/toolkit";
import appApiSlice from "./appApiSlice";
let initialState = [];
const postSlice = createSlice({
    name: "postSlice",
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder.addMatcher(appApiSlice.endpoints.getAllPosts.matchFulfilled, (_, { payload }) => payload);
    }
});

export default postSlice.reducer;