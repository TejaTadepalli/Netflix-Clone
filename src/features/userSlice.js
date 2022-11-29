import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',   //to maintain the USER state
    initialState: {
        user: null,
    },
    reducers: { //the actions are used for "LOGIN" and "LOGOUT"
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { login, logout } = userSlice.actions; //this is what we will use to dispatch the actions and access them outside of the file

export const selectUser = (state)  => state.user.user; //this is what we will use to access the user state outside of the file

export default userSlice.reducer;