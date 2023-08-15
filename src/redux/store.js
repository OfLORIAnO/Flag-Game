import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './Slices/DataSlice';
import pageReducer from './Slices/PagesSlice';
import gameReducer from './Slices/GameSlice';
import playerReducer from './Slices/PlayerSlice';
export const store = configureStore({
    reducer: {
        dataStore: dataReducer,
        pageStore: pageReducer,
        gameStore: gameReducer,
        playerStore: playerReducer,
    },
});
