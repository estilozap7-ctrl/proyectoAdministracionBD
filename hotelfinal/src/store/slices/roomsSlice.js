import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';

export const fetchHabitaciones = createAsyncThunk(
    'rooms/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.getHabitaciones();
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.mensaje || 'Error al cargar habitaciones');
        }
    }
);

const roomsSlice = createSlice({
    name: 'rooms',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHabitaciones.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHabitaciones.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchHabitaciones.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default roomsSlice.reducer;
