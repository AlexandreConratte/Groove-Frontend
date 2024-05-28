import { StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
const BACKEND_URL = "https://backend-groove.vercel.app"
import { login, updateLikedFestival, updateMemoriesFestival, updateNightMode } from '../reducers/user';
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
import AuthGoogle from '../components/AuthGoogle';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height; 

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

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

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
              const festivalsIds = data.memoriesFestivals.map(festival => festival._id);
              dispatch(updateMemoriesFestival(festivalsIds))
            })
            //to add in reducer nightMode 
            fetch(`${BACKEND_URL}/settings/mode`,{
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token: data.token}),
            }).then(response => response.json())
            .then(data => dispatch(updateNightMode(data.nightMode)))
        }
      });
  };

  if (!fontsLoaded) {
    return <View></View>
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={user.settings.nightMode ? nightModeStyle.container : styles.container}>

      <View style={user.settings.nightMode ? nightModeStyle.container : styles.container}>

        <View style={user.settings.nightMode ? nightModeStyle.header : styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={user.settings.nightMode ? nightModeStyle.iconArrow : styles.iconArrow}>
            <FontAwesome name='arrow-left' size={33} color={user.settings.nightMode ? '#FFFFFF' : '#19525A'}/>
          </TouchableOpacity>
          <Text style={user.settings.nightMode ? nightModeStyle.title1 : styles.title1}>Connect</Text>
        </View>

        <View style={user.settings.nightMode ? nightModeStyle.buttonsContain : styles.buttonsContain}>
          <View>
            <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>J'ai déjà un compte :</Text>
            <TouchableOpacity onPress={popSignIn} style={user.settings.nightMode ? nightModeStyle.connexionButton : styles.connexionButton}>
              <Text style={user.settings.nightMode ? nightModeStyle.connexion : styles.connexion}>Connexion</Text>
            </TouchableOpacity>
          </View>

          <Modal visible={displaySignIn} style={user.settings.nightMode ? nightModeStyle.modalContainer : styles.modalContainer} transparent={true}>
            <View style={user.settings.nightMode ? nightModeStyle.modalBackground : styles.modalBackground}>
              <View style={user.settings.nightMode ? nightModeStyle.signInContainer : styles.signInContainer}>
                <TouchableOpacity onPress={popSignIn} style={user.settings.nightMode ? nightModeStyle.modalClose : styles.modalClose}>
                  <FontAwesome name='remove' size={40} color='#19525a'/>
                </TouchableOpacity>
                <View style={user.settings.nightMode ? nightModeStyle.modalInputContainer : styles.modalInputContainer}>
                  <TextInput placeholder="Pseudo" placeholderTextColor='#19525a' onChangeText={(value) => setUsername(value)} value={username} style={user.settings.nightMode ? nightModeStyle.input : styles.input} />
                  <TextInput placeholder="Mot de passe" placeholderTextColor='#19525a' onChangeText={(value) => setPassword(value)} value={password} style={user.settings.nightMode ? nightModeStyle.input : styles.input} />
                  <TouchableOpacity onPress={() => handleConnection()} style={user.settings.nightMode ? nightModeStyle.modalConnexionContainer : styles.modalConnexionContainer}>
                    <Text style={user.settings.nightMode ? nightModeStyle.modalConnexionText : styles.modalConnexionText}>Connexion</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <View>
            <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>Je veux créer un compte :</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Connect2')} style={user.settings.nightMode ? nightModeStyle.inscriptionButton : styles.inscriptionButton}>
              <Text style={user.settings.nightMode ? nightModeStyle.inscription : styles.inscription}>Inscription</Text>
            </TouchableOpacity>
          </View>
          <Text>--------------- ou ---------------</Text>

          <Text>Google Connexion</Text>
        </View>
        <Text>--------------- ou ---------------</Text>
         {/* <TouchableOpacity>
            <Text>Connecte-toi avec Google:</Text>
            <AuthGoogle/>
  </TouchableOpacity>  */}
       

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
  },
  text: {
    fontFamily: 'Poppins_700Bold',
    color: '#19525a',
    marginBottom: 5,
    fontSize: 16
  },
  inscription: {
    fontFamily: 'Poppins_700Bold',
    color: "#FFFFFF",
    fontSize: 24
  },
  connexion: {
    fontFamily: 'Poppins_700Bold',
    color: '#19525a',
    fontSize: 24
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalConnexionContainer: {
    backgroundColor: '#19525a',
    borderRadius: 6,
    marginTop: 10
  },
  modalConnexionText: {
    fontFamily: 'Poppins_500Medium',
    color: '#FFFFFF',
    fontSize: 20,
    padding: 10
  },
  signInContainer: {
    height: (windowHeight/2),
    width: (windowWidth/1.3),
    alignItems: 'center',
    backgroundColor: "#D2FFF4",
    flexDirection: ' column',
    justifyContent: 'flex-end',
    borderRadius: 30,
    padding: 25,
    borderColor: '#19525a',
    borderWidth: 3,
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
  modalInputContainer: {
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalClose: {
    position: 'absolute',
    left: 20,
    top: 20
  },
  input: {
    width: '100%',
    paddingHorizontal: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#19525a',
    borderRadius: 8,
    height: 60,
    fontSize: 15,
  },
});

const nightModeStyle = StyleSheet.create({
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
  buttonsContain: {
    justifyContent: "space-evenly",
    flex: 1,
    alignItems: "center",
    alignContent: "center"
  },
  inscriptionButton: {
    backgroundColor: '#FFE45D',
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
  },
  text: {
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
    marginBottom: 5,
    fontSize: 16,
  },
  inscription: {
    fontFamily: 'Poppins_700Bold',
    color: "#19525a",
    fontSize: 24
  },
  connexion: {
    fontFamily: 'Poppins_700Bold',
    color: '#19525a',
    fontSize: 24
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalConnexionContainer: {
    backgroundColor: '#19525a',
    borderRadius: 6,
    marginTop: 10
  },
  modalConnexionText: {
    fontFamily: 'Poppins_500Medium',
    color: '#FFFFFF',
    fontSize: 20,
    padding: 10
  },
  signInContainer: {
    height: (windowHeight/2),
    width: (windowWidth/1.3),
    alignItems: 'center',
    backgroundColor: "#D2FFF4",
    flexDirection: ' column',
    justifyContent: 'flex-end',
    borderRadius: 30,
    padding: 25,
    borderColor: '#19525a',
    borderWidth: 3,
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
  modalInputContainer: {
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalClose: {
    position: 'absolute',
    left: 20,
    top: 20
  },
  input: {
    width: '100%',
    paddingHorizontal: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#19525a',
    borderRadius: 8,
    height: 60,
    fontSize: 15,
  },
});
