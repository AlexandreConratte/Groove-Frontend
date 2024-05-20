import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SearchResultsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>SearchResultsScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
