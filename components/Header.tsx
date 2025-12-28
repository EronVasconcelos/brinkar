import React from 'react';

interface HeaderProps {
  onLogout?: () => void;
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ onLogout, userName }) => {
  return (
    <header className="bg-transparent pt-8 pb-4 px-4 mb-4 text-center relative">
      
      {onLogout && (
        <div className="absolute top-2 right-2 md:top-6 md:right-6 z-20 flex items-center gap-3">
           {userName && (
            <span className="hidden md:block text-indigo-900 font-bold text-sm bg-white/50 px-3 py-1 rounded-full">
              Olá, {userName}
            </span>
          )}
          <button 
            onClick={onLogout}
            className="flex flex-col items-center group transition-transform active:scale-95"
            aria-label="Sair"
          >
            <div className="bg-white/60 backdrop-blur-sm p-2.5 rounded-full shadow-sm text-indigo-400 border border-white group-hover:text-red-500 group-hover:bg-white group-hover:shadow-md transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
              </svg>
            </div>
            <span className="text-[10px] font-bold text-indigo-300 mt-1 uppercase tracking-wide group-hover:text-red-400 transition-colors">
              Sair
            </span>
          </button>
        </div>
      )}

      <div className="max-w-2xl mx-auto flex flex-col items-center">
        
        <div className="flex items-center justify-center gap-3 md:gap-4 mb-2">
          {/* Logo */}
          <div className="relative">
            <div className="absolute -inset-1 bg-yellow-400 rounded-full blur opacity-75 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 text-white w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-3xl md:text-4xl shadow-xl transform -rotate-3 border-4 border-white">
              🧩
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-black text-indigo-900 tracking-tight drop-shadow-sm">
            Brinkar<span className="text-yellow-500">.IA</span>
          </h1>
        </div>

        <p className="text-indigo-400 font-bold mt-1 text-sm md:text-base bg-indigo-50 px-4 py-1 rounded-full inline-block">
          Fábrica de Brincadeiras Instantânea
        </p>
      </div>
    </header>
  );
};

export default Header;