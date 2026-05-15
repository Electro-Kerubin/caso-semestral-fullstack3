import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenShell from '../components/ScreenShell';
import LogoBanner from '../components/LogoBanner';
import ResponsiveNav from '../components/ResponsiveNav';
import ReportCard from '../components/ReportCard';
import PrimaryButton from '../components/PrimaryButton';
import ConfirmModal from '../components/ConfirmModal';
import { COLORS } from '../styles/theme';
import { MOCK_REPORTS } from '../data/mockReports';
import api from '../api/api';

const PAGE_SIZE = 20;

function paginate(items, page) {
  const start = (page - 1) * PAGE_SIZE;
  return items.slice(start, start + PAGE_SIZE);
}

function Pagination({ totalPages, page, setPage }) {
  if (totalPages <= 1) return null;
  return (
    <View style={styles.pagination}>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((num) => (
        <Pressable key={num} onPress={() => setPage(num)} style={[styles.pageChip, page === num && styles.pageChipActive]}>
          <Text style={[styles.pageText, page === num && styles.pageTextActive]}>{num}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export default function DashboardScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 980;
  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [hoveredPinId, setHoveredPinId] = useState(null);

  // Ubicación del usuario (mock)
  const userLocation = { lat: -12.0464, lng: -77.0428 };

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = () => {
    setLogoutModalVisible(false);
    navigation.navigate('Logout');
  };

  // Calcular distancia usando la fórmula de Haversine
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Formatear fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [reports, setReports] = useState(MOCK_REPORTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.getReports()
      .then((res) => {
        if (!mounted) return;
        const data = res?.data;
        if (Array.isArray(data) && data.length) setReports(data);
      })
      .catch((err) => {
        console.warn('Failed to load reports from API, using mock data', err?.message || err);
        if (!mounted) return;
        setError(err);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  const reportsOrdered = useMemo(() => {
    return [...reports].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [reports]);
  const myReports = reportsOrdered.filter((report) => report.isMine);
  const pagedReports = paginate(reportsOrdered, page);
  const totalPages = Math.max(1, Math.ceil(reportsOrdered.length / PAGE_SIZE));

  return (
    <ScreenShell padded={false} scroll={false}>
      <View style={styles.header}>
        <LogoBanner compact />
        <ResponsiveNav navigation={navigation} openMenu={() => setMenuOpen((value) => !value)} onLogout={handleLogout} />
      </View>

      {menuOpen ? (
        <View style={styles.mobileMenu}>
          {[
            ['PublishReport', 'Publicar reporte'],
            ['Notifications', 'Notificaciones'],
            ['Profile', 'Perfil'],
            ['Logout', 'Cerrar sesión']
          ].map(([route, label]) => (
            <Pressable key={route} onPress={() => (route === 'Logout' ? handleLogout() : navigation.navigate(route))} style={styles.mobileMenuItem}>
              <Text style={styles.mobileMenuText}>{label}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Mapa de reportes</Text>
            <Text style={styles.sectionHint}>Verde = encontrado, rojo = búsqueda</Text>
          </View>
          <View style={styles.mapCard}>
            <View style={styles.mapArea}>
              {reportsOrdered.map((report, index) => (
                <View key={report.id} style={[styles.pin, report.status === 'Encontrado' ? styles.pinFound : styles.pinSearching, { left: `${12 + (index % 4) * 21}%`, top: `${18 + (index % 3) * 20}%` }]}>
                  <Pressable
                    onPress={() => navigation.navigate('ReportDetail', { reportId: report.id })}
                    onMouseEnter={() => setHoveredPinId(report.id)}
                    onMouseLeave={() => setHoveredPinId(null)}
                    style={styles.pinPressable}
                  >
                    <Ionicons name="location-sharp" size={20} color="#fff" />
                  </Pressable>
                  {hoveredPinId === report.id && (
                    <View style={styles.tooltip}>
                      <Text style={styles.tooltipText}>{formatDate(report.createdAt)}</Text>
                      <Text style={styles.tooltipText}>
                        {calculateDistance(userLocation.lat, userLocation.lng, report.lat, report.lng).toFixed(1)} km
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Últimos reportes</Text>
          {pagedReports.map((report) => (
            <ReportCard key={report.id} report={report} onPress={() => navigation.navigate('ReportDetail', { reportId: report.id })} />
          ))}
          <Pagination totalPages={totalPages} page={page} setPage={setPage} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reportes realizados</Text>
          {myReports.map((report) => (
            <View key={report.id} style={styles.mineRow}>
              <View style={styles.mineCardWrap}>
                <ReportCard report={report} onPress={() => navigation.navigate('ReportDetail', { reportId: report.id })} />
              </View>
              <View style={styles.mineActions}>
                <View style={[styles.statePill, report.status === 'Encontrado' ? styles.stateFound : styles.stateSearching]}>
                  <Text style={styles.stateText}>{report.status}</Text>
                </View>
                <View style={styles.actionButtons}>
                  <PrimaryButton title="Editar" variant="ghost" onPress={() => navigation.navigate('PublishReport', { reportId: report.id })} style={styles.actionButton} />
                  <PrimaryButton title="Borrar" variant="ghost" onPress={() => {}} style={styles.actionButton} />
                </View>
                <PrimaryButton title="Cambiar contacto" onPress={() => navigation.navigate('Profile')} style={styles.contactButton} />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <ConfirmModal 
        visible={logoutModalVisible}
        title="Cerrar sesión"
        message="¿Estás seguro de que deseas cerrar sesión?"
        onConfirm={confirmLogout}
        onCancel={() => setLogoutModalVisible(false)}
      />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.background
  },
  content: { padding: 20, paddingBottom: 34, gap: 18 },
  section: {
    backgroundColor: COLORS.surface,
    borderRadius: 28,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  sectionTitleRow: { gap: 6, marginBottom: 10 },
  sectionTitle: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  sectionHint: { color: COLORS.muted, fontSize: 12 },
  mapCard: {
    height: 320,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#e8f2ec',
    borderWidth: 1,
    borderColor: COLORS.border
  },
  mapArea: {
    flex: 1,
    backgroundColor: '#d9eadf',
    position: 'relative',
    overflow: 'hidden'
  },
  pin: {
    position: 'absolute',
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  pinFound: { backgroundColor: COLORS.success },
  pinSearching: { backgroundColor: COLORS.accent },
  pinPressable: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tooltip: {
    position: 'absolute',
    bottom: 50,
    left: -30,
    backgroundColor: COLORS.text,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
    gap: 2,
    zIndex: 10
  },
  tooltipText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 14
  },
  pagination: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 },
  pageChip: {
    minWidth: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  pageChipActive: { backgroundColor: COLORS.secondary, borderColor: COLORS.secondary },
  pageText: { color: COLORS.text, fontWeight: '700' },
  pageTextActive: { color: '#fff' },
  mineRow: { marginBottom: 18 },
  mineCardWrap: { marginBottom: 10 },
  mineActions: {
    gap: 10,
    padding: 14,
    borderRadius: 22,
    backgroundColor: COLORS.soft,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  statePill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999
  },
  stateFound: { backgroundColor: '#dcfce7' },
  stateSearching: { backgroundColor: '#fee2e2' },
  stateText: { fontSize: 11, fontWeight: '800', color: COLORS.text },
  actionButtons: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  actionButton: { flexGrow: 1, flexBasis: 120 },
  contactButton: { width: '100%' },
  mobileMenu: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 12,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    gap: 8
  },
  mobileMenuItem: { paddingVertical: 10, paddingHorizontal: 10 },
  mobileMenuText: { color: COLORS.text, fontWeight: '700' }
});
