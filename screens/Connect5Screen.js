import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, KeyboardAvoidingView, Platform, TextInput, ScrollView, TouchableHighlight, } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
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

export default function Connect5Screen({ navigation }) {

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

  const goHome = () => {
    navigation.navigate("Home")
  }

  if (!fontsLoaded) {
    return <View></View>
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={user.settings.nightMode ? nightModeStyle.container : styles.container}>
      <View style={user.settings.nightMode ? nightModeStyle.header : styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={user.settings.nightMode ? nightModeStyle.iconArrow : styles.iconArrow}>
          <FontAwesome5 name='arrow-left' size={33} color={user.settings.nightMode ? "#FFFFFF" : "#19525a"} />
        </TouchableOpacity>
        <Text style={user.settings.nightMode ? nightModeStyle.title1 : styles.title1}>Connect</Text>
      </View>
        <View style={styles.behindHeader}> 
      <View style={styles.inscripBackground}>
      <Text style={user.settings.nightMode ? nightModeStyle.inscription : styles.inscription}> Inscription Terminée ! </Text>
      </View>

      <View> 
        <Text style={user.settings.nightMode ? nightModeStyle.welcomeText :styles.welcomeText}> BIENVENUE SUR GROOVE !</Text>
      </View>
      <TouchableOpacity onPress = { () => goHome()} style={styles.adventureButton}> 
        <Text style={styles.adventureText}>Clique ici pour démarrer ton aventure!</Text>
      </TouchableOpacity>

      <View style={styles.progressBar}>
        <View style={styles.progressBarSecond}></View>
      </View>
     
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: "center",
    paddingBottom : 30
  },
  iconArrow: {
    position: 'absolute',
    left: 9,
    height: '60%',
    width: '10%',
    marginBottom: 5
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
  behindHeader: {
    justifyContent: "space-around",
    flexDirection: "column",
    flex: 1, 
    alignItems : "center",
    paddingTop: 40
  },
  inscripBackground : {
    width: windowWidth,
    backgroundColor: '#FFE45D',
    alignItems: 'center',
  },
  inscription: {
    color: "#19525A",
    backgroundColor: "FFE45D",
    fontFamily: "Poppins_500Medium",
    fontSize : 30,
    height: 50,
  },
  progressBar: {
    height: 20,
    width: (windowWidth / 1.2),
    backgroundColor: '#D2FFF4',
    borderRadius: 50,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 6,
      },
    }),
    margin: 10
  },
  progressBarSecond: {
    height: 20,
    width: '100%',
    backgroundColor: '#15C2C2',
    borderRadius: 50
  },
  adventureButton: {

    backgroundColor: '#15C2C2',
    height: 150,
    width: 280,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 30
  
  },
  adventureText:  {
    fontFamily: "Poppins_600SemiBold", 
    fontSize : 30,
    textAlign : "center",
    color: "#FFFFFF"
  },
  welcomeText : { 
    fontFamily: "Poppins_700Bold",
    fontSize: 50,
    textAlign: "center",
    marginHorizontal: 30,
    color : '#19525A'
  }, 

});


const nightModeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#19525A',
    alignItems: "center",
  },
  iconArrow: {
    position: 'absolute',
    left: 9,
    height: '60%',
    width: '10%',
    marginBottom: 5
  },
  header: {
    height: 86,
    justifyContent: 'flex-end',
    borderBottomColor: '#15C2C2',
    borderBottomWidth: 3,
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  title1: {
    fontSize: 30,
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold'
  },
  behindHeader: {
    justifyContent: "space-around",
    flexDirection: "column",
    flex: 1, 
    alignItems : "center",
    paddingTop: 40
  },
  inscripBackground : {
    width: windowWidth,
    backgroundColor: '#FFE45D',
    alignItems: 'center',
  },
  inscription: {
    color: "#19525A",
    backgroundColor: "FFE45D",
    fontFamily: "Poppins_500Medium",
    fontSize : 30,
    height: 50,
  },
  adventureButton: {
    backgroundColor: '#15C2C2',
    height: 150,
    width: 280,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 30
  
  },
  adventureText:  {
    fontFamily: "Poppins_600SemiBold", 
    fontSize : 30,
    textAlign : "center",
    color: "#FFFFFF"
  },
  welcomeText : { 
    fontFamily: "Poppins_700Bold",
    fontSize: 50,
    textAlign: "center",
    marginHorizontal: 30,
    color : '#FFFFFF',
  }, 
});