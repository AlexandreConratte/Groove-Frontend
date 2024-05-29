import "react-native-reanimated";
import { StyleSheet, Dimensions, Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import Connect1 from './screens/Connect1Screen';
import Connect2 from './screens/Connect2Screen';
import Connect3 from './screens/Connect3Screen';
import Connect4 from './screens/Connect4Screen';
import Connect5 from './screens/Connect5Screen';
import SearchScreen from './screens/SearchScreen';
import SearchResultsScreen from './screens/SearchResultsScreen';
import Friends from './screens/FriendsScreen';
import MyFestivals from './screens/MyFestivalsScreen';
import MyMemories from './screens/MyMemoriesScreen';
import Profile from './screens/ProfileScreen';
import Settings from './screens/SettingsScreen';
import Festival from './screens/FestivalScreen';
import Group from './screens/GroupScreen';
import GroupCreation from './screens/GroupCreationScreen';
import Credits from './screens/CreditsScreens';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useSelector } from "react-redux";
import user from "./reducers/user";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const store = configureStore({
  reducer: { user },
 });

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="SearchResultsScreen" component={SearchResultsScreen} />
    </Stack.Navigator>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height; 

const TabNavigator = () => {
  const User = useSelector((state) => state.user.value);
  const borderColor = User.settings.nightMode ? '#FFFFFF' : '#19525A';
  const borderTopColor = User.settings.nightMode ? '#FFFFFF' : '#19525A';
  
  return (
    <Tab.Navigator 
      initialRouteName="Home"
      screenOptions={({ route }) => ({
      tabBarIcon: ({ color, focused }) => {
 
        if (route.name === 'Home') {
          return <FontAwesome name='home' size={windowHeight/18} color={color} />
        } else if (route.name === 'Menu') {
          return <FontAwesome name='navicon' size={windowHeight/18} color={color} />
        } else if (route.name === 'SearchStack') {
          const iconSource = focused
            ? require('./assets/loupe-jaune.png')
            : require('./assets/loupe-blanche.png');
          return (
            <View style={[styles.searchIconContainer, { borderColor }]}>
              <Image source={iconSource} style={styles.searchIcon} />
            </View>
          );
        }
        ;
      },
      tabBarShowLabel: false,
      tabBarStyle: {backgroundColor: '#19525A', width: windowWidth, height: (windowHeight/10), borderTopWidth: 3, borderTopColor },
      tabBarActiveTintColor: '#FFE45E',
      tabBarInactiveTintColor: 'white',
      headerShown: false,
    })}>
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="SearchStack" component={SearchStackNavigator} />
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
 }

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
     <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen name="TabNavigator" component={TabNavigator} />
       <Stack.Screen name="Connect1" component={Connect1} />
       <Stack.Screen name="Connect2" component={Connect2} />
       <Stack.Screen name="Connect3" component={Connect3} />
       <Stack.Screen name="Connect4" component={Connect4} />
       <Stack.Screen name="Connect5" component={Connect5} />
       <Stack.Screen name="Festival" component={Festival} />
       <Stack.Screen name="Friends" component={Friends} />
       <Stack.Screen name="Group" component={Group} />
       <Stack.Screen name="GroupCreation" component={GroupCreation} />
       <Stack.Screen name="MyFestivals" component={MyFestivals} />
       <Stack.Screen name="MyMemories" component={MyMemories} />
       <Stack.Screen name="Profile" component={Profile} />
       <Stack.Screen name="Settings" component={Settings} />
       <Stack.Screen name="Credits" component={Credits} />
     </Stack.Navigator>
   </NavigationContainer>
   </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIconContainer: {
    position: 'absolute',
    top: -50,
    backgroundColor: '#15C2C2',
    width: windowWidth / 3.5,
    height: windowWidth / 3.5,
    borderRadius: windowWidth / 6.4,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    width: windowWidth / 3,
    height: windowHeight / 8,
    padding: 0,
    left: 5.5,
    bottom: 2,
  },
});
