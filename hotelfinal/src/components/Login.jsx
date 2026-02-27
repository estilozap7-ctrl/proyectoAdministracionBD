import React, { useState } from 'react';
import logo from '../assets/hotel_brother_logo.png';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validación simple para mock de datos
        if (username === 'admin' && password === 'admin123') {
            setError('');
            onLogin(true);
        } else {
            setError('GAME OVER: Usuario o contraseña inválidos');
        }
    };

    // Estilos compartidos para los inputs
    const marioInputClass = "block w-full pl-12 pr-3 py-3 border-4 border-black bg-white focus:bg-yellow-100 text-black font-black uppercase text-sm outline-none focus:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all placeholder:text-gray-400";

    return (
        <div className="min-h-screen flex items-center justify-center bg-sky-400 p-4 relative overflow-hidden font-mono">

            {/* Decoración de fondo (Estilo Mario: Nubes y suelo de bloques) */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                {/* Nubes cuadradas */}
                <div className="absolute top-10 left-10 w-32 h-12 bg-white border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]"></div>
                <div className="absolute top-24 left-24 w-16 h-8 bg-white border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]"></div>
                <div className="absolute top-16 right-20 w-40 h-16 bg-white border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]"></div>
                <div className="absolute top-40 right-40 w-20 h-10 bg-white border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]"></div>

                {/* Suelo verde (Bloques de tierra) */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-green-500 border-t-4 border-black shadow-[inset_0_8px_0_0_rgba(34,197,94,1)]"
                    style={{ backgroundImage: 'linear-gradient(90deg, #000 4px, transparent 4px), linear-gradient(#000 4px, transparent 4px)', backgroundSize: '32px 32px' }}>
                </div>
            </div>

            {/* Contenedor Principal (El Bloque de Login) */}
            <div className="max-w-md w-full bg-yellow-400 border-4 border-black shadow-[12px_12px_0_0_rgba(0,0,0,1)] flex flex-col relative z-10">

                {/* Tornillos */}
                <div className="absolute top-2 left-2 w-3 h-3 bg-gray-300 border-2 border-black rounded-full z-20"></div>
                <div className="absolute top-2 right-2 w-3 h-3 bg-gray-300 border-2 border-black rounded-full z-20"></div>

                {/* Encabezado Rojo */}
                <div className="bg-red-500 border-b-4 border-black p-8 text-center text-white relative">
                    <div className="relative z-10">
                        {/* Contenedor del Logo (Estilo bloque ítem) */}
                        <div className="flex justify-center mb-6">
                            <div className="w-24 h-24 bg-white border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] p-1 hover:-translate-y-2 hover:rotate-6 transition-transform cursor-pointer">
                                <img src={logo} alt="Hotel Brother Logo" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        <h2 className="text-3xl font-black mb-2 uppercase tracking-widest text-white"
                            style={{ textShadow: '3px 3px 0px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
                            Player 1
                        </h2>
                        <p className="text-black font-black text-xs bg-yellow-400 inline-block px-3 py-1 border-2 border-black uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                            Hotel Brother System
                        </p>
                    </div>
                </div>

                {/* Sección del Formulario */}
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-600 text-white p-3 font-black text-xs uppercase border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex items-center gap-3 animate-pulse">
                                <span>❌</span>
                                <span>{error}</span>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-black text-black mb-2 uppercase tracking-widest">
                                Nombre de Jugador
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className={marioInputClass}
                                    placeholder="USUARIO ADMIN"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-black text-black mb-2 uppercase tracking-widest">
                                Código Secreto
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={marioInputClass}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-4 px-4 mt-8 border-4 border-black text-lg font-black text-white bg-green-500 shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:bg-green-400 hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] uppercase tracking-widest transition-all"
                        >
                            Press Start
                        </button>

                        <div className="mt-6 text-center">
                            <p className="text-[10px] md:text-xs text-black font-black bg-white p-3 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] uppercase">
                                Pistas: <span className="text-red-600">admin</span> / <span className="text-red-600">admin123</span>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;