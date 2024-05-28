import { Dimensions, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from "react-redux";

const windowWidth = Dimensions.get('window').width;

export default function MenuScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  return (
    <View style={user.settings.nightMode ? nightModeStyle.container : styles.container}>
      <View style={user.settings.nightMode ? nightModeStyle.header : styles.header}>
        <Text style={user.settings.nightMode ? nightModeStyle.title1 : styles.title1}>Menu</Text>
      </View>
      <ScrollView>
        <View style={user.settings.nightMode ? nightModeStyle.itemContainer : styles.itemContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('MyFestivals')} style={user.settings.nightMode ? nightModeStyle.lightButton : styles.lightButton}>
            <FontAwesome5 name='heart' solid size={75} color={user.settings.nightMode ? '#ffeb86' : '#8BA8AC'}/>
            <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>Mes Festivals</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MyMemories')} style={user.settings.nightMode ? nightModeStyle.button : styles.button}>
            <FontAwesome5 name='book' size={75} color={user.settings.nightMode ? '#8AE0E0' : '#8AE0E0'}/>
            <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>Souvenirs</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Credits')} style={user.settings.nightMode ? nightModeStyle.button : styles.button}>
            <FontAwesome5 name='music' size={75} color={user.settings.nightMode ? '#8AE0E0' : '#8AE0E0'}/>
            <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>Crédits</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Friends')} style={user.settings.nightMode ? nightModeStyle.lightButton : styles.lightButton}>
            <FontAwesome5 name='user-friends' size={75} color={user.settings.nightMode ? '#ffeb86' : '#8BA8AC'}/>
            <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>Ami(e)s</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={user.settings.nightMode ? nightModeStyle.lightButton : styles.lightButton}>
            <FontAwesome5 name='user-alt' size={75} color={user.settings.nightMode ? '#ffeb86' : '#8BA8AC'}/>
            <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={user.settings.nightMode ? nightModeStyle.button : styles.button}>
            <FontAwesome5 name='tools' solid size={75} color={user.settings.nightMode ? '#8AE0E0' : '#8AE0E0'}/>
            <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>Paramètres</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 45,
    paddingTop: 35
  },
  button: {
    width: (windowWidth/2.5),
    height: (windowWidth/2.5),
    borderColor: '#8BA8AC',
    borderWidth: 5,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation:5,
    backgroundColor:'white'
  },
  lightButton: {
    width: (windowWidth/2.5),
    height: (windowWidth/2.5),
    borderColor: '#8AE0E0',
    borderWidth: 5,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation:5,
    backgroundColor:'white'
  },
  text: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#19525A',
    fontSize: 18,
    marginHorizontal: 10,
    marginTop: 2,
    textAlign: 'center',
  }
});

const nightModeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#19525A',
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
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 45,
    paddingTop: 35
  },
  button: {
    width: (windowWidth/2.5),
    height: (windowWidth/2.5),
    borderColor: '#ffeb86',
    borderWidth: 5,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation:5,
    backgroundColor:'#19525A'
  },
  lightButton: {
    width: (windowWidth/2.5),
    height: (windowWidth/2.5),
    borderColor: '#8AE0E0',
    borderWidth: 5,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation:5,
    backgroundColor:'#19525A'
  },
  text: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
    fontSize: 18,
    marginHorizontal: 10,
    marginTop: 2,
    textAlign: 'center',
  }
});