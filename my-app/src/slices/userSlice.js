import { createSlice } from "@reduxjs/toolkit";
import appApiSlice from "./appApiSlice";

let initialState = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
const userToken = JSON.parse(localStorage.getItem("userInfo")).token

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        logout: () => {
            localStorage.removeItem("userInfo");
            return initialState = null;
        },
    },
    extraReducers: builder => {
        builder.addMatcher(appApiSlice.endpoints.login.matchFulfilled, (_, { payload }) => {
            localStorage.setItem("userInfo", JSON.stringify(payload));
            return payload;
        });
        builder.addMatcher(appApiSlice.endpoints.updateUserProfile.matchFulfilled, (_, { payload }) => {
            localStorage.setItem("userInfo", JSON.stringify({ user: payload, token: userToken }));
        })
    }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;