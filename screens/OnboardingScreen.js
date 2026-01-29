import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { UserContext } from '../UserContext';

const OnboardingScreen = ({ navigation }) => {
  const route = useRoute();
  const { setUser } = useContext(UserContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [upiId, setUpiId] = useState('');
  const [vanNo, setVanNo] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (route.params?.pickedAddress) {
      setAddress(route.params.pickedAddress);
    }
  }, [route.params]);


  const [error, setError] = useState('');

  const handleNext = () => {
    if (!firstName.trim() || !lastName.trim() || !upiId.trim() || !vanNo.trim()) {
      setError('Please fill all required fields.');
      return;
    }
    setError('');
    setUser(prev => ({
      ...prev,
      firstName,
      lastName,
      upiId,
      vanNo,
    }));
    navigation.replace('ProfilePicture');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Onboarding- 1/2</Text>

      <View style={styles.logo} />

      <Text style={styles.label}>First Name</Text>
      <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />

      <Text style={styles.label}>Last Name</Text>
      <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />


      <Text style={styles.label}>UPI ID</Text>
      <TextInput
        style={styles.input}
        value={upiId}
        onChangeText={setUpiId}
        placeholder="yourupi@bank"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Van No</Text>
      <TextInput
        style={styles.input}
        value={vanNo}
        onChangeText={setVanNo}
        placeholder="Enter Van Number"
        keyboardType="default"
      />

      <Text style={styles.label}>Address</Text>
      <TouchableOpacity
        style={styles.locationBtn}
        onPress={() => navigation.navigate('MapPicker')}
      >
        <Text style={styles.locationText}>
          {address || 'Pick Location'}
        </Text>
      </TouchableOpacity>

      {error ? (
        <Text style={{ color: 'red', marginBottom: 10, textAlign: 'center' }}>{error}</Text>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
  logo: {
    alignSelf: 'flex-end',
    width: 40,
    height: 40,
    backgroundColor: '#355940',
    borderRadius: 8,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  locationBtn: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 6,
    padding: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  locationText: {
    color: '#888',
  },
  button: {
    backgroundColor: '#355940',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
