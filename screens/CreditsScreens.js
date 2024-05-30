import { Animated, Dimensions, StyleSheet, Platform, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useRef, useEffect } from 'react';
const { height: screenHeight } = Dimensions.get('window');

export default function CreditsScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const scrollY = useRef(new Animated.Value(screenHeight)).current;

  useEffect(() => {
    const animation = Animated.sequence([
      Animated.timing(scrollY, {
        toValue: -screenHeight,
        duration: 20000,
        useNativeDriver: true,
      }),
      Animated.timing(scrollY, {
        toValue: screenHeight,
        duration: 0,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(animation).start();
  }, []);

  return (
    <View style={user.settings.nightMode ? nightModeStyle.container : styles.container}>
      <View style={user.settings.nightMode ? nightModeStyle.header : styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={styles.iconArrow}>
          <FontAwesome5 name='arrow-left' size={33} color={user.settings.nightMode ? '#FFFFFF' : '#19525A'} />
        </TouchableOpacity>
        <Text style={user.settings.nightMode ? nightModeStyle.title1 : styles.title1}>Crédits</Text>
      </View>
      <View style={user.settings.nightMode ? nightModeStyle.animationContainer : styles.animationContainer}>
        <Animated.View style={[user.settings.nightMode ? nightModeStyle.contentContainer : styles.contentContainer, { transform: [{ translateY: scrollY }] }]}>
          <Text style={user.settings.nightMode ? nightModeStyle.title : styles.title}>Groove</Text>
          <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>by</Text>
          <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>Camille Urbaniak</Text>
          <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>Alexandre Conratte</Text>
          <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>Louis Catteau</Text>
          <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>La Capsule</Text>
          <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>batch 125, Lille</Text>
        </Animated.View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    height: 86,
    justifyContent: 'flex-end',
    borderBottomColor: '#19525A',
    borderBottomWidth: 3,
    width: Dimensions.get('window').width,
    alignItems: 'center',

  },
  title1: {
    fontSize: 30,
    color: '#19525A',
    fontFamily: 'Poppins_600SemiBold'
  },
  iconArrow: {
    position: 'absolute',
    left: 9,
    height: '60%',
    width: '10%',
    marginBottom: 5
  },
  // nouveau
  contentContainer: {
    alignItems: 'center',
  },
  text: {
    marginVertical: 20,
    fontSize: 30,
    fontFamily: 'Poppins_600SemiBold',
    color: '#19525A',
    textShadowColor: '#15C2C2',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    width: '100%',
    textAlign: 'center'
  },
  title: {
    fontFamily: 'Poppins_800ExtraBold',
    color: '#19525A',
    fontSize: 70,
    marginVertical: 20,
    textShadowColor: '#15C2C2',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
 
});

const nightModeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#19525A'
  },
  header: {
    height: 86,
    justifyContent: 'flex-end',
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 3,
    width: Dimensions.get('window').width,
    alignItems: 'center',

  },
  title1: {
    fontSize: 30,
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold'
  },
  iconArrow: {
    position: 'absolute',
    left: 9,
    height: '60%',
    width: '10%',
    marginBottom: 5
  },
  
  // nouveau
  contentContainer: {
    alignItems: 'center',
  },
  text: {
    marginVertical: 20,
    fontSize: 30,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
    textShadowColor: '#15C2C2',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    width: '100%',
    textAlign: 'center'
  },
  title: {
    fontFamily: 'Poppins_800ExtraBold',
    color: '#FFFFFF',
    fontSize: 70,
    marginVertical: 20,
    textShadowColor: '#15C2C2',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
})