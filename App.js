import React from 'react';
import { enableScreens } from 'react-native-screens';
import AppNavigator from './AppNavigator';
import { UserProvider } from './UserContext';

enableScreens(true);

export default function App() {
  return (
    <UserProvider>
      <AppNavigator />
    </UserProvider>
  );
}
