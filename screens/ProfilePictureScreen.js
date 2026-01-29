import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { UserContext } from '../UserContext';

const ProfilePictureScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const { setUser } = useContext(UserContext);

  // 📂 Choose existing image
  const chooseImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Please allow gallery access');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // 📸 Take picture
  const takePicture = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Please allow camera access');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // ⏭ Skip / Continue

  const goHome = () => {
    setUser(prev => ({
      ...prev,
      profilePicture: imageUri,
    }));
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Onboarding- 2/2</Text>

      <View style={styles.logo} />

      {/* 👇 Avatar circle */}
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.avatar} />
      ) : (
        <View style={styles.avatar} />
      )}

      <Text style={styles.label}>Your Profile Picture</Text>

      <TouchableOpacity style={styles.button} onPress={chooseImage}>
        <Text style={styles.buttonText}>Choose Existing Picture</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={takePicture}>
        <Text style={styles.buttonText}>Take a Picture</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.skipButton} onPress={goHome}>
        <Text style={styles.skipText}>
          {imageUri ? 'Continue' : 'Skip'}
        </Text>
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
    alignItems: 'center',
  },
  header: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  logo: {
    alignSelf: 'flex-end',
    width: 40,
    height: 40,
    backgroundColor: '#355940',
    borderRadius: 8,
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
    marginBottom: 10,
    overflow: 'hidden', 
    },
  label: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#355940',
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#355940',
    fontSize: 16,
  },
  skipButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  skipText: {
    color: '#355940',
    fontSize: 16,
  },
});

export default ProfilePictureScreen;
