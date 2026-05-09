import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigation from './src/navigation';
import { useFonts, Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [fontsLoaded] = useFonts({ Nunito_400Regular, Nunito_700Bold });
  if (!fontsLoaded) return <AppLoading />;
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AppNavigation />
    </>
  );
}