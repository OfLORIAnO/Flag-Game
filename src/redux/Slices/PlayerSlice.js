import { createSlice } from '@reduxjs/toolkit';
import dataFile from '../data.json';
const initialState = {
    // allData: dataFile,
    // filterValue: '',
};
export const playerSlice = createSlice({
    name: 'playerStore',
    initialState,
    reducers: {
        // filterData: (state, action) => {
        //     state.filterValue = action.payload;
        // },
    },
});
// export const selectAllData = (state) => state.playerStore.allData;
// export const selectFiltered = (state) => state.playerStore.filterValue;
// export const { filterData } = playerSlice.actions;
export default playerSlice.reducer;
