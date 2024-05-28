import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, Platform, Modal } from 'react-native';
import {
  useFonts,
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from '@expo-google-fonts/poppins';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height; 

export default function Friend(props) {
  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });
  const [modalisVisible, setModalisVisible] = useState(false);

  const user = useSelector((state) => state.user.value);
  let image = "https://res.cloudinary.com/dq5b1pmdu/image/upload/v1716199438/icon-image-not-found-free-vector_jccw05.jpg";

  if (!fontsLoaded) {
    return <Text></Text>;
  }

  if (props.picture) {
    image = props.picture
  }
  
  const handlePress = () => {
    setModalisVisible(true)
  };

  const closeModal = () => {
    setModalisVisible(false)
  }

  return (
    <>
      <TouchableOpacity style={user.settings.nightMode ? nightModeStyle.container : styles.container} onPress={handlePress}>
        <View style={user.settings.nightMode ? nightModeStyle.imageContainer : styles.imageContainer}>
            <Image
                source={{ uri: image }}
                style={user.settings.nightMode ? nightModeStyle.image : styles.image}
            />
        </View>
        <View style={user.settings.nightMode ? nightModeStyle.textContainer : styles.textContainer}>
            <Text style={user.settings.nightMode ? nightModeStyle.title : styles.title}>{props.username}</Text>
            <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>{props.city}</Text>
            <TouchableOpacity onPress={() => props.deleteFriend(props.token)} style={user.settings.nightMode ? nightModeStyle.icontrash : styles.icontrash}>
                <FontAwesome5 name='trash' size={25} color={user.settings.nightMode ? '#FFFFFF' : '#19525A'} />
            </TouchableOpacity>
        </View>
    </TouchableOpacity>

      <Modal visible={modalisVisible} transparent={true}>
        <View style={user.settings.nightMode ? nightModeStyle.modalBackground : styles.modalBackground}>
          <View style={user.settings.nightMode ? nightModeStyle.modalContainer : styles.modalContainer}>
            <TouchableOpacity onPress={closeModal} style={user.settings.nightMode ? nightModeStyle.modalClose : styles.modalClose}>
              <FontAwesome name='remove' size={40} color={user.settings.nightMode ? '#FFFFFF' : '#19525A'}/>
            </TouchableOpacity>
            <View style={user.settings.nightMode ? nightModeStyle.detailsContainer : styles.detailsContainer}>
              <Text style={user.settings.nightMode ? nightModeStyle.textDetails : styles.textDetails}>{props.username}</Text>
              {props.firstname && props.lastname && (
                <Text style={user.settings.nightMode ? nightModeStyle.textDetails : styles.textDetails}>{props.firstname} {props.lastname}</Text>
              )}
              {props.city && (
                <Text style={user.settings.nightMode ? nightModeStyle.textDetails : styles.textDetails}>{props.city}</Text>
              )}
              {props.birthdate && (
                <Text style={user.settings.nightMode ? nightModeStyle.textDetails : styles.textDetails}>{new Date(props.birthdate).toLocaleDateString()}</Text>
              )}
            </View>
          </View>  
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    width: '100%',
    height: 150,
    margin: 8,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  image: {
    height: 130,
    width: 130,
    borderRadius: 100,
    borderColor: '#8AE0E0',
    borderWidth: 3,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 30,
    color: '#19525A',
    fontFamily: 'Poppins_600SemiBold'
  },
  text: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#19525A'
  },
  textContainer: {
    width: '60%',
  },
  icontrash: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: (windowWidth/1.2),
    height: (windowHeight/2),
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#19525a',
    borderWidth: 3,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalClose: {
    position: 'absolute',
    top: 10,
    left: 10
  }
});

const nightModeStyle = StyleSheet.create({
  container: {
    backgroundColor: '#19525a',
    borderRadius: 5,
    width: '100%',
    height: 150,
    margin: 8,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  image: {
    height: 130,
    width: 130,
    borderRadius: 100,
    borderColor: '#8AE0E0',
    borderWidth: 3,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 30,
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold'
  },
  text: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF'
  },
  textContainer: {
    width: '60%',
  },
  icontrash: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: (windowWidth/1.2),
    height: (windowHeight/2),
    justifyContent: 'center',
    backgroundColor: '#19525a',
    borderColor: '#FFFFFF',
    borderWidth: 3,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalClose: {
    position: 'absolute',
    top: 10,
    left: 10
  }
})