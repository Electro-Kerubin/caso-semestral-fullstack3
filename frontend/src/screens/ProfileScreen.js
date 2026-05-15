import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenShell from '../components/ScreenShell';
import { COLORS } from '../styles/theme';

export default function ProfileScreen() {
  return (
    <ScreenShell title="Perfil" subtitle="Aquí puedes ver y cambiar los datos de contacto enlazados a tus reportes">
      <View style={styles.card}>
        <Text style={styles.label}>Usuario</Text>
        <Text style={styles.value}>María Torres</Text>
        <Text style={styles.label}>Correo</Text>
        <Text style={styles.value}>maria@email.com</Text>
        <Text style={styles.label}>Teléfono</Text>
        <Text style={styles.value}>+51 999 111 222</Text>
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    padding: 18,
    marginTop: 20,
    gap: 6
  },
  label: { color: COLORS.muted, fontSize: 12, marginTop: 10 },
  value: { color: COLORS.text, fontSize: 16, fontWeight: '800' }
});
