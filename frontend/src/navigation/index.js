import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import PublishReportScreen from '../screens/PublishReportScreen';
import MatchesScreen from '../screens/MatchesScreen';
import ReportDetailScreen from '../screens/ReportDetailScreen';

const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="PublishReport" component={PublishReportScreen} />
        <Stack.Screen name="Matches" component={MatchesScreen} />
        <Stack.Screen name="ReportDetail" component={ReportDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}