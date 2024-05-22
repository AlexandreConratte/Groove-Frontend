import { Dimensions, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height; 

export default function FriendsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={styles.iconArrow}>
          <FontAwesome5 name='arrow-left' size={33} color={'#19525A'}/>
        </TouchableOpacity>
        <Text style={styles.title1}>Mes ami(e)s</Text>
      </View>

      <View style={styles.pictureContainer}>
          <TouchableOpacity style={styles.addFriendContainer}>
            <Text style={styles.addFriends}>Ajouter des amis</Text>
            <FontAwesome5 name='user-plus' size={13.5} color={'#15C2C2'}/>
          </TouchableOpacity>
      </View>

      <View style={styles.groupsContainer}>
        <Text style={styles.title2}>Mes groupes :</Text>
      </View>
      <ScrollView>
        <View style={styles.friendsContainer}>
          <Text style={styles.title2}>Mes amis :</Text>
        </View>
      </ScrollView>
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
  },
  addFriends: {
    fontFamily: 'Poppins_400Regular',
    color: '#19525A',
    fontSize: 12,
    marginRight: 4
  },
  groupsContainer: {
    height: 172,
    borderTopColor: '#19525A',
    borderTopWidth: 3,
  },
  friendsContainer: {
    borderTopColor: '#19525A',
    borderTopWidth: 3,
  },
});
