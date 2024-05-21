import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Connect4Screen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name='arrow-left' size={30} color="#19525a" />
        </TouchableOpacity>
        <Text style={styles.title}>Connect</Text>
      </View>
      <View>
      <TouchableOpacity onPress={() => validFields()} style={styles.nextButton}>
          <Text style={styles.nextText}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 86,
    justifyContent: "space-around",
    borderBottomColor: '#19525A',
    borderBottomWidth: 3,
    width: Dimensions.get('window').width,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    alignContent: "center",
  },
  title: {
    fontSize: 40,
    color: '#19525a',
    fontWeight: "500",
  },
  nextButton: {
    backgroundColor: '#19525a',
    height: 76,
    width: 264,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20


  },
  nextText: {
    fontWeight: "600",
    color: "white",
    fontSize: 25
  },
});
