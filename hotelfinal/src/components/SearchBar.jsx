import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setGroupQuery } from '../store/slices/reservationsSlice';
import { Search, Filter, Hash } from 'lucide-react';

const SearchBar = () => {
    const dispatch = useDispatch();
    const { searchQuery, groupQuery } = useSelector((state) => state.reservations);

    const roomTypes = ['All', 'Suite', 'Deluxe', 'Penthouse', 'Standard'];

    // Estilos base compartidos al estilo 8-bits
    const marioInputClass = "w-full border-4 border-black bg-white py-2 pr-2 pl-12 font-mono text-black outline-none focus:bg-yellow-100 focus:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all uppercase text-sm";
    const marioLabelClass = "block font-mono font-bold text-black uppercase mb-2 text-xs tracking-wider";

    return (
        <div className="bg-sky-400 p-6 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative mt-8">

            {/* Tornillos decorativos en las esquinas */}
            <div className="absolute top-2 left-2 w-3 h-3 bg-gray-300 border-2 border-black rounded-full"></div>
            <div className="absolute top-2 right-2 w-3 h-3 bg-gray-300 border-2 border-black rounded-full"></div>
            <div className="absolute bottom-2 left-2 w-3 h-3 bg-gray-300 border-2 border-black rounded-full"></div>
            <div className="absolute bottom-2 right-2 w-3 h-3 bg-gray-300 border-2 border-black rounded-full"></div>

            <h3 className="text-lg font-black font-mono text-black flex items-center gap-3 uppercase tracking-widest bg-white px-3 py-1 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] inline-flex mb-6 mt-2">
                <Filter className="w-8 h-8 text-blue-600" />
                Buscar .....
            </h3>

            <div className="space-y-6 px-2 mb-2">
                {/* Individual Search */}
                <div>
                    <label className={marioLabelClass}>Buscar Huésperd</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-6 w-6 text-black" />
                        </div>
                        <input
                            type="text"
                            className={marioInputClass}
                            placeholder="Ej. LUIGI..."
                            value={searchQuery}
                            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                        />
                    </div>
                </div>

                {/* Grouped Search / Filter */}
                <div>
                    <label className={marioLabelClass}>Filtrar por Habitación</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Hash className="h-6 w-6 text-black" />
                        </div>
                        <select
                            className={marioInputClass}
                            value={groupQuery}
                            onChange={(e) => dispatch(setGroupQuery(e.target.value))}
                        >
                            {roomTypes.map((type) => (
                                <option key={type} value={type} className="font-mono">
                                    {type === 'All' ? 'TODAS LAS HABITACIONES' : `HABITACION ${type.toUpperCase()}`}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;