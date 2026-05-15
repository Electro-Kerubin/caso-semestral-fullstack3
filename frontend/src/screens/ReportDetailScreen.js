import React, { useMemo, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, useWindowDimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenShell from '../components/ScreenShell';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS } from '../styles/theme';
import { MOCK_REPORTS } from '../data/mockReports';

export default function ReportDetailScreen({ navigation, route }) {
  const { width } = useWindowDimensions();
  const reportId = route?.params?.reportId ?? MOCK_REPORTS[0].id;
  const report = useMemo(() => MOCK_REPORTS.find((item) => item.id === reportId) ?? MOCK_REPORTS[0], [reportId]);
  const [mediaIndex, setMediaIndex] = useState(0);
  const isWide = width >= 920;

  return (
    <ScreenShell padded={false} scroll={false}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={18} color={COLORS.text} />
        </Pressable>
        {report.isMine ? (
          <View style={styles.ownerButtons}>
            <PrimaryButton title="Editar reporte" variant="ghost" onPress={() => navigation.navigate('PublishReport', { reportId: report.id })} style={styles.ownerButton} />
            <PrimaryButton title="Borrar reporte" variant="ghost" onPress={() => {}} style={styles.ownerButton} />
          </View>
        ) : null}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.wrapper, isWide ? styles.row : styles.column]}>
          <View style={styles.mediaPane}>
            <View style={styles.mediaViewer}>
              <Image source={{ uri: report.media[mediaIndex] }} style={styles.mediaImage} />
              <View style={styles.mediaControls}>
                <Pressable onPress={() => setMediaIndex((value) => (value - 1 + report.media.length) % report.media.length)} style={styles.mediaArrow}>
                  <Ionicons name="chevron-back" size={20} color="#fff" />
                </Pressable>
                <Pressable onPress={() => setMediaIndex((value) => (value + 1) % report.media.length)} style={styles.mediaArrow}>
                  <Ionicons name="chevron-forward" size={20} color="#fff" />
                </Pressable>
              </View>
            </View>
            <View style={styles.thumbs}>
              {report.media.map((item, index) => (
                <Pressable key={item} onPress={() => setMediaIndex(index)} style={[styles.thumb, mediaIndex === index && styles.thumbActive]}>
                  <Image source={{ uri: item }} style={styles.thumbImage} />
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.infoPane}>
            <Text style={styles.name}>{report.name}</Text>
            <Text style={styles.meta}>{report.species} · {report.breed}</Text>
            <View style={[styles.statusPill, report.status === 'Encontrado' ? styles.found : styles.searching]}>
              <Text style={styles.statusText}>{report.status}</Text>
            </View>

            <Text style={styles.sectionLabel}>Descripción</Text>
            <Text style={styles.paragraph}>{report.description}</Text>

            <Text style={styles.sectionLabel}>Contacto</Text>
            <View style={styles.contactCard}>
              <Text style={styles.contactName}>{report.contact}</Text>
              <Text style={styles.contactLine}>{report.contactPhone}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
  ownerButtons: { flexDirection: 'row', gap: 10, flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1, marginLeft: 12 },
  ownerButton: { minWidth: 130 },
  content: { padding: 20, paddingBottom: 32 },
  wrapper: { gap: 18 },
  row: { flexDirection: 'row' },
  column: { flexDirection: 'column' },
  mediaPane: { flex: 1.1, gap: 12 },
  mediaViewer: {
    position: 'relative',
    borderRadius: 28,
    overflow: 'hidden',
    minHeight: 340,
    backgroundColor: COLORS.soft,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  mediaImage: { width: '100%', height: '100%' },
  mediaControls: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16
  },
  mediaArrow: {
    width: 46,
    height: 46,
    borderRadius: 999,
    backgroundColor: 'rgba(20,32,51,0.7)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  thumbs: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  thumb: {
    width: 74,
    height: 74,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent'
  },
  thumbActive: { borderColor: COLORS.secondary },
  thumbImage: { width: '100%', height: '100%' },
  infoPane: {
    flex: 0.9,
    backgroundColor: COLORS.surface,
    borderRadius: 28,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 10
  },
  name: { fontSize: 30, fontWeight: '900', color: COLORS.text },
  meta: { color: COLORS.muted, fontSize: 14 },
  statusPill: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 999 },
  found: { backgroundColor: '#dcfce7' },
  searching: { backgroundColor: '#fee2e2' },
  statusText: { fontSize: 11, fontWeight: '800', color: COLORS.text },
  sectionLabel: { marginTop: 10, color: COLORS.text, fontSize: 14, fontWeight: '800' },
  paragraph: { color: COLORS.text, lineHeight: 22 },
  contactCard: {
    borderRadius: 20,
    padding: 14,
    backgroundColor: COLORS.soft,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  contactName: { fontSize: 16, fontWeight: '800', color: COLORS.text },
  contactLine: { color: COLORS.muted, marginTop: 4 }
});
