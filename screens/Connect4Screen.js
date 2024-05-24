import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, KeyboardAvoidingView, Platform, TextInput, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch , useSelector} from 'react-redux';
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




export default function Connect4Screen({ navigation }) {

  const user = useSelector((state) => state.user.value);

  const dispatch = useDispatch()
  const [stylesData, setStylesData] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [artistsData, setArtistsData] = useState([]);
  const [filteredData, setFilteredData] = useState(artistsData);
  

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
   // const BACKEND_URL = "http://10.1.0.205:3000"
  
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
      <TouchableOpacity key={i} title={data.name} style={ isSelected ? styles.selectedButtonStyle : styles.buttonstyle }
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
    if (query.length>0) {
      const newData = artistsData.filter((item) => {
        const itemName = item.name.toLowerCase();
        return itemName.includes(query.toLowerCase());
      });
      setFilteredData(newData);
    } else {
      setFilteredData(artistsData);
    }
  };
  const handleSelectArtists= (item) => {
    let newSelectedArtists = [...selectedArtists];

    if (newSelectedArtists.includes(item)) {
      newSelectedArtists = newSelectedArtists.filter((selectedArtists) => selectedArtists !== item);
    } else if (newSelectedArtists.length < 5) {
      newSelectedArtists.push(item);
    }
    setSelectedArtists(newSelectedArtists);
    setSearchQuery('');
  };

  // fonction pour upload les photos dans le cloudinary au moment du sign up , en reprenant l'uri du reducer
  const uploadPhoto =  async (uri) => {
    const formData = new FormData();
    formData.append('photoFromFront', {
      uri: uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    })

    const uploadPict = await fetch(`${BACKEND_URL}/users/photo`, {
      method: 'POST',
      body: formData,
    })
     const resultPhoto = await uploadPict.json()
     if(resultPhoto.result && resultPhoto.url) {
       console.log(resultPhoto)
       return resultPhoto.url
      };
    
  }
  
 // bouton suivant, fetch la route signup avec toutes les datas récupérés sur les 4 screens
  const finalSignUpClick = () => {

    const artistIds = selectedArtists.map(artist => artist._id);

    const photoUrl = uploadPhoto(user.connection.picture)

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
      picture : photoUrl
    };
    //console.log(artistIds)
    // console.log(selectedStyles)
    // console.log(user.connection.city)

    fetch(`${BACKEND_URL}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })
      .then(response => response.json())
      .then(data => { 
        if (data.token) {
          uploadPhoto(user.connection.picture)
          dispatch(login({ token: data.token })); 
          
          dispatch(resetdataFields()); 
          //console.log('Sign up successful', data);
          navigation.navigate('Home')
        } else {
          console.error('Sign up failed', data);
        }})
        
         
   /* fetch(`${BACKEND_URL}/users/signin`, {
      method: "POST",
      headers : { 'Content-Type' : 'application/json'},
      body : JSON.stringify({username: "yolo", password : "yolo"})
    })
    .then( response => response.json())
    .then(data  => console.log(data)) */
    };

  if (!fontsLoaded) {
    return <View></View>
  }

  
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
  
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconArrow}>
          <FontAwesome5 name='arrow-left' size={33} color={"#19525a"} />
        </TouchableOpacity>
        <Text style={styles.title1}>Connect</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollPrincipal}>
      <View style={styles.select_textContainer}>
        <Text style={styles.select_text}>
          Sélectionne tes styles de musique préférés (5max) :
        </Text>
      </View>


      <View style={styles.listContainer}>
        {allstyles}
      </View>

      <View style={styles.select_textContainer}>
        <Text style={styles.select_text}>
          Sélectionne tes artistes favoris (5max) :
        </Text>
        <TextInput
            style={styles.input}
            placeholder="Rechercher un artiste"
            value={searchQuery}
            onChangeText={(text) => handleSearch(text)}
          />

          <ScrollView style={styles.scrollView}>
            {filteredData.map((item,i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.item,
                ]}
                onPress={() => handleSelectArtists(item)}
              >
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.selectedContainer}>
            {selectedArtists.map((item,i) => (
              <TouchableOpacity key={i} style={styles.selectedItemText} onPress={() => handleSelectArtists(item)}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
      </View>
      

      <View>
        <TouchableOpacity onPress={() => finalSignUpClick()} style={styles.nextButton}>
          <Text style={styles.nextText}>Suivant</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,

    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: "center",

  },
  text: {
    fontFamily: 'Poppins_400Regular',
    color: '#19525A'
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
    marginTop: 10,
    position: "static",
    marginBottom: 30
  },
  nextText: {
    fontWeight: "600",
    color: "white",
    fontSize: 25
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
    marginLeft: 20
  },
  select_textContainer: {
    width: Dimensions.get('window').width,
    marginTop: 30,
    marginLeft: 20,
    alignItems: "flex-start"

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
    paddingHorizontal : 10,
    alignItems: "center",
    elevation: 2,
    marginVertical: 10
    

  },
  stylelist: {
    color: "#15C2C2",
    fontWeight: 'bold',
    fontSize : 18
  },
  listContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginHorizontal : 10,
  
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
    paddingHorizontal :10,
    alignItems: "center",
    elevation: 2
  },
  selectedStyletext : {
    color: "#19525A",
    fontWeight: 'bold'
  },
  scrollPrincipal: { 
  alignItems: "center",  
}, 
scrollView: {
  maxHeight: 200,
  marginTop:-11
},
selectedContainer: {
  flexDirection: 'row',
  marginVertical:10,
  flexWrap:'wrap',
  width:280
},
selectedItemText: {
  backgroundColor: '#FFE45D',
  color: '#19525A',
  borderRadius: 5,
  padding: 5,
  margin: 5,
  alignItems: "center",
},
scrollView: {
  maxHeight: 200,
  marginTop:-11,  
  marginHorizontal : 20,

},
item: {
  padding: 10,
  fontSize: 18,
  borderBottomWidth: 1,
  borderBottomColor: '#7CB7BF',
  width:280,
},



});
