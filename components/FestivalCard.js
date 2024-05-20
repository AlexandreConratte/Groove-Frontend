import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FestivalCard(props) {
  const navigation = useNavigation()

  const start = new Date(props.start).toLocaleDateString()
  const end = new Date(props.end).toLocaleDateString()

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Festival', { ...props })}>
      <View style={styles.container}>
        <Image
          source={{ uri: "https://res.cloudinary.com/dq5b1pmdu/image/upload/v1716199438/icon-image-not-found-free-vector_jccw05.jpg" }}
          style={styles.image}
        />
        <View style={styles.textContainer} >
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.lieu}>{props.adress.place}</Text>
          <Text style={styles.date}>Du {start} au {end}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 230,
    borderColor: 'black',
    borderWidth: 1,
    margin: 5,
    borderRadius: 10,
    
  },
  image: {
    width: 118,
    height: 130,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  }
});