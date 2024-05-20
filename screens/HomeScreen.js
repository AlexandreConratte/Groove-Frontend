import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FestivalCard from '../components/FestivalCard';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Connect1')} style={styles.button}>
        <Text>Se connecter</Text>
      </TouchableOpacity>
      <FestivalCard key={1} festival={{name: 'Festival test1'}}/>
      <FestivalCard key={2} festival={{name: 'Festival test2'}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'yellow'
  }
});
