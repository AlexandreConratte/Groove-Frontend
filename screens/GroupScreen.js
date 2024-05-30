import { Dimensions, Image, Platform, TextInput, Modal, StyleSheet, Text, TouchableOpacity, View, ScrollView, ImageBackground } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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

export default function GroupScreen({ route, navigation }) {
    const user = useSelector((state) => state.user.value)
    const objet = route.params;

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

    const [festivalData, setfestivalData] = useState([]);
    const [groupData, setgroupData] = useState({});
    const [membersData, setmembersData] = useState([]);
    const [modalAddFriend, setmodalAddFriend] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [usersdata, setusersdata] = useState([]);
    const [filteredData, setFilteredData] = useState(usersdata);
    const [focusedInput, setFocusedInput] = useState(null)
    let members = []

    useEffect(() => {
        fetch(`${BACKEND_URL}/groups/groupInfo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ groupId: objet.id }),
        })
            .then((response) => response.json())
            .then((data) => {
                fetchMembersData(data.groups)
                setgroupData(data.groups)
                fetch(`${BACKEND_URL}/festivals/findById`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: data.groups.festival }),
                })
                    .then((response2) => response2.json())
                    .then((data2) => setfestivalData(data2.result))
            })
    }, []);

    const affichage1 = () => {
        fetch(`${BACKEND_URL}/users/getAllUsers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: user.token }),
        })
            .then((response) => response.json())
            .then((data) => setusersdata(data.friends))
    }


    useEffect(() => {
        affichage1()
    }, []);

    const changeStatut = (oldStatut, newStatut, userId) => {
        fetch(`${BACKEND_URL}/groups/changeStatut`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ oldStatut, newStatut, userId, groupId: objet.id, userToken: user.token }),
        })
            .then((response) => response.json())
            .then(data => {
                if (data.result) {
                    fetchMembersData(data.updateMembers)
                }
            })
    }

    const fetchMembersData = async (group) => {
        let tab = []
        for (const element of group.members) {
            const response = await fetch(`${BACKEND_URL}/users/infoUser`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: element }),
            })
            const data = await response.json()
            let selection = ''
            if (group.participant.find((e) => e == element)) {
                selection = 'participant'
            }
            else if (group.hesitate.find((e) => e == element)) {
                selection = 'hesitate'
            }
            else if (group.impossible.find((e) => e == element)) {
                selection = 'impossible'
            }
            tab.push({ user: data.user, selection, id: element })
        }

        setmembersData(tab)
    }

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.length > 0) {
            const newData = usersdata.filter((item) => {
                const itemName = item.username.toLowerCase();
                return itemName.includes(query.toLowerCase());
            });
            setFilteredData(newData);
        } else {
            setFilteredData([]);
        }
    };

    const handleSelectItem = (item) => {
        fetch(`${BACKEND_URL}/groups/newUser`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ groupId: objet.id, user: item.token }),
        })
            .then((response) => response.json())
            .then(data => {
                if (data.result) {
                    fetchMembersData(data.updateMembers)
                }
            })
    }

    if (membersData) {
        members = membersData.map((e, i) => {
            if (e.user) {
                return (
                    <View key={i} style={user.settings.nightMode ? nightModeStyle.userContainer : styles.userContainer}>
                        <Text style={user.settings.nightMode ? nightModeStyle.title : styles.title}>{e.user.username}</Text>
                        <View style={user.settings.nightMode ? nightModeStyle.logoContainer : styles.logoContainer}>
                            <TouchableOpacity style={user.settings.nightMode ? nightModeStyle.icon2 : styles.icon2} onPress={() => changeStatut(e.selection, 'participant', e.id)}>
                                <Ionicons name={(e.selection === 'participant') ? 'checkmark-circle' : 'checkmark-circle-outline'} size={40} color={user.settings.nightMode ? (e.selection === 'participant') ? '#15C2C2' : '#15C2C2' : (e.selection === 'participant') ? '#15C2C2' : '#19525A'} />
                            </TouchableOpacity>
                            <TouchableOpacity style={user.settings.nightMode ? nightModeStyle.icon2 : styles.icon2} onPress={() => changeStatut(e.selection, 'hesitate', e.id)}>
                                <Ionicons name={(e.selection === 'hesitate') ? 'help-circle' : 'help-circle-outline'} size={40} color={user.settings.nightMode ? (e.selection === 'hesitate') ? '#FFE45D' : '#15C2C2' : (e.selection === 'hesitate') ? '#FFE45D' : '#19525A'} />
                            </TouchableOpacity>
                            <TouchableOpacity style={user.settings.nightMode ? nightModeStyle.icon2 : styles.icon2} onPress={() => changeStatut(e.selection, 'impossible', e.id)}>
                                <Ionicons name={(e.selection === 'impossible') ? 'close-circle' : 'close-circle-outline'} size={40} color={user.settings.nightMode ? (e.selection === 'impossible') ? '#FF4848' : '#15C2C2' : (e.selection === 'impossible') ? '#FF4848' : '#19525A'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        })
    }

    if (!fontsLoaded) {
        return <Text></Text>;
    }

    return (
        <View style={user.settings.nightMode ? nightModeStyle.container : styles.container}>
            <Modal visible={modalAddFriend} transparent={true} style={user.settings.nightMode ? nightModeStyle.modalBackground : styles.modalBackground}>
                <View style={user.settings.nightMode ? nightModeStyle.modalBackground : styles.modalBackground}>
                    <View style={user.settings.nightMode ? nightModeStyle.modalContainer : styles.modalContainer}>
                        <TouchableOpacity style={user.settings.nightMode ? nightModeStyle.close : styles.close} onPress={() => setmodalAddFriend(false)}>
                            <FontAwesome name="remove" size={25} color={user.settings.nightMode ? '#FFFFFF' : '#19525A'} />
                        </TouchableOpacity>
                        <TextInput
                            style={[user.settings.nightMode ? nightModeStyle.inputModal : styles.inputModal, { borderColor: focusedInput === 'style' ? '#15C2C2' : '#7CB7BF' }, { borderWidth: focusedInput === 'style' ? 2 : 1 }]}
                            placeholder="Rechercher un(e) ami(e)"
                            placeholderTextColor={user.settings.nightMode ? '#FFFFFF' : '#19525a'}
                            value={searchQuery}
                            onChangeText={(text) => handleSearch(text)}
                            onFocus={() => setFocusedInput('style')}
                            onBlur={() => setFocusedInput(null)}
                        />
                        <ScrollView style={user.settings.nightMode ? nightModeStyle.scrollViewModal : styles.scrollViewModal}>
                            {filteredData.map((item, i) => {
                                if (!membersData.find((e) => e.user.username === item.username)) {
                                    return (<View
                                        key={i}
                                        style={user.settings.nightMode ? nightModeStyle.item : styles.item}
                                    >
                                        <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>{item.username}</Text>
                                        <TouchableOpacity
                                            style={user.settings.nightMode ? nightModeStyle.addButton : styles.addButton}
                                            onPress={() => handleSelectItem(item)}
                                        >
                                            <Text style={user.settings.nightMode ? nightModeStyle.textButton : styles.textButton}>Ajouter</Text>
                                        </TouchableOpacity>
                                    </View>
                                    )
                                }
                                else {
                                    return (<View key={i} style={user.settings.nightMode ? nightModeStyle.item : styles.item}>
                                        <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>{item.username}</Text>
                                    </View>
                                    )
                                }
                            }
                            )}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
            <View style={user.settings.nightMode ? nightModeStyle.global : styles.global}>
                <View style={user.settings.nightMode ? nightModeStyle.header : styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate('Friends')} style={user.settings.nightMode ? nightModeStyle.iconArrow : styles.iconArrow}>
                        <FontAwesome5 name='arrow-left' size={33} color={user.settings.nightMode ? '#FFFFFF' : '#19525A'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={user.settings.nightMode ? nightModeStyle.addUser : styles.addUser} onPress={() => setmodalAddFriend(true)}>
                        <FontAwesome5 name='user-plus' size={33} color={user.settings.nightMode ? '#FFFFFF' : '#19525A'} />
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    {festivalData.name && <View style={user.settings.nightMode ? nightModeStyle.festivalInfo : styles.festivalInfo}>
                        <View style={user.settings.nightMode ? nightModeStyle.imageContainer : styles.imageContainer}>
                            <Image
                                source={{ uri: festivalData.pictures[0] }}
                                style={user.settings.nightMode ? nightModeStyle.image : styles.image}
                            />
                        </View>
                        <View style={user.settings.nightMode ? nightModeStyle.textContainer : styles.textContainer}>
                            <Text style={user.settings.nightMode ? nightModeStyle.title1 : styles.title1}>{groupData.name}</Text>
                            <Text style={user.settings.nightMode ? nightModeStyle.groupName : styles.groupName}>{festivalData.name}</Text>
                            <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>{festivalData.adress.place}, {festivalData.adress.city}</Text>
                            <Text style={user.settings.nightMode ? nightModeStyle.text : styles.text}>Du {new Date(festivalData.start).toLocaleDateString()}{"\n"}Au {new Date(festivalData.end).toLocaleDateString()}</Text>
                        </View>
                    </View>}
                    {members}
                </ScrollView>

            </View>
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
    title1: {
        fontSize: 30,
        color: '#19525A',
        fontFamily: 'Poppins_600SemiBold',
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
    addUser: {
        position: 'absolute',
        right: 9,
        height: '60%',
        width: '10%',
        marginBottom: 5
    },
    groupName: {
        fontSize: 20,
        fontFamily: 'Poppins_600SemiBold',
        color: '#19525A',
    },
    image: {
        width: '100%',
        height: (windowHeight / 4),
    },
    userContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        width: '100%',
        height: 75,
        marginVertical: 5,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.5,
            },
            android: {
                elevation: 6,
            },
        }),
        justifyContent: 'space-between',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoContainer: {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 30,
        color: '#19525A',
        fontFamily: 'Poppins_600SemiBold',

    },
    festivalInfo: {
        width: '100%',
        borderColor: '#19525A',
        borderBottomWidth: 3,
        backgroundColor: 'white',
        padding: 5
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    modalContainer: {
        paddingTop: 40,
        width: 250,
        height: 300,
        justifyContent: 'center',
        backgroundColor: "white",
        borderColor: '#19525a',
        borderWidth: 3,
        alignItems: 'center',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollViewModal: {
        maxHeight: 200,
        width: '80%'
    },
    item: {
        padding: 5,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#7CB7BF',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    close: {
        position: 'absolute',
        right: 5,
        top: 5
    },
    addButton: {
        backgroundColor: '#19525a',
        borderRadius: 5,
        padding: 3
    },
    textButton: {
        fontFamily: 'Poppins_600SemiBold',
        color: 'white'
    },
    inputModal: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#7CB7BF',
        borderRadius: 8,
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
        color: '#19525a',
        marginBottom: 10,
    },
});

const nightModeStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#19525A'
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
    text: {
        fontFamily: 'Poppins_600SemiBold',
        color: '#FFFFFF'
    },
    iconArrow: {
        position: 'absolute',
        left: 9,
        height: '60%',
        width: '10%',
        marginBottom: 5
    },
    addUser: {
        position: 'absolute',
        right: 9,
        height: '60%',
        width: '10%',
        marginBottom: 5
    },
    groupName: {
        fontSize: 20,
        fontFamily: 'Poppins_600SemiBold',
        color: '#FFFFFF',
    },
    image: {
        width: '100%',
        height: (windowHeight / 4),
    },
    userContainer: {
        backgroundColor:'#19525A' ,
        borderRadius: 5,
        width: '100%',
        height: 75,
        marginVertical: 5,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.5,
            },
            android: {
                elevation: 6,
            },
        }),
        justifyContent: 'space-between',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth:2,
        borderColor:'#15C2C2'
    },
    logoContainer: {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 30,
        color: 'white',
        fontFamily: 'Poppins_600SemiBold',

    },
    festivalInfo: {
        width: '100%',
        borderColor: '#15C2C2',
        borderBottomWidth: 3,
        backgroundColor: '#19525A',
        padding: 5
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    modalContainer: {
        paddingTop: 40,
        width: 250,
        height: 300,
        justifyContent: 'center',
        backgroundColor: "#19525a",
        borderColor: '#FFFFFF',
        borderWidth: 3,
        alignItems: 'center',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollViewModal: {
        maxHeight: 200,
        width: '80%'
    },
    item: {
        padding: 5,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#7CB7BF',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    close: {
        position: 'absolute',
        right: 5,
        top: 5
    },
    addButton: {
        backgroundColor: '#15C2C2',
        borderRadius: 5,
        padding: 3
    },
    textButton: {
        fontFamily: 'Poppins_600SemiBold',
        color: 'white'
    },
    inputModal: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#7CB7BF',
        borderRadius: 8,
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
        color: '#FFFFFF',
        marginBottom: 10,
    },
});
