import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('MyFestivals')} style={styles.button}>
        <Text>Mes Festivals</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MyMemories')} style={styles.button}>
        <Text>Souvenirs</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Festival')} style={styles.button}>
        <Text>Carte</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Friends')} style={styles.button}>
        <Text>Ami(e)s</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.button}>
        <Text>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.button}>
        <Text>Paramètres</Text>
      </TouchableOpacity>
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
