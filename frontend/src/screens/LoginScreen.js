import React from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import ScreenShell from '../components/ScreenShell';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS } from '../styles/theme';

export default function LoginScreen({ navigation }) {
  return (
    <ScreenShell title="Sanos y Salvos" subtitle="Encuentra a tu amigo" logo>
      <Text style={styles.title}>Iniciar sesión</Text>
      <View style={styles.form}>
        <TextInput placeholder="Correo electrónico" placeholderTextColor={COLORS.muted} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
        <TextInput placeholder="Contraseña" placeholderTextColor={COLORS.muted} style={styles.input} secureTextEntry />
        <PrimaryButton title="Entrar" onPress={() => navigation.navigate('Dashboard')} style={styles.button} />
      </View>

      <Pressable onPress={() => navigation.navigate('Register')} style={styles.linkBox}>
        <Text style={styles.linkText}>Aun no tienes cuenta? Registrate Aquí</Text>
      </Pressable>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: '800', color: COLORS.text, marginBottom: 14, textAlign: 'center' },
  form: { gap: 12 },
  input: {
    minHeight: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    color: COLORS.text
  },
  button: { width: '88%', alignSelf: 'center' },
  linkBox: { marginTop: 18, alignItems: 'center' },
  linkText: { color: COLORS.secondary, fontWeight: '800', textAlign: 'center' }
});