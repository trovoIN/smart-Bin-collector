import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// We get the device height to force the view to be at least that big
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const location = 'Samakhusi, Kathmandu';
// Extended data to ensure it is much longer than the screen
const days = [
  { date: '01', day: 'Sunday', time: '5:00 AM' },
  { date: '02', day: 'Monday', time: '-' },
  { date: '03', day: 'Tuesday', time: '-' },
  { date: '04', day: 'Wednesday', time: '-' },
  { date: '05', day: 'Thursday', time: '5:00 AM' },
  { date: '06', day: 'Friday', time: '-' },
  { date: '07', day: 'Saturday', time: '6:00 AM' },
  { date: '08', day: 'Sunday', time: '-' },
  { date: '09', day: 'Monday', time: '5:30 AM' },
  { date: '10', day: 'Tuesday', time: '6:00 AM' },
  { date: '11', day: 'Wednesday', time: '7:00 AM' },
  { date: '12', day: 'Thursday', time: '8:00 AM' },
  { date: '13', day: 'Friday', time: '9:00 AM' },
  { date: '14', day: 'Saturday', time: '10:00 AM' },
  { date: '15', day: 'Sunday', time: '11:00 AM' },
];

const ScheduleScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER IS OUTSIDE THE SCROLLVIEW SO IT STAYS AT THE TOP */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.reset({ index: 0, routes: [{ name: 'MainTabs', params: { screen: 'Home' } }] })}>
          <Ionicons name="chevron-back" size={26} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule</Text>
      </View>

      <View style={styles.scrollWrapper}>
        <ScrollView 
          showsVerticalScrollIndicator={true}
          // contentContainerStyle is where the magic happens for scrolling
          contentContainerStyle={styles.scrollContent}
        >
          {/* 1. Location Info */}
          <View style={styles.locationSection}>
            <Text style={styles.locLabel}>Your Location:</Text>
            <View style={styles.locBox}>
              <Ionicons name="location-outline" size={18} color="#333" />
              <Text style={styles.locText}>{location}</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.changeLoc}>Change Location</Text>
            </TouchableOpacity>
          </View>

          {/* 2. Month Selector */}
          <View style={styles.monthHeader}>
            <Text style={styles.monthName}>JULY</Text>
            <View style={styles.rangeBox}>
              <Text>01-09</Text>
              <Ionicons name="chevron-down" size={14} color="#999" style={{marginLeft: 5}} />
            </View>
          </View>

          {/* 3. The List Items */}
          {days.map((item, index) => (
            <View key={index} style={styles.dayRow}>
              <View style={styles.dateSq}>
                <Text style={styles.dateNum}>{item.date}</Text>
              </View>
              <View style={styles.dayCol}>
                <Text style={styles.dayTitle}>{item.day}</Text>
                <Text style={styles.timeTitle}>{item.time}</Text>
              </View>
              <View style={[styles.bar, item.time !== '-' ? styles.barGreen : styles.barGray]} />
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    elevation: 2, // Shadow for Android
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  scrollWrapper: {
    flex: 1, // This tells the wrapper to fill the remaining screen space
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 100, // BIG padding at the bottom to ensure we can scroll past day 15
    flexGrow: 1, 
  },
  locationSection: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  locLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  locBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    padding: 12,
    width: '100%',
    justifyContent: 'center',
  },
  locText: {
    fontSize: 16,
    marginLeft: 8,
  },
  changeLoc: {
    color: '#1b4d3e',
    textDecorationLine: 'underline',
    marginTop: 8,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  monthName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rangeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: 10,
    borderRadius: 8,
    paddingVertical: 4,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  dateSq: {
    width: 46,
    height: 46,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  dateNum: {
    fontWeight: 'bold',
    color: '#666',
  },
  dayCol: {
    flex: 1,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  timeTitle: {
    color: '#999',
  },
  bar: {
    width: 6,
    height: 40,
    borderRadius: 3,
  },
  barGreen: {
    backgroundColor: '#1b4d3e',
  },
  barGray: {
    backgroundColor: '#eee',
  },
});

export default ScheduleScreen;