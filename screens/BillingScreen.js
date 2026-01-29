import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Platform, 
  Modal, 
  FlatList 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const months = [
  { name: 'June', amount: 294, paid: false },
  { name: 'May', amount: 310, paid: true },
  { name: 'April', amount: 326, paid: true },
  { name: 'March', amount: 342, paid: true },
  { name: 'February', amount: 358, paid: true },
  { name: 'January', amount: 374, paid: true },
];

const BillingScreen = () => {
  const navigation = useNavigation();
  const [selectedYear, setSelectedYear] = useState('2024');
  const [expanded, setExpanded] = useState(null);
  const [showYearModal, setShowYearModal] = useState(false);

  const years = ['2024', '2023', '2022', '2021'];

  const selectYear = (year) => {
    setSelectedYear(year);
    setShowYearModal(false);
  };

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Billing</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Current Due Card */}
        <View style={styles.card}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Due Amount:</Text>
            <Text style={styles.mainValue}>Rs. 500</Text>
            <Text style={styles.label}>Month: <Text style={styles.subValue}>July</Text></Text>
            <Text style={styles.label}>Status: <Text style={styles.unpaid}>Unpaid</Text></Text>
            <Text style={styles.label}>ID No: <Text style={styles.id}>42000897776</Text></Text>
          </View>
          <TouchableOpacity style={styles.payBtn}>
            <Text style={styles.payBtnText}>Pay Now</Text>
          </TouchableOpacity>
        </View>

        {/* Payment History Header */}
        <View style={styles.historyRow}>
          <Text style={styles.historyLabel}>Payment History:</Text>
          
          {/* CUSTOM DROPDOWN TRIGGER (Replaces Native Picker) */}
          <TouchableOpacity 
            style={styles.yearDropdown} 
            onPress={() => setShowYearModal(true)}
          >
            <Text style={styles.yearText}>{selectedYear}</Text>
            <Ionicons name="caret-down" size={14} color="#bbb" />
          </TouchableOpacity>
        </View>

        {/* Month List */}
        {months.map((m, idx) => (
          <View key={m.name} style={styles.monthCard}>
            <TouchableOpacity 
              style={styles.monthRow} 
              onPress={() => setExpanded(expanded === idx ? null : idx)}
            >
              <Text style={styles.monthName}>{m.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.monthAmount, !m.paid ? styles.unpaid : styles.paid]}>
                  Rs. {m.amount}
                </Text>
                <Ionicons 
                  name={expanded === idx ? 'chevron-up' : 'chevron-down'} 
                  size={18} 
                  color="#bbb" 
                  style={{ marginLeft: 10 }}
                />
              </View>
            </TouchableOpacity>
            
            {expanded === idx && (
              <View style={styles.monthDetails}>
                <Text style={styles.detailText}>No extra charges applied for this month.</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* YEAR SELECTION MODAL */}
      <Modal visible={showYearModal} transparent animationType="fade">
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setShowYearModal(false)}
        >
          <View style={styles.modalContent}>
            {years.map((year) => (
              <TouchableOpacity 
                key={year} 
                style={styles.modalItem} 
                onPress={() => selectYear(year)}
              >
                <Text style={[styles.modalItemText, selectedYear === year && { color: '#234634', fontWeight: 'bold' }]}>
                  {year}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
    paddingBottom: 15,
  },
  backBtn: { marginRight: 12 },
  headerText: { fontSize: 22, fontWeight: 'bold', color: '#111' },
  scrollContent: { alignItems: 'center', paddingBottom: 40 },
  card: {
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
    width: '92%',
    flexDirection: 'row',
    padding: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  label: { fontSize: 14, color: '#444', marginBottom: 2 },
  mainValue: { fontSize: 24, fontWeight: 'bold', color: '#222', marginBottom: 6 },
  subValue: { color: '#222', fontWeight: 'bold' },
  unpaid: { color: '#c62828', fontWeight: 'bold' },
  paid: { color: '#388e3c', fontWeight: 'bold' },
  id: { color: '#888', fontSize: 12 },
  payBtn: {
    backgroundColor: '#234634',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  payBtnText: { color: '#fff', fontWeight: 'bold' },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '92%',
    marginBottom: 15,
  },
  historyLabel: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  yearDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 35,
    minWidth: 80,
    justifyContent: 'space-between',
  },
  yearText: { fontSize: 14, fontWeight: '600', color: '#222', marginRight: 5 },
  monthCard: {
    width: '92%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 10,
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  monthName: { fontWeight: 'bold', fontSize: 15, color: '#333' },
  monthAmount: { fontSize: 15 },
  monthDetails: { padding: 15, backgroundColor: '#f9f9f9', borderTopWidth: 1, borderTopColor: '#eee' },
  detailText: { fontSize: 13, color: '#888' },
  
  /* Modal Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '70%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    elevation: 5,
  },
  modalItem: { padding: 15, alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  modalItemText: { fontSize: 16, color: '#333' },
});

export default BillingScreen;