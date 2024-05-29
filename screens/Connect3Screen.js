import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, TextInput, Modal, Button, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
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

const windowWidth = Dimensions.get('window').width;

export default function Connect3Screen({ navigation }) {

  const user = useSelector((state) => state.user.value);

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
        <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>{label}</Text>
        <TouchableOpacity onPress={showDatepicker}>
          <TextInput style={user.settings.nightMode ? nightModeStyle.inputDate : styles.inputDate} placeholder="Sélectionnez une date" placeholderTextColor={user.settings.nightMode ? '#FFFFFF' : null } value={birthdate} editable={false} />
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
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={user.settings.nightMode ? nightModeStyle.container : styles.container}>
      
        <View style={user.settings.nightMode ? nightModeStyle.header : styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={user.settings.nightMode ? nightModeStyle.iconArrow : styles.iconArrow}>
            <FontAwesome5 name='arrow-left' size={33} color={user.settings.nightMode ? '#FFFFFF' : '#19525A'} />
          </TouchableOpacity>
          <Text style={user.settings.nightMode ? nightModeStyle.title1 : styles.title1}>Connect</Text>
        </View>
        <ScrollView contentContainerStyle={user.settings.nightMode ? nightModeStyle.containerConnect : styles.containerConnect}>
          <View style={user.settings.nightMode ? nightModeStyle.profilphoto : styles.profilphoto}>
            <TouchableOpacity onPress={() => addPhoto()}>
              <ProfilePhoto />
            </TouchableOpacity>
          </View>
          <View style={user.settings.nightMode ? nightModeStyle.allInputs : styles.allInputs}>
            <View style={user.settings.nightMode ? nightModeStyle.textandinputcontain : styles.textandinputcontain}>
              <View style={styles.firstandlastname}>
                <View style={styles.firstnameInput}>
                  <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>Prénom *</Text>
                  <TextInput
                    placeholder="Prénom"
                    placeholderTextColor={user.settings.nightMode ? '#FFFFFF' : null}
                    onChangeText={(value) => setFirstname(value)}
                    value={firstname}
                    style={[
                      user.settings.nightMode ? nightModeStyle.input : styles.input,
                      { borderColor: focusedInput === 'firstname' ? '#15C2C2' : '#7CB7BF' },
                      { borderWidth: focusedInput === 'firstname' ? 2 : 1 }
                    ]}
                    onFocus={() => setFocusedInput('firstname')}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
                <View style={styles.lastnameInput}>
                  <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>Nom *</Text>
                  <TextInput
                    placeholder="Nom"
                    placeholderTextColor={user.settings.nightMode ? '#FFFFFF' : null}
                    onChangeText={(value) => setLastname(value)}
                    value={lastname}
                    style={[
                      user.settings.nightMode ? nightModeStyle.input : styles.input,
                      { borderColor: focusedInput === 'lastname' ? '#15C2C2' : '#7CB7BF' },
                      { borderWidth: focusedInput === 'lastname' ? 2 : 1 }
                    ]}
                    onFocus={() => setFocusedInput('lastname')}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
              </View>
            </View>
            <View style={user.settings.nightMode ? nightModeStyle.textandinputcontain : styles.textandinputcontain}>
              <DateInput label="Date de naissance *" />
            </View>
            <View style={user.settings.nightMode ? nightModeStyle.textandinputcontain : styles.textandinputcontain}>
              <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>Ville *</Text>
              <TextInput
                placeholder="Ville"
                placeholderTextColor={user.settings.nightMode ? '#FFFFFF' : null}
                onChangeText={(value) => setCity(value)}
                value={city}
                style={[
                  user.settings.nightMode ? nightModeStyle.input : styles.input,
                  { borderColor: focusedInput === 'city' ? '#15C2C2' : '#7CB7BF' },
                  { borderWidth: focusedInput === 'city' ? 2 : 1 }
                ]}
                onFocus={() => setFocusedInput('city')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>
          </View>
          <TouchableOpacity onPress={() => nextStep()} style={user.settings.nightMode ? nightModeStyle.nextButton : styles.nextButton}>
            <Text style={user.settings.nightMode ? nightModeStyle.nextText : styles.nextText}>Suivant</Text>
          </TouchableOpacity>
          <Text style={user.settings.nightMode ? nightModeStyle.textInfo : styles.textInfo}>*informations facultatives</Text>

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
      backgroundColor: '#FFFFFF'
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
      marginTop: 10,
      paddingBottom: 35,
  },
  profilphoto: {
      marginBottom: 10,
  },
  iconArrow: {
      position: 'absolute',
      left: 9,
      height: '60%',
      width: '10%',
      marginBottom: 5
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
      fontSize: 25,
      fontFamily: 'Poppins_600SemiBold',
  },
  progressBar: {
      height: 20,
      width: (Dimensions.get('window').width / 1.2),
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
      width: '50%',
      backgroundColor: '#15C2C2',
      borderRadius: 50
  }, 
  inputDate: {
    width: 170,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#7CB7BF',
    borderRadius: 8,
    height: 50,
    fontSize: 13,
    color: '#19525A',
    fontFamily: 'Poppins_500Medium',
  },
  textInfo: {
    paddingLeft: 5,
    color: '#19525A',
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    marginBottom: 30
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
      marginTop: 10,
      paddingBottom: 35,
  },
  profilphoto: {
      marginBottom: 20,
  },
  iconArrow: {
      position: 'absolute',
      left: 9,
      height: '60%',
      width: '10%',
      marginBottom: 5
  },
  input: {
      width: 170,
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
  textInfo: {
    paddingLeft: 5,
    color: '#FFFFFF',
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    marginBottom: 30,
},
inputDate: {
  width: 170,
  padding: 10,
  marginVertical: 10,
  borderWidth: 1,
  borderColor: '#7CB7BF',
  borderRadius: 8,
  height: 50,
  fontSize: 13,
  color: '#FFFFFF',
  fontFamily: 'Poppins_500Medium',
},

});