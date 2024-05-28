import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import * as ImagePicker from 'expo-image-picker'
import { signupUser } from '../reducers/user';
import { useDispatch } from 'react-redux';
import axios from 'axios';


const ProfilePhoto = () => {

  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraStatus.status !== 'granted' || libraryStatus.status !== 'granted') {
        alert(`Autorisez l'accès à votre appareil photo et à votre gallerie photo`);
      }
    })();
  }, []);

  const selectPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.4,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      dispatch(signupUser({ picture: result.assets[0].uri }))
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.4,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri)
      dispatch(signupUser({ picture: result.assets[0].uri }))
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={selectPhoto}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Ajouter une photo</Text>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={takePhoto}>
        <Text style={styles.buttonText}>Prendre une photo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  image: {
    width: 165,
    height: 165,
    borderRadius: 150,
  },
  placeholder: {
    width: 165,
    height: 165,
    borderRadius: 150,
    backgroundColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#ffffff',
  },
  button: {
    width: 140,
    height: 40,
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FFE45D',
    borderRadius: 5,
    backgroundColor: 'rgba(255, 228, 93,0.7)'
  },
  buttonText: {
    color: '#ffffff',

  },
});

export default ProfilePhoto;