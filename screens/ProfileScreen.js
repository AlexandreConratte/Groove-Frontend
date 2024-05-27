import { Dimensions, StyleSheet, Text, TouchableOpacity, View , Modal, Platform, Image, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useEffect, useState } from 'react';
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const BACKEND_URL = "https://backend-groove.vercel.app";
const noProfilPicture = "https://res.cloudinary.com/dq5b1pmdu/image/upload/v1716545800/istockphoto-1337144146-612x612_f2ywyb.jpg";

export default function ProfileScreen({ navigation }) {
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
  const [modalisVisible, setModalisVisible] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [city, setCity] = useState('');
  const [birthdate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [initialData, setInitialData] = useState({});

  const [searchQuery, setSearchQuery] = useState('');
  const [stylesdata, setstylesdata] = useState([]);
  const [filteredData, setFilteredData] = useState(stylesdata);
  const [selectedItems, setSelectedItems] = useState([]);

  const [searchQuery2, setSearchQuery2] = useState('');
  const [artistsdata, setartistsdata] = useState([]);
  const [filteredData2, setFilteredData2] = useState(artistsdata);
  const [selectedItems2, setSelectedItems2] = useState([]);

  const [focusedInput, setFocusedInput] = useState(null);
  const user = useSelector((state) => state.user.value);

  useEffect(()=> {
    if (user.token){
      setModalisVisible(false)
    }
    fetch(`${BACKEND_URL}/users/iprofil`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token }),
    }).then(response => response.json())
    .then(data => {
      if(data.result){
        setUserInfo(data.user);
        setFirstname(data.user.firstname);
        setLastname(data.user.lastname);
        setCity(data.user.city);
        const date = new Date(data.user.birthdate);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
        const formattedDate = `${day}/${month}/${year}`
        setBirthDate(formattedDate);
        setEmail(data.user.email);
        setPhone(data.user.phone);
        setSelectedItems(data.user.styles);
        setSelectedItems2(data.user.artists);
        setInitialData({
          firstname: data.user.firstname,
          lastname: data.user.lastname,
          email: data.user.email,
          phone: data.user.phone,
          city: data.user.city,
          birthdate: data.user.birthdate,
          styles: data.user.styles,
          artists: data.user.artists,
        })
      }
    })
  },[updateMode]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/styles/findAll`)
      .then((response) => response.json())
      .then((data) => setstylesdata(data.styles));
      fetch(`${BACKEND_URL}/artists/findAll`)
      .then((response) => response.json())
      .then((data) => setartistsdata(data.artists));  
  }, []);

  const GotoConnect = () => {
    navigation.navigate('Connect1');
    setModalisVisible(false)
  };

  const GoBack = () => {
    navigation.navigate('Home')
    setModalisVisible(false)
  };  

  const handlePencilPress = () => {
    setUpdateMode(true)
  };

  const handleSendPencilPress = () => {
    setUpdateMode(false)
  }

  //recheche de styles
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const newData = stylesdata.filter((item) => {
        const itemName = item.name.toLowerCase();
        return itemName.includes(query.toLowerCase());
      });
      setFilteredData(newData);
    } else {
      setFilteredData(stylesdata);
    }
  };

  const handleSelectItem = (item) => {
    let newSelectedItems = [...selectedItems];

    if (newSelectedItems.includes(item)) {
      newSelectedItems = newSelectedItems.filter((selectedItem) => selectedItem !== item);
    } else if (newSelectedItems.length < 5) {
      newSelectedItems.push(item);
    }
    setSelectedItems(newSelectedItems);
  };

  //recheche d'artiste
  const handleSearch2 = (query2) => {
    setSearchQuery2(query2);
    if (query2.length > 0) {
      const newData = artistsdata.filter((item2) => {
        const itemName = item2.name.toLowerCase();
        return itemName.includes(query2.toLowerCase());
      });
      setFilteredData2(newData);
    } else {
      setFilteredData2(artistsdata);
    }
  };

  const handleSelectItem2 = (item2) => {
    let newSelectedItems2 = [...selectedItems2];

    if (newSelectedItems2.includes(item2)) {
      newSelectedItems2 = newSelectedItems2.filter((selectedItem2) => selectedItem2 !== item2);
    } else if (newSelectedItems2.length < 5) {
      newSelectedItems2.push(item2);
    }
    setSelectedItems2(newSelectedItems2);
  };

  function convertToMongoDBDate(dateStr) {
    const [day, month, year] = dateStr.split('/');
    const date = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
    return date.toISOString();
  };

  function isValidDate(dateStr) {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    return dateRegex.test(dateStr);
  };

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  

  const handleSendPress = () => {
    const toSendData = { token: user.token }

    if (firstname !== initialData.firstname) toSendData.firstname = firstname;
    if (lastname !== initialData.lastname) toSendData.lastname = lastname;
    if (!isValidEmail(email)) {
      alert("L'email n'est pas dans un format valide.");
      return;
    }
    if (email !== initialData.email) toSendData.email = email;
    if (phone !== initialData.phone) toSendData.phone = phone;
    if (city !== initialData.city) toSendData.city = city;
    if (!isValidDate(birthdate)) {
      alert("Le format de la date de naissance n'est pas valide. Utilisez le format JJ/MM/AAAA.");
      return;
    }
    if (birthdate !== initialData.birthdate) {
      toSendData.birthdate = convertToMongoDBDate(birthdate);
    };
    if (selectedItems !== initialData.styles) toSendData.styles = selectedItems;
    if (selectedItems2 !== initialData.artists) toSendData.artists = selectedItems2;

    fetch(`${BACKEND_URL}/users/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toSendData),
    }).then(response => response.json())
    .then(data => {
      if(data.result) {
        setUpdateMode(false)
      }
    })
  }

  if (!fontsLoaded) {
    return <Text></Text> ;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={styles.iconArrow}>
          <FontAwesome5 name='arrow-left' size={33} color={'#19525A'}/>
        </TouchableOpacity>
        <Text style={styles.title1}>Profile</Text>
      </View>
    

      <Modal visible={modalisVisible} transparent={true} style={styles.modalBackground}>
      <View style={styles.modalBackground}>

        <View style={styles.modalContainer}>
          <Text style={styles.welcomeText}>Tu n'es toujours pas connecté !</Text>
          <Text style={styles.descripText}>Pour une expérience personnalisée </Text>
          <TouchableOpacity onPress={() => GotoConnect()} style={styles.GotoConnectButton}>
            <Text style={styles.connect}>Connecte Toi</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => GoBack()} style={styles.GoToApp}>
            <Text style={styles.acced}>Accéder à l'application</Text>
          </TouchableOpacity>
        </View>
      </View>
      </Modal>

      {user.token && userInfo && !updateMode ? (
        <ScrollView>
          <View style={styles.bannerContainer}>
            <Image source={{uri : 'https://res.cloudinary.com/dq5b1pmdu/image/upload/v1716536230/festival_profile_jjon8q.jpg'}}
            style={styles.bannerImage}/>
          </View>
    
          <View style={styles.photoContainer}>
            {userInfo && userInfo.picture ? (
              <Image source={{uri : userInfo.picture}} style={styles.profilePicture}/>
            ):(
              <Image source={{uri : noProfilPicture}} style={styles.noProfilePicture}/>
            )}
          </View>
            
          <TouchableOpacity style={styles.pencilContainer} onPress={handlePencilPress}>
            <FontAwesome5 name='pencil-alt' size={35} color={'#19525A'}/>
          </TouchableOpacity>
  
          <View style={styles.infoContainer}>
            <View style={styles.detailsContainer}>
                <Text style={styles.textDetails}>{userInfo.username}</Text>
                {userInfo.firstname && userInfo.lastname && (
                  <Text style={styles.textDetails}>{userInfo.firstname} {userInfo.lastname}</Text>
                )}
                {userInfo.city && (
                  <Text style={styles.textDetails}>{userInfo.city}</Text>
                )}
                {userInfo.birthdate && (
                  <Text style={styles.textDetails}>{new Date(userInfo.birthdate).toLocaleDateString()}</Text>
                )}
                {userInfo.email && (
                  <Text style={styles.textDetails}>{userInfo.email}</Text>
                )}
                {userInfo.phone && (
                  <Text style={styles.textDetails}>{userInfo.phone}</Text>
                )}
            </View>
            
          </View>
          
          <View style={styles.cardContainer}>
              <Text style={styles.cardTextContainer}>Mes styles :</Text>
              <View style={styles.cardsContainer}>
                {userInfo.styles && userInfo.styles.length > 0 ? (
                  userInfo.styles.map((style, i) => (
                    <View key={i} style={styles.yellowButtonStyle}>
                      <Text style={styles.textButtonStyle}>{style.name}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.textDetails}>Aucun style renseigné</Text>
                )}
              </View>
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.cardTextContainer}>Mes artistes :</Text>
            <View style={styles.cardsContainer}>
              {userInfo.artists && userInfo.artists.length > 0 ? (
                userInfo.artists.map((artist, i) => (
                  <View key={i} style={styles.blueButtonStyle}>
                    <Text style={styles.textButtonStyle}>{artist.name}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.textDetails}>Aucun artiste renseigné</Text>
              )}
            </View>
          </View>
          
        </ScrollView>
      ) : (
        updateMode ? (
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <ScrollView>
              <View style={styles.bannerContainer}>
                <Image source={{uri : 'https://res.cloudinary.com/dq5b1pmdu/image/upload/v1716536230/festival_profile_jjon8q.jpg'}}
                style={styles.bannerImage}/>
              </View>
        
              <View style={styles.photoContainer}>
                {userInfo && userInfo.picture ? (
                  <>
                    <Image source={{uri : userInfo.picture}} style={styles.profilePicture}/>
                    <TouchableOpacity style={styles.updatePicture}>
                      <View style={styles.updateTextContainer}>
                        <Text style={styles.updateTextPicture}>Modifier la photo</Text>
                      </View>
                    </TouchableOpacity>
                    
                  </>
                ):(
                  <>
                    <Image source={{uri : noProfilPicture}} style={styles.noProfilePicture}/>
                    <TouchableOpacity style={styles.updatePicture}>
                      <View style={styles.updateTextContainer}>
                        <Text style={styles.updateTextPicture}>Ajouter une photo</Text>
                      </View>
                    </TouchableOpacity>
                  </>
                )}
              </View>

              <TouchableOpacity style={styles.updatePencilContainer} onPress={handleSendPencilPress}>
                <FontAwesome5 name='pencil-alt' size={35} color={'#19525A'}/>
              </TouchableOpacity>

              <View style={styles.inputBox}>
                <View style={styles.box}>
                  <Text style={styles.text}>Prénom</Text>
                  <TextInput placeholder="Prénom" onChangeText={(value) => setFirstname(value)}
                    value={firstname}
                    style={[styles.input, { borderColor: focusedInput === 'firsname' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'firsname' ? 2 : 1 }
                    ]}
                    onFocus={() => setFocusedInput('firsname')}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
                <View style={styles.box}>
                  <Text style={styles.text}>Nom</Text>
                  <TextInput placeholder="Nom" onChangeText={(value) => setLastname(value)}
                    value={lastname}
                    style={[styles.input, { borderColor: focusedInput === 'lastname' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'lastname' ? 2 : 1 }
                    ]}
                    onFocus={() => setFocusedInput('lastname')}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
                <View style={styles.box}>
                  <Text style={styles.text}>Ville</Text>
                  <TextInput placeholder="Ville" onChangeText={(value) => setCity(value)}
                    value={city}
                    style={[styles.input, { borderColor: focusedInput === 'city' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'city' ? 2 : 1 }
                    ]}
                    onFocus={() => setFocusedInput('city')}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
                <View style={styles.box}>
                  <Text style={styles.text}>Date de naissance</Text>
                  <Text style={styles.text}>(format JJ/MM/AAAA)</Text>
                  <TextInput placeholder="Date de naissance" onChangeText={(value) => setBirthDate(value)}
                    value={birthdate}
                    style={[styles.input, { borderColor: focusedInput === 'birthdate' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'birthdate' ? 2 : 1 }
                    ]}
                    onFocus={() => setFocusedInput('birthdate')}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
                <View style={styles.box}>
                  <Text style={styles.text}>E-mail</Text>
                  <TextInput placeholder="E-mail" onChangeText={(value) => setEmail(value)}
                    value={email}
                    style={[styles.input, { borderColor: focusedInput === 'email' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'email' ? 2 : 1 }
                    ]}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
                <View style={styles.box}>
                  <Text style={styles.text}>Téléphone</Text>
                  <TextInput placeholder="Téléphone" onChangeText={(value) => setPhone(value)}
                    value={phone}
                    style={[styles.input, { borderColor: focusedInput === 'phone' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'phone' ? 2 : 1 }
                    ]}
                    onFocus={() => setFocusedInput('phone')}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
                <View style={styles.box}>
                  {/*rechercher un style*/}
                  <Text style={styles.text}>Selectionner 1 ou plusieurs types de musique</Text>
                  <TextInput
                    style={[styles.input, { borderColor: focusedInput === 'style' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'style' ? 2 : 1 }
                    ]}
                    placeholder="Rechercher un style"
                    placeholderTextColor='#19525a'
                    value={searchQuery}
                    onChangeText={(text) => handleSearch(text)}
                    onFocus={() => setFocusedInput('style')}
                    onBlur={() => setFocusedInput(null)}
                  />
                  <ScrollView style={styles.scrollView}>
                    {filteredData.map((item, i) => (
                      <TouchableOpacity
                        key={i}
                        style={styles.item}
                        onPress={() => handleSelectItem(item)}
                      >
                        <Text style={styles.text}>{item.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  <View style={styles.selectedContainer}>
                    {selectedItems.map((item, i) => (
                      <TouchableOpacity key={i} style={styles.selectedItemText} onPress={() => handleSelectItem(item)}>
                        <Text style={styles.text}>{item.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/*rechercher un artiste*/}
                  <Text style={styles.text}>Selectionner 1 ou plusieurs artistes</Text>
                  <TextInput
                    style={[styles.input, { borderColor: focusedInput === 'artiste' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'artiste' ? 2 : 1 }
                    ]}
                    onFocus={() => setFocusedInput('artiste')}
                    onBlur={() => setFocusedInput(null)}
                    placeholder="Rechercher un artiste"
                    placeholderTextColor='#19525a'
                    value={searchQuery2}
                    onChangeText={(text) => handleSearch2(text)}
                  />
                  <ScrollView style={styles.scrollView}>
                    {filteredData2.map((item2, i) => (
                      <TouchableOpacity
                        key={i}
                        style={[
                          styles.item,
                        ]}
                        onPress={() => handleSelectItem2(item2)}
                      >
                        <Text style={styles.text}>{item2.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  <View style={styles.selectedContainer}>
                    {selectedItems2.map((item2, i) => (
                      <TouchableOpacity key={i} style={styles.selectedItemText2} onPress={() => handleSelectItem2(item2)}>
                        <Text style={styles.text}>{item2.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                </View>
              </View>
              <View style={styles.sendContainer}>
                <TouchableOpacity style={styles.sendButton} onPress={handleSendPress}>
                  <Text style={styles.sendText}>Envoyer</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        ) : (
          <View/>
        )
      )}
      
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
  bannerContainer: {
    height: 172,
    borderBottomColor: '#19525A',
    borderBottomWidth: 3,
  },
  bannerImage: {
    width: windowWidth,
    height: '100%'
  },
  photoContainer: {
    width: 150,
    height: 150,
    borderColor: '#19525A',
    borderWidth: 3,
    borderRadius: 100,
    position: 'relative',
    top: -75,
    left: (windowWidth/2) - 75,
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 6,
      },
    }),
    justifyContent: 'center',
    alignItems: 'center'
  },
  profilePicture: {
    width: '100%',
    height: '100%', 
    borderRadius: 100,
  },
  noProfilePicture: {
    width: '100%',
    height: '100%', 
    borderRadius: 100,
    opacity: 0.5,
  },
  pencilContainer:{
    backgroundColor: '#D2FFF4',
    height: 60,
    width: 60,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    top: -140,
    left: (windowWidth - 70),
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  updatePencilContainer: {
    backgroundColor: '#FFE45D',
    height: 60,
    width: 60,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    top: -140,
    left: (windowWidth - 70),
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  infoContainer: {
    alignItems: 'center'
  },
  detailsContainer: {
    width: (windowWidth/1.4),
    height: (windowHeight/4),
    position: 'relative',
    top: -110,
    backgroundColor: '#FFFFFF',
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  textDetails: {
    fontFamily: 'Poppins_500Medium',
    color: '#19525A',
    fontSize: 16,
  },
  cardContainer: {
    position: 'relative',
    top: -80,
    marginHorizontal: 20,
    marginBottom: 10
  },
  cardTextContainer: {
    fontFamily: 'Poppins_700Bold',
    color: '#19525A',
    fontSize: 20
  },
  yellowButtonStyle: {
    backgroundColor: '#FFE45D',
    borderRadius: 8,
    margin: 5,
    padding: 3,
    paddingHorizontal :10,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  blueButtonStyle: {
    backgroundColor: '#D2FFF4',
    borderRadius: 8,
    margin: 5,
    padding: 3,
    paddingHorizontal :10,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  textButtonStyle: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#19525A',
    fontSize: 16,
  },
  inputBox: {
    marginTop: -60,
    marginHorizontal: 20,
    alignItems: 'center'
  },
  box: {
    width: '90%',
    marginVertical: 10
  },
  inputUsername: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#7CB7BF',
    borderRadius: 8,
    height: 50,
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    color: '#19525a',
    marginBottom: 0,
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
    marginBottom: 0,
  },
  text: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#19525a'
  },
  sendText: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#19525a',
    fontSize: 20
  },
  scrollView: {
    maxHeight: 200,
  },
  item: {
    padding: 5,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#7CB7BF',
  },
  selectedItemText: {
    backgroundColor: '#FFE45D',
    color: '#19525A',
    borderRadius: 5,
    padding: 5,
    margin: 5,
    fontFamily: 'Poppins_400Regular',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  selectedItemText2: {
    backgroundColor: '#D2FFF4',
    color: '#19525A',
    borderRadius: 5,
    padding: 5,
    margin: 5,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  sendButton: {
    width: (windowWidth/2.5),
    height: 50,
    backgroundColor: '#FFE45D',
    marginBottom: 40,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  sendContainer: {
    alignItems: 'center'
  },
  updatePicture: {
    position: 'absolute',
    bottom: 0,
    height: '50%',
    width: '100%',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100, 
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    opacity: 0.6
  },
  updateTextContainer: {
    opacity: 1,
    marginHorizontal: 10,
    marginTop: 10
  },
  updateTextPicture: {
    fontFamily: 'Poppins_400Regular',
    color: '#19525A',
    fontSize: 14,
    textAlign: 'center',
  }
});
