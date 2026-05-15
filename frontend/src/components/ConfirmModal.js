import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { COLORS } from '../styles/theme';

export default function ConfirmModal({ visible, title, message, onConfirm, onCancel }) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttons}>
            <Pressable onPress={onCancel} style={[styles.button, styles.cancelButton]}>
              <Text style={[styles.buttonText, styles.cancelText]}>Cancelar</Text>
            </Pressable>
            <Pressable onPress={onConfirm} style={[styles.button, styles.confirmButton]}>
              <Text style={[styles.buttonText, styles.confirmText]}>Confirmar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialog: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 24,
    width: '85%',
    maxWidth: 320,
    gap: 16
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text
  },
  message: {
    fontSize: 14,
    color: COLORS.muted,
    lineHeight: 20
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8
  },
  button: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5
  },
  cancelButton: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border
  },
  confirmButton: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 14
  },
  cancelText: {
    color: COLORS.text
  },
  confirmText: {
    color: '#fff'
  }
});
