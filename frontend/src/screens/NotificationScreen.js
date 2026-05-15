import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenShell from '../components/ScreenShell';
import { MOCK_NOTIFICATIONS } from '../data/mockReports';
import { COLORS } from '../styles/theme';

export default function NotificationScreen() {
  return (
    <ScreenShell title="Notificaciones" subtitle="Actividad reciente sobre tus reportes y coincidencias">
      <View style={styles.list}>
        {MOCK_NOTIFICATIONS.map((item) => (
          <View key={item} style={styles.card}>
            <Text style={styles.text}>{item}</Text>
          </View>
        ))}
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  list: { gap: 12, marginTop: 20 },
  card: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 14
  },
  text: { color: COLORS.text, lineHeight: 21 }
});
