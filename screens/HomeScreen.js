import { Image, StyleSheet, Text,SafeAreaView, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Platform, Dimensions, Modal } from 'react-native';
import FestivalCard from '../components/FestivalCard';
import { useEffect, useState } from 'react';
import { UseSelector } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
const BACKEND_URL = "https://backend-groove.vercel.app"
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
import { addCoordinate } from '../reducers/user'
import { useDispatch, useSelector } from "react-redux";
import { Linking } from 'react-native';
import LoadingAnimation from '../components/LoadingAnimation';

//const windowWidth = Dimensions.get('window').width;
//const windowHeight = Dimensions.get('window').height;

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch()
  const coordinate = useSelector((state) => state.user.value.coordinate)
  const [nextFestivals, setnextFestivals] = useState([]);
  const [popularFestivals, setpopularFestivals] = useState([]);
  const [nearFestivals, setnearFestivals] = useState([]);
  const [modalisVisible, setModalisVisible] = useState(false);
  let loc =
    <View style={styles.permissionContainer}>
      <TouchableOpacity style={styles.permission} onPress={() => Linking.openSettings()}>
        <Text style={styles.permissionText}>Autoriser la localisation</Text>
      </TouchableOpacity>
    </View>

  let next = []
  let popular = []
  let near = []

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

  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    askPermission()
  },
    []);

  const askPermission = async () => {
    const result = await Location.requestForegroundPermissionsAsync();
    const status = result?.status;
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({});
      dispatch(addCoordinate({ longitude: location.coords.longitude, latitude: location.coords.latitude }))
    }
  }

  useEffect(() => {
    fetch(`${BACKEND_URL}/festivals/findAll`)
      .then(response => response.json())
      .then(data => {
        //tri en fonction des dates 
        const now = Date.now()
        const result = data.festivals.map((e) => {
          const start = new Date(e.start) 
          const diff = start.getTime() - now
          return ({ ...e, diff })
        })
        const resultbis = result.filter((e) => e.diff > 0)
        const sortbydate = resultbis.sort((a, b) => (a.diff - b.diff))
        const first1 = sortbydate.slice(0, 10)
        setnextFestivals(first1)

        //tri en fonction du nombre moyen de parcipants
        const result2 = data.festivals.filter((e) => (new Date(e.start) - now) > 0)
        const sortbyaverage = result2.sort((a, b) => (b.averageParticipant - a.averageParticipant))
        const first2 = sortbyaverage.slice(0, 10)
        setpopularFestivals(first2)
      });

      if (!user.token) {
        setModalisVisible(true)
      }; 

  }, []);

  //tri en fonction de la localisation 
  useEffect(() => {
    if (coordinate.latitude) {
      fetch(`${BACKEND_URL}/festivals/findAll`)
        .then(response => response.json())
        .then(data => {
          const now = Date.now()
          const result3 = data.festivals.filter((e) => (new Date(e.start) - now) > 0)
          const resultbis2 = result3.map((e) => {
            const distance = Math.round(getDistance(
              { latitude: e.adress.latitude, longitude: e.adress.longitude },
              { latitude: coordinate.latitude, longitude: coordinate.longitude }
            ) / 1000)
            return ({ ...e, distance })
          })
          const sortbydistance = resultbis2.sort((a, b) => (a.distance - b.distance))
          const first3 = sortbydistance.slice(0, 10)
          setnearFestivals(first3)
        })
    }
  }, [coordinate]);

  nextFestivals.length > 0 && (next = nextFestivals.map((e, i) => {
    return (<FestivalCard key={i} {...e} />)
  }))
  popularFestivals.length > 0 && (popular = popularFestivals.map((e, i) => {
    return (<FestivalCard key={i} {...e} />)
  }))
  nearFestivals.length > 0 && (near = nearFestivals.map((e, i) => {
    return (<FestivalCard key={i} {...e} />)
  }))

  if (coordinate.latitude) {
    loc = <ScrollView contentContainerStyle={styles.scrollSecondaire} horizontal={true}>
      {near}
    </ScrollView>
  }

  const GotoConnect = () => {
    navigation.navigate('Connect5');
    setModalisVisible(false)
  }

  if (!fontsLoaded) {
    return <Text></Text>;
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={user.settings.nightMode ? nightModeStyle.container : styles.container}>
      <View style={user.settings.nightMode ? nightModeStyle.header : styles.header}>
        <Text style={user.settings.nightMode ? nightModeStyle.title1 : styles.title1}>Home</Text>
      </View>

      <Modal visible={modalisVisible} transparent={true} style={user.settings.nightMode ? nightModeStyle.modalBackground : styles.modalBackground}>
        <View style={user.settings.nightMode ? nightModeStyle.modalBackground : styles.modalBackground}>

          <View style={user.settings.nightMode ? nightModeStyle.modalContainer : styles.modalContainer}>
            <Text style={user.settings.nightMode ? nightModeStyle.welcomeText : styles.welcomeText}>BIENVENUE SUR GROOVE !</Text>
            <Text style={user.settings.nightMode ? nightModeStyle.descripText : styles.descripText}>Pour une expérience personnalisée </Text>
            <TouchableOpacity onPress={() => GotoConnect()} style={user.settings.nightMode ? nightModeStyle.GotoConnectButton : styles.GotoConnectButton}>
              <Text style={user.settings.nightMode ? nightModeStyle.connect : styles.connect}>Connecte Toi</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalisVisible(false)} style={user.settings.nightMode ? nightModeStyle.GoToApp : styles.GoToApp}>
              <Text style={user.settings.nightMode ? nightModeStyle.acced : styles.acced}>Accéder à l'application</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView contentContainerStyle={user.settings.nightMode ? nightModeStyle.scrollPrincipal : styles.scrollPrincipal}>
        <View style={user.settings.nightMode ? nightModeStyle.section : styles.section}>
          <Text style={user.settings.nightMode ? nightModeStyle.title2 : styles.title2}>A venir...</Text>
          <ScrollView contentContainerStyle={styles.scrollSecondaire} horizontal={true}>
            {next}
          </ScrollView>
        </View>
        <View style={user.settings.nightMode ? nightModeStyle.section : styles.section}>
          <Text style={user.settings.nightMode ? nightModeStyle.title2 : styles.title2}>Les + populaires</Text>
          <ScrollView contentContainerStyle={styles.scrollSecondaire} horizontal={true}>
            {popular}
          </ScrollView>
        </View>
        <View style={user.settings.nightMode ? nightModeStyle.section : styles.section}>
          <Text style={user.settings.nightMode ? nightModeStyle.title2 : styles.title2}>Autour de vous</Text>
          {loc}
        </View>
      </ScrollView>
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  scrollSecondaire: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  section: {
    width: Dimensions.get('window').width,
    height: 400,
    borderBottomColor: '#19525A',
    borderBottomWidth: 3
  },
  title1: {
    fontSize: 30,
    color: '#19525A',
    fontFamily: 'Poppins_600SemiBold'
  },
  title2: {
    color: '#19525A',
    marginLeft: 10,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
  },
  GotoConnectButton: {
    backgroundColor: '#19525a',
    height: 50,
    width: 195,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
    color: "white"
  },
  GoToApp: {
    backgroundColor: '#FFE45D',
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  modalContainer: {
    width: 274,
    height: 292,
    justifyContent: 'center',
    backgroundColor: "white",
    borderColor: '#19525a',
    borderWidth: 3,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    margin: 5,
    textAlign: "center",
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 10,
    color: '#19525a',
    textShadowColor: '#19525a',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  descripText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: 'Poppins_400Regular',
    color: '#19525a',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connect: {
    fontFamily: 'Poppins_600SemiBold',
    color: "white",
    fontSize: 26,
  },
  acced: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    paddingHorizontal: 10
  },
  permission: {
    padding: 10,
    backgroundColor: '#19525a',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
    width: "80%"
  },
  permissionText: {
    fontFamily: 'Poppins_600SemiBold',
    color: "white",
    fontSize: 20,
  },
  permissionContainer:{
    width:'100%',
    height:'100%',
    alignItems:'center',
    justifyContent:'center'
  }
});

const nightModeStyle = StyleSheet.create({
  header: {
    height: 86,
    justifyContent: 'flex-end',
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 3,
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#19525A'
  },

  scrollSecondaire: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  section: {
    width: Dimensions.get('window').width,
    height: 400,
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 3
  },
  title1: {
    fontSize: 30,
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold'
  },
  title2: {
    color: '#FFFFFF',
    marginLeft: 10,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
  },
  GotoConnectButton: {
    backgroundColor: '#19525a',
    height: 50,
    width: 195,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
    color: "white"
  },
  GoToApp: {
    backgroundColor: '#FFE45D',
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  modalContainer: {
    width: 274,
    height: 292,
    justifyContent: 'center',
    backgroundColor: "white",
    borderColor: '#FFE45D',
    borderWidth: 3,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    margin: 5,
    textAlign: "center",
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 10,
    color: '#19525a',
    textShadowColor: '#19525a',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  descripText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: 'Poppins_400Regular',
    color: '#19525a',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connect: {
    fontFamily: 'Poppins_600SemiBold',
    color: "#FFFFFF",
    fontSize: 26,
  },
  acced: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    paddingHorizontal: 10
  },
  permission: {
    padding: 10,
    backgroundColor: '#19525a',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
    width: "80%"
  },
  permissionText: {
    fontFamily: 'Poppins_600SemiBold',
    color: "white",
    fontSize: 20,
  },
  permissionContainer:{
    width:'100%',
    height:'100%',
    alignItems:'center',
    justifyContent:'center'
  }
})