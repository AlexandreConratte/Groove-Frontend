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

export default function Friend(props) {
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
  let image = "https://res.cloudinary.com/dq5b1pmdu/image/upload/v1716199438/icon-image-not-found-free-vector_jccw05.jpg"
  if (!fontsLoaded) {
    return <Text></Text>;
  }

  if (props.picture) {
    image = props.picture
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{props.username}</Text>
        <Text>{props.city}</Text>
        <TouchableOpacity onPress={() => props.deleteFriend(props.token)} style={styles.icontrash}>
          <FontAwesome5 name='trash' size={25} color={'#19525A'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    width: '100%',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  image: {
    height: 130,
    width: 130,
    borderRadius: 100,
    borderColor: '#8AE0E0',
    borderWidth: 3,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 30,
    color: '#19525A',
    fontFamily: 'Poppins_600SemiBold'
  },
  textContainer: {
    width: '60%',
  },
  icontrash: {
    position: 'absolute',
    right: 10,
    top: 10,
  }
});