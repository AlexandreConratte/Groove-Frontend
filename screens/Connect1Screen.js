import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Connect1Screen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome name='arrow-left' size={30}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Connect2')} style={styles.button}>
        <Text>Connect1Screen Suivant</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'yellow'
  }
});
