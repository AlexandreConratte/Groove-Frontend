import { Image, Switch, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Platform, Dimensions, Modal, Alert } from 'react-native';
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
const BACKEND_URL = "https://backend-groove.vercel.app"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FestivalCardHorizontal from '../components/FestivalCardHorizontal';
import FestivalOnMap from '../components/FestivalOnMap';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import MapView, { Marker, Callout } from 'react-native-maps';
import { getDistance } from 'geolib';

export default function SearchResultsScreen({ route, navigation }) {
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
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModal] = useState(false);
  const [festivalSelected, setfestivalSelected] = useState({});
  const userCoordinate = useSelector((state) => state.user.value.coordinate)
  let festivals = []
  const objet = route.params;
  let affichage = <></>
  let markers = []
  let coordinate = {latitude : 48.866667,longitude : 2.333333}
  userCoordinate.latitude&& (coordinate = userCoordinate);
  const user = useSelector((state) => state.user.value);

  if (!fontsLoaded) {
    return <Text></Text>;
  }
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  if (!isEnabled) {
    if (objet.festivals) {
      festivals = objet.festivals.map((e, i) => {
        return (<FestivalCardHorizontal key={i} {...e} />)
      })
    }
    else {
      festivals =
        <View style={styles.notfound}>
          <Image
            source={{ uri: 'https://res.cloudinary.com/dq5b1pmdu/image/upload/v1716388828/image_processing20210912-13530-z5pl2i_j7kfvf.gif' }}
            style={{ width: 400, height: 400 }}
          />
          <Text style={styles.text}>Désolé, aucun festival ne correspond à vos critères</Text>
        </View>
    }
    affichage = <ScrollView contentContainerStyle={styles.festivalsContainer}>{festivals}</ScrollView>
  }

  else {
    let festival
    const calloutPress = (data) => {
      setfestivalSelected(data)
      setModal(true);
    }
    const closeModal = () => {
      setModal(false);
    }
    

    if (objet.festivals) {
      const result = objet.festivals.map((e) => {
        const distance = Math.round(getDistance(
          { latitude: e.adress.latitude, longitude: e.adress.longitude },
          { latitude: coordinate.latitude, longitude: coordinate.longitude }
        ) / 1000)
        return ({ ...e, distance })
      })

      markers = result.map((data, i) => {
        return (
          <Marker style={styles.marker} key={i} coordinate={{ latitude: data.adress.latitude, longitude: data.adress.longitude }} onPress={() => calloutPress(data)}>
            <FontAwesome5 name='map-marker-alt' size={50} color={'#FF4848'} />
          </Marker>
        )
      });
    }
    modalVisible && (festival = <FestivalOnMap {...festivalSelected} closeModal={closeModal} />)
    affichage = <><MapView
      style={styles.map}
      initialRegion={{
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        latitudeDelta: 1,
        longitudeDelta: 1,
      }}
    >
      {userCoordinate.latitude && <Marker
        coordinate={userCoordinate}
        title="My position"
      >
        <FontAwesome5 name='street-view' size={50} color={'#19525A'} />
      </Marker>
      }
      {markers}
    </MapView>
      <Modal
        transparent={true}
        visible={modalVisible}
        onBackdropPress={() => setModal(false)}
      >
        <View style={styles.centeredView}>
          {festival}
        </View>
      </Modal>
    </>
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={user.settings.nightMode ? nightModeStyle.container : styles.container}>
      <View style={user.settings.nightMode ? nightModeStyle.header : styles.header}>
        <Text style={user.settings.nightMode ? nightModeStyle.title1 : styles.title1}>Recherche</Text>
      </View>
      <View style={user.settings.nightMode ? nightModeStyle.buttonContainer : styles.buttonContainer}>
        <TouchableOpacity style={user.settings.nightMode ? nightModeStyle.critereButton : styles.critereButton} onPress={() => navigation.navigate('Search')}>
          <FontAwesome5 name="filter" size={30} color={user.settings.nightMode ? '#FFFFFF' : '#19525A'} />
          <Text style={user.settings.nightMode ? nightModeStyle.critereText : styles.critereText}>Critères</Text>
        </TouchableOpacity>
        <View style={user.settings.nightMode ? nightModeStyle.switch : styles.switch}>
          <Text style={user.settings.nightMode ? nightModeStyle.critereText : styles.critereText}>Liste</Text>
          <Switch
            style={user.settings.nightMode ? nightModeStyle.toggle : styles.toggle}
            trackColor={user.settings.nightMode ? { false: '#FFE45D', true: '#FFE45D' } : { false: '#19525A', true: '#19525A' }}
            thumbColor={user.settings.nightMode ? (isEnabled ? '#19525A' : '#FFE45D') : (isEnabled ? '#FFE45D' : '#FFE45D')}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text style={user.settings.nightMode ? nightModeStyle.critereText : styles.critereText}>Carte</Text>
        </View>
      </View>
      {affichage}
    </KeyboardAvoidingView>

  )
}

const styles = StyleSheet.create({
  header: {
    height: 86,
    justifyContent: 'flex-end',
    borderBottomColor: '#19525A',
    borderBottomWidth: 3,
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 350
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    alignItems: 'flex-end',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  close: {
    width: '100%',
    justifyContent: 'flex-end',

    marginRight: 10
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  title1: {
    fontSize: 30,
    color: '#19525A',
    fontFamily: 'Poppins_600SemiBold'
  },
  festivalsContainer: {
    alignItems: 'center',
  },
  critereButton: {
    width: '50%',
    borderRightWidth: 3,
    borderRightColor: '#19525A',
    borderBottomWidth: 3,
    borderBottomColor: '#19525A',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  critereText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    color: '#19525A'
  },
  switch: {
    width: '50%',
    borderBottomWidth: 3,
    borderBottomColor: '#19525A',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  notfound: {
    alignItems: 'center',
    backgroundColor: '#FAF9FE',
    height: '100%'
  },
  text: {
    color: '#19525A',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    textAlign: 'center'
  },
  myposition: {
    height: 20,
    width: 20
  },
})

const nightModeStyle = StyleSheet.create({
  header: {
    height: 86,
    justifyContent: 'flex-end',
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 3,
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 350
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    alignItems: 'flex-end',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  close: {
    width: '100%',
    justifyContent: 'flex-end',

    marginRight: 10
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#19525A',
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  title1: {
    fontSize: 30,
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold'
  },
  festivalsContainer: {
    alignItems: 'center',
  },
  critereButton: {
    width: '50%',
    borderRightWidth: 3,
    borderRightColor: '#FFFFFF',
    borderBottomWidth: 3,
    borderBottomColor: '#FFFFFF',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  critereText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    color: '#FFFFFF'
  },
  switch: {
    width: '50%',
    borderBottomWidth: 3,
    borderBottomColor: '#FFFFFF',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  notfound: {
    alignItems: 'center',
    backgroundColor: '#FAF9FE',
    height: '100%'
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    textAlign: 'center'
  },
  myposition: {
    height: 20,
    width: 20
  },
  toggle: {
    marginHorizontal: 8
  }
})