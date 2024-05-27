import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions, Modal } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateLikedFestival, updateMemoriesFestival } from '../reducers/user';
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

const BACKEND_URL = "https://backend-groove.vercel.app";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height; 

export default function FestivalScreen({ navigation, route: { params: { ...props } } }) {
  const [indexSelected, setIndexSelected] = useState(0);
  const [nbLike, setNbLike] = useState(0);
  const [modalisVisible, setModalisVisible] = useState(false);
  const dispatch = useDispatch();

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
  const user = useSelector((state) => state.user.value);

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

  useEffect(() => {
    fetch(`${BACKEND_URL}/festivals/nbLikes`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ festivalId: props._id}),
    }).then(response => response.json())
    .then(data => {
      if (data.result) {
        setNbLike(data.nbLike)
      }
    })
  },[user])

  const artists = props.artists.map((e,i)=>{
    return <ArtistCard key={i} {...e}/>
  })

  const handleHeart = () => {
    if(user.token) {
      fetch(`${BACKEND_URL}/users/likeDislikeFestival`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: user.token, festivalId: props._id}),
      }).then(response => response.json())
      .then(data => {
        const festivalIds = data.likedFestivals.map(festival => festival);
        dispatch(updateLikedFestival(festivalIds));
      })
    } else {
      setModalisVisible(true)
    }
  }

  const handleShare = () => {

  }

  const handleCheckbox = () => {
    if(user.token) {
      fetch(`${BACKEND_URL}/users/MemFest`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: user.token, festivalId: props._id}),
      }).then(response => response.json())
      .then(data => {
        const festivalsIds = data.memoriesFestivals.map(festival => festival);
        dispatch(updateMemoriesFestival(festivalsIds));
      })
    } else {
      setModalisVisible(true)
    }
  }

  const GotoConnect = () => {
    navigation.navigate('Connect1');
    setModalisVisible(false)
  }

  const GoBack = () => {
    setModalisVisible(false)
  }  

  if (!fontsLoaded) {
    return <Text></Text> ;
  }

  return (
    <View style={user.settings.nightMode ? nightModeStyle.container : styles.container}>
      <View style={user.settings.nightMode ? nightModeStyle.header : styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={user.settings.nightMode ? nightModeStyle.iconArrow : styles.iconArrow}>
          <FontAwesome5 name='arrow-left' size={33} color={user.settings.nightMode ? '#FFFFFF' : '#19525A'}/>
        </TouchableOpacity>
        <Text style={[user.settings.nightMode ? nightModeStyle.festivalName : styles.festivalName]}>{props.name}</Text>
      </View>
      
      <ScrollView style={user.settings.nightMode ? nightModeStyle.main : styles.main}>
        <View style={user.settings.nightMode ? nightModeStyle.carouselContainer : styles.carouselContainer}>
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
              <View style={user.settings.nightMode ? nightModeStyle.iconContainer : styles.iconContainer}>
                <View style={user.settings.nightMode ? nightModeStyle.iconHeart : styles.iconHeart}>
                  <TouchableOpacity onPress={handleHeart}>
                    {(user.likedFestivals.some(festival => festival === props._id)) ? <FontAwesome name='heart' size={30} color={'#FF4848'} style={styles.iconFontawesome}/> : 
                    <FontAwesome name='heart' size={30} color={'#FFFFFF'} style={styles.iconFontawesome}/>}
                    
                  </TouchableOpacity>
                  <View style={user.settings.nightMode ? nightModeStyle.nbLikesContainer : styles.nbLikesContainer}>
                    <Text style={user.settings.nightMode ? nightModeStyle.nbLikes : styles.nbLikes}>{nbLike}</Text>
                  </View>
                </View>
                <FontAwesome name='share-square-o' size={30} color={'#FFFFFF'} style={styles.iconFontawesome} onPress={handleShare}/>
              </View>
              <View style={user.settings.nightMode ? nightModeStyle.paginationContainer : styles.paginationContainer}>
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

      <Modal visible={modalisVisible} transparent={true} style={user.settings.nightMode ? nightModeStyle.modalBackground : styles.modalBackground}>
        <View style={user.settings.nightMode ? nightModeStyle.modalBackground : styles.modalBackground}>

          <View style={user.settings.nightMode ? nightModeStyle.modalContainer : styles.modalContainer}>
            <Text style={user.settings.nightMode ? nightModeStyle.welcomeText : styles.welcomeText}>Tu n'es toujours pas connecté !</Text>
            <Text style={user.settings.nightMode ? nightModeStyle.descripText : styles.descripText}>Pour accéder à cette fonctionnalité</Text>
            <TouchableOpacity onPress={() => GotoConnect()} style={user.settings.nightMode ? nightModeStyle.GotoConnectButton : styles.GotoConnectButton}>
              <Text style={user.settings.nightMode ? nightModeStyle.connect : styles.connect}>Connecte Toi</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => GoBack()} style={user.settings.nightMode ? nightModeStyle.GoToApp : styles.GoToApp}>
              <Text style={user.settings.nightMode ? nightModeStyle.acced : styles.acced}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
          
        <View style={user.settings.nightMode ? nightModeStyle.detailsContainer : styles.detailsContainer}>
            <View style={user.settings.nightMode ? nightModeStyle.locationContainer : styles.locationContainer}>
              <FontAwesome name='map-marker' size={25} color={'#FF4848'}/>
              <Text style={ user.settings.nightMode ? nightModeStyle.nightText : styles.blueText }> : {props.adress.place}, {props.adress.city}</Text>
            </View>

          <View style={user.settings.nightMode ? nightModeStyle.shortDescContainer : styles.shortDescContainer}>
            <Text style={user.settings.nightMode ? nightModeStyle.descriptionText : styles.descriptionText}>{props.description}</Text>
          </View>

          <View style={user.settings.nightMode ? nightModeStyle.listContainer : styles.listContainer}>
            <View style={user.settings.nightMode ? nightModeStyle.listItem : styles.listItem}>
              <Text style={user.settings.nightMode ? nightModeStyle.bulletPoint : styles.bulletPoint}>• </Text>
              <Text  style={user.settings.nightMode ? nightModeStyle.FlatListText : styles.FlatListText}>Du <Text style={user.settings.nightMode ? nightModeStyle.BoldText : styles.BoldText}>{startDate}</Text> au <Text style={user.settings.nightMode ? nightModeStyle.BoldText : styles.BoldText}>{endDate}</Text></Text>
            </View>
            <View style={user.settings.nightMode ? nightModeStyle.listItem : styles.listItem}>
              <Text style={user.settings.nightMode ? nightModeStyle.bulletPoint : styles.bulletPoint}>• </Text>
              <Text style={user.settings.nightMode ? nightModeStyle.FlatListText : styles.FlatListText}>Nombre Moyen de participants : <Text style={user.settings.nightMode ? nightModeStyle.BoldText : styles.BoldText}>{props.averageParticipant}</Text></Text>
            </View>
            <View style={user.settings.nightMode ? nightModeStyle.listItem : styles.listItem}>
              <Text style={user.settings.nightMode ? nightModeStyle.bulletPoint : styles.bulletPoint}>• </Text>
              <Text style={user.settings.nightMode ? nightModeStyle.FlatListText : styles.FlatListText}>J'ai déjà participé à ce festival :  </Text>
              <Checkbox
                style={user.settings.nightMode ? nightModeStyle.checkbox : styles.checkbox}
                value={(user.memoriesFestivals.some(festival => festival === props._id))}
                onValueChange={handleCheckbox}
                color={user.settings.nightMode ? ((user.memoriesFestivals.some(festival => festival === props._id)) ? '#15C2C2' : '#FFFFFF') : ((user.memoriesFestivals.some(festival => festival === props._id)) ? '#15C2C2' : '#19525A')}
              />
            </View>
          </View>

          <View style={user.settings.nightMode ? nightModeStyle.artistsContainer : styles.artistsContainer}>
            <Text style={[styles.lineUpText, user.settings.nightMode ? nightModeStyle.text : null]}>Line Up :</Text>
            <ScrollView style={user.settings.nightMode ? nightModeStyle.artistsCardContainer : styles.artistsCardContainer} horizontal={true} pagingEnabled={false}>
              {artists}
            </ScrollView>
          </View>
          <View style={user.settings.nightMode ? nightModeStyle.longDescContainer : styles.longDescContainer}>
            <Text style={user.settings.nightMode ? nightModeStyle.descriptionText : styles.descriptionText}>{props.moreAbout}</Text>
          </View>
          
        </View>
      </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontFamily: 'Poppins_400Regular',
    color: '#19525A'
  }, 
  header: {
    height: '10%',
    width:'100%',
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
    marginHorizontal: 10,
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#19525A',
    marginTop: 5
  },
  listContainer: {
    borderTopColor: '#19525A',
    borderTopWidth: 3,
  },
  listItem: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  bulletPoint: {
    
  },
  checkbox: {
    color: '#19525A',
    height: 20,
    width: 20
  },
  lineUpText: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#19525A',
  },
  FlatListText: {
    color: '#19525A',
    fontFamily: 'Poppins_400Regular',
  },
  BoldText: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#19525A',
  },
  GotoConnectButton: {
    backgroundColor: '#19525a',
    height: 50,
    width: 195,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
    color: "white"

  },
  GoToApp: {
    backgroundColor: '#FFE45D',
    height: 30,
    width: 140,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  modalContainer: {
    width: 274,
    height: 292,
    justifyContent: 'center',
    backgroundColor: "white",
    borderColor: '#19525a',
    borderWidth: 3,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: 'Poppins_400Regular',
    color: '#19525A',
    margin: 5,
    textAlign: "center",
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 10,
    textShadowColor: '#19525a',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  descripText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: 'Poppins_400Regular',
    color: '#19525A',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connect: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: 'Poppins_400Regular',
  },
  acced: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: 'Poppins_400Regular',
  },
});

const nightModeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#19525A'
  },
  text: {
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF'
  }, 
  nightText: {
    fontFamily: 'Poppins_400Regular',
    color: '#19525A',
    fontSize: 16
  },
  header: {
    height: '10%',
    width:'100%',
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
    color: '#FFFFFF',
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
    borderColor: '#FFFFFF'
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
    backgroundColor: '#FFFFFF',
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
    borderTopColor: '#FFFFFF',
    borderTopWidth: 3,
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 3,
  },
  artistsCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  longDescContainer: {
    marginHorizontal: 10,
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
    marginTop: 5
  },
  listContainer: {
    borderTopColor: '#FFFFFF',
    borderTopWidth: 3,
  },
  listItem: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  bulletPoint: {
    color: '#FFFFFF'
  },
  checkbox: {
    color: '#FFFFFF',
    height: 20,
    width: 20
  },
  lineUpText: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
  FlatListText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins_400Regular',
    fontSize: 16
  },
  BoldText: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
  GotoConnectButton: {
    backgroundColor: '#19525a',
    height: 50,
    width: 195,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
    color: "white"

  },
  GoToApp: {
    backgroundColor: '#FFE45D',
    height: 30,
    width: 140,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  modalContainer: {
    width: 274,
    height: 292,
    justifyContent: 'center',
    backgroundColor: "white",
    borderColor: '#19525a',
    borderWidth: 3,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: 'Poppins_400Regular',
    color: '#19525A',
    margin: 5,
    textAlign: "center",
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 10,
    textShadowColor: '#19525a',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  descripText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: 'Poppins_400Regular',
    color: '#19525A',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connect: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: 'Poppins_400Regular',
  },
  acced: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: 'Poppins_400Regular',
  },
})