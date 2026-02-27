import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { eliminarReservacion } from '../store/slices/reservationsSlice';
import { Edit2, Trash2, BedDouble, Loader2 } from 'lucide-react';

const ReservationList = ({ onEdit }) => {
    const dispatch = useDispatch();
    const { items, searchQuery, groupQuery, loading, error } = useSelector((s) => s.reservaciones);

    const filtered = items.filter((item) => {
        const nombreCompleto = `${item.huesped?.nombre || ''} ${item.huesped?.apellido || ''}`.toLowerCase();
        const matchSearch = nombreCompleto.includes(searchQuery.toLowerCase());
        const matchGroup = groupQuery === 'Todos' || item.habitacion?.tipo === groupQuery;
        return matchSearch && matchGroup;
    });

    const estadoStyle = (estado) => {
        const base = "px-3 py-1 text-xs font-black font-mono border-2 border-black uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)] inline-block";
        switch (estado) {
            case 'activa': return `${base} bg-green-500 text-white`;
            case 'cancelada': return `${base} bg-red-500 text-white`;
            case 'completada': return `${base} bg-gray-400 text-white`;
            default: return `${base} bg-white text-black`;
        }
    };

    const estadoLabel = { activa: 'Activa', cancelada: 'Cancelada', completada: 'Completada' };

    // Loading global
    if (loading && items.length === 0) {
        return (
            <div className="flex items-center justify-center py-16 bg-white border-4 border-black mt-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
                <Loader2 className="w-10 h-10 animate-spin text-black mr-3" />
                <span className="font-mono font-bold text-black uppercase">Cargando reservaciones...</span>
            </div>
        );
    }

    // Error
    if (error && items.length === 0) {
        return (
            <div className="bg-red-100 border-4 border-red-500 p-8 mt-8 text-center shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
                <p className="font-mono font-bold text-red-700 text-sm uppercase">❌ {error}</p>
                <p className="font-mono text-xs text-red-600 mt-2">Verifica que el servidor esté corriendo en el puerto 3001.</p>
            </div>
        );
    }

    // Vacío
    if (filtered.length === 0) {
        return (
            <div className="bg-gray-100 p-12 mt-8 border-4 border-black border-dashed flex flex-col items-center justify-center text-center relative">
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] mb-4 z-10">
                    <BedDouble className="w-12 h-12 text-black" />
                </div>
                <h3 className="text-xl font-black font-mono text-black uppercase mb-2 z-10">Sin reservaciones</h3>
                <p className="text-black font-mono text-sm max-w-sm bg-white p-2 border-2 border-black z-10 mt-2">
                    {items.length === 0
                        ? 'No hay reservaciones en la base de datos. ¡Crea la primera!'
                        : 'No hay resultados para los filtros aplicados.'}
                </p>
            </div>
        );
    }

    return (
        <div className="bg-green-400 p-4 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] mt-8 relative">

            <div className="absolute top-2 left-2 w-3 h-3 bg-gray-300 border-2 border-black rounded-full" />
            <div className="absolute top-2 right-2 w-3 h-3 bg-gray-300 border-2 border-black rounded-full" />

            {/* Contador */}
            <div className="flex justify-between items-center mb-4 mt-2 px-1">
                <span className="font-mono font-black text-xs uppercase text-black bg-white px-3 py-1 border-2 border-black">
                    {filtered.length} reservación{filtered.length !== 1 ? 'es' : ''}
                </span>
                {loading && <Loader2 className="w-5 h-5 animate-spin text-black" />}
            </div>

            <div className="overflow-x-auto border-4 border-black bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                <table className="min-w-full divide-y-4 divide-black">
                    <thead className="bg-black text-white">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-black font-mono uppercase tracking-widest">ID</th>
                            <th className="px-6 py-4 text-left text-xs font-black font-mono uppercase tracking-widest">Huésped</th>
                            <th className="px-6 py-4 text-left text-xs font-black font-mono uppercase tracking-widest">Habitación</th>
                            <th className="px-6 py-4 text-left text-xs font-black font-mono uppercase tracking-widest">Fechas</th>
                            <th className="px-6 py-4 text-left text-xs font-black font-mono uppercase tracking-widest">Estado</th>
                            <th className="px-6 py-4 text-right text-xs font-black font-mono uppercase tracking-widest">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y-4 divide-black font-mono">
                        {filtered.map((r) => (
                            <tr key={r.id_reservacion} className="hover:bg-yellow-100 transition-colors duration-100">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-xs font-bold text-gray-500">#{r.id_reservacion}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-bold text-black uppercase">
                                        {r.huesped?.nombre} {r.huesped?.apellido}
                                    </div>
                                    <div className="text-xs text-gray-500">{r.huesped?.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-bold text-black">Hab. {r.habitacion?.numero || r.id_habitacion}</div>
                                    <span className="inline-block px-2 py-1 text-[10px] bg-white border-2 border-black uppercase w-max mt-1">
                                        {r.habitacion?.tipo || '—'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-bold text-black">✈ {r.fecha_entrada}</div>
                                    <div className="text-xs text-gray-600 mt-1">🚪 {r.fecha_salida}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={estadoStyle(r.estado)}>
                                        {estadoLabel[r.estado] || r.estado}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className="flex justify-end gap-3">
                                        <button onClick={() => onEdit(r)}
                                            className="p-2 bg-blue-500 text-white border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-y-px hover:translate-x-px hover:shadow-none hover:bg-blue-400 transition-all"
                                            aria-label="Editar">
                                            <Edit2 className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => dispatch(eliminarReservacion(r.id_reservacion))}
                                            className="p-2 bg-red-500 text-white border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-y-px hover:translate-x-px hover:shadow-none hover:bg-red-400 transition-all"
                                            aria-label="Eliminar">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReservationList;