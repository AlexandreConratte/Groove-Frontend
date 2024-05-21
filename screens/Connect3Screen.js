import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, TextInput,   } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function Connect3Screen({ navigation }) {

  const dispatch = useDispatch();


  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthdate, setBirthdate] = useState("");
  const [city, setCity] = useState('');
  const [focusedInput, setFocusedInput] = useState(null)

  const DateInput = ({ label}) => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [formattedDate, setFormattedDate] = useState('');

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setDate(currentDate);

      let tempDate = new Date(currentDate);
      let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
      setFormattedDate(fDate);
    };

    const showDatepicker = () => {
      setShow(true);
    };  
    return ( 
    <View> 
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity onPress={showDatepicker}>
      <TextInput style={styles.input} placeholder="Sélectionnez une date" value={formattedDate} editable={false}/>
    </TouchableOpacity>
    {show && ( <DateTimePicker testID="dateTimePicker"  value={date} mode="date" display="default" onChange={onChange}/>)}
    </View> 
  );
};



    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name='arrow-left' size={30} color="#19525a" />
          </TouchableOpacity>
          <Text style={styles.title}>Connect</Text>
        </View>

        <View style={styles.containerConnect}>
          <View>
            <View style={styles.iconContainer}>
              <Icon name="user" size={80} color="#15C2C2" />
            </View>
            <Text>Ajouter une photo *</Text>
          </View>


          <View style={styles.textandinputcontain}>
            <View style={styles.firstandlastname}>
              <Text style={styles.text}>Prénom *</Text>
              <TextInput placeholder="Prénom" onChangeText={(value) => setFirstname(value)}
                value={firstname} style={[styles.input, { borderColor: focusedInput === 'firstname' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'firstname' ? 2 : 1 }
                ]}
                onFocus={() => setFocusedInput('firstname')}
                onBlur={() => setFocusedInput(null)}
              />
              <Text style={styles.text}>Nom *</Text>
              <TextInput placeholder="Nom" onChangeText={(value) => setLastname(value)}
                value={lastname} style={[styles.input, { borderColor: focusedInput === 'lastname' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'lastname' ? 2 : 1 }
                ]}
                onFocus={() => setFocusedInput('lastname')}
                onBlur={() => setFocusedInput(null)}
              /></View>
          </View>


          <View style={styles.textandinputcontain}>
          <DateInput label="Date de naissance *" />

           
          </View>

          <View style={styles.textandinputcontain}>
            <Text style={styles.text}>Ville *</Text>
            <TextInput placeholder="Ville" onChangeText={(value) => setCity(value)}
              value={city} style={[styles.input, { borderColor: focusedInput === 'city' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'city' ? 2 : 1 }
              ]}
              onFocus={() => setFocusedInput('city')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          <TouchableOpacity onPress={() => validFields()} style={styles.nextButton}>
            <Text style={styles.nextText}>Suivant</Text>
          </TouchableOpacity>
          <Text>*informations facultatives</Text>
        </View>
      </View>

    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      height: 86,
      justifyContent: "space-around",
      borderBottomColor: '#19525A',
      borderBottomWidth: 3,
      width: Dimensions.get('window').width,
      alignItems: "center",
      flexDirection: "row",
      marginTop: 10,
      alignContent: "center",

    },
    title: {
      fontSize: 40,
      color: '#19525a',
      fontWeight: "500",
      marginRight: 80
    },
    iconContainer: {
      marginTop: 20,
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: '#15C2C2',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5
    },

    nextButton: {
      backgroundColor: '#19525a',
      height: 76,
      width: 264,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      marginTop: 20
    },
    nextText: {
      fontWeight: "600",
      color: "white",
      fontSize: 25
    },
    containerConnect: {
      justifyContent: "space-around",

      alignItems: "center",
      alignContent: "center",

    },
    input: {
      width: 170,
      padding: 10,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: '#7CB7BF',
      borderRadius: 8,
      height: 50,
      fontSize: 15,

    },
    text: {
      color: '#19525A'
    },
    textandinputcontain: {
      margin: 10
    },
    firstandlastname: {
      justifyContent: "space-evenly",
      flexDirection: "row"
    }
  })
