import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Switch, Platform } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { updateNightMode } from '../reducers/user';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height; 

const BACKEND_URL = "https://backend-groove.vercel.app";

export default function SettingsScreen({ navigation }) {
  const [isEnabledNightMode, setIsEnabledNightMode] = useState(false);
  const [isEnabledNotifications, setIsEnabledNotifications] = useState(false);

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect(()=>{
    setIsEnabledNightMode(user.settings.nightMode)
  },[])

  const toggleSwitch = () => {
    if(user.token){
      fetch(`${BACKEND_URL}/settings/mode`,{
      method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token: user.token, nightMode: !isEnabledNightMode}),
    }).then(response => response.json())
    .then(data => {
      if(data.result){
        setIsEnabledNightMode(previousState => !previousState)};
        dispatch(updateNightMode(data.nightMode))
      })
    } else {
        setIsEnabledNightMode(previousState => !previousState);
        dispatch(updateNightMode(!isEnabledNightMode));
    }
  }

  const toggleSwitchNotifications = () => {setIsEnabledNotifications(previousState => !previousState)};

  return (
    <View style={user.settings.nightMode ? nightModeStyle.container : styles.container}>
      <View style={user.settings.nightMode ? nightModeStyle.header : styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={user.settings.nightMode ? nightModeStyle.iconArrow : styles.iconArrow}>
          <FontAwesome5 name='arrow-left' size={33} color={user.settings.nightMode ? '#FFFFFF' : '#19525A'}/>
        </TouchableOpacity>
        <Text style={ user.settings.nightMode ? nightModeStyle.title1 : styles.title1}>Paramètres</Text>
      </View>
      <View style={ user.settings.nightMode ? nightModeStyle.settingsContainer : styles.settingsContainer}>
        <View style={ user.settings.nightMode ? nightModeStyle.setting : styles.setting}>
          <Text style={ user.settings.nightMode ? nightModeStyle.text : styles.text}>Mode Nuit</Text>
          <Switch 
          trackColor={{ false: '#19525A', true: '#FFE45D' }}
          thumbColor={isEnabledNightMode ? '#19525A' : '#FFE45D'}
          onValueChange={toggleSwitch}
          value={isEnabledNightMode}
          />
        </View>
        <View style={ user.settings.nightMode ? nightModeStyle.setting : styles.setting}>
          <Text style={ user.settings.nightMode ? nightModeStyle.text : styles.text}>Notifications</Text>
          <Switch 
          trackColor={{ false: '#19525A', true: '#FFE45D' }}
          thumbColor={isEnabledNotifications ? '#19525A' : '#FFE45D'}
          onValueChange={toggleSwitchNotifications}
          value={isEnabledNotifications}
          />
        </View>
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
  text: {
    color: '#19525A',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    borderBottomColor: '#19525A',
    borderBottomWidth: 2,
    padding: 8
  },
  settingsContainer: {
    marginVertical: 25
  }
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
  text: {
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 2,
    padding: 8
  },
  settingsContainer: {
    marginVertical: 25
  }
})
