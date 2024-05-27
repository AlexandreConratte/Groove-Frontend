import { Dimensions, TextInput, Modal, StyleSheet, Text, TouchableOpacity, View, ScrollView, ImageBackground } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Group from '../components/Group';
import Friend from '../components/Friend';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

const BACKEND_URL = "https://backend-groove.vercel.app"

export default function GroupScreen({ route, navigation }) {
    let [fontsLoaded] = useFonts({
        Poppins_100Thin,
        Poppins_200ExtraLight,
        Poppins_300Light,
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
        Poppins_800ExtraBold,
        Poppins_900Black,
    });
    const user = useSelector((state) => state.user.value)
    const objet = route.params;
    if (!fontsLoaded) {
        return <Text></Text>;
    }

    console.log(route.params)


    if (objet){
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate('Friends')} style={styles.iconArrow}>
                        <FontAwesome5 name='arrow-left' size={33} color={'#19525A'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addUser}>
                        <FontAwesome5 name='user-plus' size={33} color={'#19525A'} />
                    </TouchableOpacity>
                    <Text style={styles.groupName}>{objet.name}</Text>
                </View>
            </View>
        )
    }
    else{
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate('Friends')} style={styles.iconArrow}>
                        <FontAwesome5 name='arrow-left' size={33} color={'#19525A'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addUser}>
                        <FontAwesome5 name='user-plus' size={33} color={'#19525A'} />
                    </TouchableOpacity>
                    <Text style={styles.groupName}>Nouveau Groupe</Text>
                </View>
                <View>

                </View>
            </View>
        )
    }
}

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
    title2: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 16,
        color: '#19525A',
        margin: 10
    },
    iconArrow: {
        position: 'absolute',
        left: 9,
        height: '60%',
        width: '10%',
        marginBottom: 5
    },
    addUser: {
        position: 'absolute',
        right: 9,
        height: '60%',
        width: '10%',
        marginBottom: 5
    },
    groupName: {
        fontSize: 20,
        fontFamily: 'Poppins_600SemiBold',
        color: '#19525A',
    },
});
