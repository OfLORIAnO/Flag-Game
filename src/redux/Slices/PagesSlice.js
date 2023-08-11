import { createSlice } from '@reduxjs/toolkit';
import dataFile from '../data.json';
const initialState = {
    home: true,
    flagInfo: false,
};
export const pageSlice = createSlice({
    name: 'pageStore',
    initialState,
    reducers: {
        changePage: (state, action) => {
            if (action.payload === 'Home') {
                state.home = true;
                state.flagInfo = false;
            } else if (action.payload === 'flagInfo') {
                state.home = false;
                state.flagInfo = true;
            }
        },
    },
});
export const selectFlagInfo = (state) => state.pageStore.flagInfo;
export const selectHome = (state) => state.pageStore.home;
export const { changePage } = pageSlice.actions;
export default pageSlice.reducer;
