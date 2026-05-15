import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigation from './src/navigation';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <AppNavigation />
    </>
  );
}