import { Dimensions, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height; 

export default function MenuScreen({ navigation }) {
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

  if (!fontsLoaded) {
    return <Text></Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title1}>Menu</Text>
      </View>
      <ScrollView>
        <View style={styles.itemContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('MyFestivals')} style={styles.lightButton}>
            <FontAwesome5 name='heart' solid size={75} color={'#8BA8AC'}/>
            <Text style={styles.text}>Mes Festivals</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MyMemories')} style={styles.button}>
            <FontAwesome5 name='book' size={75} color={'#8AE0E0'}/>
            <Text style={styles.text}>Souvenirs</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Festival')} style={styles.button}>
            <FontAwesome5 name='map-marked-alt' size={75} color={'#8AE0E0'}/>
            <Text style={styles.text}>Carte</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Friends')} style={styles.lightButton}>
            <FontAwesome5 name='user-friends' size={75} color={'#8BA8AC'}/>
            <Text style={styles.text}>Ami(e)s</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.lightButton}>
            <FontAwesome5 name='user-alt' size={75} color={'#8BA8AC'}/>
            <Text style={styles.text}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.button}>
            <FontAwesome5 name={'tools'} solid size={75} color={'#8AE0E0'}/>
            <Text style={styles.text}>Paramètres</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 45,
    paddingTop: 35
  },
  button: {
    width: 140,
    height: 140,
    borderColor: '#8BA8AC',
    borderWidth: 5,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  lightButton: {
    width: 140,
    height: 140,
    borderColor: '#8AE0E0',
    borderWidth: 5,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#19525A',
    fontSize: 18,
    marginHorizontal: 10,
    marginTop: 2,
    textAlign: 'center',
  }
});
