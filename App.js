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
import FontAwesome from 'react-native-vector-icons/FontAwesome';


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
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
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
            <View style={{ position: 'absolute', top: -50, backgroundColor: '#15C2C2', width: windowWidth/3.5, height: windowWidth / 3.5, borderRadius: windowWidth / 6.4, borderColor:'#19525A', borderWidth: 2, alignItems: 'center', justifyContent: 'center'}}>
              <Image source={iconSource} style={{ width: windowWidth/3, height: windowHeight/8 ,padding: 0, left: 5.5, bottom: 2}} />
            </View>
          );
        }
        ;
      },
      tabBarShowLabel: false,
      tabBarStyle: {backgroundColor: '#19525A', width: windowWidth, height: (windowHeight/10)},
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
       <Stack.Screen name="MyFestivals" component={MyFestivals} />
       <Stack.Screen name="MyMemories" component={MyMemories} />
       <Stack.Screen name="Profile" component={Profile} />
       <Stack.Screen name="Settings" component={Settings} />
     </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
