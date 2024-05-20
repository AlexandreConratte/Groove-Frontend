import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SearchScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>SearchScreen</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SearchResultsScreen')}>
        <Text>Search</Text>
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
