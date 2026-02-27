import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addReservation, updateReservation } from '../store/slices/reservationsSlice';
import { Save, UserPlus, X } from 'lucide-react';

const ReservationForm = ({ editingReservation, onClearEdit }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        guestName: '',
        roomNumber: '',
        roomType: 'Standard',
        checkIn: '',
        checkOut: '',
        status: 'Pending'
    });

    useEffect(() => {
        if (editingReservation) {
            setFormData(editingReservation);
        } else {
            setFormData({
                guestName: '',
                roomNumber: '',
                roomType: 'Standard',
                checkIn: '',
                checkOut: '',
                status: 'Pending'
            });
        }
    }, [editingReservation]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingReservation) {
            dispatch(updateReservation(formData));
            onClearEdit();
        } else {
            dispatch(addReservation(formData));
            setFormData({
                guestName: '',
                roomNumber: '',
                roomType: 'Standard',
                checkIn: '',
                checkOut: '',
                status: 'Pending'
            });
        }
    };

    // Estilos base para inputs al estilo bloque de interrogación
    const marioInputClass = "w-full border-4 border-black bg-white p-2 font-mono text-black outline-none focus:bg-yellow-100 focus:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all uppercase text-sm";
    const marioLabelClass = "block font-mono font-bold text-black uppercase mb-1 text-xs tracking-wider";

    return (
        <div className="bg-yellow-400 p-6 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative">

            {/* Tornillos decorativos en las esquinas (opcional, muy al estilo Mario Maker) */}
            <div className="absolute top-2 left-2 w-3 h-3 bg-gray-300 border-2 border-black rounded-full"></div>
            <div className="absolute top-2 right-2 w-3 h-3 bg-gray-300 border-2 border-black rounded-full"></div>
            <div className="absolute bottom-2 left-2 w-3 h-3 bg-gray-300 border-2 border-black rounded-full"></div>
            <div className="absolute bottom-2 right-2 w-3 h-3 bg-gray-300 border-2 border-black rounded-full"></div>

            <div className="flex justify-between items-center mb-6 mt-2 px-2">
                <h3 className="text-xl font-black font-mono text-black flex items-center gap-3 uppercase tracking-widest bg-white px-3 py-1 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                    {editingReservation ? (
                        <><Save className="w-6 h-6 text-red-600" /> Editar nivel</>
                    ) : (
                        <><UserPlus className="w-6 h-6 text-green-600" /> Nuevo nivel</>
                    )}
                </h3>
                {editingReservation && (
                    <button
                        onClick={onClearEdit}
                        className="bg-red-500 border-4 border-black p-1 hover:bg-red-400 hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all"
                        aria-label="Cancelar Edición"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 px-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={marioLabelClass}>Huésped</label>
                        <input required type="text" name="guestName" value={formData.guestName} onChange={handleChange} className={marioInputClass} placeholder="Ej. MARIO" />
                    </div>
                    <div>
                        <label className={marioLabelClass}>Habitación</label>
                        <input required type="text" name="roomNumber" value={formData.roomNumber} onChange={handleChange} className={marioInputClass} placeholder="Ej. 1-1" />
                    </div>
                    <div>
                        <label className={marioLabelClass}>Tipo de Castillo</label>
                        <select name="roomType" value={formData.roomType} onChange={handleChange} className={marioInputClass}>
                            <option value="Standard">Estándar</option>
                            <option value="Deluxe">Deluxe</option>
                            <option value="Suite">Suite</option>
                            <option value="Penthouse">Penthouse</option>
                        </select>
                    </div>
                    <div>
                        <label className={marioLabelClass}>Estado de la Partida</label>
                        <select name="status" value={formData.status} onChange={handleChange} className={marioInputClass}>
                            <option value="Pending">Pendiente</option>
                            <option value="Confirmed">Confirmada</option>
                            <option value="Checked-In">Check-In</option>
                            <option value="Checked-Out">Check-Out</option>
                        </select>
                    </div>
                    <div>
                        <label className={marioLabelClass}>Start (Entrada)</label>
                        <input required type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} className={marioInputClass} />
                    </div>
                    <div>
                        <label className={marioLabelClass}>Game Over (Salida)</label>
                        <input required type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} className={marioInputClass} />
                    </div>
                </div>

                <div className="pt-6 flex justify-end">
                    <button
                        type="submit"
                        className={`
                            flex items-center gap-2 font-mono font-black uppercase tracking-widest px-6 py-3 border-4 border-black 
                            shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all
                            ${editingReservation ? 'bg-red-500 text-white hover:bg-red-400' : 'bg-green-500 text-white hover:bg-green-400'}
                        `}
                    >
                        {editingReservation ? 'Actualizar' : 'Guardar Nivel'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReservationForm;