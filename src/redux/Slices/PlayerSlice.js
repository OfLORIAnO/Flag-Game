import { createSlice } from '@reduxjs/toolkit';
import dataFile from '../data.json';
import playerDataJson from '../PlayerStats.json';
const initialState = {
    playerData: playerDataJson,
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
export const selectPlayerData = (state) => state.playerStore.playerData;
// export const { filterData } = playerSlice.actions;
export default playerSlice.reducer;
