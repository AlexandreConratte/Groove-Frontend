import { Dimensions, StyleSheet, Text, TouchableOpacity, View , Modal, Platform} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const BACKEND_URL = "https://backend-groove.vercel.app";

export default function ProfileScreen({ navigation }) {
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
  const [modalisVisible, setModalisVisible] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const user = useSelector((state) => state.user.value);

  useEffect(()=> {
    if (user.token){
      setModalisVisible(false)
    }
    fetch(`${BACKEND_URL}/users/iprofil`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token }),
    }).then(response => response.json())
    .then(data => {
      if(data.result){
        console.log(data)
        setUserInfo(data.user)
      }
    })
  },[])

  const GotoConnect = () => {
    navigation.navigate('Connect1');
    setModalisVisible(false)
  }

  const GotoHome = () => {
    navigation.navigate('Home')
    setModalisVisible(false)
  }  

  if (!fontsLoaded) {
    return <Text></Text> ;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={styles.iconArrow}>
          <FontAwesome5 name='arrow-left' size={33} color={'#19525A'}/>
        </TouchableOpacity>
        <Text style={styles.title1}>Profile</Text>
      </View>
    

      <Modal visible={modalisVisible} transparent={true} style={styles.modalBackground}>
      <View style={styles.modalBackground}>

        <View style={styles.modalContainer}>
          <Text style={styles.welcomeText}>Tu n'es toujours pas connecté !</Text>
          <Text style={styles.descripText}>Pour une expérience personnalisée </Text>
          <TouchableOpacity onPress={() => GotoConnect()} style={styles.GotoConnectButton}>
            <Text style={styles.connect}>Connecte Toi</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => GotoHome()} style={styles.GoToApp}>
            <Text style={styles.acced}>Accéder à l'application</Text>
          </TouchableOpacity>
        </View>
      </View>
      </Modal>

      <View style={styles.bannerContainer}>
          
      </View>

      <View style={styles.photoContainer}>
          
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.detailsContainer}>
          <Text>{userInfo.username}</Text>
        </View>
      </View>
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
    fontFamily: 'Poppins_400Regular',
    color: '#19525A',
    margin: 5,
    textAlign: "center",
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 10,
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
    color: '#19525A',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connect: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: 'Poppins_400Regular',
  },
  acced: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: 'Poppins_400Regular',
  },
  bannerContainer: {
    height: 172,
    borderBottomColor: '#19525A',
    borderBottomWidth: 3,
  },
  photoContainer: {
    width: 150,
    height: 150,
    borderColor: '#19525A',
    borderWidth: 3,
    borderRadius: 100,
    position: 'relative',
    top: -75,
    left: (windowWidth/2) - 75,
    backgroundColor: '#FFFFFF',
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
  infoContainer: {
    alignItems: 'center'
  },
  detailsContainer: {
    width: 227,
    height: 145,
    margin: -25,
    backgroundColor: '#FFFFFF',
    marginTop: 0,
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
  
});
