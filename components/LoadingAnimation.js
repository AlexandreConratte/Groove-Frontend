import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import {
    useFonts,
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  } from '@expo-google-fonts/poppins';

const LoadingAnimation = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={user.settings.nightMode ? nightModeStyle.container : styles.container}>
      <Animated.Text style={[styles.letter, { transform: [{ rotate }] }]}>
        G
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letter: {
    fontSize: 200,
    fontFamily:'Poppins_700Bold',
    color:'#15C2C2'
  },
});

const nightModeStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#19525A'
  },
})

export default LoadingAnimation;
