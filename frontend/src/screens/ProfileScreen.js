import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenShell from '../components/ScreenShell';
import api from '../api/api';
import { COLORS } from '../styles/theme';

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState({
    name: 'María Torres',
    email: 'maria@email.com',
    phone: '+51 999 111 222'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    api.getProfile()
      .then((res) => {
        if (!mounted) return;
        const data = res?.data || {};
        const nextProfile = {
          name: data?.name || data?.nombre || data?.fullName || profile.name,
          email: data?.email || data?.correo || profile.email,
          phone: data?.phone || data?.telefono || data?.celular || profile.phone
        };
        setProfile(nextProfile);
        setError(null);
      })
      .catch((err) => {
        console.warn('No se pudo cargar perfil desde API, usando datos locales.', err?.message || err);
        if (!mounted) return;
        setError(err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <ScreenShell title="Perfil" subtitle="Aquí puedes ver y cambiar los datos de contacto enlazados a tus reportes" scroll>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={18} color={COLORS.text} />
        </Pressable>
      </View>
      {loading ? <Text style={styles.stateText}>Cargando perfil...</Text> : null}
      {!loading && error ? <Text style={styles.stateText}>No se pudo actualizar desde el servidor. Mostrando datos guardados.</Text> : null}
      <View style={styles.card}>
        <Text style={styles.label}>Usuario</Text>
        <Text style={styles.value}>{profile.name}</Text>
        <Text style={styles.label}>Correo</Text>
        <Text style={styles.value}>{profile.email}</Text>
        <Text style={styles.label}>Teléfono</Text>
        <Text style={styles.value}>{profile.phone}</Text>
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
  stateText: { color: COLORS.muted, fontSize: 13, marginTop: 16 },
  label: { color: COLORS.muted, fontSize: 12, marginTop: 10 },
  value: { color: COLORS.text, fontSize: 16, fontWeight: '800' }
});
