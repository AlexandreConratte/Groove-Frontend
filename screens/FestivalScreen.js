import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions } from 'react-native';
import { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ArtistCard from '../components/ArtistCard';
import { Poppins_Regular } from "@expo-google-fonts/poppins";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height; 

export default function FestivalScreen({ navigation, route: { params: { festival } } }) {
  const [indexSelected, setIndexSelected] = useState(0);

  const onSelect = indexSelected => {
    setIndexSelected(indexSelected);
  };

  const images = [
    { id: '1', image: require('../assets/Pendu.png') },
    { id: '2', image: require('../assets/Pendu.png') },
    { id: '3', image: require('../assets/Pendu.png') },
  ]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconArrow}>
          <FontAwesome5 name='arrow-left' size={40} color={'#19525A'}/>
        </TouchableOpacity>
        <Text>Name Festival</Text>
      </View>
    <View style={styles.main}>
      <View style={styles.imageContainer}>
        <View style={styles.carouselContainer}>

        </View>
        <View>
          <FontAwesome name='heart' size={30}/>
          <Text>445</Text>
        </View>
        <FontAwesome name='share-square-o' size={30}/>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.dateLocationContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.blueText}>Date : xx/xx/xxxx</Text>
          </View>
          <View style={styles.locationContainer}>
            <FontAwesome name='map-marker' size={25} color={'#FF4848'}/>
            <Text style={styles.blueText}> : Place, City</Text>
          </View>
        </View>
        
        <View style={styles.shortDescContainer}>
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
        </View>
        <View style={styles.artistsContainer}>
          <Text>Line Up :</Text>
          <View style={styles.artistsCardContainer}>
            <ArtistCard/>
            <ArtistCard/>
          </View>
        </View>
        <View style={styles.longDescContainer}>
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</Text>
        </View>
      </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  header: {
    height: '10%',
    width:'100%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderBottomWidth: 3,
    borderBottomColor: '#15C2C2'
  },
  festivalName: {
    fontFamily: 'Poppins_Regular'
  },
  iconArrow: {
    position: 'absolute',
    left: 9,
    height: '60%',
    width: '10%'
  },
  main: {
    flexWrap: 'wrap'
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
    height: '35%',
    width: '100%',
  },
  carouselContainer:{

  },
  detailsContainer: {
    height: '55%',
  },
  dateLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '10%',
    backgroundColor: '#19525A',
    borderTopColor: '#15C2C2',
    borderTopWidth: 3,
    paddingLeft: 4,
    paddingRight: 4,
    marginBottom: 16,
    
  },
  dateContainer:{

  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blueText: {
    color: '#D2FFF4'
  },
  shortDescContainer: {
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 16,
  },
  artistsContainer: {
    marginBottom: 16,
    padding: 8,
    borderTopColor: '#19525A',
    borderTopWidth: 3,
    borderBottomColor: '#19525A',
    borderBottomWidth: 3,
  },
  artistsCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  longDescContainer: {
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 16,
  },
});
