import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ActivityCard from './components/ActivityCard';
import Login from './components/Login';
import { generateActivity } from './services/geminiService';
import { authService } from './services/authService';
import { ActivityFormData, ActivityResponse, User } from './types';

const App: React.FC = () => {
  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // App State
  const [activity, setActivity] = useState<ActivityResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFormData, setLastFormData] = useState<ActivityFormData | null>(null);

  // Check localStorage on mount
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    setIsAuthChecking(false);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setActivity(null);
    setLastFormData(null);
  };

  const handleGenerate = async (formData: ActivityFormData) => {
    setLoading(true);
    setError(null);
    setLastFormData(formData); 
    
    try {
      const result = await generateActivity(formData);
      setActivity(result);
    } catch (err) {
      console.error(err);
      setError("Ops! O Brinkar.IA teve um pequeno bloqueio criativo. Tente novamente em instantes.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (lastFormData) {
      handleGenerate(lastFormData);
    }
  };

  const handleEdit = () => {
    setActivity(null);
    setError(null);
  };

  const handleReset = () => {
    setActivity(null);
    setLastFormData(null);
    setError(null);
  };

  if (isAuthChecking) {
    return null; // Or a loading spinner
  }

  // If not authenticated, show Login screen
  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    // pb-12 para padding base, env(safe-area...) para iOS devices sem botão home
    <div className="min-h-screen pb-12 px-safe pt-safe">
      <Header onLogout={handleLogout} userName={currentUser.name} />
      
      <main className="max-w-2xl mx-auto px-4">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-sm" role="alert">
            <p className="font-bold">Erro</p>
            <p>{error}</p>
          </div>
        )}

        {!activity ? (
          <div className="animate-fade-in">
             <div className="mb-6 bg-blue-50 p-4 rounded-xl border border-blue-200 text-blue-800 text-sm md:text-base">
                👋 Olá <strong>{currentUser.name}</strong>! Eu sou o <strong>Brinkar.IA</strong>. Me conte onde vocês estão, quem vai brincar e o que tem por perto, que eu invento uma atividade mágica agora mesmo!
             </div>
            <InputForm 
              onSubmit={handleGenerate} 
              isLoading={loading} 
              initialData={lastFormData}
            />
          </div>
        ) : (
          <ActivityCard 
            activity={activity} 
            onReset={handleReset} 
            onRepeat={handleRegenerate}
            onEdit={handleEdit}
          />
        )}
      </main>

      <footer className="mt-12 text-center text-gray-400 text-sm pb-8">
        <p>Desenvolvido por Eron Vasconcelos via IA</p>
      </footer>
    </div>
  );
};

export default App;