import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    home: true,
    flagInfo: false,
    gamePrepare: false,
    profile: false,
    game: false,
    lose: false,
    win: false,
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
                state.game = false;
                state.lose = false;
                state.win = false;
            } else if (action.payload === 'flagInfo') {
                state.flagInfo = true;
                state.home = false;
                state.gamePrepare = false;
                state.profile = false;
                state.game = false;
                state.lose = false;
                state.win = false;
            } else if (action.payload === 'profile') {
                state.profile = true;
                state.home = false;
                state.flagInfo = false;
                state.gamePrepare = false;
                state.game = false;
                state.lose = false;
                state.win = false;
            } else if (action.payload === 'gamePrepare') {
                state.gamePrepare = true;
                state.home = false;
                state.flagInfo = false;
                state.profile = false;
                state.game = false;
                state.lose = false;
                state.win = false;
            } else if (action.payload === 'game') {
                state.game = true;
                state.home = false;
                state.flagInfo = false;
                state.profile = false;
                state.gamePrepare = false;
                state.lose = false;
                state.win = false;
            } else if (action.payload === 'lose') {
                state.lose = true;
                state.home = false;
                state.flagInfo = false;
                state.profile = false;
                state.gamePrepare = false;
                state.game = false;
                state.win = false;
            } else if (action.payload === 'win') {
                state.win = true;
                state.lose = false;
                state.home = false;
                state.flagInfo = false;
                state.profile = false;
                state.gamePrepare = false;
                state.game = false;
            }
        },
    },
});
export const selectFlagInfo = (state) => state.pageStore.flagInfo;
export const selectHome = (state) => state.pageStore.home;
export const selectGamePrepare = (state) => state.pageStore.gamePrepare;
export const selectProfile = (state) => state.pageStore.profile;
export const selectGame = (state) => state.pageStore.game;
export const selectLose = (state) => state.pageStore.lose;
export const selectWin = (state) => state.pageStore.win;

export const { changePage } = pageSlice.actions;
export default pageSlice.reducer;
