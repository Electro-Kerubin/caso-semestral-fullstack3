import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import { COLORS } from '../styles/theme';

export default function ScreenShell({ title, subtitle, children, padded = true, scroll = true, topSpace = false, logo = false }) {
  const Container = scroll ? ScrollView : View;
  return (
    <SafeAreaView style={styles.safe}>
      <Container contentContainerStyle={[styles.container, padded && styles.padded]} style={styles.flex}>
        {topSpace ? <View style={styles.logoSpace} /> : null}
        {(logo || title || subtitle) ? (
          <View style={styles.brandHeader}>
            {logo ? (
              <Image source={require('../../assets/logo/logo.svg')} style={styles.logoMark} resizeMode="contain" />
            ) : null}
            {title ? <Text style={styles.title}>{title}</Text> : null}
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
        ) : null}
        {children}
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  flex: { flex: 1 },
  container: { flexGrow: 1 },
  padded: { padding: 20 },
  logoSpace: { height: 72 },
  brandHeader: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 18
  },
  logoMark: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: COLORS.soft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14
  },
  logoText: { fontSize: 34 },
  title: { fontSize: 32, fontWeight: '900', color: COLORS.text, textAlign: 'center' },
  subtitle: { marginTop: 8, fontSize: 15, color: COLORS.muted, textAlign: 'center', lineHeight: 22, maxWidth: 320 }
});