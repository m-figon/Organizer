import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Button, TouchableOpacity, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import _, { map } from 'underscore';
import loading from './loading.gif';
export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
            user: null,
            newItem: "",
            itemHour: "",
            startIndex: 0,
            endIndex: 3,
            pages: [],
            loaded: false,
            firstAdd: true
        }
    }
    componentDidMount() {
        fetch('https://rocky-citadel-32862.herokuapp.com/Organizer/users')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    users: responseJson
                })
            }).then(() => {
                for (let item of this.state.users) {
                    if (item.account === this.props.logedAc) {
                        this.setState({
                            user: item
                        }, () => {
                            let tmpUser = this.state.user;
                            tmpUser.list = _.sortBy(this.state.user.list, 'hour');
                            this.setState({
                                user: tmpUser,
                                loaded: true,
                                pages: []
                            }, () => {
                                let num = 0;
                                for (let item of this.state.user.list) {
                                    if ((num) % 4 === 0) {
                                        let tmpPages = this.state.pages;
                                        tmpPages.push(Math.floor((num) / 4) + 1);
                                        this.setState({
                                            pages: tmpPages
                                        })
                                    }
                                    num++;
                                }
                            })
                        })
                    }
                }
            })
    }
    changeInput = (value, type) => {
        this.setState({
            [type]: value
        })
    }

    deleteItem = (item) => {
        console.log(item);
        let userData = this.state.user;
        for (let i = 0; i < userData.list.length; i++) {
            if (userData.list[i].id === item) {
                userData.list.splice(i, 1);
            }
        }
        fetch('https://rocky-citadel-32862.herokuapp.com/Organizer/users/' + this.state.user.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.user.email,
                account: this.state.user.account,
                password: this.state.user.password,
                list: userData.list,
                id: this.state.user.id
            }),
        }).then(() => {
            fetch('https://rocky-citadel-32862.herokuapp.com/Organizer/users')
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        users: responseJson,
                        newItem: "",
                        itemHour: "",
                    }, () => {
                        let tmpUser = this.state.user;
                        tmpUser.list = _.sortBy(this.state.user.list, 'hour');
                        this.setState({
                            user: tmpUser,
                            pages: []
                        }, () => {
                            let num = 0;
                            for (let item of this.state.user.list) {
                                if ((num) % 4 === 0) {
                                    let tmpPages = this.state.pages;
                                    tmpPages.push(Math.floor((num) / 4) + 1);
                                    this.setState({
                                        pages: tmpPages
                                    })
                                }
                                num++;
                            }
                            if (this.state.pages.length <= this.state.startIndex / 4) {
                                this.changeIndex(this.state.pages.length);
                            }
                        })
                    })
                })
        })
    }
    markAsCompleted = (id, value) => {
        let tmpUser = this.state.user;
        for (let item of tmpUser.list) {
            if (item.id === id) {
                item.completed = value;
                console.log(tmpUser);
                fetch('https://rocky-citadel-32862.herokuapp.com/Organizer/users/' + this.state.user.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: this.state.user.email,
                        account: this.state.user.account,
                        password: this.state.user.password,
                        list: tmpUser.list,
                        id: this.state.user.id
                    }),
                }).then(() => {
                    fetch('https://rocky-citadel-32862.herokuapp.com/Organizer/users')
                        .then((response) => response.json())
                        .then((responseJson) => {
                            this.setState({
                                users: responseJson,
                            }, () => {
                                let tmpUser = this.state.user;
                                tmpUser.list = _.sortBy(this.state.user.list, 'hour');
                                this.setState({
                                    user: tmpUser
                                })
                            })
                        })
                })
            }
        }

    }
    addItem = () => {
        console.log(!(this.state.newItem.match(/^[A-Za-z\s]{4,30}$/) === null));
        console.log(!(this.state.itemHour.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/) === null));
        if (!(this.state.newItem.match(/^[A-Za-z\s]{4,30}$/) === null) && !(this.state.itemHour.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/) === null)) {
            let user;
            let updatedList;
            for (let item of this.state.users) {
                if (item.account === this.props.logedAc) {
                    this.setState({
                        user: item
                    }, () => {
                        updatedList = item.list;
                        updatedList.push({
                            title: this.state.newItem,
                            hour: this.state.itemHour,
                            completed: 0,
                            id: updatedList.length
                        });
                        fetch('https://rocky-citadel-32862.herokuapp.com/Organizer/users/' + this.state.user.id, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                email: this.state.user.email,
                                account: this.state.user.account,
                                password: this.state.user.password,
                                list: updatedList,
                                id: this.state.user.id
                            }),
                        }).then(() => {
                            fetch('https://rocky-citadel-32862.herokuapp.com/Organizer/users')
                                .then((response) => response.json())
                                .then((responseJson) => {
                                    this.setState({
                                        users: responseJson,
                                        newItem: "",
                                        itemHour: ""
                                    }, () => {
                                        let tmpUser = this.state.user;
                                        tmpUser.list = _.sortBy(this.state.user.list, 'hour');
                                        this.setState({
                                            user: tmpUser,
                                            pages: []
                                        }, () => {
                                            let num = 0;
                                            for (let item of this.state.user.list) {
                                                if ((num) % 4 === 0) {
                                                    let tmpPages = this.state.pages;
                                                    tmpPages.push(Math.floor((num) / 4) + 1);
                                                    this.setState({
                                                        pages: tmpPages
                                                    })
                                                }
                                                num++;
                                            }
                                        }, () => {
                                            if (this.state.firstAdd) {
                                                this.setState({
                                                    startIndex: 0 + 4 * (0),
                                                    endIndex: 3 + 4 * (0),
                                                    firstAdd: false
                                                })
                                            }

                                        })
                                    })
                                })
                        })
                    })
                }
            }

        } else if ((this.state.newItem.match(/^[A-Za-z\s]{4,30}$/) === null) && !(this.state.itemHour.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/) === null)) {
            Alert.alert('Wrong Data', 'Item value must consist of letters and be 4-30 letters long', [
                { text: 'Understood', onPress: () => console.log('item value must consist of letters and be 4-20 letters long') }
            ])
        } else if (!(this.state.newItem.match(/^[A-Za-z\s]{4,30}$/) === null) && (this.state.itemHour.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/) === null)) {
            Alert.alert('Wrong Data', 'Time must be in HH:MM format', [
                { text: 'Understood', onPress: () => console.log('item value must consist of letters and be 4-30 letters long') }
            ])
        }
        else if ((this.state.newItem.match(/^[A-Za-z\s]{4,30}$/) === null) && (this.state.itemHour.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/) === null)) {
            Alert.alert('Wrong Data', 'Time must be in HH:MM format', [
                { text: 'Understood', onPress: () => console.log('item value must consist of letters and be 4-30 letters long') }
            ])
        }
    }
    deleteAlert(item) {
        Alert.alert(
            "Deleting Item",
            "Are you sure u want to delete this item?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.deleteItem(item) }
            ],
            { cancelable: false }
        );
    }
    changeIndex(value) {
        this.setState({
            startIndex: 0 + 4 * (value - 1),
            endIndex: 3 + 4 * (value - 1)
        })
    }
    render() {
        console.log(this.state.loaded);
        if (!this.state.loaded) {
            return (
                <View style={styles.screen}>
                    <View style={styles.loadingScreen}>
                        <Image style={styles.loadingImage} source={loading} />
                    </View>
                </View>
            );
        }
        else if (this.state.user && this.props.logedAc !== "") {
            return (
                <View style={styles.list}>
                        <View style={styles.listContent}>
                            <View style={styles.line}>
                                <TextInput style={styles.inputContent1} onChangeText={(value) => this.changeInput(value, 'newItem')} value={this.state.newItem} placeholder="Add new item"></TextInput>
                                <TextInput style={styles.inputContent2} onChangeText={(value) => this.changeInput(value, 'itemHour')} value={this.state.itemHour} placeholder="00:00"></TextInput>
                            </View>
                            <TouchableOpacity onPress={() => this.addItem()} style={styles.addbutton}>
                                <Text style={styles.addbutton}>Add</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[
                            styles.listContent,
                            this.state.user.list.length === 0 ?
                                { display: 'none' }
                                : { display: 'flex' }]} >
                            <Text style={styles.userTitle}>{this.props.logedAc}'s To Do List</Text>
                            <View style={styles.toDoItems}>
                                {this.state.user.list.map((item, key) => {
                                    if (key >= this.state.startIndex && key <= this.state.endIndex) {
                                        return (
                                            <View style={styles.line}>
                                                <Text style={[
                                                    styles.toDoItem1,
                                                    item.completed === 1 ?
                                                        { backgroundColor: '#04d387', color: "white" }
                                                        : { backgroundColor: 'white', color: "black" }]}>{item.title}</Text>
                                                <Text style={[
                                                    styles.toDoItem2,
                                                    item.completed === 1 ?
                                                        { backgroundColor: '#04d387', color: "white" }
                                                        : { backgroundColor: 'white', color: "black" }]}>{item.hour}</Text>
                                                <TouchableOpacity style={[
                                                    item.completed === 1 ?
                                                        { display: 'none' }
                                                        : { display: 'flex' }]} onPress={() => { this.markAsCompleted(item.id, 1) }}>
                                                    <AntDesign name="check" size={20} color="green" />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={[
                                                    item.completed === 1 ?
                                                        { display: 'flex' }
                                                        : { display: 'none' }]} onPress={() => { this.markAsCompleted(item.id, 0) }}>
                                                    <AntDesign name="close" size={20} color="red" />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.distance} onPress={() => { this.deleteAlert(item.id) }}>
                                                    <AntDesign name="delete" size={20} color="black" />
                                                </TouchableOpacity>

                                            </View>)
                                    }

                                })}
                                <View style={styles.pagesLine}>
                                    {this.state.pages.map((item) => {
                                        return (
                                            <TouchableOpacity onPress={() => this.changeIndex(item)}>
                                                <Text style={styles.page}>{item}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </View>
                        </View>
                </View>
            );
        } else {
            return (
                <View style={styles.list}>
                    <View style={styles.listContent}>
                        <Text>User not logged</Text>
                        <View style={styles.line}>
                            <Text>To use app</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigation.push('Login')}>
                                <Text style={styles.green}>Sign in</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.line}>
                            <Text>Don't have an account?</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigation.push('Register')}>
                                <Text style={styles.green}>Sign up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>);
        }

    }
}

const styles = StyleSheet.create({
    list: {
        marginVertical: 40,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    screen: {
        width: '100%',
        height: '100%'
    },
    loadingScreen: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'white',
        top: 0,
        left: 0,
        zIndex: 10
    },
    loadingImage: {
        width: 50,
        height: 50
    },
    line: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    pagesLine: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 10
    },
    page: {
        marginLeft: 5,
        fontSize: 20,
        color: "#04d387"
    },
    listContent: {
        width: 300,
        backgroundColor: 'white',
        borderWidth: 1,
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 15
    },
    inputContent1: {
        marginVertical: 20,
        width: '75%',
        marginRight: '5%',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#04d387'
    },
    inputContent2: {
        marginVertical: 20,
        width: '20%',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#04d387'
    },
    addbutton: {
        backgroundColor: '#04d387',
        width: '100%',
        paddingLeft: '25%',
        paddingVertical: 3,
        color: 'white',
        borderRadius: 2
    },
    toDoItem1: {
        marginVertical: 5,
        width: '60%',
        marginRight: '2.5%',
        padding: 5,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4
    },
    toDoItem2: {
        marginVertical: 5,
        width: '20%',
        marginRight: '2.5%',
        padding: 5,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4
    },
    toDoItems: {
        width: '100%',
        marginTop: 20
    },
    green: {
        color: '#04d387',
        fontSize: 12,
        marginHorizontal: 5
    },
    userTitle: {
        fontSize: 20,
        marginVertical: 10
    },
    distance: {
        marginHorizontal: 5
    }
});
