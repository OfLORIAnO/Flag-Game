import { createSlice } from '@reduxjs/toolkit';
import playerDataJson from '../PlayerStats.json';

const initialState = {
    PlayerSdk: null,
    playerData: playerDataJson,
    flagMaxLevel: playerDataJson.currentLevel,
    flagScores: playerDataJson.score,
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
        setPlayerSdk: (state, action) => {
            state.PlayerSdk = action.payload;
        },
        setTotalScore: (state, action) => {
            state.flagScores = action.payload;
        },
        setTotalLevel: (state, action) => {
            state.flagMaxLevel = action.payload;
        },
        setDefault: (state) => {
            state.flagScores = playerDataJson.score;
            state.flagMaxLevel = playerDataJson.currentLevel;
            console.log('Редакс отработал');
        },
    },
});
export const selectPlayerData = (state) => state.playerStore.playerData;
export const selectFlagMaxLevel = (state) => state.playerStore.flagMaxLevel;
export const selectFlagScores = (state) => state.playerStore.flagScores;
export const selectPlayerSdk = (state) => state.playerStore.PlayerSdk;
export const selectTotalScore = (state) => {
    return state.playerStore.flagScores.length > 0
        ? state.playerStore.flagScores.reduce((num, score) => {
              return num + score.current;
          }, 0)
        : 0;
};
export const { levelComplite, setScore, setPlayerSdk, setTotalScore, setTotalLevel, setDefault } = playerSlice.actions;
export default playerSlice.reducer;
