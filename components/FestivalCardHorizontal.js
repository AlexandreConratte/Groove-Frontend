import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View,Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
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


export default function FestivalCardHorizontal(props) {
  const navigation = useNavigation()
  const start = new Date(props.start).toLocaleDateString()
  const end = new Date(props.end).toLocaleDateString()
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
    return <Text></Text> ;
  }

  let image = "https://res.cloudinary.com/dq5b1pmdu/image/upload/v1716199438/icon-image-not-found-free-vector_jccw05.jpg"
  let timeLeft = ""
  let distance = ""

  if (props.pictures.length > 0) {
    image = props.pictures[0]
  }

  if (props.diff) {
    const time = new Date(props.diff)
    timeLeft = <Text style={styles.timeLeft}>J-{time.getDate()}</Text>
  }
  if (props.distance) {
    distance = <Text style={styles.distance}>{props.distance} km</Text>
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Festival', { ...props })}>
      <View style={styles.container}>
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
        <TouchableOpacity style={styles.fav}>
          <FontAwesome name="heart-o" size={20} color={"#19525A"} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <View style={styles.titleBox}>
            <Text style={styles.title}>{props.name}</Text>
          </View>
          <View style={styles.textBox}>
            <MaterialIcons name="location-pin" color={'#FF4848'} size={14} />
            <Text style={styles.text}>{props.adress.place}</Text>
          </View>
          <View style={styles.date}>
            <Text style={styles.text}>Du {start}{"\n"}Au {end}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 340,
    height: 170,
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'white',
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
    flexDirection:'row',
  },

  image: {
    width: 170,
    height: 170,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textContainer: {
    padding: 5,
    width:'50%'
  },
  title: {
    fontSize: 16,
    color: '#19525A',
    textAlign: 'center',
    fontFamily:'Poppins_600SemiBold'
  },
  text: {
    fontSize: 14,
    color: '#19525A',
    width: '90%',
    fontFamily:'Poppins_400Regular',

  },
  textBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    marginLeft: 14,
  },
  fav: {
    position: 'absolute',
    left: 10,
    top: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 100,
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBox: {
    width: '100%',
    alignItems: 'center'
  },
});