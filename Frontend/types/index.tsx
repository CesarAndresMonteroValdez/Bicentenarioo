// Representa un usuario autenticado o invitado
export interface User {
    id?: string;
    nombre?: string;
    email?: string;
    isGuest?: boolean;
  }
  
  // Estructura de respuesta común del backend al autenticarse
  export interface AuthResponse {
    token: string;
    user: User;
  }
  
  // Datos necesarios para registrar un usuario o actualizar un invitado
  export interface RegisterData {
    nombre: string;
    email: string;
    password: string;
  }
  
  // Posibles estados para feedback o UI
  export interface AuthState {
    isLoading: boolean;
    isAuthenticated: boolean;
    isLoggedIn: boolean;
    isGuest: boolean;
    user: User | null;
    token: string | null;
    error: string | null;
  }
  