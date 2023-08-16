import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    currentLevel: 12, // Номер уровня в игре
    levelList: null, // Список из вопросов
    currentObject: null, // Текущий вопрос
    currentStep: 0, // Индекс текущего вопроса
    lives: 2, // Количество жизней
    currentScore: 0,
    maxCurrentScore: 0,
    mode: null, // flags | capitals
};
export const gameSlice = createSlice({
    name: 'gameStore',
    initialState,
    reducers: {
        losePage: (state) => {
            state.levelList = null;
            state.currentObject = null;
            state.currentStep = 0;
            state.lives = 0;
        },
        setCurrentLevel: (state, action) => {
            state.currentLevel = action.payload;
        },
        setCurrentObject: (state, action) => {
            state.currentObject = action.payload;
        },
        setLevelList: (state, action) => {
            state.levelList = action.payload;
        },
        setStartGame: (state) => {
            state.currentStep = 0;
            state.currentObject = state.levelList[state.currentStep];
            state.lives = 3;
            state.currentScore = state.maxCurrentScore;
        },
        correctAns: (state) => {
            state.currentStep += 1;
            state.currentObject = state.levelList[state.currentStep];
        },

        incorrectAns: (state) => {
            state.lives -= 1;
        },

        timeOut: (state) => {
            state.lives -= 1;
            state.currentStep += 1;
            state.currentObject = state.levelList[state.currentStep];
        },
        resetGame: (state) => {
            state.currentLevel = null;
            state.levelList = null;
            state.currentObject = null;
            state.currentStep = 0;
            state.lives = 0;
            state.mode = null;
        },
        setMaxCurrentScore: (state, action) => {
            state.maxCurrentScore = action.payload;
            state.currentScore = state.maxCurrentScore;
        },
        updateScore: (state, action) => {
            state.currentScore = action.payload;
        },
        setCurrentScore: (state, action) => {
            const fromTime = Math.floor((state.maxCurrentScore * 0.7) / 20);
            if (action.payload >= 16) {
                // [16;+бесконечность) сек - ничего не делаем
            } else if (action.payload >= 10) {
                state.currentScore -= Math.floor(fromTime / 3);
                // [10;15] сек
            } else {
                state.currentScore -= Math.floor(fromTime / 2);
                // [0;9] сек
            }
        },
        setNextLevel: (state) => {
            if (state.currentLevel < 12) {
                state.currentLevel = state.currentLevel + 1;
            }
        },
    },
});
export const selectCurrentLevel = (state) => state.gameStore.currentLevel;
export const selectLevelList = (state) => state.gameStore.levelList;
export const selectCurrentObject = (state) => state.gameStore.currentObject;
export const selectCurrentStep = (state) => state.gameStore.currentStep;
export const selectLives = (state) => state.gameStore.lives;
export const selectMaxCurrentScore = (state) => state.gameStore.maxCurrentScore;
export const selectCurrentScore = (state) => state.gameStore.currentScore;

export const {
    setCurrentLevel,
    setCurrentScore,
    setLevelList,
    setStartGame,
    setCurrentObject,
    correctAns,
    incorrectAns,
    timeOut,
    resetGame,
    setMaxCurrentScore,
    setNextLevel,
    updateScore,
} = gameSlice.actions;
export default gameSlice.reducer;
