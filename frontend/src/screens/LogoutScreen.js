import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenShell from '../components/ScreenShell';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS } from '../styles/theme';

export default function LogoutScreen({ navigation }) {
  return (
    <ScreenShell title="Cerrar sesión" subtitle="¿Estás seguro de que deseas salir de la app?">
      <View style={styles.card}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>🐶</Text>
          <Text style={styles.caption}>Perrito durmiendo</Text>
        </View>
        <Text style={styles.message}>Te esperamos la próxima vez</Text>
        <PrimaryButton title="Ir a Inicio" onPress={() => navigation.navigate('Index')} />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 24,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 28,
    padding: 18,
    gap: 16,
    alignItems: 'center'
  },
  imagePlaceholder: {
    width: '100%',
    minHeight: 240,
    borderRadius: 24,
    backgroundColor: COLORS.soft,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border
  },
  imageText: { fontSize: 72 },
  caption: { color: COLORS.muted, marginTop: 12, fontWeight: '700' },
  message: { fontSize: 18, fontWeight: '800', color: COLORS.text, textAlign: 'center' }
});
