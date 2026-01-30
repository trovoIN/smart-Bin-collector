import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import {
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  Entypo,
} from '@expo/vector-icons';
import { UserContext } from '../UserContext';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation, useRoute } from '@react-navigation/native';
import { resolveQr, takeUpUnit } from '../api/qr';
import { markCollection } from '../api/collections';


const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const { user } = useContext(UserContext);

  React.useEffect(() => {
    if (route.params?.openScanner) {
      handleStartScan();
      // Remove param so it doesn't trigger again
      navigation.setParams({ openScanner: undefined });
    }
  }, [route.params?.openScanner]);

  const handleStartScan = async () => {
    if (!permission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert('Permission Required', 'Please enable camera access.');
        return;
      }
    }
    setScanning(true);
    setScanned(false);
  };

  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = async ({ type, data }) => {
    if (scanned) return;
    setScanned(true);
    setScanning(false);

    try {
      // Extract token if it's a URL
      let qrToken = data;
      if (data.includes('/qr/')) {
        qrToken = data.split('/qr/')[1];
      }

      // 1. Resolve QR
      const result = await resolveQr(qrToken);

      if (result.status === 'ACTIVE' && result.unit) {

        // CHECK IF UNASSIGNED (Specific request: "Take Up & Collect")
        console.log('Unit Collector Name:', result.unit.collectorName); // DEBUG

        if (result.unit.collectorName === 'Unassigned' || !result.unit.collectorName) {
          Alert.alert(
            'Unassigned Household',
            'This household has no collector. Do you want to take it up and collect waste?',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Take Up & Collect',
                onPress: async () => {
                  try {
                    console.log('Attempting to take up unit...');
                    // 1. Take Up (Assign)
                    await takeUpUnit(qrToken);
                    console.log('Unit taken up successfully');

                    // 2. Collect Waste
                    await markCollection(result.unit.id);
                    console.log('Collection marked');

                    Alert.alert('Success', 'Unit assigned and collection recorded!');
                  } catch (err) {
                    console.error('Take Up Error:', err);
                    Alert.alert('Error', 'Failed to process: ' + err.message);
                  }
                }
              }
            ]
          );
          return;
        }

        // 2. Already Assigned - Confirm Collection
        Alert.alert(
          'Unit Found',
          `Unit: ${result.unit.unitNumber}\nOwner: ${result.unit.householdPhone || 'N/A'}\nCollector: ${result.unit.collectorName}`,
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Collect Waste',
              onPress: async () => {
                try {
                  await markCollection(result.unit.id);
                  Alert.alert('Success', 'Collection Recorded! Notification sent to user.');
                } catch (err) {
                  Alert.alert('Error', err.message);
                }
              }
            }
          ]
        );
      } else if (result.status === 'UNASSIGNED') {
        // Alert.alert('New QR Code', 'This QR is not assigned to any unit yet.');
        Alert.alert(
          'Unassigned Unit',
          'This unit has no collector. Do you want to take it up?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Take Up',
              onPress: async () => {
                try {
                  const { takeUpUnit } = require('../api/qr');
                  await takeUpUnit(qrToken);
                  Alert.alert('Success', 'You have been assigned to this unit!');
                } catch (err) {
                  Alert.alert('Error', err.message);
                }
              }
            }
          ]
        );
      } else {
        Alert.alert('Invalid QR', 'Status: ' + result.status);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  if (scanning) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        />
        <TouchableOpacity style={styles.closeButton} onPress={() => setScanning(false)}>
          <Ionicons name="close" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logoText}>Collector</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('Complaint')}>
            <Ionicons name="document-text-outline" size={24} color="#111" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            {user?.profilePicture ? (
              <Image source={{ uri: user.profilePicture }} style={styles.profilePic} />
            ) : (
              <Ionicons name="person-circle-outline" size={40} color="#888" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ alignItems: 'center', width: '100%' }} showsVerticalScrollIndicator={false}>
        {/* Home Image Card */}
        <View style={styles.waveCard}>
          <Image
            source={require('../assets/home.jpeg')}
            style={styles.homeImage}
            resizeMode="cover"
          />
          {/* Overlay to ensure text readability */}
          <View style={styles.overlay} />

          <View style={styles.waveContent}>
            <Text style={styles.greeting}>Good Morning, {user?.firstName || 'John'}!</Text>
            <Text style={styles.bill}>Bill Amount : Rs. 500</Text>
            <Text style={styles.status}>
              Status: <Text style={styles.unpaidText}>Unpaid</Text>
            </Text>
            <Text style={styles.number}>{user?.phone || 'Enter your number'}</Text>
          </View>
        </View>

        {/* Grid Menu */}
        <View style={styles.grid}>
          <View style={styles.gridRow}>
            <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('Schedule')}>
              <MaterialIcons name="schedule" size={28} color="#333" />
              <Text style={styles.gridText}>Schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('Support')}>
              <MaterialIcons name="support-agent" size={28} color="#dc29ac" />
              <Text style={styles.gridText}>Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('Billing')}>
              <MaterialIcons name="payment" size={28} color="#7e57c2" />
              <Text style={styles.gridText}>Billing</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.gridRow}>
            <TouchableOpacity style={styles.gridItem}>
              <Entypo name="light-bulb" size={28} color="#f9a825" />
              <Text style={styles.gridText}>Tips</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gridItem}>
              <Entypo name="location-pin" size={28} color="#0288d1" />
              <Text style={styles.gridText}>Track</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gridItem}>
              <FontAwesome5 name="recycle" size={26} color="#11c143" />
              <Text style={styles.gridText}>Recycle</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* ...no floating scanner button, handled by tab bar... */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  cameraContainer: { flex: 1, backgroundColor: 'black' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20
  },
  logoText: { fontSize: 24, fontWeight: 'bold', color: '#1f7a5a' },
  headerIcons: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  profilePic: { width: 38, height: 38, borderRadius: 19 },
  waveCard: {
    width: '92%',
    height: 200,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    marginBottom: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  homeImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)', // Darkens the image for text clarity
  },
  waveContent: { padding: 22, flex: 1, justifyContent: 'center' },
  greeting: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  bill: { color: '#f0f0f0', fontSize: 16, marginTop: 10 },
  status: { color: '#f0f0f0', fontSize: 16, marginTop: 4 },
  unpaidText: { color: '#ff5252', fontWeight: 'bold' },
  number: { color: '#fff', fontSize: 18, marginTop: 15, fontWeight: '500' },
  grid: { width: '92%' },
  gridRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  gridItem: {
    width: '31%',
    backgroundColor: '#fff',
    borderRadius: 18,
    alignItems: 'center',
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  gridText: { marginTop: 8, fontSize: 13, fontWeight: '600', color: '#444' },
  scannerButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#1f7a5a',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  closeButton: { position: 'absolute', top: 50, right: 20, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 25, padding: 8 },
});

export default HomeScreen;