import { Dimensions, TextInput, Modal, StyleSheet, Text, TouchableOpacity, View, ScrollView, ImageBackground } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Group from '../components/Group';
import Friend from '../components/Friend';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const BACKEND_URL = "https://backend-groove.vercel.app"

export default function FriendsScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const [modalisVisible, setModalisVisible] = useState(false);
  const [dataGroups, setdataGroups] = useState([]);
  const [focusedInput, setFocusedInput] = useState(null)
  const [dataFriends, setdataFriends] = useState([]);

  const [modalAddFriend, setmodalAddFriend] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [usersdata, setusersdata] = useState([]);
  const [filteredData, setFilteredData] = useState(usersdata);

  
  const goToGroupCreationPage=()=>{
    navigation.navigate('GroupCreation')
  }

  const GotoConnect = () => {
    navigation.navigate('Connect1');
    setModalisVisible(false)
  };

  const GoBack = () => {
    navigation.navigate('Menu')
    setModalisVisible(false)
  };

  useEffect(() => {
    if(user.token){
      affichage1()
      affichage2()
      affichage3()
    } else {
      setModalisVisible(true)
    }
  }, []);


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

  const goToGroupPage = (id) => {
    navigation.navigate('Group', { id })
  }

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
      setFilteredData([]);
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
    return (<Group key={i} {...e} goToGroupPage={goToGroupPage} />)
  })


  return (
    <View style={user.settings.nightMode ? nightModeStyle.container : styles.container}>
      <Modal visible={modalAddFriend} transparent={true} style={user.settings.nightMode ? nightModeStyle.modalBackground : styles.modalBackground}>
        <View style={user.settings.nightMode ? nightModeStyle.modalBackground : styles.modalBackground}>
          <View style={user.settings.nightMode ? nightModeStyle.modalContainer : styles.modalContainer}>
            <TouchableOpacity style={user.settings.nightMode ? nightModeStyle.close : styles.close} onPress={() => setmodalAddFriend(false)}>
              <FontAwesome5 name="window-close" size={30} color={user.settings.nightMode ? '#FFFFFF' : '#19525A'} />
            </TouchableOpacity>
            <TextInput
              style={[user.settings.nightMode ? nightModeStyle.input : styles.input, { borderColor: focusedInput === 'style' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'style' ? 2 : 1 }]}
              placeholder="Rechercher un(e) ami(e)"
              placeholderTextColor={user.settings.nightMode ? '#FFFFFF' : '#19525a'}
              value={searchQuery}
              onChangeText={(text) => handleSearch(text)}
              onFocus={() => setFocusedInput('style')}
              onBlur={() => setFocusedInput(null)}
            />
            <ScrollView style={user.settings.nightMode ? nightModeStyle.scrollViewModal : styles.scrollViewModal}>
              {filteredData.map((item, i) => {
                if (!dataFriends.find((e) => e.username === item.username)) {
                  return (
                    <View key={i} style={user.settings.nightMode ? nightModeStyle.item : styles.item}>
                      <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>{item.username}</Text>
                      <TouchableOpacity
                        style={user.settings.nightMode ? nightModeStyle.addButton : styles.addButton}
                        onPress={() => handleSelectItem(item)}
                      >
                        <Text style={user.settings.nightMode ? nightModeStyle.textButton : styles.textButton}>Ajouter</Text>
                      </TouchableOpacity>
                    </View>
                  )
                } else {
                  return (
                    <View key={i} style={user.settings.nightMode ? nightModeStyle.item : styles.item}>
                      <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>{item.username}</Text>
                    </View>
                  )
                }
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
      <View style={user.settings.nightMode ? nightModeStyle.header : styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={user.settings.nightMode ? nightModeStyle.iconArrow : styles.iconArrow}>
          <FontAwesome5 name='arrow-left' size={33} color={user.settings.nightMode ? '#FFFFFF' : '#19525A'} />
        </TouchableOpacity>
        <Text style={user.settings.nightMode ? nightModeStyle.title1 : styles.title1}>Mes ami(e)s</Text>
      </View>
      <ScrollView>
        <View style={user.settings.nightMode ? nightModeStyle.pictureContainer : styles.pictureContainer}>
          <ImageBackground source={{ uri: "https://res.cloudinary.com/dq5b1pmdu/image/upload/v1716536230/Festival-de-musique_amis_oar251.jpg" }} resizeMode="cover" style={user.settings.nightMode ? nightModeStyle.image : styles.image}>
            <TouchableOpacity style={user.settings.nightMode ? nightModeStyle.addFriendContainer : styles.addFriendContainer} onPress={() => setmodalAddFriend(true)}>
              <Text style={user.settings.nightMode ? nightModeStyle.addFriends : styles.addFriends}>Ajouter des amis</Text>
              <FontAwesome5 name='user-plus' size={13.5} color={'#15C2C2'} />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View style={user.settings.nightMode ? nightModeStyle.groups : styles.groups}>
          <Text style={user.settings.nightMode ? nightModeStyle.title2 : styles.title2}>Mes groupes :</Text>
          <ScrollView contentContainerStyle={user.settings.nightMode ? nightModeStyle.groupsContainer : styles.groupsContainer} horizontal={true}>
            {groups}
            <Group goToGroupCreationPage={goToGroupCreationPage} />
          </ScrollView>
        </View>
        <View style={user.settings.nightMode ? nightModeStyle.friendsContainer : styles.friendsContainer}>
          <Text style={user.settings.nightMode ? nightModeStyle.title2 : styles.title2}>Mes amis :</Text>
          <View style={user.settings.nightMode ? nightModeStyle.scrollView : styles.scrollView}>
            {friends}
          </View>
        </View>
      </ScrollView>

        <Modal visible={modalisVisible} transparent={true}>
          <View style={user.settings.nightMode ? nightModeStyle.modalBackground : styles.modalBackground}>
            <View style={user.settings.nightMode ? nightModeStyle.modalContainer : styles.modalContainer}>
              <Text style={user.settings.nightMode ? nightModeStyle.welcomeText : styles.welcomeText}>Tu n'es toujours pas connecté(e) !</Text>
              <Text style={user.settings.nightMode ? nightModeStyle.descripText : styles.descripText}>Pour une expérience personnalisée </Text>
              <TouchableOpacity onPress={() => GotoConnect()} style={user.settings.nightMode ? nightModeStyle.GotoConnectButton : styles.GotoConnectButton}>
                <Text style={user.settings.nightMode ? nightModeStyle.connect : styles.connect}>Connecte Toi</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => GoBack()} style={user.settings.nightMode ? nightModeStyle.GoToApp : styles.GoToApp}>
                <Text style={user.settings.nightMode ? nightModeStyle.acced : styles.acced}>Accéder à l'application</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

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
    backgroundColor: 'rgba(0,0,0,0.5)',
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
  },
  GotoConnectButton: {
    backgroundColor: '#19525a',
    height: 50,
    width: 195,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
    color: "white"

  },
  GoToApp: {
    backgroundColor: '#FFE45D',
    height: 30,
    width: 170,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  modalContainer: {
    width: 274,
    height: 292,
    justifyContent: 'center',
    backgroundColor: "white",
    borderColor: '#19525a',
    borderWidth: 3,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: 'Poppins_400Regular',
    color: '#19525A',
    margin: 5,
    textAlign: "center",
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 10,
    textShadowColor: '#19525a',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  descripText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: 'Poppins_400Regular',
    color: '#19525A',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connect: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: 'Poppins_400Regular',
  },
  acced: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: 'Poppins_400Regular',
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
  title2: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    color: '#FFFFFF',
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
    width: 153,
    height: 32,
    color: '#19525A',
    backgroundColor: 'white'
  },
  addFriends: {
    fontFamily: 'Poppins_400Regular',
    color: '#19525A',
    fontSize: 14,
    marginRight: 4
  },
  groupsContainer: {
    flexDirection: 'row',
  },
  groups: {
    borderTopColor: '#FFFFFF',
    borderTopWidth: 3,
    paddingBottom: 10
  },
  friendsContainer: {
    borderTopColor: '#FFFFFF',
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
    color: '#FFFFFF',
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
    backgroundColor: "#19525a",
    borderColor: '#FFFFFF',
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
    color: '#FFFFFF'
  },
  addButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 3
  },
  textButton: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#19525a'
  },
  close: {
    position: 'absolute',
    right: 5,
    top: 5
  },
  GotoConnectButton: {
    backgroundColor: '#19525a',
    height: 50,
    width: 195,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
    color: "white"

  },
  GoToApp: {
    backgroundColor: '#FFE45D',
    height: 30,
    width: 170,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: 'Poppins_400Regular',
    color: '#19525A',
    margin: 5,
    textAlign: "center",
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 10,
    textShadowColor: '#19525a',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  descripText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: 'Poppins_400Regular',
    color: '#19525A',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  connect: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: 'Poppins_400Regular',
  },
  acced: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: 'Poppins_400Regular',
  },
});