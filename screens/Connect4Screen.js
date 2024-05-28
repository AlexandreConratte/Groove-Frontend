import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, KeyboardAvoidingView, Platform, TextInput, ScrollView, } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
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
import { login, resetdataFields } from '../reducers/user';
import { uploadImage } from '../modules/uploadImage';


const windowWidth = Dimensions.get('window').width;

export default function Connect4Screen({ navigation }) {

  const user = useSelector((state) => state.user.value);

  const dispatch = useDispatch()
  const [stylesData, setStylesData] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [artistsData, setArtistsData] = useState([]);
  const [filteredData, setFilteredData] = useState(artistsData);
  const [focusedInput, setFocusedInput] = useState(null)


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

  const BACKEND_URL = "https://backend-groove.vercel.app"

  // début selection des styles
  useEffect(() => {
    fetch(`${BACKEND_URL}/styles/findAll`)
      .then((response) => response.json())
      .then((data) => {
        setStylesData(data.styles)
        // console.log(data.styles)
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  const Select_a_Style = (style) => {
    setSelectedStyles((selectedStyles) => {
      if (selectedStyles.includes(style)) {

        return selectedStyles.filter((e) => e !== style);

      } else if (selectedStyles.length < 5) {
        return [...selectedStyles, style];
      }

      return selectedStyles;
    });
  };

  const allstyles = stylesData.map((data, i) => {
    const isSelected = selectedStyles.includes(data._id);
    return (
      <TouchableOpacity key={i} title={data.name} style={isSelected ? styles.selectedButtonStyle : styles.buttonstyle}
        onPress={() => Select_a_Style(data._id)}>
        <Text style={[styles.stylelist, isSelected && styles.selectedStyletext]}>{data.name}</Text>
      </TouchableOpacity>
    )
  })



  // Début séléction d'artistes 
  useEffect(() => {
    fetch(`${BACKEND_URL}/artists/findAll`)
      .then((response) => response.json())
      .then((data) => setArtistsData(data.artists))
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const newData = artistsData.filter((item) => {
        const itemName = item.name.toLowerCase();
        return itemName.includes(query.toLowerCase());
      });
      setFilteredData(newData);
    } else {
      setFilteredData(artistsData);
    }
  };
  const handleSelectArtists = (item) => {
    let newSelectedArtists = [...selectedArtists];

    if (newSelectedArtists.includes(item)) {
      newSelectedArtists = newSelectedArtists.filter((selectedArtists) => selectedArtists !== item);
    } else if (newSelectedArtists.length < 5) {
      newSelectedArtists.push(item);
    }
    setSelectedArtists(newSelectedArtists);
    setSearchQuery('');
  };



  // bouton suivant, fetch la route signup avec toutes les datas récupérés sur les 4 screens
  const finalSignUpClick = async () => {

    // console.log(user.connection.picture)

    const getUrl = await uploadImage(user.connection.picture)  // upload l'image avec le module uploadImage sur le cloudinary et récupère l'url
    console.log("succes", getUrl)

    const artistIds = selectedArtists.map(artist => artist._id);

    const userData = {
      username: user.connection.username,
      password: user.connection.password,
      email: user.connection.email,
      firstname: user.connection.firstname,
      lastname: user.connection.lastname,
      birthdate: new Date(user.connection.birthdate),
      city: user.connection.city,
      styles: selectedStyles,
      artists: artistIds,
      picture: getUrl
    };

    const signUp = await fetch(`${BACKEND_URL}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
    const resultSignUp = await signUp.json()
    if (resultSignUp.result) {

      dispatch(login({ token: resultSignUp.token }));
      dispatch(resetdataFields())
      navigation.navigate('Connect5')
      console.log("Inscription validée")
    }
    else {
      console.error(`L/'inscription a échouée`);
    }
  }


  if (!fontsLoaded) {
    return <View></View>
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={user.settings.nightMode ? nightModeStyle.container : styles.container}>
      <View style={user.settings.nightMode ? nightModeStyle.header : styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={user.settings.nightMode ? nightModeStyle.iconArrow : styles.iconArrow}>
          <FontAwesome5 name='arrow-left' size={33} color={user.settings.nightMode ? "#FFFFFF" : "#19525a"} />
        </TouchableOpacity>
        <Text style={user.settings.nightMode ? nightModeStyle.title1 : styles.title1}>Connect</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollPrincipal}>
        <View style={styles.select_textContainer}>
          <Text style={user.settings.nightMode ? nightModeStyle.select_text : styles.select_text}>
            Sélectionne tes styles de musique préférés (5max) :
          </Text>
        </View>

        <View style={styles.MusicStyleContainer}>
          {allstyles}
        </View>

        <View style={styles.select_textContainer}>
          <Text style={user.settings.nightMode ? nightModeStyle.select_text : styles.select_text}>
            Sélectionne tes artistes favoris (5max) :
          </Text>
          <TextInput
            style={[user.settings.nightMode ? nightModeStyle.input : styles.input, { borderColor: focusedInput === 'password' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'password' ? 2 : 1 }]}
            placeholder="Rechercher un artiste"
            placeholderTextColor={user.settings.nightMode ? '#FFFFFF' : null }  onFocus={() => setFocusedInput('username')}
            onBlur={() => setFocusedInput(null)}
            value={searchQuery} 
            onChangeText={(text) => handleSearch(text)}
          />

          <ScrollView style={styles.scrollView}>
            {filteredData.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={user.settings.nightMode ? nightModeStyle.item : styles.item}
                onPress={() => handleSelectArtists(item)}
              >
                <Text style={user.settings.nightMode ? nightModeStyle.itemText : styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.selectedContainer}>
            {selectedArtists.map((item, i) => (
              <TouchableOpacity key={i} style={user.settings.nightMode ? nightModeStyle.selectedItemText : styles.selectedItemText} onPress={() => handleSelectArtists(item)}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity onPress={() => finalSignUpClick()} style={user.settings.nightMode ? nightModeStyle.nextButton : styles.nextButton}>
          <Text style={user.settings.nightMode ? nightModeStyle.nextText : styles.nextText}>Suivant</Text>
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={styles.progressBarSecond}></View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: "center",

  },
  iconArrow: {
    position: 'absolute',
    left: 9,
    height: '60%',
    width: '10%',
    marginBottom: 5
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
  nextButton: {
    backgroundColor: '#19525a',
    height: 76,
    width: 264,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 30
  },
  nextText: {
    color: "white",
    fontSize: 30,
    fontFamily: 'Poppins_600SemiBold',
  },
  input: {
    width: 280,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#7CB7BF',
    borderRadius: 8,
    height: 50,
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    marginLeft: 20
  },
  select_textContainer: {
    width: Dimensions.get('window').width,
    marginTop: 30,

    alignItems: "center",
    justifyContent: "center"

  },
  select_text: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 18,
    color: '#19525a',
    margin: 20,
    marginRight: 80,
    fontWeight: "bold",
  },
  buttonstyle: {
    backgroundColor: '#ffffff',
    borderColor: "#15C2C2",
    borderWidth: 1,
    borderRadius: 8,
    margin: 8,
    padding: 3,
    paddingHorizontal: 10,
    alignItems: "center",
    elevation: 2,
    marginVertical: 10


  },
  stylelist: {
    color: "#15C2C2",
    fontWeight: 'bold',
    fontSize: 18
  },
  MusicStyleContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginHorizontal: 10,

  },
  scrollView: {
    maxWidth: '100%',
    width: "100%"
  },
  selectedButtonStyle: {
    backgroundColor: '#FFE45D',
    borderRadius: 8,
    margin: 10,
    padding: 3,
    paddingHorizontal: 10,
    alignItems: "center",
    elevation: 2
  },
  selectedStyletext: {
    color: "#19525A",
    fontWeight: 'bold'
  },
  scrollPrincipal: {
    alignItems: "center",
    paddingBottom : 30
  },
  scrollView: {
    maxHeight: 200,
    marginTop: -11
  },
  selectedContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    flexWrap: 'wrap',
    width: 280
  },
  selectedItemText: {
    backgroundColor: '#FFE45D',
    color: '#19525A',
    borderRadius: 5,
    padding: 5,
    margin: 5,
    alignItems: "center",
    fontFamily: 'Poppins_400Regular',

  },
  scrollView: {
    maxHeight: 200,
    marginTop: -11,
    marginHorizontal: 20,

  },
  item: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#7CB7BF',
    width: 280,
  },
  progressBar: {
    height: 20,
    width: (windowWidth / 1.2),
    backgroundColor: '#D2FFF4',
    borderRadius: 50,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 6,
      },
    }),
    margin: 10
  },
  progressBarSecond: {
    height: 20,
    width: '75%',
    backgroundColor: '#15C2C2',
    borderRadius: 50
  }
});



const nightModeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#19525A',
    alignItems: "center",
  },
  iconArrow: {
    position: 'absolute',
    left: 9,
    height: '60%',
    width: '10%',
    marginBottom: 5
  },
  header: {
    height: 86,
    justifyContent: 'flex-end',
    borderBottomColor: '#15C2C2',
    borderBottomWidth: 3,
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  title1: {
    fontSize: 30,
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold'
  },
  nextButton: {
    backgroundColor: '#FFE45D',
    height: 76,
    width: 264,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 30
  },
  nextText: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#19525a',
    fontSize: 30
  },
  input: {
    width: 280,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#7CB7BF',
    borderRadius: 8,
    height: 50,
    fontSize: 15,
    marginLeft: 20,
    color: '#FFFFFF', // Couleur du texte pour le mode sombre
    fontFamily: 'Poppins_400Regular',
  },
  select_textContainer: {
    width: Dimensions.get('window').width,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  select_text: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 18,
    color: '#FFFFFF',
    margin: 20,
    marginRight: 80,
    fontWeight: "bold",
  },
  buttonstyle: {
    backgroundColor: '#383838',
    borderColor: "#B0B0B0",
    borderWidth: 1,
    borderRadius: 8,
    margin: 8,
    padding: 3,
    paddingHorizontal: 10,
    alignItems: "center",
    elevation: 2,
    marginVertical: 10
  },
  stylelist: {
    color: "#B0B0B0",
    fontWeight: 'bold',
    fontSize: 18
  },
  scrollView: {
    maxWidth: '100%',
    width: "100%"
  },
  selectedItemText: {
    backgroundColor: '#FFE45D',
    color: '#FFFFFF',
    borderRadius: 5,
    padding: 5,
    margin: 5,
    alignItems: "center",
    fontFamily: 'Poppins_400Regular',
  },
  item: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#B0B0B0',
    width: 280,
  },
  itemText: {
    color: '#FFFFFF', // Couleur du texte pour le mode sombre
  },
});


