import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './Slices/DataSlice';
import pageReducer from './Slices/PagesSlice';
export const store = configureStore({
    reducer: {
        dataStore: dataReducer,
        pageStore: pageReducer,
    },
});
