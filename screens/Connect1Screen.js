import { Image, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
const BACKEND_URL = "https://backend-groove.vercel.app"
import { login, updateLikedFestival, updateMemoriesFestival } from '../reducers/user';
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



export default function Connect1Screen({ navigation }) {

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

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isConnected, setIsConnected] = useState(false)


  const [displaySignIn, setDisplaySignIn] = useState(false)

  const dispatch = useDispatch()

  const popSignIn = () => {

    setDisplaySignIn(!displaySignIn)
    setUsername('');
    setPassword('');
  }


  const handleConnection = () => {
    fetch(`${BACKEND_URL}/users/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password }),
    }).then(response => response.json())
      .then(data => {
        //console.log(data)
        if (data.result) {
          dispatch(login({ username: data.username, token: data.token }));
          setUsername('');
          setPassword('');
          setDisplaySignIn(false)
          navigation.navigate('Home')
          setIsConnected(true);
          //to add in reducer festivals i already liked
          fetch(`${BACKEND_URL}/users/findLiked`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: data.token }),
          }).then(response => response.json())
            .then(data => {
              const festivalIds = data.festivalsLiked.map(festival => festival._id);
              dispatch(updateLikedFestival(festivalIds));
            })
          //to add in reducer memories i already have 
          fetch(`${BACKEND_URL}/users/findMemories`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: data.token }),
          }).then(response => response.json())
            .then(data => {
              //console.log(data)
              const festivalsIds = data.memoriesFestivals.map(festival => festival._id);
              dispatch(updateMemoriesFestival(festivalsIds))
            })

        }
      });
  };

  if (!fontsLoaded) {
    return <View></View>
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>

      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconArrow}>
            <FontAwesome name='arrow-left' size={33} color="#19525a" />
          </TouchableOpacity>
          <Text style={styles.title1}>Connect</Text>
        </View>

        <View style={styles.buttonsContain}>
          <View >
            <Text style={styles.text}>J'ai déjà un compte :</Text>
            <TouchableOpacity onPress={() => popSignIn()} style={styles.connexionButton}>
              <Text style={styles.connexion}>Connexion</Text>
            </TouchableOpacity>
          </View>

          <Modal visible={displaySignIn} style={styles.modalContainer} transparent={true}>
            <View style={styles.modalBackground}>

              <View style={styles.signInContainer}>
                <TouchableOpacity onPress={popSignIn} >
                  <Text style={styles.close}>X</Text>
                </TouchableOpacity>
                <TextInput placeholder="Pseudo" onChangeText={(value) => setUsername(value)}
                  value={username} style={styles.input} />
                <TextInput placeholder="Mot de passe" onChangeText={(value) => setPassword(value)}
                  value={password} style={styles.input} />
                <TouchableOpacity onPress={() => handleConnection()}>
                  <Text style={styles.modalconnexion}>Connexion</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View >
            <Text style={styles.text}>Je veux créer un compte :</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Connect2')} style={styles.inscriptionButton}>
              <Text style={styles.inscription}>Inscription</Text>
            </TouchableOpacity>
          </View>
          <Text>--------------- ou ---------------</Text>

          <Text>Google Connexion</Text>
        </View>

      </View>
    </KeyboardAvoidingView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 86,
    justifyContent: "space-around",
    borderBottomColor: '#19525A',
    borderBottomWidth: 3,
    width: Dimensions.get('window').width,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10
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
  buttonsContain: {
    justifyContent: "space-evenly",
    flex: 1,
    alignItems: "center",
    alignContent: "center"
  },
  inscriptionButton: {
    backgroundColor: '#19525a',
    height: 76,
    width: 264,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,

  },
  connexionButton: {
    backgroundColor: '#d2fff4',
    height: 76,
    width: 264,

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    fontWeight: "300"
  },
  text: {
    fontSize: 25,
    color: '#19525a',
    fontWeight: "600",
    marginBottom: 5

  },
  inscription: {
    fontWeight: "600",
    color: "white",
    fontSize: 25


  },
  connexion: {
    fontWeight: "600",
    color: '#19525a',
    fontSize: 25

  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 300,
    height: 200,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalconnexion: {
    fontSize: 18,
    fontWeight: "400",
    backgroundColor: '#19525a',
    borderRadius: 6,
    padding: 5,
    color: "white"

  },
  signInContainer: {
    height: 300,
    width: 250,
    alignItems: 'center',
    backgroundColor: "#D2FFF4",
    flexDirection: ' column',
    justifyContent: 'space-around',
    borderRadius: 30,
    padding: 35,
    borderColor: '#19525a',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    fontSize: 30,
  },
  close: {
    justifyContent: "flex-end",
    fontSize: 18,
    fontWeight: "600"
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#19525a',
    borderRadius: 8,
    height: 50,
    fontSize: 15,

  },


})
