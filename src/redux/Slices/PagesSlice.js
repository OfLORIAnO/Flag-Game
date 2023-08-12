import { createSlice } from '@reduxjs/toolkit';
import dataFile from '../data.json';
const initialState = {
    home: false,
    flagInfo: true,
    gamePrepare: false,
    profile: false,
};
export const pageSlice = createSlice({
    name: 'pageStore',
    initialState,
    reducers: {
        changePage: (state, action) => {
            if (action.payload === 'home') {
                state.home = true;
                state.flagInfo = false;
                state.gamePrepare = false;
                state.profile = false;
            } else if (action.payload === 'flagInfo') {
                state.flagInfo = true;
                state.home = false;
                state.gamePrepare = false;
                state.profile = false;
            } else if (action.payload === 'gamePrepare') {
                state.gamePrepare = true;
                state.home = false;
                state.flagInfo = false;
                state.profile = false;
            } else if (action.payload === 'profile') {
                state.profile = true;
                state.home = false;
                state.flagInfo = false;
                state.gamePrepare = false;
            }
        },
    },
});
export const selectFlagInfo = (state) => state.pageStore.flagInfo;
export const selectHome = (state) => state.pageStore.home;
export const selectGamePrepare = (state) => state.pageStore.gamePrepare;
export const selectProfile = (state) => state.pageStore.profile;
export const { changePage } = pageSlice.actions;
export default pageSlice.reducer;
