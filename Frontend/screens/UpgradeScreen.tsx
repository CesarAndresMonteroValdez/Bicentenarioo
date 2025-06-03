import { View, Text, TextInput, ActivityIndicator, Alert, TouchableOpacity, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuthStore } from '../store/authStore';
import { globalStyles } from '../styles/globalStyles';
import { useRouter } from 'expo-router';
import { useLayoutEffect, useState, useEffect } from 'react';
import SplashRespuesta from '../components/SplashRespuesta';
import SplashLogin from '../components/SplashLogin';

const UpgradeSchema = Yup.object().shape({
  nombre: Yup.string().min(3, 'El nombre debe tener al menos 3 caracteres').required('El nombre es obligatorio'),
  email: Yup.string().email('Correo electrónico inválido').required('El correo electrónico es obligatorio'),
  password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
});

export default function UpgradeScreen() {
  const { upgradeGuest, isLoading, error, isGuest, isLoggedIn } = useAuthStore();
  const router = useRouter();
  const [enviando, setEnviando] = useState(false);
  const [cargando, setCargando] = useState(true);

  useLayoutEffect(() => {
    if (!isLoggedIn) router.replace('/');
    if (!isGuest) router.replace('/home');
  }, [isLoggedIn, isGuest]);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setCargando(false);
    }, 1500);
    return () => clearTimeout(temporizador);
  }, []);

  const handleUpgrade = async (values, { setSubmitting }) => {
    try {
      setEnviando(true);
      const success = await upgradeGuest(values);
      if (success) {
        Alert.alert('¡Cuenta actualizada!', 'Tu cuenta ha sido completada con éxito.');
        router.replace('/home');
      } else {
        Alert.alert('Error', error || 'No se pudo actualizar la cuenta.');
      }
    } catch (err: any) {
      const mensaje = err.message?.includes('correo ya está registrado')
        ? 'Este correo ya está en uso.'
        : err.message || 'No se pudo actualizar la cuenta.';
      Alert.alert('Error al actualizar cuenta', mensaje);
    } finally {
      setSubmitting(false);
      setEnviando(false);
    }
  };

  const initialValues = { nombre: '', email: '', password: '' };

  if (cargando) return <SplashLogin />;

  return (
    <View style={globalStyles.container}>
      <Image
        source={require('../assets/logo_1.jpg')}
        style={[globalStyles.imageHeader, { marginBottom: 20 }]}
      />

      <View style={globalStyles.contentBox}>
        <Text style={globalStyles.title}>Desbloquea tu experiencia completa </Text>
        <Text style={{ color: '#fff', textAlign: 'center', marginBottom: 10 }}>
          Conviértete en miembro completo y accede al modo Ruta y más funciones exclusivas.
        </Text>

        <Formik initialValues={initialValues} validationSchema={UpgradeSchema} onSubmit={handleUpgrade}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
            <>
              <TextInput
                style={[globalStyles.input, touched.nombre && errors.nombre ? globalStyles.inputError : null]}
                placeholder="Nombre"
                value={values.nombre}
                onChangeText={handleChange('nombre')}
                onBlur={handleBlur('nombre')}
              />
              {touched.nombre && errors.nombre && (
                <Text style={globalStyles.errorText}>{errors.nombre}</Text>
              )}

              <TextInput
                style={[globalStyles.input, touched.email && errors.email ? globalStyles.inputError : null]}
                placeholder="Correo electrónico"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email && (
                <Text style={globalStyles.errorText}>{errors.email}</Text>
              )}

              <TextInput
                style={[globalStyles.input, touched.password && errors.password ? globalStyles.inputError : null]}
                placeholder="Contraseña"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
              />
              {touched.password && errors.password && (
                <Text style={globalStyles.errorText}>{errors.password}</Text>
              )}

              {(isLoading || isSubmitting) ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <TouchableOpacity style={globalStyles.buttonGreen} onPress={handleSubmit as any}>
                  <Text style={globalStyles.buttonText}>ACTUALIZAR MI CUENTA</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={[globalStyles.buttonGreen, { backgroundColor: '#222B27' }]} onPress={() => router.replace('/home')}>
                <Text style={globalStyles.buttonText}>CANCELAR</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>

      <SplashRespuesta visible={enviando} mensaje="Actualizando cuenta..." />
    </View>
  );
}
