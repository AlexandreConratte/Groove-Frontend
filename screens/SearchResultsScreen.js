import { Image, Switch, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Platform, Dimensions, Modal } from 'react-native';
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
const BACKEND_URL = "https://backend-groove.vercel.app"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import FestivalCardHorizontal from '../components/FestivalCardHorizontal';
import { useState } from 'react';
export default function SearchResultsScreen({ route, navigation }) {
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
  const [isEnabled, setIsEnabled] = useState();
  let festivals = []

  if (!fontsLoaded) {
    return <Text></Text>;
  }
  const objet = route.params;

  if (objet.festivals) {
    festivals = objet.festivals.map((e, i) => {
      return (<FestivalCardHorizontal key={i} {...e} />)
    })
  }
  else {
    festivals = 
    <View style={styles.notfound}>
      <Image
        source={{ uri: 'https://res.cloudinary.com/dq5b1pmdu/image/upload/v1716388828/image_processing20210912-13530-z5pl2i_j7kfvf.gif' }}
        style={{ width: 400, height: 400 }}
      />
      <Text style={styles.text}>Désolé, aucun festival ne correspond à vos critères</Text>
    </View>
  }
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title1}>Recherche</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.critereButton} onPress={() => navigation.navigate('Search')}>
          <FontAwesome5 name="filter" size={30} color={"#19525A"} />
          <Text style={styles.critereText}>Critères</Text>
        </TouchableOpacity>
        <View style={styles.switch}>
          <Text style={styles.critereText}>Liste</Text>
          <Switch
            style={styles.toggle}
            trackColor={{ false: '#19525A', true: '#19525A' }}
            thumbColor={isEnabled ? '#FFE45D' : '#FFE45D'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text style={styles.critereText}>Carte</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.festivalsContainer}>
        {festivals}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 86,
    justifyContent: 'flex-end',
    borderBottomColor: '#19525A',
    borderBottomWidth: 3,
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  title1: {
    fontSize: 30,
    color: '#19525A',
    fontFamily: 'Poppins_600SemiBold'
  },
  festivalsContainer: {
    alignItems: 'center',
    height:'100%'
  },
  critereButton: {
    width: '50%',
    borderRightWidth: 3,
    borderRightColor: '#19525A',
    borderBottomWidth: 3,
    borderBottomColor: '#19525A',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  critereText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    color: '#19525A'
  },
  switch: {
    width: '50%',
    borderBottomWidth: 3,
    borderBottomColor: '#19525A',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  notfound:{
    alignItems:'center',
    backgroundColor:'#FAF9FE',
    height:'100%'
  },
  text:{
    color: '#19525A',
    fontFamily: 'Poppins_600SemiBold',
    fontSize:24,
    textAlign:'center'
  }

})
