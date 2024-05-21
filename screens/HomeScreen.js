import { Image, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Platform, Dimensions } from 'react-native';
import FestivalCard from '../components/FestivalCard';
import { useEffect, useState } from 'react';
//const windowWidth = Dimensions.get('window').width;
//const windowHeight = Dimensions.get('window').height;

export default function HomeScreen({ navigation }) {
  const [nextFestivals, setnextFestivals] = useState([]);
  const [popularFestivals, setpopularFestivals] = useState([]);
  const [nearFestivals, setnearFestivals] = useState([]);
  let next=[]
  let popular=[]
  let near=[]
  const BACKEND_URL = '10.1.3.11';

  useEffect(() => {
    fetch(`http://${BACKEND_URL}:3000/festivals/findAll`)
    .then(response => response.json())
    .then(data => {
      setnextFestivals(data.festivals)
    })
  }, []);

  useEffect(() => {
    fetch(`http://${BACKEND_URL}:3000/festivals/findAll`)
    .then(response => response.json())
    .then(data => {
      const sortbyaverage = data.festivals.sort((a,b)=> (b.averageParticipant-a.averageParticipant))
      const first =sortbyaverage.slice(0,10)
      setpopularFestivals(first)
    })
  }, []);

  useEffect(() => {
    fetch(`http://${BACKEND_URL}:3000/festivals/findAll`)
    .then(response => response.json())
    .then(data => {
      setnearFestivals(data.festivals)
    })
  }, []);
  
  if (nextFestivals.length>0){
    next = nextFestivals.map((e, i) => {
      return (<FestivalCard key={i} {...e} />)
    })
    popular = popularFestivals.map((e, i) => {
      return (<FestivalCard key={i} {...e} />)
    })
    near = nearFestivals.map((e, i) => {
      return (<FestivalCard key={i} {...e} />)
    })
  }






  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title1}>Home</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollPrincipal}>
        <View style={styles.section}>
          <Text style={styles.title2}>A venir...</Text>
          <ScrollView contentContainerStyle={styles.scrollSecondaire} horizontal={true}>
            {next}
          </ScrollView>
        </View>
        <View style={styles.section}>
          <Text style={styles.title2}>Les + populaires</Text>
          <ScrollView contentContainerStyle={styles.scrollSecondaire} horizontal={true}>
          {popular}
          </ScrollView>
        </View>
        <View style={styles.section}>
          <Text style={styles.title2}>Autour de vous</Text>
          <ScrollView contentContainerStyle={styles.scrollSecondaire} horizontal={true}>
          {near}
          </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'center'
  },

  scrollPrincipal: {

  },
  scrollSecondaire: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  section: {
    width: Dimensions.get('window').width,
    height: 300,
    borderBottomColor: '#19525A',
    borderBottomWidth: 3
  },
  title1: {
    fontSize: 30,
    color: '#19525A',
    fontWeight: 'semibold'
  },
  title2: {
    color: '#19525A',
    marginLeft: 10,
    fontWeight: 'semibold',
    fontSize: 24,
  },

});
