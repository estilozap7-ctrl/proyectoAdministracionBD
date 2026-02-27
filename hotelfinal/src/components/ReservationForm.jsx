import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { crearReservacion, editarReservacion, clearMessages } from '../store/slices/reservationsSlice';
import { fetchHabitaciones } from '../store/slices/roomsSlice';
import { Save, UserPlus, X, Loader2 } from 'lucide-react';

const EMPTY_FORM = {
    // Datos del huésped
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    documento: '',
    // Datos de habitación
    id_habitacion: '',
    // Datos de la reservación
    fecha_entrada: '',
    fecha_salida: '',
    estado: 'activa',
    precio_total: '',
    notas: '',
};

const ReservationForm = ({ editingReservation, onClearEdit }) => {
    const dispatch = useDispatch();
    const { loading, error, successMsg } = useSelector((s) => s.reservaciones);
    const { items: habitaciones, loading: loadingRooms } = useSelector((s) => s.rooms);

    const [formData, setFormData] = useState(EMPTY_FORM);

    // Cargar habitaciones al montar el componente
    useEffect(() => {
        dispatch(fetchHabitaciones());
    }, [dispatch]);

    // Cargar datos al editar
    useEffect(() => {
        if (editingReservation) {
            setFormData({
                nombre: editingReservation.huesped?.nombre || '',
                apellido: editingReservation.huesped?.apellido || '',
                email: editingReservation.huesped?.email || '',
                telefono: editingReservation.huesped?.telefono || '',
                documento: editingReservation.huesped?.documento || '',
                id_habitacion: editingReservation.id_habitacion || '',
                fecha_entrada: editingReservation.fecha_entrada || '',
                fecha_salida: editingReservation.fecha_salida || '',
                estado: editingReservation.estado || 'activa',
                precio_total: editingReservation.precio_total || '',
                notas: editingReservation.notas || '',
            });
        } else {
            setFormData(EMPTY_FORM);
        }
    }, [editingReservation]);

    // Limpiar mensajes después de 3s
    useEffect(() => {
        if (successMsg || error) {
            const t = setTimeout(() => dispatch(clearMessages()), 3000);
            return () => clearTimeout(t);
        }
    }, [successMsg, error, dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reservacionData = {
            id_habitacion: Number(formData.id_habitacion),
            fecha_entrada: formData.fecha_entrada,
            fecha_salida: formData.fecha_salida,
            estado: formData.estado,
            precio_total: formData.precio_total ? Number(formData.precio_total) : null,
            notas: formData.notas || null,
            // Datos del huésped embebidos para que el server los procese
            huesped: {
                nombre: formData.nombre,
                apellido: formData.apellido,
                email: formData.email,
                telefono: formData.telefono || null,
                documento: formData.documento || null,
            },
        };

        if (editingReservation) {
            await dispatch(editarReservacion({
                id: editingReservation.id_reservacion,
                datos: reservacionData,
            }));
            onClearEdit();
        } else {
            await dispatch(crearReservacion(reservacionData));
            setFormData(EMPTY_FORM);
        }
    };

    const inp = "w-full border-4 border-black bg-white p-2 font-mono text-black outline-none focus:bg-yellow-100 focus:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all text-sm";
    const lbl = "block font-mono font-bold text-black uppercase mb-1 text-xs tracking-wider";

    return (
        <div className="bg-yellow-400 p-6 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative">

            {/* Tornillos decorativos */}
            <div className="absolute top-2 left-2 w-3 h-3 bg-gray-300 border-2 border-black rounded-full" />
            <div className="absolute top-2 right-2 w-3 h-3 bg-gray-300 border-2 border-black rounded-full" />
            <div className="absolute bottom-2 left-2 w-3 h-3 bg-gray-300 border-2 border-black rounded-full" />
            <div className="absolute bottom-2 right-2 w-3 h-3 bg-gray-300 border-2 border-black rounded-full" />

            {/* Título */}
            <div className="flex justify-between items-center mb-6 mt-2 px-2">
                <h3 className="text-xl font-black font-mono text-black flex items-center gap-3 uppercase tracking-widest bg-white px-3 py-1 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                    {editingReservation
                        ? <><Save className="w-6 h-6 text-red-600" /> Editar Reservación</>
                        : <><UserPlus className="w-6 h-6 text-green-600" /> Nueva Reservación</>}
                </h3>
                {editingReservation && (
                    <button onClick={onClearEdit}
                        className="bg-red-500 border-4 border-black p-1 hover:bg-red-400 hover:translate-y-1 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none transition-all"
                        aria-label="Cancelar edición">
                        <X className="w-6 h-6 text-white" />
                    </button>
                )}
            </div>

            {/* Mensajes */}
            {successMsg && (
                <div className="mb-4 px-4 py-2 bg-green-500 border-4 border-black text-white font-mono font-bold text-sm shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                    ✅ {successMsg}
                </div>
            )}
            {error && (
                <div className="mb-4 px-4 py-2 bg-red-500 border-4 border-black text-white font-mono font-bold text-sm shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                    ❌ {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 px-2">

                {/* ── Sección Huésped ──────────────────────── */}
                <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                    <p className="font-black font-mono text-xs uppercase tracking-widest text-black mb-3 border-b-2 border-black pb-2">
                        👤 Datos del Huésped
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={lbl}>Nombre *</label>
                            <input required type="text" name="nombre" value={formData.nombre}
                                onChange={handleChange} className={inp} placeholder="Ej. Juan" />
                        </div>
                        <div>
                            <label className={lbl}>Apellido *</label>
                            <input required type="text" name="apellido" value={formData.apellido}
                                onChange={handleChange} className={inp} placeholder="Ej. García" />
                        </div>
                        <div>
                            <label className={lbl}>Email *</label>
                            <input required type="email" name="email" value={formData.email}
                                onChange={handleChange} className={inp} placeholder="juan@correo.com" />
                        </div>
                        <div>
                            <label className={lbl}>Teléfono</label>
                            <input type="text" name="telefono" value={formData.telefono}
                                onChange={handleChange} className={inp} placeholder="+1-555-1234" />
                        </div>
                        <div>
                            <label className={lbl}>Documento (DNI/Pasaporte)</label>
                            <input type="text" name="documento" value={formData.documento}
                                onChange={handleChange} className={inp} placeholder="12345678" />
                        </div>
                    </div>
                </div>

                {/* ── Sección Reservación ──────────────────── */}
                <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                    <p className="font-black font-mono text-xs uppercase tracking-widest text-black mb-3 border-b-2 border-black pb-2">
                        🏨 Datos de la Reservación
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={lbl}>Habitación *</label>
                            <select
                                required
                                name="id_habitacion"
                                value={formData.id_habitacion}
                                onChange={handleChange}
                                className={inp}
                            >
                                <option value="">Selecciona una habitación</option>
                                {habitaciones
                                    .filter(h => h.disponible)
                                    .map(h => (
                                        <option key={h.id_habitacion} value={h.id_habitacion}>
                                            Hab. {h.numero} - {h.tipo.toUpperCase()} (${h.precio_noche})
                                        </option>
                                    ))}
                            </select>
                            {loadingRooms && <p className="text-[10px] font-mono text-gray-500 mt-1 animate-pulse italic">Cargando habitaciones...</p>}
                        </div>
                        <div>
                            <label className={lbl}>Estado</label>
                            <select name="estado" value={formData.estado} onChange={handleChange} className={inp}>
                                <option value="activa">Activa</option>
                                <option value="cancelada">Cancelada</option>
                                <option value="completada">Completada</option>
                            </select>
                        </div>
                        <div>
                            <label className={lbl}>Fecha de Entrada *</label>
                            <input required type="date" name="fecha_entrada" value={formData.fecha_entrada}
                                onChange={handleChange} className={inp} />
                        </div>
                        <div>
                            <label className={lbl}>Fecha de Salida *</label>
                            <input required type="date" name="fecha_salida" value={formData.fecha_salida}
                                onChange={handleChange} className={inp} />
                        </div>
                        <div>
                            <label className={lbl}>Precio Total ($)</label>
                            <input type="number" name="precio_total" value={formData.precio_total}
                                onChange={handleChange} className={inp} placeholder="0.00" step="0.01" min="0" />
                        </div>
                        <div>
                            <label className={lbl}>Notas</label>
                            <input type="text" name="notas" value={formData.notas}
                                onChange={handleChange} className={inp} placeholder="Observaciones..." />
                        </div>
                    </div>
                </div>

                <div className="pt-2 flex justify-end">
                    <button type="submit" disabled={loading}
                        className={`flex items-center gap-2 font-mono font-black uppercase tracking-widest px-6 py-3 border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all disabled:opacity-60 disabled:cursor-not-allowed ${editingReservation ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                        {loading
                            ? <><Loader2 className="w-5 h-5 animate-spin" /> Guardando...</>
                            : editingReservation ? 'Actualizar' : 'Guardar'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReservationForm;