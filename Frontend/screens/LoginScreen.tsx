import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { useAuthStore } from '../store/authStore';
import { globalStyles } from '../styles/globalStyles';
import SplashOverlay from '../components/SplashRespuesta';
import SplashIntro from '../components/SplashLogin';

const validationRules = Yup.object({
  email: Yup.string().email('Correo no válido').required('Requerido'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Requerido'),
});

export default function PantallaInicioSesion() {
  const router = useRouter();
  const { login, accessAsGuest, isLoading } = useAuthStore();

  const [animando, setAnimando] = useState(true);
  const [enProceso, setEnProceso] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimando(false), 1300);
    return () => clearTimeout(t);
  }, []);

  const iniciarSesion = async (credenciales, helpers) => {
    try {
      setEnProceso(true);
      await login(credenciales.email, credenciales.password);
      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Fallo de inicio de sesión', error.message || 'Credenciales incorrectas');
    } finally {
      helpers.setSubmitting(false);
      setEnProceso(false);
    }
  };

  const continuarComoInvitado = async () => {
    try {
      setEnProceso(true);
      await accessAsGuest();
      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No fue posible continuar como invitado');
    } finally {
      setEnProceso(false);
    }
  };

  if (animando) return <SplashIntro />;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={globalStyles.container}>
      <ScrollView contentContainerStyle={globalStyles.scrollContent}>
        <Image source={require('../assets/logo_1.jpg')} style={globalStyles.imageHeader} />

        <Text style={[globalStyles.title, { marginBottom: 20 }]}>
          Inicia sesión para celebrar el Bicentenario
        </Text>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationRules}
          onSubmit={iniciarSesion}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
            <>
              <View style={globalStyles.inputGroup}>
                <TextInput
                  placeholder="Correo electrónico"
                  style={globalStyles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="emailAddress"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Text style={globalStyles.errorText}>{errors.email}</Text>
                )}
              </View>

              <View style={globalStyles.inputGroup}>
                <TextInput
                  placeholder="Contraseña"
                  style={globalStyles.input}
                  secureTextEntry
                  autoCorrect={false}
                  textContentType="password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {touched.password && errors.password && (
                  <Text style={globalStyles.errorText}>{errors.password}</Text>
                )}
              </View>

              {isLoading || isSubmitting ? (
                <ActivityIndicator size="large" color="#007bff" />
              ) : (
                <Pressable style={globalStyles.buttonBlue} onPress={handleSubmit}>
                  <Text style={globalStyles.buttonText}>Acceder</Text>
                </Pressable>
              )}
            </>
          )}
        </Formik>

        <Pressable style={globalStyles.buttonGray} onPress={continuarComoInvitado}>
          <Text style={globalStyles.buttonText}>Entrar como invitado</Text>
        </Pressable>

        <Pressable style={globalStyles.linkButton} onPress={() => router.push('/register')}>
          <Text style={globalStyles.linkText}>¿No tienes cuenta? Regístrate</Text>
        </Pressable>
      </ScrollView>

      <SplashOverlay visible={enProceso} mensaje="Verificando acceso..." />
    </KeyboardAvoidingView>
  );
}
