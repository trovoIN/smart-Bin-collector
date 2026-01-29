import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const settings = [
  { label: 'Privacy Settings' },
  { label: 'Notification Settings' },
  { label: 'Payment Methods' },
  { label: 'Language Settings' },
  { label: 'Data Settings' },
  { label: 'Legal Information' },
  { label: 'FAQs' },
];

const MoreSettingsScreen = () => {
  const navigation = require('@react-navigation/native').useNavigation();
  return (
    <View style={styles.root}>
      <View style={{ width: '92%', marginTop: 32, marginBottom: 8, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.reset({ index: 0, routes: [{ name: 'MainTabs', params: { screen: 'Home' } }] })} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#888" />
        </TouchableOpacity>
        <Text style={styles.header}>More Settings</Text>
      </View>
      <View style={styles.card}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {settings.map((item, idx) => (
            <TouchableOpacity key={item.label} style={styles.item}>
              <Text style={styles.label}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color="#888" />
            </TouchableOpacity>
          ))}
          <View style={styles.item}>
            <Text style={styles.label}>App Version</Text>
            <Text style={styles.version}>1.0.1</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    backBtn: {
      marginRight: 8,
      padding: 4,
    },
  root: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    color: '#888',
    fontSize: 18,
    fontWeight: '500',
    alignSelf: 'flex-start',
    marginLeft: 12,
    marginBottom: 12,
    marginTop:20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '92%',
    paddingVertical: 18,
    paddingHorizontal: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 7,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 15,
    color: '#222',
  },
  version: {
    fontSize: 13,
    color: '#222',
    fontWeight: 'bold',
  },
});

export default MoreSettingsScreen;
