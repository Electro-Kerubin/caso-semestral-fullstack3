import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import ScreenShell from '../components/ScreenShell';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS } from '../styles/theme';

export default function PublishReportScreen({ navigation, route }) {
  const isEdit = Boolean(route?.params?.reportId);
  return (
    <ScreenShell title={isEdit ? 'Editar reporte' : 'Publicar reporte'} subtitle="Pantalla UI preparada para el formulario de reporte">
      <View style={styles.form}>
        <TextInput placeholder="Nombre del animal" placeholderTextColor={COLORS.muted} style={styles.input} />
        <TextInput placeholder="Especie" placeholderTextColor={COLORS.muted} style={styles.input} />
        <TextInput placeholder="Raza" placeholderTextColor={COLORS.muted} style={styles.input} />
        <TextInput placeholder="Descripción" placeholderTextColor={COLORS.muted} style={[styles.input, styles.textArea]} multiline />
        <TextInput placeholder="Contacto" placeholderTextColor={COLORS.muted} style={styles.input} />
        <PrimaryButton title={isEdit ? 'Guardar cambios' : 'Publicar reporte'} onPress={() => navigation.navigate('Dashboard')} />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  form: { gap: 12, marginTop: 20 },
  input: {
    minHeight: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    color: COLORS.text
  },
  textArea: { minHeight: 120, textAlignVertical: 'top', paddingTop: 14 }
});
