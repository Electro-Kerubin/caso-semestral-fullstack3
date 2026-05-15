import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScreenShell from '../components/ScreenShell';
import PrimaryButton from '../components/PrimaryButton';

export default function IndexScreen({ navigation }) {
  return (
    <ScreenShell title="Sanos y Salvos" subtitle="Encuentra a tu amigo" logo>
      <View style={styles.heroImageSpace}>
        <View style={styles.heroImagePlaceholder} />
      </View>

      <View style={styles.actions}>
        <PrimaryButton title="Registrarse" onPress={() => navigation.navigate('Register')} style={styles.button} />
        <PrimaryButton title="Login" variant="ghost" onPress={() => navigation.navigate('Login')} style={styles.button} />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  heroImageSpace: {
    marginTop: 8,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  heroImagePlaceholder: {
    width: '100%',
    maxWidth: 420,
    height: 240,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: 28
  },
  actions: { marginTop: 24, gap: 12 },
  button: { width: '88%', alignSelf: 'center' }
});