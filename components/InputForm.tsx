import React, { useState } from 'react';
import { ActivityFormData, EnergyLevel } from '../types';

interface InputFormProps {
  onSubmit: (data: ActivityFormData) => void;
  isLoading: boolean;
  initialData?: ActivityFormData | null;
}

interface SelectionButtonProps { 
  selected: boolean; 
  onClick: () => void; 
  icon: string; 
  label: string; 
  colorClass: string 
}

const SelectionButton: React.FC<SelectionButtonProps> = ({ 
  selected, 
  onClick, 
  icon, 
  label, 
  colorClass 
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all transform duration-200 border-2 ${
      selected 
        ? `${colorClass} border-transparent scale-105 shadow-lg ring-2 ring-offset-2 ring-indigo-200` 
        : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50 hover:border-gray-200'
    }`}
  >
    <span className="text-3xl mb-1">{icon}</span>
    <span className={`text-xs md:text-sm font-bold ${selected ? 'text-white' : 'text-gray-500'}`}>{label}</span>
  </button>
);

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading, initialData }) => {
  const [formData, setFormData] = useState<ActivityFormData>(initialData || {
    location: '',
    childCount: 1,
    ageRanges: [],
    resources: [],
    duration: '',
    energyLevel: EnergyLevel.MEDIUM,
  });

  const toggleSelection = (field: 'ageRanges' | 'resources', value: string) => {
    setFormData(prev => {
      const current = prev[field];
      const exists = current.includes(value);
      if (exists) {
        return { ...prev, [field]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default fallbacks if empty
    const finalData = {
      ...formData,
      location: formData.location || 'Sala',
      duration: formData.duration || '15-30 minutos',
      ageRanges: formData.ageRanges.length ? formData.ageRanges : ['Mistas'],
      resources: formData.resources.length ? formData.resources : ['Imaginação'],
    };
    onSubmit(finalData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      
      {/* 1. Location */}
      <section className="bg-white p-5 rounded-3xl shadow-sm border border-indigo-50">
        <label className="block text-indigo-900 font-bold text-lg mb-4 flex items-center">
          <span className="bg-indigo-100 p-2 rounded-full mr-3 text-xl">📍</span> Onde vocês estão?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { id: 'Sala/Quarto', icon: '🏠', label: 'Em Casa' },
            { id: 'Quintal/Parque', icon: '🌳', label: 'Ao Ar Livre' },
            { id: 'Casa de Parentes', icon: '🏘️', label: 'Casa de Parentes' },
            { id: 'Festa', icon: '🎈', label: 'Festa' },
            { id: 'Carro/Viagem', icon: '🚗', label: 'No Carro' },
            { id: 'Restaurante', icon: '🍽️', label: 'Restaurante' },
            { id: 'Praia/Lagoa', icon: '🏖️', label: 'Praia/Lagoa' },
            { id: 'Piscina', icon: '🏊', label: 'Piscina' },
          ].map((item) => (
            <SelectionButton
              key={item.id}
              selected={formData.location === item.id}
              onClick={() => setFormData({ ...formData, location: item.id })}
              icon={item.icon}
              label={item.label}
              colorClass="bg-blue-500 text-white"
            />
          ))}
        </div>
      </section>

      {/* 2. Crianças & Idades */}
      <section className="bg-white p-5 rounded-3xl shadow-sm border border-indigo-50">
        <label className="block text-indigo-900 font-bold text-lg mb-4 flex items-center">
          <span className="bg-pink-100 p-2 rounded-full mr-3 text-xl">👶</span> Quem vai brincar?
        </label>
        
        {/* Counter */}
        <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4 mb-6">
          <span className="font-bold text-gray-600">Quantidade:</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, childCount: Math.max(1, prev.childCount - 1) }))}
              className="w-10 h-10 rounded-full bg-white shadow text-indigo-600 font-bold text-xl hover:bg-indigo-50"
            >-</button>
            <span className="text-2xl font-bold text-indigo-900 w-8 text-center">{formData.childCount}</span>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, childCount: Math.min(50, prev.childCount + 1) }))}
              className="w-10 h-10 rounded-full bg-white shadow text-indigo-600 font-bold text-xl hover:bg-indigo-50"
            >+</button>
          </div>
        </div>

        {/* Ages Multi-select */}
        <p className="text-sm text-gray-400 mb-3 font-semibold">Selecione as faixas etárias:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { id: '0-2 anos', icon: '🍼', label: 'Bebês' },
            { id: '3-5 anos', icon: '🧸', label: '3 a 5 anos' },
            { id: '6-9 anos', icon: '🏃', label: '6 a 9 anos' },
            { id: '10+ anos', icon: '⚡', label: '10+ anos' },
          ].map((item) => (
            <SelectionButton
              key={item.id}
              selected={formData.ageRanges.includes(item.id)}
              onClick={() => toggleSelection('ageRanges', item.id)}
              icon={item.icon}
              label={item.label}
              colorClass="bg-pink-500 text-white"
            />
          ))}
        </div>
      </section>

      {/* 3. Resources */}
      <section className="bg-white p-5 rounded-3xl shadow-sm border border-indigo-50">
        <label className="block text-indigo-900 font-bold text-lg mb-4 flex items-center">
          <span className="bg-yellow-100 p-2 rounded-full mr-3 text-xl">🧸</span> O que temos?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { id: 'Só Imaginação', icon: '✨', label: 'Só Imaginação' },
            { id: 'Bola/Esporte', icon: '⚽', label: 'Bola/Esporte' },
            { id: 'Papel e Caneta', icon: '🖍️', label: 'Papel e Lápis' },
            { id: 'Brinquedos', icon: '🧩', label: 'Brinquedos' },
            { id: 'Itens de Casa', icon: '🥣', label: 'Coisas de Casa' },
            { id: 'Música/Som', icon: '🎵', label: 'Música' },
          ].map((item) => (
            <SelectionButton
              key={item.id}
              selected={formData.resources.includes(item.id)}
              onClick={() => toggleSelection('resources', item.id)}
              icon={item.icon}
              label={item.label}
              colorClass="bg-yellow-500 text-white"
            />
          ))}
        </div>
      </section>

      {/* 4. Duration & Energy */}
      <section className="bg-white p-5 rounded-3xl shadow-sm border border-indigo-50">
        <label className="block text-indigo-900 font-bold text-lg mb-4 flex items-center">
          <span className="bg-green-100 p-2 rounded-full mr-3 text-xl">⏱️</span> Detalhes finais
        </label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
             <p className="text-sm text-gray-400 mb-3 font-semibold">Quanto tempo?</p>
             <div className="grid grid-cols-3 gap-2">
               {['5-10 min', '15-30 min', '1h +'].map((time) => (
                 <button
                  key={time}
                  type="button"
                  onClick={() => setFormData({ ...formData, duration: time })}
                  className={`py-2 px-1 rounded-xl text-xs md:text-sm font-bold border-2 transition-all ${
                    formData.duration === time 
                    ? 'bg-green-500 text-white border-green-500' 
                    : 'bg-white border-gray-100 text-gray-500'
                  }`}
                 >
                   {time}
                 </button>
               ))}
             </div>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-3 font-semibold">Nível de energia?</p>
            <div className="flex bg-gray-100 rounded-xl p-1">
              {[
                { val: EnergyLevel.LOW, label: '🧘 Zen' },
                { val: EnergyLevel.MEDIUM, label: '🙂 Normal' },
                { val: EnergyLevel.HIGH, label: '🔥 Fogo' }
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setFormData({ ...formData, energyLevel: opt.val })}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                    formData.energyLevel === opt.val
                      ? 'bg-white text-indigo-600 shadow-md'
                      : 'text-gray-400 hover:text-indigo-500'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 text-white font-black py-5 rounded-2xl shadow-xl transform transition active:scale-95 flex items-center justify-center text-xl tracking-wide border-b-4 border-indigo-800"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Criando Mágica...
          </>
        ) : (
          '🚀 GERAR BRINCADEIRA!'
        )}
      </button>
    </form>
  );
};

export default InputForm;