import { createSlice } from '@reduxjs/toolkit';
import dataFile from '../data.json';
import playerDataJson from '../PlayerStats.json';
const initialState = {
    playerData: playerDataJson,
    flagMaxLevel: playerDataJson.flag.currentLevel,
    flagScores: playerDataJson.flag.score,
};
export const playerSlice = createSlice({
    name: 'playerStore',
    initialState,
    reducers: {
        levelComplite: (state) => {
            state.flagMaxLevel = state.flagMaxLevel + 1;
        },
        setScore: (state, action) => {
            const { index, scoreUpdeted } = action.payload;
            state.flagScores[index].current = scoreUpdeted;
        },
    },
});
export const selectPlayerData = (state) => state.playerStore.playerData;
export const selectFlagMaxLevel = (state) => state.playerStore.flagMaxLevel;
export const selectFlagScores = (state) => state.playerStore.flagScores;
export const { levelComplite, setScore } = playerSlice.actions;
export default playerSlice.reducer;
