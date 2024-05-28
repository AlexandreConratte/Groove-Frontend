import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Dimensions , KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';
import { signupUser } from '../reducers/user';
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

export default function Connect2Screen({ navigation }) {
  const user = useSelector((state) => state.user.value);

   const BACKEND_URL = "https://backend-groove.vercel.app"
 // const BACKEND_URL = "http://10.1.0.205:3000"

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


  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassWord] = useState('')
  const [errorMail, setErrorMail] = useState(false)
  const [errorUser, setErrorUser] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)
  const [errorConfirmPw, setErrorConfirmPw] = useState(false)
  const [errorExistUser, setErrorExistUser] = useState(false)
  const [errorExistMail, setErrorExistMail] = useState(false)
  const [focusedInput, setFocusedInput] = useState(null)

  const mailregex = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/

  const validFields = async () => {

    let valid = true;

    if (!username) {
      setErrorUser(true);
      valid = false;
    }
    else { 
      setErrorUser(false)
    }

    if (!password) {
      setErrorPassword(true);
      valid = false;
    }
    else { 
      setErrorPassword(false)
    }
    if (confirmPassword !== password) {
      setErrorConfirmPw(true);
      valid = false;
    }
    else {
      setErrorConfirmPw(false)
    }
    if (!mailregex.test(email)) {
      setErrorMail(true);
      valid = false;
    }
    else {  
       setErrorMail(false)
      }

    if (valid) {
      const checkuser = await fetch(`${BACKEND_URL}/users/checkUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      })
      const resultuser = await checkuser.json()

      //console.log(resultuser)
      if (resultuser.result) {
        setErrorExistUser(true)
        //console.log('Nom utilisateur déjà existant')
        valid = false
      }else {
        setErrorExistUser(false)
      }

      const checkmail = await fetch(`${BACKEND_URL}/users/checkMail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const resultmail = await checkmail.json()
      if (resultmail.result) {
        setErrorExistMail(true)
        //console.log('Email déjà existant')
        valid = false
      } else {
        setErrorExistMail(false)
      }
      if (!resultuser.result && !resultmail.result) {
        dispatch(signupUser({ username, email, password, phone }))
        navigation.navigate('Connect3',);
      }
    }


  }
  //};
  // }

  if (!fontsLoaded) {
    return <View></View>
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={user.settings.nightMode ? nightModeStyle.container : styles.container}>
      <View style={user.settings.nightMode ? nightModeStyle.header : styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={user.settings.nightMode ? nightModeStyle.iconArrow : styles.iconArrow}>
          <FontAwesome5 name='arrow-left' size={33} color={user.settings.nightMode ? '#FFFFFF' : '#19525A'} />
        </TouchableOpacity>
        <Text style={user.settings.nightMode ? nightModeStyle.title1 : styles.title1}>Connect</Text>
      </View>             

      <ScrollView contentContainerStyle={user.settings.nightMode ? nightModeStyle.containerConnect : styles.containerConnect}>
                <View style={user.settings.nightMode ? nightModeStyle.textandinputcontain : styles.textandinputcontain}>
                    <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>Pseudo</Text>
                    <TextInput placeholder="Pseudo" placeholderTextColor={user.settings.nightMode ? '#FFFFFF' : null } onChangeText={(value) => setUsername(value)}
                        value={username} style={[user.settings.nightMode ? nightModeStyle.input : styles.input, { borderColor: focusedInput === 'username' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'username' ? 2 : 1 }]}
                        onFocus={() => setFocusedInput('username')}
                        onBlur={() => setFocusedInput(null)}
                    />
                    {errorUser && <Text style={user.settings.nightMode ? nightModeStyle.error : styles.error}> Champ Obligatoire</Text>}
                    {errorExistUser && <Text style={user.settings.nightMode ? nightModeStyle.error : styles.error}> Nom utilisateur déjà existant</Text>}
                </View>

                <View style={user.settings.nightMode ? nightModeStyle.textandinputcontain : styles.textandinputcontain}>
                    <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>E-mail</Text>
                    <TextInput placeholder="exemple@email.com" placeholderTextColor={user.settings.nightMode ? '#FFFFFF' : null } onChangeText={(value) => setEmail(value)} autoCapitalize="none"
                        value={email} style={[user.settings.nightMode ? nightModeStyle.input : styles.input, { borderColor: focusedInput === 'email' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'email' ? 2 : 1 }]}
                        onFocus={() => setFocusedInput('email')}
                        onBlur={() => setFocusedInput(null)}
                    />
                    {errorMail && <Text style={user.settings.nightMode ? nightModeStyle.error : styles.error}> E-mail invalide</Text>}
                    {errorExistMail && <Text style={user.settings.nightMode ? nightModeStyle.error : styles.error}> Email déjà existant</Text>}
                </View>

                <View style={user.settings.nightMode ? nightModeStyle.textandinputcontain : styles.textandinputcontain}>
                    <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>Téléphone</Text>
                    <TextInput placeholder="Téléphone" placeholderTextColor={user.settings.nightMode ? '#FFFFFF' : null } onChangeText={(value) => setPhone(value)}
                        value={phone} style={[user.settings.nightMode ? nightModeStyle.input : styles.input, { borderColor: focusedInput === 'phone' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'phone' ? 2 : 1 }]}
                        onFocus={() => setFocusedInput('phone')}
                        onBlur={() => setFocusedInput(null)}
                    />
                </View>

                <View style={user.settings.nightMode ? nightModeStyle.textandinputcontain : styles.textandinputcontain}>
                    <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>Mot de passe</Text>
                    <TextInput placeholder="Mot de passe" placeholderTextColor={user.settings.nightMode ? '#FFFFFF' : null } secureTextEntry={true} onChangeText={(value) => setPassword(value)} autoCapitalize="none"
                        value={password} style={[user.settings.nightMode ? nightModeStyle.input : styles.input, { borderColor: focusedInput === 'password' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'password' ? 2 : 1 }]}
                        onFocus={() => setFocusedInput('password')}
                        onBlur={() => setFocusedInput(null)}
                    />
                    {errorPassword && <Text style={user.settings.nightMode ? nightModeStyle.error : styles.error}> Champ Obligatoire</Text>}
                </View>

                <View style={user.settings.nightMode ? nightModeStyle.textandinputcontain : styles.textandinputcontain}>
                    <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>Confirmer le mot de passe</Text>
                    <TextInput placeholder="Confirmer le mot de passe" placeholderTextColor={user.settings.nightMode ? '#FFFFFF' : null } secureTextEntry={true} onChangeText={(value) => setConfirmPassWord(value)} autoCapitalize="none"
                        value={confirmPassword} style={[user.settings.nightMode ? nightModeStyle.input : styles.input, { borderColor: focusedInput === 'confirmPassword' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'confirmPassword' ? 2 : 1 }]}
                        onFocus={() => setFocusedInput('confirmPassword')}
                        onBlur={() => setFocusedInput(null)}
                    />
                    {errorConfirmPw && <Text style={user.settings.nightMode ? nightModeStyle.error : styles.error}> Mot de passe incorrect</Text>}
                </View>

                <TouchableOpacity onPress={() => validFields()} style={user.settings.nightMode ? nightModeStyle.nextButton : styles.nextButton}>
                    <Text style={user.settings.nightMode ? nightModeStyle.nextText : styles.nextText}>Suivant</Text>
                </TouchableOpacity>
                <View style={styles.progressBar}>
                  <View style={styles.progressBarSecond}></View>
                </View>
                
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontFamily: 'Poppins_400Regular',
    color: '#19525A'
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
    color: '#19525A',
    fontFamily: 'Poppins_600SemiBold'
  },
  containerConnect: {
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
    marginTop: 20,
    marginBottom: 60,
  },
  iconArrow: {
    position: 'absolute',
    left: 9,
    height: '60%',
    width: '10%',
    marginBottom: 5
  },
  input: {
    width: 280,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#7CB7BF',
    borderRadius: 8,
    height: 50,
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    color: '#19525A'
  },
  text: {
    paddingLeft: 5,
    color: '#19525A',
    fontFamily: 'Poppins_500Medium',
    fontSize: 16
  },
  textandinputcontain: {
    margin: 10
  },
  nextButton: {
    backgroundColor: '#19525a',
    height: 67,
    width: 281,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 20,
  },
  nextText: {
    fontFamily: 'Poppins_600SemiBold',
    color: "white",
    fontSize: 30
  },
  error: {
    color: "red",
    fontSize: 14,
    fontFamily: 'Poppins_400Regular'
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
    width: '25%',
    backgroundColor: '#15C2C2',
    borderRadius: 50
  }
});

const nightModeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#19525A'
  },
  text: {
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF'
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
  containerConnect: {
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
    marginTop: 20
  },
  iconArrow: {
    position: 'absolute',
    left: 9,
    height: '60%',
    width: '10%',
    marginBottom: 5
  },
  input: {
    width: 280,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#7CB7BF',
    borderRadius: 8,
    height: 50,
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#FFFFFF'
  },
  text: {
    paddingLeft: 5,
    color: '#FFFFFF',
    fontFamily: 'Poppins_500Medium',
    fontSize: 16
  },
  textandinputcontain: {
    margin: 10
  },
  nextButton: {
    backgroundColor: '#FFE45D',
    height: 76,
    width: 264,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 20,
  },
  nextText: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#19525a',
    fontSize: 30
  },
  error: {
    color: '#ff4040',
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold'
  }
});