import api from './axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 🔧 Función auxiliar para procesar errores
function procesarError(error: any) {
  if (error.response?.data?.message) {
    return { message: error.response.data.message };
  } else if (error.request) {
    return { message: 'No se recibió respuesta del servidor' };
  } else {
    return { message: 'Error de conexión inesperado' };
  }
}

export const authService = {
  // ✅ Registro de usuario
  registro: async (userData: { nombre: string; email: string; password: string }) => {
    try {
      const response = await api.post('/auth/registro', userData);

      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
      }

      return response.data;
    } catch (error: any) {
      throw procesarError(error);
    }
  },

  // ✅ Inicio de sesión
  iniciarSesion: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/iniciar', { email, password });

      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
      }

      return response.data;
    } catch (error: any) {
      throw procesarError(error);
    }
  },

  // ✅ Acceso como invitado
  accesoInvitado: async () => {
    try {
      const response = await api.post('/auth/invitado', {});

      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
      }

      return response.data;
    } catch (error: any) {
      throw procesarError(error);
    }
  },

  // ✅ Obtener información del usuario actual
  obtenerInfoUsuario: async () => {
    try {
      const response = await api.get('/auth/user-info');
      return response.data;
    } catch (error: any) {
      throw procesarError(error);
    }
  },

  // ✅ Actualizar cuenta de invitado
  actualizarInvitado: async (userData: { nombre: string; email: string; password: string }) => {
    try {
      const response = await api.post('/auth/actualizar-invitado', userData);

      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
      }

      return response.data;
    } catch (error: any) {
      throw procesarError(error);
    }
  },

  // ✅ Cerrar sesión
  cerrarSesion: async () => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  },

  // ✅ Verificar acceso a modo ruta
  verificarAccesoModoRuta: async () => {
    try {
      const response = await api.get('/auth/modo-ruta');
      return {
        acceso: true,
        data: response.data
      };
    } catch (error: any) {
      if (error.response?.status === 403) {
        return {
          acceso: false,
          message: 'Acceso restringido para usuarios invitados'
        };
      }
      throw procesarError(error);
    }
  }
};
