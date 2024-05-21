import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'



export default function FestivalCard(props) {
  const navigation = useNavigation()
  const start = new Date(props.start).toLocaleDateString()
  const end = new Date(props.end).toLocaleDateString()
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
        {timeLeft}
        {distance}
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
    width: 170,
    height: 330,
    borderColor: '#19525A',
    borderWidth: 1,
    margin: 5,
    borderRadius: 10,

  },
  image: {
    width: 170,
    height: 170,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    padding: 5,
  },
  title: {
    fontSize: 18,
    color: '#19525A',
    fontWeight: 'bold',
    textAlign:'center'
  },
  text: {
    fontSize: 14,
    color: '#19525A',
    width: 140
  },
  textBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    paddingLeft: 14
  },
  fav: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
  timeLeft: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    left: 10,
    top: 10,
    paddingHorizontal:5,
    borderRadius:5,
    color:"#19525A",
    fontWeight:'bold'
  },
  distance: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    left: 10,
    top: 10,
    paddingHorizontal:5,
    borderRadius:5,
    color:"#19525A",
    fontWeight:'bold'
  }
});