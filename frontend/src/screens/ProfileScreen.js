import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenShell from '../components/ScreenShell';
import { COLORS } from '../styles/theme';

export default function ProfileScreen({ navigation }) {
  return (
    <ScreenShell title="Perfil" subtitle="Aquí puedes ver y cambiar los datos de contacto enlazados a tus reportes" scroll>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={18} color={COLORS.text} />
        </Pressable>
      </View>
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
  header: {
    position: 'absolute',
    top: 18,
    right: 20,
    zIndex: 10
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center'
  },
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
