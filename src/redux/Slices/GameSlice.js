import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    currentLevel: null, // Номер уровня в игре
    levelList: null, // Список из вопросов
    currentObject: null, // Текущий вопрос
    currentStep: 0, // Индекс текущего вопроса
    lives: 0, // Количество жизней
};
export const gameSlice = createSlice({
    name: 'gameStore',
    initialState,
    reducers: {
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
        },
    },
});
export const selectCurrentLevel = (state) => state.gameStore.currentLevel;
export const selectLevelList = (state) => state.gameStore.levelList;
export const selectCurrentObject = (state) => state.gameStore.currentObject;
export const selectCurrentStep = (state) => state.gameStore.currentStep;
export const selectLives = (state) => state.gameStore.lives;

export const {
    setCurrentLevel,
    setLevelList,
    setStartGame,
    setCurrentObject,
    correctAns,
    incorrectAns,
    timeOut,
    resetGame,
} = gameSlice.actions;
export default gameSlice.reducer;
