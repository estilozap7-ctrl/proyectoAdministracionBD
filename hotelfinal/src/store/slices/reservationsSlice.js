import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [
        {
            id: '1',
            guestName: 'Mario Bros',
            roomNumber: '101',
            roomType: 'Suite',
            checkIn: '2026-03-01',
            checkOut: '2026-03-05',
            status: 'Confirmed'
        },
        {
            id: '2',
            guestName: 'Luigi Bros',
            roomNumber: '102',
            roomType: 'Deluxe',
            checkIn: '2026-03-02',
            checkOut: '2026-03-06',
            status: 'Pending'
        },
        {
            id: '3',
            guestName: 'Princess Peach',
            roomNumber: '201',
            roomType: 'Penthouse',
            checkIn: '2026-03-10',
            checkOut: '2026-03-15',
            status: 'Confirmed'
        }
    ],
    searchQuery: '',
    groupQuery: 'All', // 'All', 'Suite', 'Deluxe', 'Penthouse', etc.
    loading: false,
    error: null,
};

const reservationsSlice = createSlice({
    name: 'reservations',
    initialState,
    reducers: {
        addReservation: (state, action) => {
            // action.payload will contain the new reservation object
            // Generate a temporary ID until backend is connected
            const newReservation = {
                ...action.payload,
                id: Date.now().toString(),
            };
            state.items.push(newReservation);
        },
        updateReservation: (state, action) => {
            const index = state.items.findIndex((res) => res.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteReservation: (state, action) => {
            state.items = state.items.filter((res) => res.id !== action.payload);
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setGroupQuery: (state, action) => {
            state.groupQuery = action.payload;
        }
    },
});

export const { addReservation, updateReservation, deleteReservation, setSearchQuery, setGroupQuery } = reservationsSlice.actions;

export default reservationsSlice.reducer;
