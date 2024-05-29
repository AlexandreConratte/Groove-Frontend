import { Dimensions,Alert, Image, Platform, TextInput, Modal, StyleSheet, Text, TouchableOpacity, View, ScrollView, ImageBackground } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Group from '../components/Group';
import Friend from '../components/Friend';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

const BACKEND_URL = "https://backend-groove.vercel.app"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function GroupCreationScreen({ route, navigation }) {
    const user = useSelector((state) => state.user.value)
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

    //creation d'un nouveau groupe
    const [searchFestival, setsearchFestival] = useState('');
    const [festivalsdata, setfestivalsdata] = useState([]);
    const [filteredData, setFilteredData] = useState(festivalsdata);
    const [focusedInput, setFocusedInput] = useState(null)
    const [groupName, setgroupName] = useState('');
    const [selectedFestival, setselectedFestival] = useState([]);

    const [searchMembers, setSearchMembers] = useState('');
    const [usersdata, setusersdata] = useState([]);
    const [filteredData2, setFilteredData2] = useState(usersdata);
    const [selectedMembers, setselectedMembers] = useState([]);

    //creation du groupe
    const createGroup = async () => {
        if (groupName && (selectedFestival.length > 0)){
            const membersToken = selectedMembers.map((e) => e.token)
            membersToken.push(user.token)
            const response = await fetch(`${BACKEND_URL}/groups/newGroup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: groupName, festival: selectedFestival[0]._id, members: membersToken }),
            })
            const data = await response.json()
            navigation.navigate('Group', { id: data.id })
        }
        else {
            Alert.alert(
                'Champ(s) vide(s)',
                'Vous devez obligatoirement choisir un nom de groupe et un festival pour continuer',
              );
        }
    }

    //recherche et ajout du festival
    const handleSearch = (query) => {
        setsearchFestival(query);
        if (query.length > 0) {
            const newData = festivalsdata.filter((item) => {
                const itemName = item.name.toLowerCase();
                return itemName.includes(query.toLowerCase());
            });
            setFilteredData(newData);
        } else {
            setFilteredData([]);
        }
    };

    const handleSelectItem = (item) => {
        let newselectedFestival = [...selectedFestival];

        if (newselectedFestival.includes(item)) {
            newselectedFestival = newselectedFestival.filter((selectedItem) => selectedItem !== item);
        } else if (newselectedFestival.length < 1) {
            newselectedFestival.push(item);
        }
        setsearchFestival("")
        setFilteredData([])
        setselectedFestival(newselectedFestival);
    };

    useEffect(() => {
        fetch(`${BACKEND_URL}/festivals/findAll`)
            .then(response => response.json())
            .then(data => setfestivalsdata(data.festivals))
    }, []);

    //recherche et ajout des amis
    useEffect(() => {
        fetch(`${BACKEND_URL}/users/getAllUsers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: user.token }),
        })
            .then((response) => response.json())
            .then((data) => setusersdata(data.friends))
    }, []);

    const handleSearch2 = (query) => {
        setSearchMembers(query);
        if (query.length > 0) {
            const newData = usersdata.filter((item) => {
                const itemName = item.username.toLowerCase();
                return itemName.includes(query.toLowerCase());
            });
            setFilteredData2(newData);
        } else {
            setFilteredData2([]);
        }
    };

    const handleSelectItem2 = (item) => {
        let newselectedMembers = [...selectedMembers];

        if (newselectedMembers.includes(item)) {
            newselectedMembers = newselectedMembers.filter((selectedItem) => selectedItem !== item);
        } else {
            newselectedMembers.push(item);
        }
        setselectedMembers(newselectedMembers);
    };

    if (!fontsLoaded) {
        return <Text></Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Friends')} style={styles.iconArrow}>
                    <FontAwesome5 name='arrow-left' size={33} color={'#19525A'} />
                </TouchableOpacity>
                <Text style={styles.groupName}>Nouveau Groupe</Text>
            </View>
            <ScrollView contentContainerStyle={user.settings.nightMode ? nightModeStyle.globalScrollview : styles.globalScrollview}>
                <View style={user.settings.nightMode ? nightModeStyle.box : styles.box}>
                    <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>Donner un nom à votre groupe :</Text>
                    <TextInput
                        style={[
                            user.settings.nightMode ? nightModeStyle.input : styles.input,
                            { borderColor: focusedInput === 'name' ? '#15C2C2' : '#7CB7BF', borderWidth: focusedInput === 'name' ? 2 : 1 }
                        ]}
                        placeholder="Nom du groupe"
                        placeholderTextColor={user.settings.nightMode ? '#FFFFFF' : '#19525a'}
                        value={groupName}
                        onChangeText={(text) => setgroupName(text)}
                        onFocus={() => setFocusedInput('name')}
                        onBlur={() => setFocusedInput(null)}
                    />
                </View>
                <View style={user.settings.nightMode ? nightModeStyle.box : styles.box}>
                    <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>Choisissez votre festival !</Text>
                    <TextInput
                        style={[
                            user.settings.nightMode ? nightModeStyle.input : styles.input,
                            { borderColor: focusedInput === 'festival' ? '#15C2C2' : '#7CB7BF', borderWidth: focusedInput === 'festival' ? 2 : 1 }
                        ]}
                        placeholder="Rechercher un festival"
                        placeholderTextColor={user.settings.nightMode ? '#FFFFFF' : '#19525a'}
                        value={searchFestival}
                        onChangeText={(text) => handleSearch(text)}
                        onFocus={() => setFocusedInput('festival')}
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
                        {selectedFestival.map((item, i) => (
                            <TouchableOpacity key={i} style={user.settings.nightMode ? nightModeStyle.selectedItemText : styles.selectedItemText} onPress={() => handleSelectItem(item)}>
                                <Text style={user.settings.nightMode ? nightModeStyle.textSelected : styles.textSelected}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <View style={user.settings.nightMode ? nightModeStyle.box : styles.box}>
                    <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>Invitez des amis</Text>
                    <TextInput
                        style={[
                            user.settings.nightMode ? nightModeStyle.input : styles.input,
                            { borderColor: focusedInput === 'members' ? '#15C2C2' : '#7CB7BF', borderWidth: focusedInput === 'members' ? 2 : 1 }
                        ]}
                        placeholder="Rechercher un(e) ami(e)"
                        placeholderTextColor={user.settings.nightMode ? '#FFFFFF' : '#19525a'}
                        value={searchMembers}
                        onChangeText={(text) => handleSearch2(text)}
                        onFocus={() => setFocusedInput('members')}
                        onBlur={() => setFocusedInput(null)}
                    />
                    <ScrollView style={user.settings.nightMode ? nightModeStyle.scrollView : styles.scrollView}>
                        {filteredData2.map((item, i) => (
                            <TouchableOpacity
                                key={i}
                                style={user.settings.nightMode ? nightModeStyle.item : styles.item}
                                onPress={() => handleSelectItem2(item)}
                            >
                                <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>{item.username}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <View style={user.settings.nightMode ? nightModeStyle.selectedContainer : styles.selectedContainer}>
                        {selectedMembers.map((item, i) => (
                            <TouchableOpacity key={i} style={user.settings.nightMode ? nightModeStyle.selectedItemText : styles.selectedItemText} onPress={() => handleSelectItem2(item)}>
                                <Text style={user.settings.nightMode ? nightModeStyle.textSelected : styles.textSelected}>{item.username}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <View style={user.settings.nightMode ? nightModeStyle.buttonContainer : styles.buttonContainer}>
                    <TouchableOpacity style={user.settings.nightMode ? nightModeStyle.button : styles.button} onPress={() => createGroup()}>
                        <Text style={user.settings.nightMode ? nightModeStyle.buttonText : styles.buttonText}>Créer le groupe</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        height: 86,
        justifyContent: 'flex-end',
        borderBottomColor: '#19525A',
        borderBottomWidth: 3,
        width: Dimensions.get('window').width,
        alignItems: 'center',
    },

    text: {
        fontFamily: 'Poppins_600SemiBold',
        color: '#19525a'
    },
    iconArrow: {
        position: 'absolute',
        left: 9,
        height: '60%',
        width: '10%',
        marginBottom: 5
    },

    groupName: {
        fontSize: 20,
        fontFamily: 'Poppins_600SemiBold',
        color: '#19525A',
    },


    item: {
        padding: 5,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#7CB7BF',
        flexDirection: 'row',
        justifyContent: 'space-between'
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
    scrollView: {
        maxHeight: 200,
    },
    selectedContainer: {
        marginVertical: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedItemText: {
        backgroundColor: '#FFE45D',
        borderRadius: 5,
        padding: 10,
        margin: 5,
        elevation: 2,
        width: '100%',

    },
    textSelected: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 24,
        color: '#19525a',
        textAlign: 'center'
    },
    box: {
        width: '100%',
        marginVertical: 10,
    },
    globalScrollview: {
        width: Dimensions.get('window').width,
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 10
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
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 20
    },
});
