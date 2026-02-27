import React, { useState, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store/store';
import { fetchReservaciones } from './store/slices/reservationsSlice';
import Layout from './components/Layout';
import SearchBar from './components/SearchBar';
import ReservationForm from './components/ReservationForm';
import ReservationList from './components/ReservationList';
import Login from './components/Login';
import './index.css';

function AppContent() {
  const dispatch = useDispatch();
  const [editingReservation, setEditingReservation] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchReservaciones());
    }
  }, [isAuthenticated, dispatch]);

  const handleEdit = (reservation) => {
    setEditingReservation(reservation);
    // Desplazamiento suave hacia arriba al editar (como volver al inicio del nivel)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearEdit = () => {
    setEditingReservation(null);
  };

  const handleLogin = (status) => {
    setIsAuthenticated(status);
  };

  // Pantalla de inicio de sesión (¡Próximo nivel a estilizar si lo deseas!)
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout>
      <div className="py-6 font-mono">
        {/* ENCABEZADO: Pantalla de Título */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6 bg-sky-300 p-6 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative">

          {/* Decoración de nubes/bloques en el fondo del header */}
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
            <div className="w-16 h-16 bg-white border-4 border-black absolute top-2 right-10"></div>
            <div className="w-16 h-16 bg-white border-4 border-black absolute top-2 right-26"></div>
          </div>

          <div className="z-10 relative">
            <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-widest"
              style={{ textShadow: '4px 4px 0px #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000' }}>
              Super Hotel Maker
            </h1>
            <p className="mt-3 text-sm md:text-base font-bold text-black bg-yellow-400 inline-block px-3 py-1 border-2 border-black uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              Construye y gestiona los mundos de tus jugadores
            </p>
          </div>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="z-10 px-6 py-3 bg-red-600 text-white font-black uppercase text-sm border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-red-500 hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all"
          >
            Salir del Juego
          </button>
        </header>

        {/* CONTENEDOR PRINCIPAL: La zona de juego */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Columna Izquierda: Panel de Búsqueda */}
          <div className="lg:col-span-1">
            <SearchBar />
          </div>

          {/* Columna Derecha: Formulario y Lista */}
          <div className="lg:col-span-3 space-y-10">
            <ReservationForm
              editingReservation={editingReservation}
              onClearEdit={handleClearEdit}
            />
            <ReservationList onEdit={handleEdit} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;