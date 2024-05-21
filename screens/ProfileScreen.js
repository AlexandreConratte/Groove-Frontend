import { Image, StyleSheet, Text, TouchableOpacity, View , Modal} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';

export default function ProfileScreen({ navigation }) {

  const [modalisVisible, setModalisVisible] = useState(true);

  const GotoConnect = () => {
    navigation.navigate('Connect1');
    setModalisVisible(false)
  }

  const GotoHome = () => {
    navigation.navigate('Home')
    setModalisVisible(false)
  }  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
        <FontAwesome name='arrow-left' size={30}/>
      </TouchableOpacity>
      <Text>ProfileScreen</Text>
    

<Modal visible={modalisVisible} transparent={true} style={styles.modalBackground}>
<View style={styles.modalBackground}>

  <View style={styles.modalContainer}>
    <Text style={styles.welcomeText}>Tu n'es toujours pas connecté !</Text>
    <Text style={styles.descripText}>Pour une expérience personnalisée </Text>
    <TouchableOpacity onPress={() => GotoConnect()} style={styles.GotoConnectButton}>
      <Text style={styles.connect}>Connecte Toi</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => GotoHome()} style={styles.GoToApp}>
      <Text style={styles.acced}>Accéder à l'application</Text>
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
    justifyContent: 'center',
    alignItems: 'center'
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
    margin: 5,
    textAlign: "center",
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 10,
  },
  descripText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,


  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connect: {
    fontWeight: "bold",
    color: "white",
    fontSize: 24,
  },
  acced: {
    fontSize: 14,
    fontWeight: "bold",
  }

});
