import { Image, FlatList, TextInput, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Platform, Dimensions, Modal } from 'react-native';
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
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import { useDispatch, useSelector } from 'react-redux';

const BACKEND_URL = "https://backend-groove.vercel.app"

export default function SearchResultsScreen({ navigation }) {
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
  const [ville, setVille] = useState("");
  const [start, setstart] = useState("");
  const [end, setend] = useState("");
  const [dateStart, setdateStart] = useState("");
  const [dateEnd, setdateEnd] = useState("");
  const [date, setDate] = useState(new Date());
  const [distance, setDistance] = useState(50);
  const [focusedInput, setFocusedInput] = useState(null)
  const [searchQuery, setSearchQuery] = useState('');
  const [stylesdata, setstylesdata] = useState([]);
  const [filteredData, setFilteredData] = useState(stylesdata);
  const [selectedItems, setSelectedItems] = useState([]);

  const [searchQuery2, setSearchQuery2] = useState('');
  const [artistsdata, setartistsdata] = useState([]);
  const [filteredData2, setFilteredData2] = useState(artistsdata);
  const [selectedItems2, setSelectedItems2] = useState([]);

  const [taille, setTaille] = useState("");
  const petit = "Petit < 10000"
  const moyen = "Moyen"
  const grand = "Grand > 30000"
  const [foundedCity, setfoundedCity] = useState('');
  const [place, setPlace] = useState({});
  const userCoordinate = useSelector((state) => state.user.value.coordinate);
  const user = useSelector((state) => state.user.value);

  const selectTaille = (item) => {
    if (item === taille)
      setTaille("")
    else {
      setTaille(item)
    }
  }

  useEffect(() => {
    fetch(`${BACKEND_URL}/styles/findAll`)
      .then((response) => response.json())
      .then((data) => setstylesdata(data.styles))
  }, []);

  useEffect(() => {
    fetch(`${BACKEND_URL}/artists/findAll`)
      .then((response) => response.json())
      .then((data) => setartistsdata(data.artists))
  }, []);

  if (!fontsLoaded) {
    return <Text></Text>;
  }

  const DateInputStart = ({ label }) => {
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setDate(currentDate);

      let tempDate = new Date(currentDate);
      setdateStart(tempDate)
      setstart(currentDate.toLocaleDateString());

    };
    const showDatepicker = () => {
      setShow(true);
    };
    return (
      <View style={user.settings.nightMode ? nightModeStyle.datebox : styles.datebox}>
        <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>{label}</Text>
        <TouchableOpacity onPress={showDatepicker}>
          <TextInput
            style={user.settings.nightMode ? nightModeStyle.inputDate : styles.inputDate}
            placeholder="Date de debut"
            placeholderTextColor={user.settings.nightMode ? '#FFFFFF' : '#19525a'}
            value={start}
            editable={false} />
        </TouchableOpacity>
        {show && (<DateTimePicker testID="dateTimePicker" value={date} mode="date" display="default" onChange={onChange} />)}
      </View>
    );
  };
  const DateInputEnd = ({ label }) => {
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setDate(currentDate);

      let tempDate = new Date(currentDate);
      setdateEnd(tempDate)
      setend(currentDate.toLocaleDateString());
    };
    const showDatepicker = () => {
      setShow(true);
    };
    return (
      <View style={user.settings.nightMode ? nightModeStyle.datebox : styles.datebox}>
        <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>{label}</Text>
        <TouchableOpacity onPress={showDatepicker}>
          <TextInput
            style={user.settings.nightMode ? nightModeStyle.inputDate : styles.inputDate}
            placeholder="Date de fin"
            placeholderTextColor={user.settings.nightMode ? '#FFFFFF' : '#19525a'}
            value={end}
            editable={false} />
        </TouchableOpacity>
        {show && (<DateTimePicker testID="dateTimePicker" value={date} mode="date" display="default" onChange={onChange} />)}
      </View>
    );
  };
  
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
  const myPosition=()=>{
    fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${userCoordinate.longitude}&lat=${userCoordinate.latitude}`)
    .then((response) => response.json())
        .then((data) => {
          setVille(data.features[0].properties.city)
        })
  }

  const search = () => {
    if (ville.length > 0) {
      fetch(`https://api-adresse.data.gouv.fr/search/?q=${ville}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.features.length > 0) {
            const firstCity = data.features[0];
            const newPlace = {
              name: firstCity.properties.city,
              latitude: firstCity.geometry.coordinates[1],
              longitude: firstCity.geometry.coordinates[0],
            }
            setPlace(newPlace)
            setfoundedCity('')
          }
          else {
            setfoundedCity("Ville introuvable !");
          }
        })
    }
    const sendArtists = selectedItems2.map((e) => e.name)
    const sendStyles = selectedItems.map((e) => e.name)

    fetch(`${BACKEND_URL}/festivals/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ start: dateStart, end: dateEnd, cityLongitude: place.longitude, cityLatitude: place.latitude, maxKm: distance, style: sendStyles, artists: sendArtists, averageParticipant: taille }),
    })
      .then((response) => response.json())
      .then((data) => {
        (foundedCity === '') && navigation.navigate('SearchResultsScreen', { ...data })
      })
  }


  const cityNotFound = <Text style={styles.cityNotFound}>{foundedCity}</Text>

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={user.settings.nightMode ? nightModeStyle.container : styles.container}>
      <View style={user.settings.nightMode ? nightModeStyle.header : styles.header}>
        <Text style={user.settings.nightMode ? nightModeStyle.title1 : styles.title1}>Recherche</Text>
      </View>
      <ScrollView contentContainerStyle={user.settings.nightMode ? nightModeStyle.allElement : styles.allElement}>
        <View style={user.settings.nightMode ? nightModeStyle.dateContainer : styles.dateContainer}>
          <DateInputStart label="Date de debut" />
          <DateInputEnd label="Date de fin" />
        </View>
        <View style={user.settings.nightMode ? nightModeStyle.box : styles.box}>
          <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>Selectionner votre ville</Text>
          <View style={user.settings.nightMode ? nightModeStyle.searchcity : styles.searchcity}>
            <TextInput 
              placeholder="Ville" 
              placeholderTextColor={user.settings.nightMode ? '#FFFFFF' : '#19525a'}
              onChangeText={(value) => setVille(value)}
              value={ville}
              style={[
                user.settings.nightMode ? nightModeStyle.inputville : styles.inputville,
                { borderColor: focusedInput === 'ville' ? '#15C2C2' : '#7CB7BF', borderWidth: focusedInput === 'ville' ? 2 : 1 }
              ]}
              onFocus={() => setFocusedInput('ville')}
              onBlur={() => setFocusedInput(null)}
            />
            <TouchableOpacity onPress={() => myPosition()}>
              <FontAwesome6 name='location-crosshairs' size={50} color={'#15C2C2'} />
            </TouchableOpacity>
          </View>
          {cityNotFound}
          <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>Distance max : {distance} km</Text>
          <Slider
            style={user.settings.nightMode ? nightModeStyle.slider : styles.slider}
            minimumValue={50}
            maximumValue={1000}
            step={50}
            value={distance}
            onValueChange={(value) => setDistance(value)}
            minimumTrackTintColor="#15C2C2"
            maximumTrackTintColor="#D2FFF4"
            thumbTintColor="#15C2C2"
          />
        </View>
        <View style={user.settings.nightMode ? nightModeStyle.box : styles.box}>
          <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>Selectionner 1 ou plusieurs types de musique</Text>
          <TextInput
            style={[
              user.settings.nightMode ? nightModeStyle.input : styles.input,
              { borderColor: focusedInput === 'style' ? '#15C2C2' : '#7CB7BF', borderWidth: focusedInput === 'style' ? 2 : 1 }
            ]}
            placeholder="Rechercher un style"
            placeholderTextColor={user.settings.nightMode ? '#FFFFFF' : '#19525a'}
            value={searchQuery}
            onChangeText={(text) => handleSearch(text)}
            onFocus={() => setFocusedInput('style')}
            onBlur={() => setFocusedInput(null)}
          />
          <ScrollView style={user.settings.nightMode ? nightModeStyle.scrollView : styles.scrollView}>
            {filteredData.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={user.settings.nightMode ? nightModeStyle.item : styles.item}
                onPress={() => handleSelectItem(item)}
              >
                <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={user.settings.nightMode ? nightModeStyle.selectedContainer : styles.selectedContainer}>
            {selectedItems.map((item, i) => (
              <TouchableOpacity key={i} style={user.settings.nightMode ? nightModeStyle.selectedItemText : styles.selectedItemText} onPress={() => handleSelectItem(item)}>
                <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>Selectionner 1 ou plusieurs artistes</Text>
          <TextInput
            style={[
              user.settings.nightMode ? nightModeStyle.input : styles.input,
              { borderColor: focusedInput === 'artiste' ? '#15C2C2' : '#7CB7BF', borderWidth: focusedInput === 'artiste' ? 2 : 1 }
            ]}
            onFocus={() => setFocusedInput('artiste')}
            onBlur={() => setFocusedInput(null)}
            placeholder="Rechercher un artiste"
            placeholderTextColor={user.settings.nightMode ? '#FFFFFF' : '#19525a'}
            value={searchQuery2}
            onChangeText={(text) => handleSearch2(text)}
          />
          <ScrollView style={user.settings.nightMode ? nightModeStyle.scrollView : styles.scrollView}>
            {filteredData2.map((item2, i) => (
              <TouchableOpacity
                key={i}
                style={user.settings.nightMode ? nightModeStyle.item : styles.item}
                onPress={() => handleSelectItem2(item2)}
              >
                <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>{item2.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={user.settings.nightMode ? nightModeStyle.selectedContainer : styles.selectedContainer}>
            {selectedItems2.map((item2, i) => (
              <TouchableOpacity key={i} style={user.settings.nightMode ? nightModeStyle.selectedItemText2 : styles.selectedItemText2} onPress={() => handleSelectItem2(item2)}>
                <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>{item2.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={user.settings.nightMode ? nightModeStyle.box : styles.box}>
          <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>Taille du festival (en nombre moyen de participants /jour) : </Text>
          <View style={user.settings.nightMode ? nightModeStyle.buttonTailleContainer : styles.buttonTailleContainer}>
            <TouchableOpacity style={[user.settings.nightMode ? nightModeStyle.buttonTaille : styles.buttonTaille, { backgroundColor: taille === 'petit' ? (user.settings.nightMode ? '#FFFFFF' : '#19525A') : 'rgba(0, 0, 0, 0)' }]} onPress={() => selectTaille('petit')}>
              <Text style={[user.settings.nightMode ? nightModeStyle.buttonTailleText : styles.buttonTailleText, { color: taille === 'petit' ? (user.settings.nightMode ? '#19525A' : '#FFE45D') : (user.settings.nightMode ? '#FFFFFF' : '#19525a') }]}>{petit}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[user.settings.nightMode ? nightModeStyle.buttonTaille : styles.buttonTaille, { backgroundColor: taille === 'moyen' ? (user.settings.nightMode ? '#FFFFFF' : '#19525A') : 'rgba(0, 0, 0, 0)' }]} onPress={() => selectTaille('moyen')}>
              <Text style={[user.settings.nightMode ? nightModeStyle.buttonTailleText : styles.buttonTailleText, { color: taille === 'moyen' ? (user.settings.nightMode ? '#19525A' : '#FFE45D') : (user.settings.nightMode ? '#FFFFFF' : '#19525a') }]}>{moyen}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[user.settings.nightMode ? nightModeStyle.buttonTaille : styles.buttonTaille, { backgroundColor: taille === 'grand' ? (user.settings.nightMode ? '#FFFFFF' : '#19525A') : 'rgba(0, 0, 0, 0)' }]} onPress={() => selectTaille('grand')}>
              <Text style={[user.settings.nightMode ? nightModeStyle.buttonTailleText : styles.buttonTailleText, { color: taille === 'grand' ? (user.settings.nightMode ? '#19525A' : '#FFE45D') : (user.settings.nightMode ? '#FFFFFF' : '#19525a') }]}>{grand}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={user.settings.nightMode ? nightModeStyle.buttonContainer : styles.buttonContainer}>
          <TouchableOpacity style={user.settings.nightMode ? nightModeStyle.button : styles.button} onPress={() => search()}>
            <Text style={user.settings.nightMode ? nightModeStyle.buttonText : styles.buttonText}>Rechercher</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  header: {
    height: 86,
    justifyContent: 'flex-end',
    borderBottomColor: '#19525A',
    borderBottomWidth: 3,
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  allElement: {
    padding: 10,
    alignItems: 'center',
  },

  scrollView: {
    maxHeight: 200,
  },

  dateContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent:'space-between'
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
  button: {
    padding: 10,
    backgroundColor: '#19525a',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 100,
    width: '90%',
    height: 70,
  },
  box: {
    width: '90%',
    marginVertical: 10
  },
  datebox:{
    width: '45%',
    marginVertical: 10
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20
  },
  buttonTailleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonTaille: {
    marginTop: 10,
    marginBottom: 50,
    borderColor: '#19525A',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 12
  },
  buttonTailleText: {
    fontFamily: 'Poppins_400Regular',
    color: '#19525a',
    fontSize: 15
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#7CB7BF',
    borderRadius: 8,
    height: 50,
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    color: '#19525a'
  },
  inputville: {
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
  searchcity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  inputDate: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#7CB7BF',
    borderRadius: 8,
    height: 50,
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    color: '#19525a'

  },
  selectedContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  selectedItemText: {
    backgroundColor: '#FFE45D',
    color: '#19525A',
    borderRadius: 5,
    padding: 5,
    margin: 5,
    elevation: 2,
    fontFamily: 'Poppins_400Regular',
  },
  selectedItemText2: {
    backgroundColor: '#D2FFF4',
    color: '#19525A',
    borderRadius: 5,
    padding: 5,
    margin: 5,
    elevation: 2,

  },
  item: {
    padding: 5,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#7CB7BF',
  },
  cityNotFound: {
    color: '#FF4848',
    fontFamily: 'Poppins_400Regular',
  },
  text: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#19525a'
  },
  label: {
    fontFamily: 'Poppins_400Regular',
    color: '#19525a'
  },
  slider: {
    marginBottom: 20
  }
})

const nightModeStyle = StyleSheet.create({
  header: {
    height: 86,
    justifyContent: 'flex-end',
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 3,
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#19525A'
  },
  allElement: {
    padding: 10,
    alignItems: 'center',
  },
  scrollView: {
    maxHeight: 200,
  },
  dateContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent:'space-between'
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
  button: {
    padding: 10,
    backgroundColor: '#15C2C2',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 100,
    width: '90%',
    height: 70,
  },
  box: {
    width: '90%',
    marginVertical: 10
  },
  datebox:{
    width: '45%',
    marginVertical: 10
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20
  },
  buttonTailleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonTaille: {
    marginTop: 10,
    marginBottom: 50,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 12
  },
  buttonTailleText: {
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
    fontSize: 15
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#7CB7BF',
    borderRadius: 8,
    height: 50,
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF'
  },
  inputville: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#7CB7BF',
    borderRadius: 8,
    height: 50,
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
    marginBottom: 0,
  },
  searchcity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  inputDate: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#7CB7BF',
    borderRadius: 8,
    height: 50,
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF'

  },
  selectedContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  selectedItemText: {
    backgroundColor: '#FFE45D',
    color: '#FFFFFF',
    borderRadius: 5,
    padding: 5,
    margin: 5,
    elevation: 2,
    fontFamily: 'Poppins_400Regular',
  },
  selectedItemText2: {
    backgroundColor: '#D2FFF4',
    color: '#FFFFFF',
    borderRadius: 5,
    padding: 5,
    margin: 5,
    elevation: 2,

  },
  item: {
    padding: 5,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#7CB7BF',
  },
  cityNotFound: {
    color: '#FFFFFF',
    fontFamily: 'Poppins_400Regular',
  },
  text: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF'
  },
  label: {
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF'
  },
  slider: {
    marginBottom: 20
  }
})