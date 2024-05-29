import { ScrollView, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import FestivalCardHorizontal from '../components/FestivalCardHorizontal';

const BACKEND_URL = "https://backend-groove.vercel.app";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height; 

export default function MyFestivalsScreen({ navigation, route }) {
  const [festivalsLiked, setFestivalsLiked] = useState([]);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  if (user.token) {
    useEffect(() => {
      fetch(`${BACKEND_URL}/users/findLiked`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: user.token }),
      }).then(response => response.json())
      .then(data => {
        setFestivalsLiked(data.festivalsLiked)
      })
    },[user])
  };

  const GotoConnect = () => {
    navigation.navigate('Connect1');
  };
  
  const festivals = festivalsLiked.map((e,i) => {
    return (<FestivalCardHorizontal key={i} {...e}/>)
  })

  return (
    <View style={user.settings.nightMode ? nightModeStyle.container : styles.container}>
      <View style={user.settings.nightMode ? nightModeStyle.header : styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={styles.iconArrow}>
          <FontAwesome5 name='arrow-left' size={33} color={user.settings.nightMode ? '#FFFFFF' : '#19525A'}/>
        </TouchableOpacity>
        <Text style={user.settings.nightMode ? nightModeStyle.title1 : styles.title1}>Mes Festivals</Text>
      </View>

      {user.token ? (
        festivalsLiked.length ? (
          <ScrollView>
            <View style={user.settings.nightMode ? nightModeStyle.festivalsContainer : styles.festivalsContainer}>
              {festivals}
            </View>
          </ScrollView>
        ) : (
          <View style={user.settings.nightMode ? nightModeStyle.nofestivalContainer : styles.nofestivalContainer}>
            <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>Pas de festivals ajoutés aux favoris pour le moment</Text>
          </View>
        )
      ) : (
        <View style={user.settings.nightMode ? nightModeStyle.nofestivalContainer : styles.nofestivalContainer}>
          <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>Pour profiter de cette fonctionnalité, il te faut un compte</Text>
          <TouchableOpacity onPress={() => GotoConnect()} style={user.settings.nightMode ? nightModeStyle.GotoConnectButton : styles.GotoConnectButton}>
            <Text style={user.settings.nightMode ? nightModeStyle.connect : styles.connect}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 86,
    justifyContent: 'flex-end',
    borderBottomColor: '#19525A',
    borderBottomWidth: 3,
    width: Dimensions.get('window').width,
    alignItems: 'center',

  },
  title1: {
    fontSize: 30,
    color: '#19525A',
    fontFamily: 'Poppins_600SemiBold'
  },
  iconArrow: {
    position: 'absolute',
    left: 9,
    height: '60%',
    width: '10%',
    marginBottom: 5
  },
  festivalsContainer: {
    alignItems: 'center',
  },
  nofestivalContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color: '#19525A',
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    marginHorizontal: 25
  },
  GotoConnectButton: {
    backgroundColor: '#FFE45E',
    height: 50,
    width: 195,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
    color: "white",
    margin: 20
  },
  connect: {
    color: "#19525A",
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
  },
});

const nightModeStyle= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#19525A'
  },
  header: {
    height: 86,
    justifyContent: 'flex-end',
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 3,
    width: Dimensions.get('window').width,
    alignItems: 'center',

  },
  title1: {
    fontSize: 30,
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold'
  },
  iconArrow: {
    position: 'absolute',
    left: 9,
    height: '60%',
    width: '10%',
    marginBottom: 5
  },
  festivalsContainer: {
    alignItems: 'center',
  },
  nofestivalContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    marginHorizontal: 25
  },
  GotoConnectButton: {
    backgroundColor: '#FFE45E',
    height: 50,
    width: 195,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
    color: "white",
    margin: 20
  },
  connect: {
    color: "#19525A",
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
  },
})