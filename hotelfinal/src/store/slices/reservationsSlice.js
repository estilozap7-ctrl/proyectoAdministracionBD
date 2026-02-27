import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';

// ── Async Thunks ─────────────────────────────────────────────

export const fetchReservaciones = createAsyncThunk(
    'reservaciones/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.getReservaciones();
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.mensaje || 'Error al cargar reservaciones');
        }
    }
);

export const crearReservacion = createAsyncThunk(
    'reservaciones/crear',
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await api.createReservacion(payload);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.mensaje || 'Error al crear la reservación');
        }
    }
);

export const editarReservacion = createAsyncThunk(
    'reservaciones/editar',
    async ({ id, datos }, { rejectWithValue }) => {
        try {
            const { data } = await api.updateReservacion(id, datos);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.mensaje || 'Error al actualizar la reservación');
        }
    }
);

export const eliminarReservacion = createAsyncThunk(
    'reservaciones/eliminar',
    async (id, { rejectWithValue }) => {
        try {
            await api.deleteReservacion(id);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data?.mensaje || 'Error al eliminar la reservación');
        }
    }
);

// ── Slice ─────────────────────────────────────────────────────

const initialState = {
    items: [],
    searchQuery: '',
    groupQuery: 'Todos',   // 'Todos' | 'individual' | 'doble' | 'suite' | 'penthouse'
    loading: false,
    error: null,
    successMsg: null,
};

const reservacionesSlice = createSlice({
    name: 'reservaciones',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setGroupQuery: (state, action) => {
            state.groupQuery = action.payload;
        },
        clearMessages: (state) => {
            state.error = null;
            state.successMsg = null;
        },
    },
    extraReducers: (builder) => {

        // ── fetchReservaciones ────────────────────────────────
        builder
            .addCase(fetchReservaciones.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReservaciones.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchReservaciones.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // ── crearReservacion ──────────────────────────────────
        builder
            .addCase(crearReservacion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(crearReservacion.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
                state.successMsg = 'Reservación creada correctamente';
            })
            .addCase(crearReservacion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // ── editarReservacion ─────────────────────────────────
        builder
            .addCase(editarReservacion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editarReservacion.fulfilled, (state, action) => {
                state.loading = false;
                const idx = state.items.findIndex(
                    (r) => r.id_reservacion === action.payload.id_reservacion
                );
                if (idx !== -1) state.items[idx] = action.payload;
                state.successMsg = 'Reservación actualizada correctamente';
            })
            .addCase(editarReservacion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // ── eliminarReservacion ───────────────────────────────
        builder
            .addCase(eliminarReservacion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(eliminarReservacion.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(
                    (r) => r.id_reservacion !== action.payload
                );
                state.successMsg = 'Reservación eliminada correctamente';
            })
            .addCase(eliminarReservacion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setSearchQuery, setGroupQuery, clearMessages } = reservacionesSlice.actions;
export default reservacionesSlice.reducer;
