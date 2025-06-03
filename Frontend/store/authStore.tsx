// ✅ authStore.tsx completo con Zustand
import { create } from 'zustand';
import { authService } from '../api/services';

interface User {
  id?: string;
  nombre?: string;
  email?: string;
  isGuest?: boolean;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: { name: string, email: string, password: string }) => Promise<void>;
  accessAsGuest: () => Promise<void>;
  upgradeGuest: (userData: { nombre: string, email: string, password: string }) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isGuest: false,
  isLoggedIn: false,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.iniciarSesion(email, password);
      set({
        token: response.token,
        user: response.user || { email },
        isLoading: false,
        isAuthenticated: true,
        isGuest: false,
        isLoggedIn: true
      });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || error.message || 'Error al iniciar sesión' 
      });
      throw error;
    }
  },

  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.registro({
        nombre: userData.nombre,
        email: userData.email,
        password: userData.password
      });
      set({
        token: response.token,
        user: response.user || { nombre: userData.name, email: userData.email },
        isLoading: false,
        isAuthenticated: true,
        isGuest: false,
        isLoggedIn: true
      });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || error.message || 'Error en el registro' 
      });
      throw error;
    }
  },

  accessAsGuest: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.accesoInvitado();
      set({
        token: response.token,
        user: { ...response.user, isGuest: true },
        isLoading: false,
        isAuthenticated: false,
        isGuest: true,
        isLoggedIn: true
      });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || error.message || 'Error al acceder como invitado' 
      });
      throw error;
    }
  },

  upgradeGuest: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.actualizarInvitado(userData);
      set({
        token: response.token,
        user: { ...response.user, isGuest: false },
        isLoading: false,
        isAuthenticated: true,
        isGuest: false,
        isLoggedIn: true
      });
      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || error.message || 'Error al actualizar la cuenta'
      });
      return false;
    }
  },

  logout: async () => {
    set({
      token: null,
      user: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,
      isGuest: false,
      isLoggedIn: false
    });
    try {
      await authService.cerrarSesion();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  },
}));
