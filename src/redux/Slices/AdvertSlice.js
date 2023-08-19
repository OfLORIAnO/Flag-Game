import { createSlice } from '@reduxjs/toolkit';
import dataFile from '../data.json';
const initialState = {
    canShow: true,
    ysdk: null,
};

export const advertSlice = createSlice({
    name: 'advertStore',
    initialState,
    reducers: {
        setCanShow: (state) => {
            if (state.canShow) {
                state.canShow = false;
            } else if (state.canShow === false) {
                state.canShow = true;
            }
        },
        setYsdk: (state, action) => {
            state.ysdk = action.payload;
        },
    },
});
export const selectCanShowAdv = (state) => state.advertStore.canShow;
export const selectYsdk = (state) => state.advertStore.ysdk;
export const { setCanShow, setYsdk } = advertSlice.actions;
export default advertSlice.reducer;
