import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MobileNumberScreen from './screens/MobileNumberScreen';
import OtpScreen from './screens/OtpScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import ProfilePictureScreen from './screens/ProfilePictureScreen';

import MapPickerScreen from './screens/MapPickerScreen';
import ProfileScreen from './screens/ProfileScreen';
import ComplaintScreen from './screens/ComplaintScreen';
import BottomTabs from './screens/BottomTabs';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="MobileNumber"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MobileNumber" component={MobileNumberScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="ProfilePicture" component={ProfilePictureScreen} />
      {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      <Stack.Screen name="MapPicker" component={MapPickerScreen} />
      {/* All main screens after profile picture are inside BottomTabs */}
      <Stack.Screen name="MainTabs" component={BottomTabs} />
      {/* Keep other screens for direct navigation if needed */}
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Complaint" component={ComplaintScreen} />
      <Stack.Screen name="MoreSettings" component={require('./screens/MoreSettingsScreen').default} />
      <Stack.Screen name="Schedule" component={require('./screens/ScheduleScreen').default} />
      <Stack.Screen name="Support" component={require('./screens/SupportScreen').default} />
      <Stack.Screen name="Billing" component={require('./screens/BillingScreen').default} />

    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
