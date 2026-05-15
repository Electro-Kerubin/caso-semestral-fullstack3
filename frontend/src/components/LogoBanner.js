import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../styles/theme';

export default function LogoBanner({ compact = false }) {
  return (
    <View style={[styles.wrap, compact && styles.compactWrap]}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>�</Text>
      </View>
      <View>
        <Text style={styles.brand}>Sanos y Salvos</Text>
        <Text style={styles.tag}>Encuentra a tu amigo</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  compactWrap: { alignSelf: 'flex-start' },
  badge: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.soft
  },
  badgeText: { fontSize: 22 },
  brand: { fontSize: 18, fontWeight: '900', color: COLORS.text },
  tag: { fontSize: 12, color: COLORS.muted, marginTop: 2 }
});