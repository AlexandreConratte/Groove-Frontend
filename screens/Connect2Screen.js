import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';


export default function Connect2Screen({ navigation }) {


  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassWord] = useState('')
  const [error, setError] = useState(false)
  const [error2, setError2] = useState(false)
  const [error3, setError3] = useState(false)
  const [error4, setError4] = useState(false)
  const [focusedInput, setFocusedInput] = useState(null)

  const mailregex = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/
  
  const validFields = () => {

    let valid = true;
    setError(false);
    setError2(false);
    setError3(false);

    if (!username) {
      setError2(true);
      valid = false;
    }
    if (!password) {
      setError3(true);
      valid = false;
    }
    if (confirmPassword !== password) {
      setError4(true);
      valid = false;
    }
    if (!mailregex.test(email)) {
      setError(true);
      valid = false;
    }
    if (valid) {
      dispatch(login({ username, email , password,  phone  }))
      navigation.navigate('Connect3');
    }
  };



  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name='arrow-left' size={30} color="#19525a" />
        </TouchableOpacity>
        <Text style={styles.title}>Connect</Text>
      </View>

      <View style={styles.containerConnect}>
        <View style={styles.textandinputcontain}>
          <Text style={styles.text}>Pseudo </Text>
          <TextInput placeholder="Pseudo" onChangeText={(value) => setUsername(value)}
            value={username}  style={[styles.input,  { borderColor: focusedInput === 'username' ? '#15C2C2' : '#7CB7BF' }, {borderWidth: focusedInput === 'username' ? 2 : 1 }
          ]}
          onFocus={() => setFocusedInput('username')}
          onBlur={() => setFocusedInput(null)} 
        />
          {error2 && <Text style={styles.error}> Champ Obligatoire</Text>}
        </View>

        <View style={styles.textandinputcontain}>
          <Text style={styles.text}>E-mail </Text>
          <TextInput placeholder="exemple@email.com" onChangeText={(value) => setEmail(value)}
            value={email}  style={[styles.input,  { borderColor: focusedInput === 'email' ? '#15C2C2' : '#7CB7BF' }, {borderWidth: focusedInput === 'email' ? 2 : 1 }
          ]}
          onFocus={() => setFocusedInput('email')}
          onBlur={() => setFocusedInput(null)} 
        />
          {error && <Text style={styles.error}> E-mail invalide</Text>}
        </View>

        <View style={styles.textandinputcontain}>
          <Text style={styles.text}>Téléphone</Text>
          <TextInput placeholder="Téléphone" onChangeText={(value) => setPhone(value)}
            value={phone}  style={[styles.input,  { borderColor: focusedInput === 'phone' ? '#15C2C2' : '#7CB7BF' }, {borderWidth: focusedInput === 'phone' ? 2 : 1 }
          ]}
          onFocus={() => setFocusedInput('phone')}
          onBlur={() => setFocusedInput(null)} 
        />
            </View>

        <View style={styles.textandinputcontain}>
          <Text style={styles.text}>Mot de passe</Text>
          <TextInput placeholder="Mot de passe" secureTextEntry={true} onChangeText={(value) => setPassword(value)}
            value={password}  style={[styles.input,  { borderColor: focusedInput === 'password' ? '#15C2C2' : '#7CB7BF' }, {borderWidth: focusedInput === 'password' ? 2 : 1 }
          ]}
          onFocus={() => setFocusedInput('password')}
          onBlur={() => setFocusedInput(null)} 
        />
          {error3 && <Text style={styles.error}> Champ Obligatoire</Text>}
        </View>

        <View style={styles.textandinputcontain}>
          <Text style={styles.text}>Confirmer le mot de passe</Text>
          <TextInput placeholder="Confirmer le mot de passe" secureTextEntry={true} onChangeText={(value) => setConfirmPassWord(value)}
            value={confirmPassword}  style={[styles.input,  { borderColor: focusedInput === 'confirmPassword' ? '#15C2C2' : '#7CB7BF' }, {borderWidth: focusedInput === 'confirmPassword' ? 2 : 1 }
          ]}
          onFocus={() => setFocusedInput('confirmPassword')}
          onBlur={() => setFocusedInput(null)} 
        />
          {error4 && <Text style={styles.error}> Mot de passe incorrect</Text>}
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
  title: {
    fontSize: 40,
    alignContent: "center",
    color: '#19525a',
    fontWeight: "500",
    marginRight: 80
  },
  button: {
    backgroundColor: 'yellow'
  },
  containerConnect: {
    justifyContent: "space-around",

    alignItems: "center",
    alignContent: "center",

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
