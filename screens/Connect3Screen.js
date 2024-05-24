import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, TextInput, Modal, Button, KeyboardAvoidingView, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
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
import ProfilePhoto from '../components/ProfilePhoto';


export default function Connect3Screen({ navigation }) {

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


  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthdate, setBirthdate] = useState("");
  const [city, setCity] = useState('');
  const [focusedInput, setFocusedInput] = useState(null)
  const [date, setDate] = useState(new Date());
  const [modalPhoto, setModalPhoto] = useState(false)

  const DateInput = ({ label }) => {
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setDate(currentDate);

      //console.log(currentDate)

      let tempDate = new Date(currentDate);
      let formatDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
      setBirthdate(formatDate);
    };
    const showDatepicker = () => {
      setShow(true);
    };
    return (
      <View>
        <Text style={styles.text}>{label}</Text>
        <TouchableOpacity onPress={showDatepicker}>
          <TextInput style={styles.inputDate} placeholder="Sélectionnez une date" value={birthdate} editable={false} />
        </TouchableOpacity>
        {show && (<DateTimePicker testID="dateTimePicker" value={date} mode="date" display="default" onChange={onChange} />)}
      </View>
    );
  };

  const addPhoto = () => {
    setModalPhoto(true)
  }

  const nextStep = () => {
    dispatch(signupUser({ firstname, lastname, birthdate: date.getTime(), city }))
    // console.log(birthdate)
    navigation.navigate('Connect4');
  }

  if (!fontsLoaded) {
    return <View></View>
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconArrow}>
          <FontAwesome5 name='arrow-left' size={33} color={"#19525a"} />
        </TouchableOpacity>
        <Text style={styles.title1}>Connect</Text>
      </View>

      <ScrollView contentContainerStyle={styles.containerConnect}>
        <View style={styles.profilphoto}>
          <TouchableOpacity onPress={() => addPhoto()}>
            <ProfilePhoto />
          </TouchableOpacity>
        </View>



        <View style={styles.allInputs}>
          <View style={styles.textandinputcontain}>

            <View style={styles.firstandlastname}>
              <View style={styles.firstnameInput}>
                <Text style={styles.text}>Prénom *</Text>
                <TextInput placeholder="Prénom" onChangeText={(value) => setFirstname(value)}
                  value={firstname} style={[styles.input, { borderColor: focusedInput === 'firstname' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'firstname' ? 2 : 1 }
                  ]}
                  onFocus={() => setFocusedInput('firstname')}
                  onBlur={() => setFocusedInput(null)} />
              </View>
              <View style={styles.lastnameInput}>
                <Text style={styles.text}>Nom *</Text>
                <TextInput placeholder="Nom" onChangeText={(value) => setLastname(value)}
                  value={lastname} style={[styles.input, { borderColor: focusedInput === 'lastname' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'lastname' ? 2 : 1 }
                  ]}
                  onFocus={() => setFocusedInput('lastname')}
                  onBlur={() => setFocusedInput(null)} />
              </View>
            </View>
          </View>


          <View style={styles.textandinputcontain}>
            <DateInput label="Date de naissance *" />
          </View>

          <View style={styles.textandinputcontain}>
            <Text style={styles.text}>Ville *</Text>
            <TextInput placeholder="Ville" onChangeText={(value) => setCity(value)}
              value={city} style={[styles.input, { borderColor: focusedInput === 'city' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'city' ? 2 : 1 }
              ]}
              onFocus={() => setFocusedInput('city')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>
        </View>

        <TouchableOpacity onPress={() => nextStep()} style={styles.nextButton}>
          <Text style={styles.nextText}>Suivant</Text>
        </TouchableOpacity>
        <Text>*informations facultatives</Text>
      
    </ScrollView>
    </View>
    </KeyboardAvoidingView>
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
  profilphoto : {
    marginBottom : 20,
  },
  title1: {
    fontSize: 30,
    color: '#19525A',
    fontFamily: 'Poppins_600SemiBold'
  },
  iconContainer: {
    width: 200,
    height: 200,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#15C2C2',
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6
  },
  iconArrow: {
    position: 'absolute',
    left: 9,
    height: '60%',
    width: '10%',
    marginBottom: 5
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
  containerConnect: {
    justifyContent: "space-around",

    alignItems: "center",
    alignContent: "center",

  },
  input: {
    width: 170,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#7CB7BF',
    borderRadius: 8,
    height: 50,
    fontSize: 15,
  },
  inputDate: {
    width: 170,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#7CB7BF',
    borderRadius: 8,
    height: 50,
    fontSize: 15,
    color: '#19525A'
  },
  text: {
    color: '#19525A'
  },

  firstandlastname: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between"
  },
  firstnameInput: {
    flexDirection: "column",
    alignItems: "flex-start",

  },
  lastnameInput: {
    flexDirection: "column",
    alignItems: "flex-start"
  },
  allInputs: {
    alignItems: "flex-start",
    margin: 10

  },
  textandinputcontain: {
    margin: 10
  }
})
