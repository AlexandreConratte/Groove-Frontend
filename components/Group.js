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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';

export default function Group(props) {
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
  if (!fontsLoaded) {
    return <Text></Text>;
  }
  let content

  if (props.name) {
    let s = ''
    props.members.length > 1 && (s = 's')
    content =
      <TouchableOpacity style={user.settings.nightMode ? nightModeStyle.container : styles.container} onPress={() => props.goToGroupPage(props)}>
        <Text style={user.settings.nightMode ? nightModeStyle.title : styles.title}>{props.name}</Text>
        <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>{props.festival.name}</Text>
        <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>{props.members.length} membre{s}</Text>
      </TouchableOpacity>
  }
  else {
    content =
      <TouchableOpacity style={user.settings.nightMode ? nightModeStyle.container : styles.container} onPress={() => props.goToGroupPage()}>
        <FontAwesome5 name='plus' size={100} color={user.settings.nightMode ? '#FFFFFF' : '#19525A'} />
      </TouchableOpacity>
  }

  return (
    <>
      {content}
    </>
  )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    width: 150,
    height: 150,
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
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#8AE0E0',
    borderWidth: 3,
    borderRadius: 20
  },
  title: {
    fontSize: 20,
    color: '#19525A',
    fontFamily: 'Poppins_600SemiBold',
    textAlign:'center'
  },
  text: {
    fontFamily: 'Poppins_400Regular',
    color: '#19525a',
    textAlign: 'center'
  },

});

const nightModeStyle = StyleSheet.create({
  container: {
    backgroundColor: '#19525A',
    borderRadius: 5,
    width: 150,
    height: 150,
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
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#8AE0E0',
    borderWidth: 3,
    borderRadius: 20
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold'
  },
  text: {
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
    textAlign: 'center'
  },
});