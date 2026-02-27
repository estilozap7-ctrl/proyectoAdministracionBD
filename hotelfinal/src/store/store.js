import { configureStore } from '@reduxjs/toolkit';
import reservationsReducer from './slices/reservationsSlice';

export const store = configureStore({
    reducer: {
        reservations: reservationsReducer,
    },
});
