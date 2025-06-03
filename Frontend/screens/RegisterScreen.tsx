import { View, Text, TextInput, Image, Pressable, ActivityIndicator, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuthStore } from '../store/authStore';
import { globalStyles } from '../styles/globalStyles';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import SplashRespuesta from '../components/SplashRespuesta';
import SplashLogin from '../components/SplashLogin';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().min(3).required('Nombre requerido'),
  email: Yup.string().email().required('Correo requerido'),
  password: Yup.string().min(6).required('Contraseña requerida'),
});

export default function RegisterScreen() {
  const { register, isLoading } = useAuthStore();
  const router = useRouter();
  const [enviando, setEnviando] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setCargando(false);
    }, 1500);
    return () => clearTimeout(temporizador);
  }, []);

  const handleRegister = async (values, { setSubmitting }) => {
    try {
      setEnviando(true);
      await register({
        nombre: values.name,
        email: values.email,
        password: values.password
      });
      Alert.alert('Éxito', 'Cuenta creada', [{ text: 'OK', onPress: () => router.replace('/home') }]);
    } catch (err: any) {
      let errorMessage = err.message || 'Error desconocido';
      if (err.message?.includes('correo ya está registrado')) {
        errorMessage = 'Este correo ya está registrado.';
      }
      Alert.alert('Error', errorMessage);
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
        <Text style={globalStyles.title}>BIENVENIDO A SANTA CRUZ DE LA SIERRA</Text>

        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={RegisterSchema}
          onSubmit={handleRegister}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
            <>
              <TextInput
                style={[globalStyles.input, touched.name && errors.name && globalStyles.inputError]}
                placeholder="Nombre "
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              {touched.name && errors.name && <Text style={globalStyles.errorText}>{errors.name}</Text>}

              <TextInput
                style={[globalStyles.input, touched.email && errors.email && globalStyles.inputError]}
                placeholder="E-Mail"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
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
                  <Text style={globalStyles.buttonText}>Registrarse</Text>
                </Pressable>
              )}
            </>
          )}
        </Formik>

        <Pressable
          style={globalStyles.buttonSecondary}
          onPress={() => router.push('/login')}
        >
          <Text style={globalStyles.buttonText}>¿Ya tienes cuenta? Inicia sesión</Text>
        </Pressable>
      </View>

      <SplashRespuesta visible={enviando} mensaje="Registrando cuenta..." />
    </View>
  );
}
