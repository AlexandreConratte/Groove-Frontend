import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
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

export default function ArtistCard(props) {
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

  return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image source={require('../assets/loupe-jaune.png')} style={styles.image}/>
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.name}>{props.name}</Text>
        </View>
      </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    width: (windowWidth / 4),
    height: (windowHeight / 4.44),
    margin: 8,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  imageContainer: {
    height: '66%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#D2FFF4',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    paddingTop: '3%'
  },
  textContainer: {
    height: '34%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
  },
  image: {
    width: '90%',
    height: '90%',
    borderRadius: 50,
    backgroundColor: 'white'
  },

});