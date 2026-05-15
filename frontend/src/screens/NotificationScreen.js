import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenShell from '../components/ScreenShell';
import { MOCK_NOTIFICATIONS } from '../data/mockReports';
import { COLORS } from '../styles/theme';
import api from '../api/api';

export default function NotificationScreen({ navigation }) {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    api.getNotifications()
      .then((res) => {
        if (!mounted) return;
        const payload = res?.data;
        const list = Array.isArray(payload) ? payload : payload?.items;
        if (!Array.isArray(list)) return;

        const normalized = list
          .map((item) => {
            if (typeof item === 'string') return item;
            return item?.message || item?.mensaje || item?.text || item?.description || item?.descripcion || null;
          })
          .filter(Boolean);

        if (normalized.length) {
          setNotifications(normalized);
        }
      })
      .catch((err) => {
        console.warn('No se pudo cargar notificaciones desde API, usando mock.', err?.message || err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <ScreenShell title="Notificaciones" subtitle="Actividad reciente sobre tus reportes y coincidencias" scroll>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={18} color={COLORS.text} />
        </Pressable>
      </View>
      <View style={styles.list}>
        {loading ? <Text style={styles.stateText}>Cargando notificaciones...</Text> : null}
        {!loading && notifications.length === 0 ? <Text style={styles.stateText}>No hay notificaciones por ahora.</Text> : null}
        {notifications.map((item, index) => (
          <View key={`${index}-${item}`} style={styles.card}>
            <Text style={styles.text}>{item}</Text>
          </View>
        ))}
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
  list: { gap: 12, marginTop: 20 },
  card: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 14
  },
  text: { color: COLORS.text, lineHeight: 21 },
  stateText: { color: COLORS.muted, fontSize: 14 }
});
