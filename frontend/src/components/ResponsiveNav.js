import React from 'react';
import { View, Text, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../styles/theme';

const links = [
  { key: 'PublishReport', label: 'Publicar reporte', icon: 'document-text-outline' },
  { key: 'Notifications', label: 'Notificaciones', icon: 'notifications-outline' },
  { key: 'Profile', label: 'Perfil', icon: 'person-outline' },
  { key: 'Logout', label: 'Cerrar sesión', icon: 'log-out-outline' }
];

export default function ResponsiveNav({ navigation, openMenu, onLogout }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 760;

  if (isMobile) {
    return (
      <Pressable onPress={openMenu} style={styles.mobileButton}>
        <Ionicons name="menu" size={24} color={COLORS.text} />
      </Pressable>
    );
  }

  return (
    <View style={styles.navRow}>
      {links.map((item) => (
        <Pressable
          key={item.key}
          onPress={() => (item.key === 'Logout' ? onLogout?.() : navigation.navigate(item.key))}
          style={({ pressed }) => [styles.navItem, pressed && styles.pressed]}
        >
          <Ionicons name={item.icon} size={18} color={COLORS.text} />
          <Text style={styles.navText}>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  mobileButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border
  },
  navRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  navItem: {
    minHeight: 42,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  navText: { fontSize: 13, fontWeight: '700', color: COLORS.text },
  pressed: { opacity: 0.92 }
});
