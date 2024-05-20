import { Image, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Platform,Dimensions } from 'react-native';
import FestivalCard from '../components/FestivalCard';


export default function HomeScreen({ navigation }) {
  //const windowWidth = Dimensions.get('window').width;
  //const windowHeight = Dimensions.get('window').height;





  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.header}>
        <Text>Home</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollPrincipal}>
        <View style={styles.section}>
          <Text style={styles.title2}>A venir</Text>
          <ScrollView contentContainerStyle={styles.scrollSecondaire} horizontal={true}>
            <FestivalCard key={1} festival={{ name: 'Festival test1' }} />
            <FestivalCard key={2} festival={{ name: 'Festival test2' }} />
            <FestivalCard key={3} festival={{ name: 'Festival test2' }} />
            <FestivalCard key={4} festival={{ name: 'Festival test2' }} />
            <FestivalCard key={5} festival={{ name: 'Festival test2' }} />
            <FestivalCard key={6} festival={{ name: 'Festival test2' }} />
          </ScrollView>
        </View>
        <View style={styles.section}>
          <Text style={styles.title2}>Les plus populaires</Text>
          <ScrollView contentContainerStyle={styles.scrollSecondaire}>
            <FestivalCard key={1} festival={{ name: 'Festival test1' }} />
            <FestivalCard key={2} festival={{ name: 'Festival test2' }} />
          </ScrollView>
        </View>
        <View style={styles.section}>
          <Text style={styles.title2}>Autour de vous</Text>
          <ScrollView contentContainerStyle={styles.scrollSecondaire}>
            <FestivalCard key={1} festival={{ name: 'Festival test1' }} />
            <FestivalCard key={2} festival={{ name: 'Festival test2' }} />
          </ScrollView>
        </View>
      </ScrollView>

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  header:{
    height:86,
    justifyContent:'flex-end',
    
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  scrollPrincipal:{

  },
  scrollSecondaire:{
   flexDirection:'row',
   alignItems:'center',
   
  },
  section:{
    width:Dimensions.get('window').width,
    height:300,
    borderColor:'black',
    borderWidth:1
  }

});
