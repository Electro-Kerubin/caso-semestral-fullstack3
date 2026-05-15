import React from 'react';
import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../styles/theme';

export default function ReportCard({ report, onPress, compact = false }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed, compact && styles.compact]}>
      <Image source={{ uri: report.media[0] }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.name}>{report.name}</Text>
          <View style={[styles.statusPill, report.status === 'Encontrado' ? styles.found : styles.searching]}>
            <Text style={styles.statusText}>{report.status}</Text>
          </View>
        </View>
        <Text style={styles.meta}>{report.species} · {report.breed}</Text>
        <Text style={styles.desc}>{report.description.slice(0, 30)}{report.description.length > 30 ? '...' : ''}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12
  },
  compact: { marginBottom: 14 },
  pressed: { opacity: 0.95, transform: [{ scale: 0.995 }] },
  image: { width: 104, height: 104, backgroundColor: COLORS.soft },
  content: { flex: 1, padding: 12 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  name: { fontSize: 17, fontWeight: '800', color: COLORS.text, flex: 1 },
  meta: { fontSize: 12, color: COLORS.muted, marginTop: 6 },
  desc: { fontSize: 13, color: COLORS.text, marginTop: 8 },
  statusPill: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999 },
  found: { backgroundColor: '#dcfce7' },
  searching: { backgroundColor: '#fee2e2' },
  statusText: { fontSize: 11, fontWeight: '800', color: COLORS.text }
});
