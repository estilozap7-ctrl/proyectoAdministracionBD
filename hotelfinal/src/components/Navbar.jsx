import React from 'react';
import { Hotel, User, Sun, Menu } from 'lucide-react';
import logo from '../assets/hotel_brother_logo.png';

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 w-full bg-yellow-400 border-b-8 border-black shadow-[0_8px_0_0_rgba(0,0,0,1)] font-mono">

            {/* Tornillos decorativos estilo Mario Maker en el borde inferior */}
            <div className="absolute -bottom-2 left-10 w-4 h-4 bg-gray-300 border-2 border-black rounded-full z-10 hidden md:block"></div>
            <div className="absolute -bottom-2 right-10 w-4 h-4 bg-gray-300 border-2 border-black rounded-full z-10 hidden md:block"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">

                    {/* Sección del Logo (Estilo Bloque de Interrogación / Ladrillo) */}
                    <div className="flex-shrink-0 flex items-center gap-4 cursor-pointer group">
                        <div className="p-2 bg-red-500 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] group-hover:-translate-y-1 group-hover:shadow-[4px_6px_0_0_rgba(0,0,0,1)] transition-all">
                            <img src={logo} alt="Hotel Brother Logo" className="w-10 h-10 object-cover" />
                        </div>
                        <div className="flex flex-col bg-white px-3 py-1 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                            <span className="font-black text-xl md:text-2xl text-black tracking-widest uppercase">
                                Better Homes
                            </span>
                            <span className="text-[10px] md:text-xs font-bold text-black tracking-widest uppercase mt-[-2px]">
                                Hotel & Resort
                            </span>
                        </div>
                    </div>

                    {/* Enlaces de Navegación (Escritorio) */}
                    <div className="hidden md:flex items-center space-x-2 lg:space-x-6">


                        {/* Acciones */}

                        {false ? <div className="flex items-center gap-4 pl-6 ml-2 border-l-4 border-black h-12">


                            {/* Botón de Login (Estilo Tubería/Acción) */}
                            <button className="flex items-center gap-3 bg-green-500 text-white px-5 py-2 font-black uppercase tracking-widest border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-green-400 hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all">
                                <User className="h-5 w-5" />
                                <span>Start</span>
                            </button>
                        </div> : null}
                    </div>

                    {/* Botón menú móvil */}
                    <div className="md:hidden flex items-center">
                        <button className="p-2 bg-white border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-black hover:bg-gray-200 active:translate-y-1 active:shadow-none transition-all">
                            <Menu className="h-8 w-8" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;