import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { TouchableOpacity, View, StyleSheet, Platform } from 'react-native';

// Import your actual screens here
import HomeScreen from './HomeScreen';
import MoreSettingsScreen from './MoreSettingsScreen';

const Tab = createBottomTabNavigator();

// Custom floating button for the Scanner tab
const ScannerButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={styles.scannerButtonContainer}
    activeOpacity={0.8}
    onPress={onPress}
  >
    <View style={styles.scannerButton}>{children}</View>
  </TouchableOpacity>
);

// Dummy component for the scanner tab
const ScannerTab = () => null;

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#101212',
        tabBarInactiveTintColor: '#888',
      })}
      initialRouteName="Home"
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={28} color={color} />
        }}
      />

      <Tab.Screen
        name="Scanner"
        component={ScannerTab}
        options={{
          tabBarButton: (props) => (
            <ScannerButton {...props}>
              <MaterialIcons name="center-focus-strong" size={32} color="#fff" />
            </ScannerButton>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            // Your custom logic: e.g., navigating to Home with a param
            navigation.navigate('Home', { openScanner: true });
          },
        })}
      />

      <Tab.Screen 
        name="More" 
        component={MoreSettingsScreen} 
        options={{
          tabBarIcon: ({ color }) => <Entypo name="dots-three-horizontal" size={28} color={color} />
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    position: 'absolute', // Optional: makes the bar look more modern
    borderTopWidth: 0,
    elevation: 10,
    paddingBottom:20
  },
  scannerButtonContainer: {
    top: Platform.OS === 'android' ? -25 : -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#355940',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 8,
  },
});

export default BottomTabs;