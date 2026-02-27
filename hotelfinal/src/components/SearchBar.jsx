import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setGroupQuery } from '../store/slices/reservationsSlice';
import { Search, Filter, Hash } from 'lucide-react';

const TIPOS = ['Todos', 'individual', 'doble', 'suite', 'penthouse'];

const SearchBar = () => {
    const dispatch = useDispatch();
    const { searchQuery, groupQuery } = useSelector((s) => s.reservaciones);

    const inp = "w-full border-4 border-black bg-white py-2 pr-2 pl-12 font-mono text-black outline-none focus:bg-yellow-100 focus:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all text-sm";
    const lbl = "block font-mono font-bold text-black uppercase mb-2 text-xs tracking-wider";

    return (
        <div className="bg-sky-400 p-6 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative mt-8">

            <div className="absolute top-2 left-2 w-3 h-3 bg-gray-300 border-2 border-black rounded-full" />
            <div className="absolute top-2 right-2 w-3 h-3 bg-gray-300 border-2 border-black rounded-full" />
            <div className="absolute bottom-2 left-2 w-3 h-3 bg-gray-300 border-2 border-black rounded-full" />
            <div className="absolute bottom-2 right-2 w-3 h-3 bg-gray-300 border-2 border-black rounded-full" />

            <h3 className="text-lg font-black font-mono text-black flex items-center gap-3 uppercase tracking-widest bg-white px-3 py-1 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] inline-flex mb-6 mt-2">
                <Filter className="w-8 h-8 text-blue-600" />
                Buscar
            </h3>

            <div className="space-y-6 px-2 mb-2">
                {/* Búsqueda por nombre */}
                <div>
                    <label className={lbl}>Buscar Huésped</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-6 w-6 text-black" />
                        </div>
                        <input
                            type="text"
                            className={inp}
                            placeholder="Nombre o apellido..."
                            value={searchQuery}
                            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                        />
                    </div>
                </div>

                {/* Filtro por tipo de habitación */}
                <div>
                    <label className={lbl}>Filtrar por Tipo</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Hash className="h-6 w-6 text-black" />
                        </div>
                        <select
                            className={inp}
                            value={groupQuery}
                            onChange={(e) => dispatch(setGroupQuery(e.target.value))}
                        >
                            {TIPOS.map((t) => (
                                <option key={t} value={t}>
                                    {t === 'Todos' ? 'TODAS LAS HABITACIONES' : t.toUpperCase()}
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