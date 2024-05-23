import { Dimensions, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import FestivalCardHorizontal from '../components/FestivalCardHorizontal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height; 

const BACKEND_URL = "https://backend-groove.vercel.app";

export default function MyMemoriesScreenScreen({ navigation }) {
  const [memoriesFestivals, setMemoriesFestivals] = useState([]);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${BACKEND_URL}/users/findMemories`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token }),
    }).then(response => response.json())
    .then(data => {
      setMemoriesFestivals(data.memoriesFestivals)
    })
  },[user])

  const festivals = memoriesFestivals.map((e,i) => {
    return (<FestivalCardHorizontal key={i} {...e} isLiked={true}/>)
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={styles.iconArrow}>
          <FontAwesome5 name='arrow-left' size={33} color={'#19525A'}/>
        </TouchableOpacity>
        <Text style={styles.title1}>Souvenirs</Text>
      </View>

      {memoriesFestivals.length ? (
            <ScrollView>
              <View style={styles.festivalsContainer}>
                {festivals}
              </View>
            </ScrollView>
          ) : (
            <View style={styles.nofestivalContainer}>
              <Text style={styles.text}>Pas de festivals souvenirs pour le moment</Text>
            </View>
        )}

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
  festivalsContainer: {
    alignItems: 'center',
  },
  nofestivalContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color: '#19525A',
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    marginHorizontal: 25
  },
});
