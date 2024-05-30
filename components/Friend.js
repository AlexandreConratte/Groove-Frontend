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
            <Text style={user.settings.nightMode ? nightModeStyle.textDetailsPseudo : styles.textDetailsPseudo}>{props.username}</Text>
            <View style={user.settings.nightMode ? nightModeStyle.detailsContainer : styles.detailsContainer}>
              <View style={user.settings.nightMode ? nightModeStyle.textDetailsContainer : styles.textDetailsContainer}>
                {props.firstname && props.lastname && (
                  <Text style={user.settings.nightMode ? nightModeStyle.textDetailsBig : styles.textDetailsBig}>Nom : <Text style={user.settings.nightMode ? nightModeStyle.textDetails : styles.textDetails}>{props.lastname} {props.firstname}</Text></Text>
                )}
                {props.city && (
                  <Text style={user.settings.nightMode ? nightModeStyle.textDetailsBig : styles.textDetailsBig}>Ville : <Text style={user.settings.nightMode ? nightModeStyle.textDetails : styles.textDetails}>{props.city}</Text></Text>
                )}
                {props.birthdate && (
                  <Text style={user.settings.nightMode ? nightModeStyle.textDetailsBig : styles.textDetailsBig}>Date de naissance : <Text style={user.settings.nightMode ? nightModeStyle.textDetails : styles.textDetails}>{new Date(props.birthdate).toLocaleDateString()}</Text></Text>
                )}
              </View>
      
              <View style={user.settings.nightMode ? nightModeStyle.cardContainer : styles.cardContainer}>
                <Text style={user.settings.nightMode ? nightModeStyle.cardTextContainer : styles.cardTextContainer}>Styles :</Text>
                <View style={user.settings.nightMode ? nightModeStyle.cardsContainer : styles.cardsContainer}>
                  {props.styles && props.styles.length > 0 ? (
                    props.styles.map((style, i) => (
                      <View key={i} style={user.settings.nightMode ? nightModeStyle.yellowButtonStyle : styles.yellowButtonStyle}>
                        <Text style={user.settings.nightMode ? nightModeStyle.textButtonStyle : styles.textButtonStyle}>{style.name}</Text>
                      </View>
                    ))
                  ) : (
                    <Text style={user.settings.nightMode ? nightModeStyle.textDetails : styles.textDetails}>Aucun style renseigné</Text>
                  )}
                </View>
              </View>
              <View style={user.settings.nightMode ? nightModeStyle.cardContainer : styles.cardContainer}>
                <Text style={user.settings.nightMode ? nightModeStyle.cardTextContainer : styles.cardTextContainer}>Artistes :</Text>
                <View style={user.settings.nightMode ? nightModeStyle.cardsContainer : styles.cardsContainer}>
                  {props.artists && props.artists.length > 0 ? (
                    props.artists.map((artist, i) => (
                      <View key={i} style={user.settings.nightMode ? nightModeStyle.blueButtonStyle : styles.blueButtonStyle}>
                        <Text style={user.settings.nightMode ? nightModeStyle.textButtonStyle : styles.textButtonStyle}>{artist.name}</Text>
                      </View>
                    ))
                  ) : (
                    <Text style={user.settings.nightMode ? nightModeStyle.textDetails : styles.textDetails}>Aucun artiste renseigné</Text>
                  )}
                </View>
              </View>
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
    color: '#19525A',
    paddingLeft: 10
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
    height: (windowHeight/1.5),
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
    right: 10
  },
  detailsContainer: {
    marginTop: 65,
    height: '85%',
    width: '86%',
    justifyContent: 'flex-start'
  },
  textDetailsContainer: {
    alignItems: 'center',
    marginBottom: 15
  },
  textDetailsPseudo:{
    fontFamily: 'Poppins_600SemiBold',
    color: '#19525a',
    fontSize: 24,
    textAlign: 'center',
    position: 'absolute',
    top: 15
  },
  textDetailsBig: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#19525a',
    fontSize: 16,
  },
  textDetails: {
    fontFamily: 'Poppins_400Regular',
    color: '#19525a',
  },
  cardContainer: {
    marginVertical: 10
  },
  cardTextContainer: {
    fontFamily: 'Poppins_700Bold',
    color: '#19525A',
    fontSize: 20
  },
  yellowButtonStyle: {
    backgroundColor: '#FFE45D',
    borderRadius: 8,
    margin: 5,
    padding: 3,
    paddingHorizontal :10,
    alignItems: "center",
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
  blueButtonStyle: {
    backgroundColor: '#D2FFF4',
    borderRadius: 8,
    margin: 5,
    padding: 3,
    paddingHorizontal :10,
    alignItems: "center",
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
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  textButtonStyle: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#19525A',
    fontSize: 16,
  },
});

const nightModeStyle = StyleSheet.create({
  container: {
    backgroundColor: '#19525A',
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
        elevation: 15,
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
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold'
  },
  text: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
    paddingLeft: 10
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
    height: (windowHeight/1.5),
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
    right: 10
  },
  detailsContainer: {
    marginTop: 65,
    height: '85%',
    width: '86%',
    justifyContent: 'flex-start'
  },
  textDetailsContainer: {
    alignItems: 'center',
    marginBottom: 15
  },
  textDetailsPseudo:{
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
    fontSize: 24,
    textAlign: 'center',
    position: 'absolute',
    top: 15
  },
  textDetailsBig: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
    fontSize: 16,
  },
  textDetails: {
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
  },
  cardContainer: {
    marginVertical: 10
  },
  cardTextContainer: {
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
    fontSize: 20
  },
  yellowButtonStyle: {
    backgroundColor: '#FFE45D',
    borderRadius: 8,
    margin: 5,
    padding: 3,
    paddingHorizontal :10,
    alignItems: "center",
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
  blueButtonStyle: {
    backgroundColor: '#D2FFF4',
    borderRadius: 8,
    margin: 5,
    padding: 3,
    paddingHorizontal :10,
    alignItems: "center",
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
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  textButtonStyle: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#19525A',
    fontSize: 16,
  },
})