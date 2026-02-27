import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

// ── Reservaciones ────────────────────────────────────────────
export const getReservaciones = () => api.get('/reservaciones');
export const getReservacionById = (id) => api.get(`/reservaciones/${id}`);
export const createReservacion = (data) => api.post('/reservaciones', data);
export const updateReservacion = (id, data) => api.put(`/reservaciones/${id}`, data);
export const deleteReservacion = (id) => api.delete(`/reservaciones/${id}`);

// ── Huéspedes ────────────────────────────────────────────────
export const getHuespedes = () => api.get('/huespedes');
export const createHuesped = (data) => api.post('/huespedes', data);
export const updateHuesped = (id, data) => api.put(`/huespedes/${id}`, data);
export const deleteHuesped = (id) => api.delete(`/huespedes/${id}`);

// ── Habitaciones ─────────────────────────────────────────────
export const getHabitaciones = () => api.get('/habitaciones');
export const getHabitDisponibles = () => api.get('/habitaciones/disponibles');

export default api;
