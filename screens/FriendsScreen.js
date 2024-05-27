import { Dimensions, TextInput, Modal, StyleSheet, Text, TouchableOpacity, View, ScrollView, ImageBackground } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Group from '../components/Group';
import Friend from '../components/Friend';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const BACKEND_URL = "https://backend-groove.vercel.app"

export default function FriendsScreen({ navigation }) {
  const user = useSelector((state) => state.user.value)
  const [dataGroups, setdataGroups] = useState([]);
  const [focusedInput, setFocusedInput] = useState(null)
  const [dataFriends, setdataFriends] = useState([]);
  const [modalAddFriend, setmodalAddFriend] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [usersdata, setusersdata] = useState([]);
  const [filteredData, setFilteredData] = useState(usersdata);

  //Affichage des groupes où l'utilisateur connecté est présent
  const affichage1 = () => {
    fetch(`${BACKEND_URL}/groups/findAllByUsername`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token }),
    })
      .then((response) => response.json())
      .then((data) => setdataGroups(data.groups))
  }

  //Affichage des amis de l'utilisateur connecté
  const affichage2 = () => {
    fetch(`${BACKEND_URL}/users/getAllFriends`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token }),
    })
      .then((response) => response.json())
      .then((data) => setdataFriends(data.friends))

  }

  //Récupération de tous les users de la BDD
  const affichage3 = () => {
    fetch(`${BACKEND_URL}/users/getAllUsers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token }),
    })
      .then((response) => response.json())
      .then((data) => setusersdata(data.friends))
  }

  useEffect(() => {
    affichage1()
    affichage2()
    affichage3()
  }, []);

  const deleteFriend = (friendToken) => {
    fetch(`${BACKEND_URL}/users/deleteFriend`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token, friendToken }),
    })
      .then((response) => response.json())
      .then(() => {
        affichage1()
        affichage2()
        affichage3()
      })
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const newData = usersdata.filter((item) => {
        const itemName = item.username.toLowerCase();
        return itemName.includes(query.toLowerCase());
      });
      setFilteredData(newData);
    } else {
      setFilteredData(usersdata);
    }
  };

  const handleSelectItem = (item) => {
    fetch(`${BACKEND_URL}/users/addFriend`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token, friendToken: item.token }),
    })
      .then((response) => response.json())
      .then(() => {
        affichage1()
        affichage2()
        affichage3()
      })
  }
  const friends = dataFriends.map((e, i) => {
    return (<Friend key={i} deleteFriend={deleteFriend} {...e} />)
  })

  const groups = dataGroups.map((e, i) => {
    return (<Group key={i} {...e} />)
  })



  return (
    <View style={styles.container}>
      <Modal visible={modalAddFriend} transparent={true} style={styles.modalBackground}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.close} onPress={() => setmodalAddFriend(false)}>
              <FontAwesome5 name="window-close" size={25} color={"#19525A"} />
            </TouchableOpacity>
            <TextInput
              style={[styles.input, { borderColor: focusedInput === 'style' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'style' ? 2 : 1 }
              ]}
              placeholder="Rechercher un(e) ami(e)"
              placeholderTextColor='#19525a'
              value={searchQuery}
              onChangeText={(text) => handleSearch(text)}
              onFocus={() => setFocusedInput('style')}
              onBlur={() => setFocusedInput(null)}
            />
            <ScrollView style={styles.scrollViewModal}>
              {filteredData.map((item, i) => {
                if (!dataFriends.find((e) => e.username === item.username)) {
                  return (<View
                    key={i}
                    style={styles.item}
                  >
                    <Text style={styles.text}>{item.username}</Text>
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => handleSelectItem(item)}
                    >
                      <Text style={styles.textButton}>Ajouter</Text>
                    </TouchableOpacity>
                  </View>
                  )
                }
                else {
                  return (<View key={i} style={styles.item}>
                    <Text style={styles.text}>{item.username}</Text>
                  </View>
                  )
                }
              }
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={styles.iconArrow}>
          <FontAwesome5 name='arrow-left' size={33} color={'#19525A'} />
        </TouchableOpacity>
        <Text style={styles.title1}>Mes ami(e)s</Text>
      </View>
      <ScrollView>
        <View style={styles.pictureContainer}>
          <ImageBackground source={{ uri: "https://res.cloudinary.com/dq5b1pmdu/image/upload/v1716536230/Festival-de-musique_amis_oar251.jpg" }} resizeMode="cover" style={styles.image}>
            <TouchableOpacity style={styles.addFriendContainer} onPress={() => setmodalAddFriend(true)}>
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
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#19525a',
    marginBottom: 10,
  },
  scrollView: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  modalContainer: {
    paddingTop: 40,
    width: 250,
    height: 300,
    justifyContent: 'center',
    backgroundColor: "white",
    borderColor: '#19525a',
    borderWidth: 3,
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewModal: {
    maxHeight: 200,
    width: '80%'
  },
  item: {
    padding: 5,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#7CB7BF',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#19525a'
  },
  addButton: {
    backgroundColor: '#19525a',
    borderRadius: 5,
    padding: 3
  },
  textButton: {
    fontFamily: 'Poppins_600SemiBold',
    color: 'white'
  },
  close: {
    position: 'absolute',
    right: 5,
    top: 5
  }
});
