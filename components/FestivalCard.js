import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RecipeCard({ festival }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Festival', { festival })}>
      <View>
        <Text>{festival.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: (windowWidth / 2) - 10,
    maxHeight: 250,
  },
});