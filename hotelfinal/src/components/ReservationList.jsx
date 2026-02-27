import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReservation } from '../store/slices/reservationsSlice';
import { Edit2, Trash2, BedDouble } from 'lucide-react';

const ReservationList = ({ onEdit }) => {
    const dispatch = useDispatch();
    const { items, searchQuery, groupQuery } = useSelector((state) => state.reservations);

    const filteredItems = items.filter((item) => {
        const matchesSearch = item.guestName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesGroup = groupQuery === 'All' || item.roomType === groupQuery;
        return matchesSearch && matchesGroup;
    });

    // Estilos 8-bits para los "badges" de estado
    const getStatusStyle = (status) => {
        const baseStyle = "px-3 py-1 text-xs font-black font-mono border-2 border-black uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)] inline-block";
        switch (status) {
            case 'Confirmed': return `${baseStyle} bg-green-500 text-white`;
            case 'Pending': return `${baseStyle} bg-yellow-400 text-black`;
            case 'Checked-In': return `${baseStyle} bg-blue-500 text-white`;
            case 'Checked-Out': return `${baseStyle} bg-gray-400 text-white`;
            default: return `${baseStyle} bg-white text-black`;
        }
    };

    // ESTADO VACÍO (Como el editor de niveles cuando no hay bloques)
    if (filteredItems.length === 0) {
        return (
            <div className="bg-gray-100 p-12 mt-8 border-4 border-black border-dashed flex flex-col items-center justify-center text-center relative">
                {/* Cuadrícula de fondo simulada */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] mb-4 z-10">
                    <BedDouble className="w-12 h-12 text-black" />
                </div>
                <h3 className="text-xl font-black font-mono text-black uppercase mb-2 z-10">¡Nivel Vacío!</h3>
                <p className="text-black font-mono text-sm max-w-sm bg-white p-2 border-2 border-black z-10 mt-2">
                    No hay jugadores o mundos que coincidan. Modifica tus filtros o crea un nuevo nivel arriba.
                </p>
            </div>
        );
    }

    // LISTA DE RESERVACIONES (Estilo Bloques Apilados)
    return (
        <div className="bg-green-400 p-4 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] mt-8 relative">

            {/* Tornillos decorativos */}
            <div className="absolute top-2 left-2 w-3 h-3 bg-gray-300 border-2 border-black rounded-full"></div>
            <div className="absolute top-2 right-2 w-3 h-3 bg-gray-300 border-2 border-black rounded-full"></div>

            <div className="overflow-x-auto mt-4 border-4 border-black bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                <table className="min-w-full divide-y-4 divide-black">
                    <thead className="bg-black text-white">
                        <tr>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-black font-mono uppercase tracking-widest">Jugador</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-black font-mono uppercase tracking-widest">Mundo</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-black font-mono uppercase tracking-widest">Tiempo</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-black font-mono uppercase tracking-widest">Estado</th>
                            <th scope="col" className="px-6 py-4 text-right text-xs font-black font-mono uppercase tracking-widest">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y-4 divide-black font-mono">
                        {filteredItems.map((reservation) => (
                            <tr key={reservation.id} className="hover:bg-yellow-100 transition-colors duration-100 group">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-bold text-black uppercase">{reservation.guestName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-bold text-black">NIVEL {reservation.roomNumber}</span>
                                        <span className="inline-block px-2 py-1 text-[10px] bg-white border-2 border-black uppercase w-max">
                                            {reservation.roomType}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-black font-bold">IN: {reservation.checkIn}</div>
                                    <div className="text-xs text-gray-600 mt-1">OUT: {reservation.checkOut}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={getStatusStyle(reservation.status)}>
                                        {/* Traducción dinámica del estado al español */}
                                        {reservation.status === 'Confirmed' && 'Confirmado'}
                                        {reservation.status === 'Pending' && 'Pendiente'}
                                        {reservation.status === 'Checked-In' && 'Jugando'}
                                        {reservation.status === 'Checked-Out' && 'Completado'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end gap-3">
                                        <button
                                            onClick={() => onEdit(reservation)}
                                            className="p-2 bg-blue-500 text-white border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-y-px hover:translate-x-px hover:shadow-none hover:bg-blue-400 transition-all"
                                            aria-label="Editar Nivel"
                                        >
                                            <Edit2 className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => dispatch(deleteReservation(reservation.id))}
                                            className="p-2 bg-red-500 text-white border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-y-px hover:translate-x-px hover:shadow-none hover:bg-red-400 transition-all"
                                            aria-label="Eliminar Nivel"
                                        >
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