import React from 'react';
import { ActivityResponse } from '../types';

interface ActivityCardProps {
  activity: ActivityResponse;
  onReset: () => void;
  onRepeat: () => void;
  onEdit: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onReset, onRepeat, onEdit }) => {
  return (
    <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border-4 border-indigo-100 animate-bounce-in">
      <div className="bg-pattern p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-black flex flex-col md:flex-row items-start md:items-center gap-3 leading-tight">
            <span className="text-5xl drop-shadow-md">🎲</span>
            {activity.title}
          </h2>
          <div className="mt-4 inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-bold border border-white/30">
             ✨ Nova Ideia!
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        
        {/* Objective */}
        <section>
          <h3 className="text-purple-600 font-black text-xl mb-3 flex items-center gap-2 uppercase tracking-wide">
            🎯 Objetivo
          </h3>
          <div className="bg-purple-50 p-5 rounded-2xl border-2 border-purple-100 text-gray-700 font-medium text-lg leading-relaxed">
            {activity.objective}
          </div>
        </section>

        {/* Preparation & Adaptation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-blue-50 p-5 rounded-2xl border-2 border-blue-100">
            <h3 className="text-blue-600 font-black text-lg mb-2 flex items-center gap-2">
              🛠️ Preparação
            </h3>
            <p className="text-gray-600 font-medium">
              {activity.preparation}
            </p>
          </section>

          <section className="bg-pink-50 p-5 rounded-2xl border-2 border-pink-100">
            <h3 className="text-pink-600 font-black text-lg mb-2 flex items-center gap-2">
              👶 Adaptação
            </h3>
            <p className="text-gray-600 font-medium">
              {activity.adaptation}
            </p>
          </section>
        </div>

        {/* Rules */}
        <section>
          <h3 className="text-indigo-900 font-black text-xl mb-4 flex items-center gap-2 uppercase tracking-wide">
            📜 Como Brincar
          </h3>
          <div className="space-y-3">
            {activity.rules.map((rule, index) => (
              <div key={index} className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-indigo-200 transition-colors">
                <div className="bg-indigo-600 text-white font-black w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center shadow-md">
                  {index + 1}
                </div>
                <p className="text-gray-700 font-medium mt-1">{rule}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tip */}
        <section>
          <div className="bg-yellow-50 border-4 border-yellow-300 p-6 rounded-3xl relative shadow-sm">
            <div className="absolute -top-5 -left-3 bg-yellow-400 text-yellow-900 font-bold px-4 py-1 rounded-full shadow-sm text-sm uppercase tracking-wider">
              Dica Secreta 🤫
            </div>
            <p className="text-yellow-800 font-bold text-lg italic mt-2">
              "{activity.tip}"
            </p>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={onRepeat}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 border-b-4 border-indigo-800"
          >
            🔄 Gerar outra opção (Mesmos dados)
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onEdit}
              className="bg-white border-2 border-gray-200 hover:border-indigo-300 text-indigo-700 font-bold py-3 rounded-2xl transition-colors"
            >
              ✏️ Ajustar filtros
            </button>
            <button
              onClick={onReset}
              className="bg-transparent hover:bg-red-50 text-gray-400 hover:text-red-500 font-bold py-3 rounded-2xl transition-colors"
            >
              🗑️ Início
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;