import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../UserContext';
import { verifyOtp } from '../api/auth';

const OtpScreen = ({ navigation }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const handleVerify = async () => {
    if (otp.length === 6 && /^\d+$/.test(otp)) {
      setError('');
      setLoading(true);
      try {
        const responseData = await verifyOtp(user.phone, otp);
        console.log('Verify OTP Response:', JSON.stringify(responseData));

        // Handle potential nesting (data.data.accessToken vs data.accessToken)
        const accessToken = responseData.accessToken || responseData.data?.accessToken;

        if (!accessToken) {
          throw new Error('Access Token missing in response');
        }

        // Store token in context and persist it
        await AsyncStorage.setItem('userToken', accessToken);

        const collector = responseData.collector || responseData.data?.collector;

        // Check if profile is complete (has name)
        if (collector && collector.name) {
          // Split name for context if needed, or just set user
          const nameParts = collector.name.split(' ');
          setUser({
            token: accessToken,
            firstName: nameParts[0],
            lastName: nameParts.slice(1).join(' '),
            upiId: collector.upiId,
            vanNo: collector.assignedRoute,
            phone: user.phone
          });
          navigation.replace('MainTabs'); // Go straight to Home
        } else {
          setUser(prev => ({ ...prev, token: accessToken }));
          navigation.replace('Onboarding');
        }
      } catch (err) {
        setError(err.message || 'Invalid OTP');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Enter a valid 6-digit OTP');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Verify OTP</Text>
      <View style={styles.card}>
        <Text style={styles.subtitle}>Enter the 6-digit code</Text>
        <Text style={styles.label}>OTP Code</Text>
        <View style={styles.inputRow}>
          <Ionicons name="lock-closed-outline" size={22} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
            maxLength={6}
          />
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleVerify} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Verifying...' : 'Verify & Login'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.reset({ index: 0, routes: [{ name: 'MobileNumber' }] })}>
          <Text style={styles.changeNumber}>Change Number</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    alignSelf: 'center',
    marginBottom: 24,
    marginTop: 24,
  },
  card: {
    backgroundColor: '#fafafa',
    borderRadius: 18,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#888',
    marginBottom: 18,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
    marginLeft: 4,
    alignSelf: 'flex-start',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 18,
    height: 48,
    width: '100%',
  },
  icon: {
    fontSize: 22,
    marginRight: 8,
    color: '#888',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  button: {
    backgroundColor: '#ff7a00',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  changeNumber: {
    color: '#355940',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
    textDecorationLine: 'underline',
  },
  button: {
    width: '100%',
    backgroundColor: '#355940',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default OtpScreen;
