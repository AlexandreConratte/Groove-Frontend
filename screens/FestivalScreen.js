import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions } from 'react-native';
import { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ArtistCard from '../components/ArtistCard';
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
import Carousel from 'react-native-reanimated-carousel';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height; 

export default function FestivalScreen({ navigation, route: { params: { ...props } } }) {
  const [indexSelected, setIndexSelected] = useState(0);
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

  const images = props.pictures.map((url, index) => ({
    id: (index + 1).toString(),
    image: { uri: url }
  }));

  const start = props.start;
  const date = new Date(start);
  const startYear = date.getUTCFullYear();
  const startMonth = String(date.getUTCMonth() + 1).padStart(2, '0');
  const startDay = String(date.getUTCDate()).padStart(2, '0');

  const startDate = `${startDay}-${startMonth}-${startYear}`;

  const end = props.end;
  const dateEnd = new Date(end);
  const endYear = dateEnd.getUTCFullYear();
  const endMonth = String(dateEnd.getUTCMonth() + 1).padStart(2, '0');
  const endDay = String(dateEnd.getUTCDate()).padStart(2, '0');

  const endDate = `${endDay}-${endMonth}-${endYear}`;

  const artists = props.artists.map((e,i)=>{
    return <ArtistCard key={i} {...e}/>
  })

  const handleShare = () => {

  }
  if (!fontsLoaded) {
    return <Text></Text> ;
  }

  if (!fontsLoaded) {
    return <View></View>
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconArrow}>
          <FontAwesome5 name='arrow-left' size={33} color={'#19525A'}/>
        </TouchableOpacity>
        <Text style={[styles.festivalName]}>{props.name}</Text>
      </View>
      
      <ScrollView style={styles.main}>
        <View style={styles.carouselContainer}>
              <Carousel 
                loop
                width={windowWidth}
                height={windowHeight / 2.5}
                autoPlay={false}
                data={images}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => setIndexSelected(index)}
                renderItem={({ index }) => (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                    }}
                  >
                    <Image source={images[index].image} style={{ width: '100%', height: '100%' }} />
                  </View>
                )}
              />
              <View style={styles.iconContainer}>
                <View style={styles.iconHeart}>
                  <FontAwesome name='heart' size={30} color={'#FFFFFF'} style={styles.iconFontawesome}/>
                  <View style={styles.nbLikesContainer}>
                    <Text style={styles.nbLikes}>{props.nbLikes.length}</Text>
                  </View>
                </View>
                <FontAwesome name='share-square-o' size={30} color={'#FFFFFF'} style={styles.iconFontawesome} onPress={handleShare}/>
              </View>
              <View style={styles.paginationContainer}>
                {images.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.paginationDot,
                      index === indexSelected ? styles.activeDot : styles.inactiveDot,
                    ]}
                  />
                ))}
              </View>
          </View>
          
        <View style={styles.detailsContainer}>
            <View style={styles.locationContainer}>
              <FontAwesome name='map-marker' size={25} color={'#FF4848'}/>
              <Text style={[styles.blueText]}> : {props.adress.place}, {props.adress.city}</Text>
            </View>
            
          <View style={styles.dateContainer}>
            <Text  style={[styles.dateText]}>Du {startDate} Au {endDate}</Text>
          </View>
          <View style={styles.shortDescContainer}>
            <Text style={[styles.descriptionText, styles.text]}>{props.description}</Text>
          </View>
          <View style={styles.artistsContainer}>
            <Text style={[styles.lineUpText]}>Line Up :</Text>
            <ScrollView style={styles.artistsCardContainer} horizontal={true} pagingEnabled={false}>
              {artists}
            </ScrollView>
          </View>
          <View style={styles.longDescContainer}>
            <Text style={[styles.descriptionText, styles.text]}>{props.moreAbout}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  text: {
    fontFamily: 'Poppins_400Regular',
    color: '#19525A'
  }, 
  header: {
    height: '10%',
    width:'100%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'relative',
    borderBottomWidth: 3,
    borderBottomColor: '#15C2C2',
  },
  festivalName: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: '#19525A',
    paddingBottom: 5
  },
  iconArrow: {
    position: 'absolute',
    left: 9,
    height: '60%',
    width: '10%',
    marginBottom: 5
  },
  carouselContainer:{
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    alignItems: 'center',
  },
  iconHeart: {
    alignItems: 'center',
  },
  iconFontawesome: {
    textShadowColor: 'rgba(25, 82, 90, 1)',
    textShadowOffset: {width: 1.5, height: 1},
    textShadowRadius: 0
  },
  nbLikesContainer: {
    backgroundColor: 'rgba(162, 162, 162, 0.7)',
    width: 35,
    borderRadius: 25,
    marginTop: 2.5,
    marginBottom: 10,
    borderColor: '#19525A'
  },
  nbLikes: {
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
    textAlign: 'center'
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
  },
  paginationDot: {
    width: 17,
    height: 17,
    borderRadius: 17,
    marginHorizontal: 2,
  },
  activeDot: {
    backgroundColor: '#15C2C2',
  },
  inactiveDot: {
    backgroundColor: '#D2FFF4',
  },
  detailsContainer: {
   
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#19525A',
    borderTopColor: '#15C2C2',
    borderTopWidth: 3,
    marginBottom: 5,
  },
  dateContainer:{
    marginHorizontal: 10,
  },
  blueText: {
    color: '#D2FFF4',
    fontFamily: 'Poppins_400Regular',
  },
  shortDescContainer: {
    marginLeft: 10,
    marginRight: 10,
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
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 15
  },
  lineUpText: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#19525A',
  },
  dateText: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#19525A',
  },
});
