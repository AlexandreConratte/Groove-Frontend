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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default function Group(props) {
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

  let content = <FontAwesome5 name='plus' size={100} color={'#19525A'} />

  if(props.name){
    let s =''
    props.members.length>1&&(s='s') 
    content=<>
    <Text style={styles.title}>{props.name}</Text>
    <Text style={styles.text}>{props.festival.name}</Text>
    <Text style={styles.text}>{props.members.length} membre{s}</Text>
    </>
  }

  return (
      <View style={styles.container}>
        {content}
      </View>
  );
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
    alignItems:'center',
    justifyContent:'center',
    borderColor:'#8AE0E0',
    borderWidth:3,
    borderRadius:20
  },
  title: {
    fontSize: 24,
    color: '#19525A',
    fontFamily: 'Poppins_600SemiBold'
  },
  text: {
    fontFamily: 'Poppins_400Regular',
    color: '#19525a',
    textAlign:'center'
  },

});