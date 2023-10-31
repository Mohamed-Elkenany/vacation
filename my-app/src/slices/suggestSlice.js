import { createSlice } from "@reduxjs/toolkit";
import appApiSlice from "./appApiSlice";

const initialState = [];

const suggestSlice = createSlice({
    name: "suggest",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addMatcher(appApiSlice.endpoints.suggestUser.matchFulfilled, (_, { payload }) => payload);
    }
})

export default suggestSlice.reducer;