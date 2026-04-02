import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 md:mt-20 px-4">
      {/* Hero Section */}
      <div className="bg-[#0F3057] dark:bg-gray-900 text-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full flex flex-col md:flex-row">
        
        {/* Left Side: Text */}
        <div className="p-10 md:p-16 flex flex-col justify-center w-full md:w-1/2">
          <span className="text-orange-400 font-bold tracking-widest uppercase mb-2">Bienvenido a</span>
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            TIENDAS <span className="text-orange-500">MOSHA</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Especialistas en productos ergonómicos. Mejora tu postura y tu calidad de vida con nuestra selección premium de asientos y soportes.
          </p>
          <div className="flex gap-4">
            <Link to="/shop" className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition shadow-lg hover:shadow-orange-500/30">
              Explorar Catálogo
            </Link>
          </div>
        </div>

        {/* Right Side: Graphic/Image */}
        <div className="w-full md:w-1/2 bg-[#1a4175] dark:bg-gray-800 flex items-center justify-center p-10 relative overflow-hidden">
           {/* Decorative Stars based on your Facebook cover */}
           <div className="absolute top-10 right-10 text-yellow-400 text-6xl opacity-50">★</div>
           <div className="absolute bottom-10 left-10 text-orange-400 text-5xl opacity-50">★</div>
           <div className="z-10 text-center">
             <div className="bg-white p-8 rounded-full shadow-2xl inline-block mb-4">
               <span className="text-6xl">🛍️</span>
             </div>
             <p className="text-xl font-bold text-white tracking-widest">CALIDAD GARANTIZADA</p>
           </div>
        </div>
        
      </div>
    </div>
  );
};

export default HomePage;