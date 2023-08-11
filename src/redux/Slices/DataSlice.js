import { createSlice } from '@reduxjs/toolkit';
import dataFile from '../data.json';
const initialState = {
    allData: dataFile,
    filterValue: '',
};
export const dataSlice = createSlice({
    name: 'dataStore',
    initialState,
    reducers: {
        filterData: (state, action) => {
            state.filterValue = action.payload;
        },
    },
});
export const selectAllData = (state) => state.dataStore.allData;
export const selectFiltered = (state) => state.dataStore.filterValue;
export const { filterData } = dataSlice.actions;
export default dataSlice.reducer;
