import { View, Text, TextInput, Image, Pressable, ActivityIndicator, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuthStore } from '../store/authStore';
import { globalStyles } from '../styles/globalStyles';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import SplashRespuesta from '../components/SplashRespuesta';
import SplashLogin from '../components/SplashLogin';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Correo electrónico inválido').required('El correo electrónico es obligatorio'),
  password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
});

export default function LoginScreen() {
  const { login, accessAsGuest, isLoading } = useAuthStore();
  const router = useRouter();
  const [enviando, setEnviando] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setCargando(false);
    }, 1500);
    return () => clearTimeout(temporizador);
  }, []);

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      setEnviando(true);
      await login(values.email, values.password);
      router.replace('/home');
    } catch (err: any) {
      const errorMessage = err.message || 'Usuario o contraseña incorrectos';
      Alert.alert('Error de autenticación', errorMessage);
    } finally {
      setSubmitting(false);
      setEnviando(false);
    }
  };

  if (cargando) return <SplashLogin />;

  return (
    <View style={globalStyles.container}>
      <Image source={require('../assets/logo_1.jpg')} style={globalStyles.imageHeader} />

      <View style={globalStyles.contentBox}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 11 }}>
          <Pressable
            style={{
              backgroundColor: '#ffffff',
              paddingVertical: 11,
              paddingHorizontal: 30,
              borderRadius: 22,
              marginRight: -1,
            }}
            onPress={() => router.push('/register')}
          >
            <Text style={{ fontWeight: 'bold', color: '#000' }}>Registrarse</Text>
          </Pressable>

          <Pressable
            style={{
              backgroundColor: '#6c757d',
              paddingVertical: 12,
              paddingHorizontal: 22,
              borderRadius: 20,
            }}
            onPress={async () => {
              try {
                setEnviando(true);
                await accessAsGuest();
                router.replace('/home');
              } catch (err: any) {
                Alert.alert('Error', err.message || 'No se pudo acceder como invitado');
              } finally {
                setEnviando(false);
              }
            }}
          >
            <Text style={{ fontWeight: 'bold', color: 'white' }}>Invitado</Text>
          </Pressable>
        </View>

        <Text style={globalStyles.title}>BIENVENIDO A SANTA CRUZ DE LA SIERRA</Text>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
            <>
              <TextInput
                style={[globalStyles.input, touched.email && errors.email && globalStyles.inputError]}
                placeholder="E-Mail"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email && <Text style={globalStyles.errorText}>{errors.email}</Text>}

              <TextInput
                style={[globalStyles.input, touched.password && errors.password && globalStyles.inputError]}
                placeholder="Contraseña"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
              />
              {touched.password && errors.password && <Text style={globalStyles.errorText}>{errors.password}</Text>}

              {isLoading || isSubmitting ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <Pressable style={globalStyles.buttonGreen} onPress={handleSubmit}>
                  <Text style={globalStyles.buttonText}>Iniciar Sesión</Text>
                </Pressable>
              )}
            </>
          )}
        </Formik>
      </View>

      <SplashRespuesta visible={enviando} mensaje="Procesando datos..." />
    </View>
  );
}
