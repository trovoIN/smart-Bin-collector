import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SupportScreen = () => {
  const navigation = useNavigation();
  const [selectedYear, setSelectedYear] = useState('2024');

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'MainTabs', params: { screen: 'Home' } }] })}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Support</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Illustration Section */}
        <View style={styles.illustrationRow}>
          <Image 
            source={require('../assets/support.png')} 
            style={styles.illustration} 
            resizeMode="contain" 
          />
          <Text style={styles.illustrationText}>
            Facing issues? Raise Complaint for quick resolution!
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.createBtn} onPress={() => navigation.navigate('Complaint')}>
            <Text style={styles.createBtnText}>Raise Complaint</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.callBtn}>
            <Text style={styles.callBtnText}>Call Support</Text>
          </TouchableOpacity>
        </View>

        {/* History Header with Picker */}
        <View style={styles.historyRow}>
          <Text style={styles.historyLabel}>Complaint History</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedYear}
              onValueChange={(itemValue) => setSelectedYear(itemValue)}
              style={styles.picker}
              dropdownIconColor="#888"
              mode="dropdown"
            >
              <Picker.Item label="2024" value="2024" />
              <Picker.Item label="2023" value="2023" />
              <Picker.Item label="2022" value="2022" />
            </Picker>
          </View>
        </View>

        {/* Complaint Card */}
        <TouchableOpacity style={styles.complaintCard}>
          <Text style={styles.complaintTitle}>Bin Not Collected on Time</Text>
          <Text style={styles.complaintSubtitle}>Missed Pickup • 12 Oct 2024</Text>
        </TouchableOpacity>
        
        {/* You can map through data here to show more cards */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50, // Adjusted for status bar area
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backBtn: {
    marginRight: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },
  illustrationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '92%',
    marginBottom: 24,
  },
  illustration: {
    width: 90,
    height: 90,
  },
  illustrationText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    marginLeft: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '92%',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  createBtn: {
    backgroundColor: '#234634',
    borderRadius: 8,
    paddingVertical: 12,
    flex: 1,
    marginRight: 6,
    alignItems: 'center',
  },
  createBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  callBtn: {
    borderWidth: 1,
    borderColor: '#234634',
    borderRadius: 8,
    paddingVertical: 12,
    flex: 1,
    marginLeft: 6,
    alignItems: 'center',
  },
  callBtnText: {
    color: '#234634',
    fontWeight: 'bold',
    fontSize: 15,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '92%',
    marginBottom: 12,
  },
  historyLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  pickerContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    width: 110,
    height: 40,
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    color: '#222',
  },
  complaintCard: {
    width: '92%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 16,
    marginBottom: 12,
    // Android Shadow
    elevation: 2,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  complaintTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
    marginBottom: 4,
  },
  complaintSubtitle: {
    color: '#888',
    fontSize: 13,
  },
});

export default SupportScreen;