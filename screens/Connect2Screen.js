import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useDispatch } from 'react-redux';
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


export default function Connect2Screen({ navigation }) {

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

      console.log(resultuser)
      if (resultuser.result) {
        setErrorExistUser(true)
        console.log('Nom utilisateur déjà existant')
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
        console.log('Email déjà existant')
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
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconArrow}>
          <FontAwesome5 name='arrow-left' size={33} color={"#19525a"} />
        </TouchableOpacity>
        <Text style={styles.title1}>Connect</Text>
      </View>

      <View style={styles.containerConnect}>
        <View style={styles.textandinputcontain}>
          <Text style={styles.text}>Pseudo </Text>
          <TextInput placeholder="Pseudo" onChangeText={(value) => setUsername(value)}
            value={username} style={[styles.input, { borderColor: focusedInput === 'username' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'username' ? 2 : 1 }
            ]}
            onFocus={() => setFocusedInput('username')}
            onBlur={() => setFocusedInput(null)}
          />
          {errorUser && <Text style={styles.error}> Champ Obligatoire</Text>}
          {errorExistUser && <Text style={styles.error}> Nom utilisateur déjà existant</Text>}
        </View>

        <View style={styles.textandinputcontain}>
          <Text style={styles.text}>E-mail </Text>
          <TextInput placeholder="exemple@email.com" onChangeText={(value) => setEmail(value)  } autoCapitalize="none"
            value={email} style={[styles.input, { borderColor: focusedInput === 'email' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'email' ? 2 : 1 }
            ]}
            onFocus={() => setFocusedInput('email')}
            onBlur={() => setFocusedInput(null)}
          />
          {errorMail && <Text style={styles.error}> E-mail invalide</Text>}
          {errorExistMail && <Text style={styles.error}> Email déjà existant</Text>}
        </View>

        <View style={styles.textandinputcontain}>
          <Text style={styles.text}>Téléphone</Text>
          <TextInput placeholder="Téléphone" onChangeText={(value) => setPhone(value)}
            value={phone} style={[styles.input, { borderColor: focusedInput === 'phone' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'phone' ? 2 : 1 }
            ]}
            onFocus={() => setFocusedInput('phone')}
            onBlur={() => setFocusedInput(null)}
          />
        </View>

        <View style={styles.textandinputcontain}>
          <Text style={styles.text}>Mot de passe</Text>
          <TextInput placeholder="Mot de passe" secureTextEntry={true} onChangeText={(value) => setPassword(value)} autoCapitalize="none"
            value={password} style={[styles.input, { borderColor: focusedInput === 'password' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'password' ? 2 : 1 }
            ]}
            onFocus={() => setFocusedInput('password')}
            onBlur={() => setFocusedInput(null)}
          />
          {errorPassword && <Text style={styles.error}> Champ Obligatoire</Text>}
        </View>

        <View style={styles.textandinputcontain}>
          <Text style={styles.text}>Confirmer le mot de passe</Text>
          <TextInput placeholder="Confirmer le mot de passe" secureTextEntry={true} onChangeText={(value) => setConfirmPassWord(value)} autoCapitalize="none"
            value={confirmPassword} style={[styles.input, { borderColor: focusedInput === 'confirmPassword' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'confirmPassword' ? 2 : 1 }
            ]}
            onFocus={() => setFocusedInput('confirmPassword')}
            onBlur={() => setFocusedInput(null)}
          />
          {errorConfirmPw && <Text style={styles.error}> Mot de passe incorrect</Text>}
        </View>


        <TouchableOpacity onPress={() => validFields()} style={styles.nextButton}>
          <Text style={styles.nextText}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  text: {
    fontFamily: 'Poppins_400Regular',
    color: '#19525A'
  },
  header: {
    height: '10%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'relative',
    borderBottomWidth: 3,
    borderBottomColor: '#15C2C2',
  },
  title1: {
    fontSize: 30,
    color: '#19525A',
    fontFamily: 'Poppins_600SemiBold'
  },
  button: {
    backgroundColor: 'yellow'
  },
  containerConnect: {
    justifyContent: "space-around",

    alignItems: "center",
    alignContent: "center",

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
    fontSize: 15,

  },
  text: {
    paddingLeft: 5,
    color: '#19525A'
  },
  textandinputcontain: {
    margin: 10
  },
  nextButton: {
    backgroundColor: '#19525a',
    height: 76,
    width: 264,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20


  },
  nextText: {
    fontWeight: "600",
    color: "white",
    fontSize: 25
  },
  error: {
    color: "red",
    fontSize: 14,
  }
});
