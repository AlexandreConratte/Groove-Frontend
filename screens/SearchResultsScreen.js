import { Image, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Platform, Dimensions, Modal } from 'react-native';
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



import FestivalCardHorizontal from '../components/FestivalCardHorizontal';
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
    festivals = <Text>{objet.message}</Text>
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title1}>Recherche</Text>
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
  title1: {
    fontSize: 30,
    color: '#19525A',
    fontFamily: 'Poppins_600SemiBold'
  },
  festivalsContainer:{
    alignItems:'center',
  }
})
