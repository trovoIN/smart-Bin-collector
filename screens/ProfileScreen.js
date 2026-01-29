import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, Defs, ClipPath, Rect } from 'react-native-svg';
import { UserContext } from '../UserContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.92;

const CARD_HEIGHT = 165;

const ProfileScreen = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            setUser({
              firstName: '',
              lastName: '',
              upiId: '',
              vanNo: '',
              profilePicture: null,
              address: '',
            });
            navigation.reset({
              index: 0,
              routes: [{ name: 'MobileNumber' }],
            });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Floating Header Card */}
        <View style={[styles.headerCard, { width: CARD_WIDTH, height: CARD_HEIGHT }]}> 
          
            <View style={styles.headerRow}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                <Ionicons name="arrow-back" size={20} color="#111" />
              </TouchableOpacity>
              <Text style={styles.headerText}>Profile</Text>
            </View>
          {/* SVG Abstract Background with Exact Colors */}
          <View style={StyleSheet.absoluteFill}>
            <Svg height="100%" width="100%" viewBox={`0 0 ${CARD_WIDTH} ${CARD_HEIGHT}`}>
              <Defs>
                <ClipPath id="clip">
                  <Rect x="0" y="0" width={CARD_WIDTH} height={CARD_HEIGHT} rx="15" />
                </ClipPath>
              </Defs>
              
              {/* Base Background (Light Beige/Cream) */}
              <Rect x="0" y="0" width="100%" height="100%" fill="#E9EAE0" clipPath="url(#clip)" />
              
              {/* Left Darker Teal/Sage Circle */}
              <Circle cx={CARD_WIDTH * 0.05} cy={CARD_HEIGHT * 0.7} r="80" fill="#6A9691" fillOpacity="0.6" clipPath="url(#clip)" />
              
              {/* Large Central Sage Circle */}
              <Circle cx={CARD_WIDTH * 0.25} cy={CARD_HEIGHT * 0.4} r="85" fill="#BCC8BE" fillOpacity="0.8" clipPath="url(#clip)" />
              
              {/* Top Right Large Cream Circle */}
              <Circle cx={CARD_WIDTH * 0.75} cy={CARD_HEIGHT * 0.2} r="110" fill="#D8DED4" fillOpacity="0.7" clipPath="url(#clip)" />
              
              {/* Far Right Bottom Circle */}
              <Circle cx={CARD_WIDTH * 1.05} cy={CARD_HEIGHT * 0.8} r="70" fill="#C6D0C5" fillOpacity="0.9" clipPath="url(#clip)" />
            </Svg>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={20} color="#333" />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.iconBtn, styles.rightBtn]}>
            <Ionicons name="arrow-redo-outline" size={20} color="#333" />
          </TouchableOpacity>

          {/* Profile Picture with soft white halo */}
          <View style={styles.avatarWrapper}>
            <View style={styles.haloRing}>
              {user?.profilePicture ? (
                <Image source={{ uri: user.profilePicture }} style={styles.avatar} />
              ) : (
                <View style={styles.placeholderAvatar}>
                  <Ionicons name="person" size={45} color="#bbb" />
                </View>
              )}
            </View>
          </View>
        </View>

        {/* User Info Section */}
        <View style={styles.infoContainer}>
             <Text style={styles.name}>{user?.firstName || 'John'} {user?.lastName || 'Doe'}</Text>
             <Text style={styles.idNo}>Van No: {user?.vanNo || 'N/A'}</Text>
             <Text style={styles.idNo}>UPI ID: {user?.upiId || 'N/A'}</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuList}>
          <MenuItem label="Account Settings" />
          <MenuItem label="View Statistics" />
          <MenuItem label="Rewards and Coupons" />
          <MenuItem label="Saved Address" />
          <MenuItem label="Feedback and Suggestions" />
          <MenuItem label="Logout" isLogout onPress={handleLogout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const MenuItem = ({ label, isLogout, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Text style={[styles.menuText, isLogout && styles.logoutText]}>{label}</Text>
    {!isLogout && <Ionicons name="chevron-forward" size={18} color="#000" />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  root: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  container: { 
    paddingBottom: 40 
  },
  headerCard: {
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 15,
    position: 'relative',
    overflow: 'visible',
  },
  iconBtn: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  rightBtn: { left: null, right: 15 },
  avatarWrapper: {
    position: 'absolute',
    bottom: -50,
    alignSelf: 'center',
    zIndex: 20,
  },
  haloRing: {
    padding: 6,
    backgroundColor: 'rgba(255,255,255,0.5)', // Transparent outer halo from image
    borderRadius: 60,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: '#fff', // Solid white border
  },
  placeholderAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#e8e8e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  name: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#000', 
    marginBottom: 4 
  },
  address: { 
    fontSize: 14, 
    color: '#333', 
    marginBottom: 2 
  },
  idNo: { 
    fontSize: 14, 
    color: '#777' 
  },
  menuList: { 
    width: '92%', 
    alignSelf: 'center', 
    marginTop: 25 
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 15,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  menuText: { 
    fontSize: 16, 
    color: '#000', 
    fontWeight: '500' 
  },
  logoutText: { 
    color: '#ff4d4d' 
  },
});

export default ProfileScreen;