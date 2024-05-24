import { Dimensions, TextInput, StyleSheet, Text, TouchableOpacity, View, ScrollView, ImageBackground } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Group from '../components/Group';
import Friend from '../components/Friend';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const BACKEND_URL = "https://backend-groove.vercel.app"

export default function FriendsScreen({ navigation }) {
  const user = useSelector((state) => state.user.value)
  const [dataGroups, setdataGroups] = useState([]);
  const [focusedInput, setFocusedInput] = useState(null)
  const [query, setquery] = useState('');
  const [dataFriends, setdataFriends] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/groups/findAllByUsername`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token }),
    })
      .then((response) => response.json())
      .then((data) => setdataGroups(data.groups))
  }, []);

  useEffect(() => {
    fetch(`${BACKEND_URL}/users/getAllFriends`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token }),
    })
      .then((response) => response.json())
      .then((data) => setdataFriends(data.friends))
  }, []);

  const friends = dataFriends.map((e, i) => {
    return (<Friend key={i} {...e} />)
  })

  const groups = dataGroups.map((e, i) => {
    return (<Group key={i} {...e} />)
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={styles.iconArrow}>
          <FontAwesome5 name='arrow-left' size={33} color={'#19525A'} />
        </TouchableOpacity>
        <Text style={styles.title1}>Mes ami(e)s</Text>
      </View>
      <ScrollView>
        <View style={styles.pictureContainer}>
          <ImageBackground source={{ uri: "https://res.cloudinary.com/dq5b1pmdu/image/upload/v1716536230/Festival-de-musique_amis_oar251.jpg" }} resizeMode="cover" style={styles.image}>
            <TouchableOpacity style={styles.addFriendContainer}>
              <Text style={styles.addFriends}>Ajouter des amis</Text>
              <FontAwesome5 name='user-plus' size={13.5} color={'#15C2C2'} />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View style={styles.groups}>
          <Text style={styles.title2}>Mes groupes :</Text>
          <ScrollView contentContainerStyle={styles.groupsContainer} horizontal={true}>
            {groups}
            <Group />
          </ScrollView>
        </View>
        <View style={styles.friendsContainer}>
          <Text style={styles.title2}>Mes amis :</Text>
          <TextInput
            style={[styles.input, { borderColor: focusedInput === 'friend' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'friend' ? 2 : 1 }
            ]}
            onFocus={() => setFocusedInput('friend')}
            onBlur={() => setFocusedInput(null)}
            placeholder="Rechercher"
            placeholderTextColor='#19525a'
            value={query}
            onChangeText={(text) => setquery(text)}
          />
          <View style={styles.scrollView}>
            {friends}
          </View>
        </View>
      </ScrollView>
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
  pictureContainer: {
    height: 172
  },
  addFriendContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#19525A',
    borderWidth: 2,
    borderRadius: 10.5,
    width: 143,
    height: 28,
    color: '#19525A',
    backgroundColor: 'white'
  },
  addFriends: {
    fontFamily: 'Poppins_400Regular',
    color: '#19525A',
    fontSize: 12,
    marginRight: 4
  },
  groupsContainer: {
    flexDirection: 'row',
  },
  groups: {
    borderTopColor: '#19525A',
    borderTopWidth: 3,
    paddingBottom: 10
  },
  friendsContainer: {
    borderTopColor: '#19525A',
    borderTopWidth: 3,
  },
  image: {
    height: '100%'
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#7CB7BF',
    borderRadius: 8,
    height: 50,
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    color: '#19525a',
    marginLeft: 10,
    marginBottom: 10,
  },
  scrollView: {
    alignItems: 'center',
    paddingHorizontal: 10,
  }
});
