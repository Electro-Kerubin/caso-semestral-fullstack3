import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import ScreenShell from '../components/ScreenShell';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS } from '../styles/theme';

export default function RegisterScreen({ navigation }) {
  return (
    <ScreenShell title="Sanos y Salvos" subtitle="Encuentra a tu amigo" logo>
      <Text style={styles.title}>Crear cuenta</Text>
      <View style={styles.form}>
        <TextInput placeholder="Correo electrónico" placeholderTextColor={COLORS.muted} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
        <TextInput placeholder="Contraseña" placeholderTextColor={COLORS.muted} style={styles.input} secureTextEntry />
        <TextInput placeholder="Repite la contraseña" placeholderTextColor={COLORS.muted} style={styles.input} secureTextEntry />
        <PrimaryButton title="Registrarme" onPress={() => navigation.navigate('Dashboard')} style={styles.button} />
      </View>
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
  button: { width: '88%', alignSelf: 'center' }
});