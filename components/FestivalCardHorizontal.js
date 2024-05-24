import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, Platform, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { updateLikedFestival } from '../reducers/user';
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
  const [modalisVisible, setModalisVisible] = useState(false);
  const user = useSelector((state) => state.user.value);
  const navigation = useNavigation();
  const start = new Date(props.start).toLocaleDateString();
  const end = new Date(props.end).toLocaleDateString();
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
  if (!fontsLoaded) {
    return <Text></Text> ;
  }

  const BACKEND_URL = "https://backend-groove.vercel.app";

  const handleHeart = () => {
    if(user.token){
      fetch(`${BACKEND_URL}/users/likeDislikeFestival`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: user.token, festivalId: props._id}),
      }).then(response => response.json())
      .then(data => {
        const festivalIds = data.likedFestivals.map(festival => festival);
        dispatch(updateLikedFestival(festivalIds));
      })  
    } else {
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
    <>
      <TouchableOpacity onPress={() => navigation.navigate('Festival', { ...props })}>
        <View style={styles.container}>
          <Image
            source={{ uri: image }}
            style={styles.image}
          />
          <TouchableOpacity style={styles.fav} onPress={handleHeart}>
            {(user.likedFestivals.some(festival => festival === props._id)) ? (
              <FontAwesome name="heart" size={22} color={"#FF4848"} />
              ) : (
              <FontAwesome name="heart-o" size={22} color={"#19525A"} />
              )}
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <View style={styles.titleBox}>
              <Text style={styles.title}>{props.name}</Text>
            </View>
            <View style={styles.textBox}>
              <MaterialIcons name="location-pin" color={'#FF4848'} size={14} />
              <Text style={styles.text}>{props.adress.place}, {props.adress.city}</Text>
            </View>
            <View style={styles.date}>
              <Text style={styles.text}>Du {start}{"\n"}Au {end}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <Modal visible={modalisVisible} transparent={true} style={styles.modalBackground}>
        <View style={styles.modalBackground}>

          <View style={styles.modalContainer}>
            <Text style={styles.welcomeText}>Tu n'es toujours pas connecté !</Text>
            <Text style={styles.descripText}>Pour accéder à cette fonctionnalité</Text>
            <TouchableOpacity onPress={() => GotoConnect()} style={styles.GotoConnectButton}>
              <Text style={styles.connect}>Connecte Toi</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => GoBack()} style={styles.GoToApp}>
              <Text style={styles.acced}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
    
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
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBox: {
    width: '100%',
    alignItems: 'center'
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