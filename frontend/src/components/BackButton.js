import React from 'react';
import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../styles/theme';

export default function BackButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={[styles.container, Platform.OS === 'web' ? { top: 20 } : {}]} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={20} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 20,
    backgroundColor: COLORS.secondary,
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  }
});