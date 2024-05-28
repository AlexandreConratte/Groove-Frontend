import { Dimensions, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function CreditsScreen ({navigation})  {
    const user = useSelector((state) => state.user.value);

    return (
        <View style={user.settings.nightMode ? nightModeStyle.container : styles.container}>
            <View style={user.settings.nightMode ? nightModeStyle.header : styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={styles.iconArrow}>
                <FontAwesome5 name='arrow-left' size={33} color={user.settings.nightMode ? '#FFFFFF' : '#19525A'}/>
                </TouchableOpacity>
                <Text style={user.settings.nightMode ? nightModeStyle.title1 : styles.title1}>Crédits</Text>
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
})