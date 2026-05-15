import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenShell from '../components/ScreenShell';
import { MOCK_NOTIFICATIONS } from '../data/mockReports';
import { COLORS } from '../styles/theme';

export default function NotificationScreen({ navigation }) {
  return (
    <ScreenShell title="Notificaciones" subtitle="Actividad reciente sobre tus reportes y coincidencias" scroll>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={18} color={COLORS.text} />
        </Pressable>
      </View>
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
  text: { color: COLORS.text, lineHeight: 21 }
});
