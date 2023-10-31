import { createSlice } from "@reduxjs/toolkit";
import appApiSlice from "./appApiSlice";

const initialState = {
    user: null,
}

const userProfileSlice = createSlice({
    name: "userProfileSlice",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addMatcher(appApiSlice.endpoints.getUserProfile.matchFulfilled, (state, action) => {
            state.user = action.payload;
        })
    }
});

export default userProfileSlice.reducer;