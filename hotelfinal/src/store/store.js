import { configureStore } from '@reduxjs/toolkit';
import reservacionesReducer from './slices/reservationsSlice';
import roomsReducer from './slices/roomsSlice';

export const store = configureStore({
    reducer: {
        reservaciones: reservacionesReducer,
        rooms: roomsReducer,
    },
});
