import { Image, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Platform, Dimensions, Modal } from 'react-native';
import FestivalCard from '../components/FestivalCard';
import { useEffect, useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
const BACKEND_URL = "https://backend-groove.vercel.app"
//const windowWidth = Dimensions.get('window').width;
//const windowHeight = Dimensions.get('window').height;

export default function HomeScreen({ navigation }) {
  const [nextFestivals, setnextFestivals] = useState([]);
  const [popularFestivals, setpopularFestivals] = useState([]);
  const [nearFestivals, setnearFestivals] = useState([]);
  const [modalisVisible, setModalisVisible] = useState(true);
  const [currentPosition, setCurrentPosition] = useState("");
  let next = []
  let popular = []
  let near = []

  useEffect(() => {
    (async () => {
      const result = await Location.requestForegroundPermissionsAsync();
      const status = result?.status;
      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 },
          (location) => {
            setCurrentPosition(location.coords);
          });
      }
    })();
  },
    []);

  useEffect(() => {
    fetch(`${BACKEND_URL}/festivals/findAll`)
      .then(response => response.json())
      .then(data => {
        const now = Date.now()
        const result = data.festivals.map((e) => {
          const start = new Date(e.start)
          const diff = start - now
          return ({ ...e, diff })
        })
        const resultbis = result.filter((e) => e.diff > 0)
        const sortbydate = resultbis.sort((a, b) => (a.diff - b.diff))
        const first1 = sortbydate.slice(0, 10)
        setnextFestivals(first1)

        const result2 = data.festivals.filter((e) => (new Date(e.start) - now) > 0)
        const sortbyaverage = result2.sort((a, b) => (b.averageParticipant - a.averageParticipant))
        const first2 = sortbyaverage.slice(0, 10)
        setpopularFestivals(first2)

        const result3 = data.festivals.filter((e) => (new Date(e.start) - now) > 0)
        const resultbis2 = result3.map((e) => {
          const distance = Math.round(getDistance(
            { latitude: e.adress.latitude, longitude: e.adress.longitude },
            { latitude: currentPosition && currentPosition.latitude, longitude: currentPosition && currentPosition.longitude }
          ) / 1000)
          return ({ ...e, distance })
        })
        const sortbydistance = resultbis2.sort((a, b) => (a.distance - b.distance))
        const first3 = sortbydistance.slice(0, 10)
        setnearFestivals(first3)
      })
  }, []);

  useEffect(() => {
    fetch(`${BACKEND_URL}/festivals/findAll`)
      .then(response => response.json())
      .then(data => {

      })
  }, []);

  useEffect(() => {
    fetch(`${BACKEND_URL}/festivals/findAll`)
      .then(response => response.json())
      .then(data => {

      })
  }, []);

  if (nextFestivals.length > 0) {
    next = nextFestivals.map((e, i) => {
      return (<FestivalCard key={i} {...e} />)
    })
    popular = popularFestivals.map((e, i) => {
      return (<FestivalCard key={i} {...e} />)
    })
    near = nearFestivals.map((e, i) => {
      return (<FestivalCard key={i} {...e} />)
    })
  }

  const GotoConnect = () => {
    navigation.navigate('Connect1');
    setModalisVisible(false)
  }


  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title1}>Home</Text>
      </View>

      <Modal visible={modalisVisible} transparent={true} style={styles.modalBackground}>
        <View style={styles.modalBackground}>

          <View style={styles.modalContainer}>
            <Text style={styles.welcomeText}>BIENVENUE SUR GROOVE !</Text>
            <Text style={styles.descripText}>Pour une expérience personnalisée </Text>
            <TouchableOpacity onPress={() => GotoConnect()} style={styles.GotoConnectButton}>
              <Text style={styles.connect}>Connecte Toi</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalisVisible(false)} style={styles.GoToApp}>
              <Text style={styles.acced}>Accéder à l'application</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.user} onPress={() => navigation.navigate('Profile')}>
        <FontAwesome5 name="user-alt" size={30} color={"#19525A"} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollPrincipal}>
        <View style={styles.section}>
          <Text style={styles.title2}>A venir...</Text>
          <ScrollView contentContainerStyle={styles.scrollSecondaire} horizontal={true}>
            {next}
          </ScrollView>
        </View>
        <View style={styles.section}>
          <Text style={styles.title2}>Les + populaires</Text>
          <ScrollView contentContainerStyle={styles.scrollSecondaire} horizontal={true}>
            {popular}
          </ScrollView>
        </View>
        <View style={styles.section}>
          <Text style={styles.title2}>Autour de vous</Text>
          <ScrollView contentContainerStyle={styles.scrollSecondaire} horizontal={true}>
            {near}
          </ScrollView>
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
  user: {
    position: 'absolute',
    right: 10,
    top: 45,
  },
  scrollSecondaire: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  section: {
    width: Dimensions.get('window').width,
    height: 380,
    borderBottomColor: '#19525A',
    borderBottomWidth: 3
  },
  title1: {
    fontSize: 30,
    color: '#19525A',
    fontWeight: 'bold'
  },
  title2: {
    color: '#19525A',
    marginLeft: 10,
    fontWeight: 'semibold',
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
    width: 170,
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
    fontSize: 20,
    fontWeight: "600",
    margin: 5,
    textAlign: "center",
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 10,
  },
  descripText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,


  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connect: {
    fontWeight: "bold",
    color: "white",
    fontSize: 24,
  },
  acced: {
    fontSize: 14,
    fontWeight: "bold",
  }


});
