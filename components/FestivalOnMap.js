import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


export default function FestivalOnMap(props) {
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
    return <Text></Text>;
  }

  if (props.diff) {
    const time = new Date(props.diff)
    timeLeft = <Text style={styles.timeLeft}>J-{time.getDate()}</Text>
  }


  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>{props.distance} km</Text>
          <TouchableOpacity style={styles.close} onPress={() => props.closeModal()}>
            <FontAwesome5 name="window-close" size={25} color={"#19525A"} />
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.titleBox}>
            <Text style={styles.title}>{props.name}</Text>
          </View>
          <View style={styles.date}>
            <Text style={styles.text}>Du {start}{"\n"}Au {end}</Text>
          </View>
          <View style={styles.textBox}>
            <MaterialIcons name="location-pin" color={'#FF4848'} size={14} />
            <Text style={[styles.text, { paddingRight: 10 }]}>{props.adress.place}, {props.adress.city}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => { props.closeModal(); navigation.navigate('Festival', { ...props }) }}>
            <Text style={styles.textbutton}>Ouvrir la page du festival</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.triangle}></View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 200,
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
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
    transform: [{ rotate: "180deg" }],
  },
  textContainer: {
  },
  title: {
    fontSize: 18,
    color: '#19525A',
    textAlign: 'center',
    fontFamily: 'Poppins_600SemiBold',
  },
  text: {
    fontSize: 14,
    color: '#19525A',
    fontFamily: 'Poppins_400Regular',
    textAlignVertical:'center',
  },
  textBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    paddingLeft: 14,
  },

  titleBox: {
    width: '100%',
    alignItems: 'center'
  },

  distance: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',

  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#19525A",
    borderRadius: 10,
    paddingVertical: 10,
    margin:5,
  },
  textbutton: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center'
  },
});