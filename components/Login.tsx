import React, { useState } from 'react';
import { authService } from '../services/authService';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');

  const clearForm = () => {
    setName('');
    setEmail('');
    setDob('');
    setPassword('');
    setError('');
    setSuccessMsg('');
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    clearForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (isRegistering) {
      // Validação básica
      if (!name || !email || !dob || !password) {
        setError('Preencha todos os campos!');
        return;
      }

      const newUser: User = { name, email, dob, password };
      const result = authService.register(newUser);

      if (result.success) {
        setSuccessMsg(result.message);
        setTimeout(() => {
          // Loga automaticamente após cadastro
          const loginResult = authService.login(email, password);
          if (loginResult.success && loginResult.user) {
            onLogin(loginResult.user);
          }
        }, 1500);
      } else {
        setError(result.message);
      }

    } else {
      // Login Flow
      if (!email || !password) {
        setError('Preencha e-mail e senha.');
        return;
      }

      const result = authService.login(email, password);
      if (result.success && result.user) {
        onLogin(result.user);
      } else {
        setError(result.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 animate-fade-in py-10">
      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border-4 border-indigo-100 relative overflow-hidden">
        
        {/* Background Decor */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-300 rounded-full blur-2xl opacity-50"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-300 rounded-full blur-2xl opacity-50"></div>

        <div className="relative z-10 text-center">
          {/* Logo */}
          <div className="mb-6 inline-block relative">
            <div className="absolute -inset-1 bg-yellow-400 rounded-2xl blur opacity-75"></div>
            <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-xl transform -rotate-3 border-4 border-white">
              {isRegistering ? '📝' : '🔐'}
            </div>
          </div>

          <h2 className="text-3xl font-black text-indigo-900 mb-2">
            {isRegistering ? 'Criar Conta' : 'Acesso Restrito'}
          </h2>
          <p className="text-gray-500 mb-6 font-medium">
            {isRegistering 
              ? 'Preencha os dados para começar a brincar!' 
              : 'Faça login para acessar o Brinkar.IA'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            
            {isRegistering && (
              <div className="animate-fade-in">
                <label className="block text-indigo-900 font-bold mb-2 ml-1 text-sm">Nome Completo</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-indigo-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all font-bold text-gray-700 bg-indigo-50/50"
                  placeholder="Como você quer ser chamado?"
                />
              </div>
            )}

            <div>
              <label className="block text-indigo-900 font-bold mb-2 ml-1 text-sm">E-mail</label>
              <input
                type="text" // text ao invés de email para permitir o login legado 'admindev' se necessário, mas idealmente seria 'email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-indigo-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all font-bold text-gray-700 bg-indigo-50/50"
                placeholder="seu@email.com"
              />
            </div>

            {isRegistering && (
              <div className="animate-fade-in">
                <label className="block text-indigo-900 font-bold mb-2 ml-1 text-sm">Data de Nascimento</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-indigo-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all font-bold text-gray-700 bg-indigo-50/50"
                />
              </div>
            )}

            <div>
              <label className="block text-indigo-900 font-bold mb-2 ml-1 text-sm">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-indigo-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all font-bold text-gray-700 bg-indigo-50/50"
                placeholder="••••••"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm font-bold text-center bg-red-50 py-2 rounded-lg animate-bounce-in">
                {error}
              </div>
            )}
            
            {successMsg && (
              <div className="text-green-600 text-sm font-bold text-center bg-green-50 py-2 rounded-lg animate-bounce-in">
                {successMsg}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black py-4 rounded-xl shadow-lg transform transition active:scale-95 mt-4 border-b-4 border-indigo-800"
            >
              {isRegistering ? 'CADASTRAR' : 'ENTRAR'}
            </button>
          </form>

          <div className="mt-6 border-t border-gray-100 pt-4">
            <button 
              onClick={toggleMode}
              className="text-indigo-500 font-bold hover:text-indigo-700 hover:underline text-sm transition-colors"
            >
              {isRegistering 
                ? 'Já tem uma conta? Faça Login' 
                : 'Não tem conta? Cadastre-se'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;