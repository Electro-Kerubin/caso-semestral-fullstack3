import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { COLORS } from '../styles/theme';

export default function PrimaryButton({ title, onPress, variant = 'primary', style, textStyle }) {
  const isGhost = variant === 'ghost';
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.button, isGhost && styles.ghost, pressed && styles.pressed, style]}>
      <Text style={[styles.text, isGhost && styles.ghostText, textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  ghost: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowOpacity: 0
  },
  pressed: { transform: [{ scale: 0.99 }], opacity: 0.94 },
  text: { color: '#fff', fontSize: 15, fontWeight: '800' },
  ghostText: { color: COLORS.text }
});
