import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
// import * as DocumentPicker from 'expo-document-picker'; // Uncomment if using doc picker

const categories = [
  'New Bin Request',
  'Missed Pickup',
  'Damaged Bin',
  'Other',
];

const ComplaintScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [upload, setUpload] = useState(null);

  const handleUpload = async () => {
    // Request permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need camera roll permissions to upload photos.');
      return;
    }

    // Launch Picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setUpload({ type: 'image', uri: result.assets[0].uri });
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.reset({ index: 0, routes: [{ name: 'MainTabs', params: { screen: 'Home' } }] })} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Raise Complaint</Text>
        </View>

        {/* Form Content */}
        <View style={styles.formContainer}>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Issue Title:</Text>
            <TextInput 
              style={styles.underlineInput} 
              value={title} 
              onChangeText={setTitle} 
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description:</Text>
            <TextInput 
              style={styles.underlineInput} 
              value={desc} 
              onChangeText={setDesc}
              multiline 
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category:</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
                style={styles.picker}
              >
                {categories.map(cat => (
                  <Picker.Item label={cat} value={cat} key={cat} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.uploadGroup}>
            <Text style={styles.label}>Upload:</Text>
            <TouchableOpacity style={styles.uploadBox} onPress={handleUpload}>
              {upload ? (
                upload.type === 'image' ? (
                  <Image source={{ uri: upload.uri }} style={styles.previewImage} />
                ) : (
                  <View style={{ alignItems: 'center' }}>
                    <Ionicons name="document" size={32} color="#888" />
                    <Text style={{ color: '#888', marginTop: 6 }}>{upload.name}</Text>
                  </View>
                )
              ) : (
                <>
                  <Ionicons name="camera-outline" size={32} color="#888" />
                  <Text style={styles.uploadText}>Add photos or Documents</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.submitBtn}>
            <Text style={styles.submitText}>Submit Complaint</Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  container: { paddingHorizontal: 25, paddingTop: 20 ,
    marginTop: 30
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 10,
  },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#000' },
  formContainer: { width: '100%' },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  label: { fontSize: 16, color: '#333', width: 100 },
  underlineInput: { 
    flex: 1,
    borderBottomWidth: 1, 
    borderBottomColor: '#E0E0E0', 
    fontSize: 16, 
    paddingVertical: 5,
    color: '#000'
  },
  pickerWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    height: 45,
    justifyContent: 'center',
  },
  picker: { width: '100%' },
  uploadGroup: { flexDirection: 'row', marginTop: 10 },
  uploadBox: { 
    flex: 1,
    borderWidth: 1, 
    borderColor: '#DDD', 
    borderRadius: 12, 
    height: 160, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff',
  },
  uploadText: { color: '#333', marginTop: 10, fontSize: 14, fontWeight: '500' },
  previewImage: { width: '100%', height: '100%', borderRadius: 12 },
  submitBtn: { 
    backgroundColor: '#2D473E', 
    borderRadius: 8, 
    paddingVertical: 18, 
    alignItems: 'center', 
    marginTop: 40,
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '500' },
});

export default ComplaintScreen;