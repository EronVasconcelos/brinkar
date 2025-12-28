import { User } from '../types';

const USERS_KEY = 'brinkar_users';
const CURRENT_USER_KEY = 'brinkar_current_user';

export const authService = {
  getUsers: (): User[] => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  },

  register: (user: User): { success: boolean; message: string } => {
    const users = authService.getUsers();
    
    // Verifica se e-mail já existe
    if (users.some(u => u.email === user.email)) {
      return { success: false, message: 'Este e-mail já está cadastrado.' };
    }

    const newUsers = [...users, user];
    localStorage.setItem(USERS_KEY, JSON.stringify(newUsers));
    return { success: true, message: 'Cadastro realizado com sucesso!' };
  },

  login: (email: string, password: string): { success: boolean; user?: User; message: string } => {
    // Backdoor para admin (legado)
    if (email === 'admindev' && password === '123456') {
      const adminUser: User = { name: 'Admin', email: 'admin@brinkar.ia', dob: '2000-01-01', password: '' };
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(adminUser));
      return { success: true, user: adminUser, message: 'Login realizado.' };
    }

    const users = authService.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      return { success: true, user, message: 'Bem-vindo de volta!' };
    }

    return { success: false, message: 'E-mail ou senha incorretos.' };
  },

  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    // Removemos também o item legado se existir
    localStorage.removeItem('brinkar_auth'); 
  },

  getCurrentUser: (): User | null => {
    const userJson = localStorage.getItem(CURRENT_USER_KEY);
    if (userJson) return JSON.parse(userJson);
    
    // Suporte legado
    if (localStorage.getItem('brinkar_auth') === 'true') {
        return { name: 'Visitante', email: '', dob: '', password: '' };
    }
    
    return null;
  }
};