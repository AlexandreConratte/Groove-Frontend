import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ArtistCard({ props }) {

  return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image source={require('../assets/loupe-jaune.png')} style={styles.image}/>
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.name}>name</Text>
        </View>
      </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const imageSize = windowWidth * 0.8;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: '5%',
    width: (windowWidth / 4.44),
    height: (windowHeight / 4.44),
    margin: 8,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5
  },
  imageContainer: {
    height: '66%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#D2FFF4',
    borderTopRightRadius: '5%',
    borderTopLeftRadius: '5%',
    paddingTop: '3%'
  },
  textContainer: {
    height: '34%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {

  },
  image: {
    width: '95%',
    height: '80%',
    borderRadius: 1000,
    backgroundColor: 'white'
  },

});