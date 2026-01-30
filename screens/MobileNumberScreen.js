import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../UserContext';
import { requestOtp } from '../api/auth';

const MobileNumberScreen = ({ navigation }) => {
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleNext = async () => {
    if (mobile.length === 10 && /^\d+$/.test(mobile)) {
      setError('');
      setLoading(true);
      try {
        await requestOtp(mobile);
        setUser(prev => ({ ...prev, phone: mobile }));
        navigation.navigate('Otp');
      } catch (err) {
        setError(err.message || 'Failed to send OTP');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Enter a valid 10-digit number');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Collector</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Mobile Number</Text>
        <View style={styles.inputRow}>
          <Ionicons name="call-outline" size={22} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your registered number"
            keyboardType="number-pad"
            value={mobile}
            onChangeText={setMobile}
            maxLength={10}
          />
        </View>
        <Text style={{ color: '#888', fontSize: 12, marginBottom: 10, alignSelf: 'center' }}>
          Demo? Try: 9111111111
        </Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleNext} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Send OTP'}</Text>
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
    color: '#355940',
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
  },
  label: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
    marginLeft: 4,
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

export default MobileNumberScreen;
