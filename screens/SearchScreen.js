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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';

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
  const [Ville, setVille] = useState("");
  const [start, setstart] = useState("");
  const [end, setend] = useState("");
  const [date, setDate] = useState(new Date());
  const [distance, setDistance] = useState(0);
  const [focusedInput, setFocusedInput] = useState(null)
  const [searchQuery, setSearchQuery] = useState('');
  const [stylesdata, setstylesdata] = useState([]);
  const [filteredData, setFilteredData] = useState(stylesdata);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/styles/findAll`)
      .then((response) => response.json())
      .then((data) => setstylesdata(data.styles))
  }, []);

  if (!fontsLoaded) {
    return <Text></Text>;
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length>0) {
      const newData = stylesdata.filter((item) => {
        const itemName = item.name.toLowerCase();
        return itemName.includes(query.toLowerCase());
      });
      setFilteredData(newData);
    } else {
      setFilteredData(stylesdata);
    }
  };

  const DateInputStart = ({ label }) => {
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setDate(currentDate);

      let tempDate = new Date(currentDate);
      let fortmatDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
      setstart(fortmatDate);
    };
    const showDatepicker = () => {
      setShow(true);
    };
    return (
      <View>
        <Text style={styles.text}>{label}</Text>
        <TouchableOpacity onPress={showDatepicker}>
          <TextInput style={styles.inputDate} placeholder="Sélectionnez une date" value={start} editable={false} />
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
      let fortmatDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
      setend(fortmatDate);
    };
    const showDatepicker = () => {
      setShow(true);
    };
    return (
      <View>
        <Text style={styles.text}>{label}</Text>
        <TouchableOpacity onPress={showDatepicker}>
          <TextInput style={styles.inputDate} placeholder="Sélectionnez une date" value={end} editable={false} />
        </TouchableOpacity>
        {show && (<DateTimePicker testID="dateTimePicker" value={date} mode="date" display="default" onChange={onChange} />)}
      </View>
    );
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

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconArrow}>
          <FontAwesome5 name='arrow-left' size={33} color={'#19525A'} />
        </TouchableOpacity>
        <Text style={styles.title1}>Recherche</Text>
      </View>
      <View style={styles.allElement} >
        <View style={styles.dateContainer}>
          <View style={styles.textandinputcontain}>
            <DateInputStart label="Date de debut" />
          </View>
          <View style={styles.textandinputcontain}>
            <DateInputEnd label="Date de fin" />
          </View>
        </View>
        <View >
          <TextInput placeholder="Ville" onChangeText={(value) => setVille(value)}
            value={Ville} style={[styles.input, { borderColor: focusedInput === 'Ville' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'Ville' ? 2 : 1 }
            ]}
            onFocus={() => setFocusedInput('Ville')}
            onBlur={() => setFocusedInput(null)}
          />
          <Text style={styles.label}>Distance max : {distance} km</Text>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1000}
              step={50}
              value={distance}
              onValueChange={(value) => setDistance(value)}
              minimumTrackTintColor="#15C2C2"
              maximumTrackTintColor="#D2FFF4"
              thumbTintColor="#15C2C2"
            />
          </View>
        </View>

          <TextInput
            style={styles.input}
            placeholder="Rechercher un style"
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
                onPress={() => handleSelectItem(item)}
              >
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.selectedContainer}>
            {selectedItems.map((item,i) => (
              <TouchableOpacity key={i} style={styles.selectedItemText} onPress={() => handleSelectItem(item)}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        

      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SearchResultsScreen')}>
        <Text style={styles.buttonText}>Rechercher</Text>
      </TouchableOpacity>

      </View>
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
  allElement:{
    padding:10,
    alignItems:'center',
  },

  scrollView: {
    maxHeight: 200,
    marginTop:-11
  },
  
  dateContainer:{
    flexDirection:'row',
    width:280,
    justifyContent:'space-between',
  },
  slider:{
    width:280
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
    marginBottom: 10,
    width: 300,
    height:70
  },
  buttonContainer:{
    width:'100%',
    alignItems:'center'
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Poppins_600SemiBold',
    fontSize:20
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
  },
  inputDate: {
    width: 130,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#7CB7BF',
    borderRadius: 8,
    height: 50,
    fontSize: 15,
    color: '#19525A'
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
    margin: 5
  },
  item: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#7CB7BF',
    width:280
  },
})
