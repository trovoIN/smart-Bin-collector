import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapPickerScreen = ({ navigation }) => {
  const [region, setRegion] = useState(null);
  const [marker, setMarker] = useState(null);
  const [address, setAddress] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const loc = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  const onMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarker({ latitude, longitude });

    const geo = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (geo.length > 0) {
      const g = geo[0];
      const full = `${g.name || ''} ${g.street || ''}, ${g.city || g.subregion || ''}, ${g.region || ''}`;
      setAddress(full);
    }
  };

  const confirmLocation = () => {
    navigation.navigate('Onboarding', {
      pickedAddress: address,
    });
  };

  if (!region) {
    return <Text style={{ marginTop: 50, textAlign: 'center' }}>Loading map…</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFill}
        region={region}
        onPress={onMapPress}
      >
        {marker && <Marker coordinate={marker} />}
      </MapView>

      <View style={styles.bottom}>
        <Text numberOfLines={2}>{address || 'Tap anywhere on map'}</Text>
        <TouchableOpacity style={styles.confirmBtn} onPress={confirmLocation}>
          <Text style={{ color: '#fff' }}>Confirm Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapPickerScreen;

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    right: 15,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    elevation: 5,
  },
  confirmBtn: {
    marginTop: 8,
    backgroundColor: '#355940',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
});
