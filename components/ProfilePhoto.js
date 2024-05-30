import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Platform, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import * as ImagePicker from 'expo-image-picker'
import { signupUser } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { Poppins_600SemiBold, Poppins_600SemiBold_Italic } from '@expo-google-fonts/poppins';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProfilePhoto = () => {

  const user = useSelector((state) => state.user.value);

  const [image, setImage] = useState(null);
  const [cameraStatus, setCameraStatus] = useState(null);
  const [libraryStatus, setLibraryStatus] = useState(null);
  const dispatch = useDispatch();


  useEffect(() => {
    (async () => {
      const camera = await ImagePicker.requestCameraPermissionsAsync();
      const library = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setCameraStatus(camera.status);
      setLibraryStatus(library.status);
        console.log("camera" , camera.status, "library" ,library.status)
        
    })();
  }, []);


  const selectPhoto = async () => {
     const library = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (libraryStatus !== 'granted') {
      Alert.alert(
        'Permission nécessaire',
        'Cette application a besoin d\'accèder à votre gallerie pour ajouter une photo.',
        [
          { text: 'Fermer', style: 'cancel' },
          { text: 'Donner l\'accès', onPress: async () => {
               library.status = 'granted';
                let result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.All,
                  allowsEditing: true,
                  aspect: [4, 3],
                  quality: 0.4,
                });
                
                if (!result.canceled) {
                  setImage(result.assets[0].uri);
                  dispatch(signupUser({ picture: result.assets[0].uri }));
                  setLibraryStatus(library.status)
                }
              
            } 
          },
        ],
        { cancelable: false }
      );
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.4,
      });
      
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        dispatch(signupUser({ picture: result.assets[0].uri }));
      }
    }
  };


  const takePhoto = async () => {
    const camera = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraStatus !== 'granted') {
      setCameraStatus(camera.status);
      setImage(null)
    }
    else {
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
  }

  return (
    <View style={styles.container}>
      <View></View>
      <TouchableOpacity onPress={selectPhoto}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Importer depuis la gallerie</Text>
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
    marginTop: 30,
  },
  image : {
    width: 165,
    height: 165,
    borderRadius: 150,
  },
  placeholder: {
    borderColor: '#19525A',
    borderWidth: 1,
    width: 165,
    height: 165,
    borderRadius: 150,
    backgroundColor: '#7CB7BF',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  placeholderText: {
    color: '#ffffff',
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
    paddingHorizontal: 30
    
  },
  button: {
    width: 180,
    height: 40,
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FFE45D',
    borderRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  buttonText: {
    color: '#19525A',
    fontFamily: "Poppins_500Medium",
    textAlign: "center"

  },
});

export default ProfilePhoto;