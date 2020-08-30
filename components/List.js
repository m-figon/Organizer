import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert } from 'react-native';


export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
            user: null,
            newItem: "",
            logedAc: "SlickJoe"
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
                    if (item.account === this.state.logedAc) {
                        this.setState({
                            user: item
                        })
                    }
                }
            })
    }
    changeInput = (e, type) => {
        this.setState({
            [type]: e.target.value
        })
    }
    addItem = () => {
        if (this.state.user) {
            let user;
            let updatedList;
            for (let item of this.state.users) {
                if (item.account === this.state.logedAc) {
                    this.setState({
                        user: item
                    }, () => {
                        updatedList = item.list;
                        updatedList.push(this.state.newItem);
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
                                        newItem: ""
                                    })
                                })
                        })
                    })


                }
            }

        }
    }
    render() {
        if (this.state.user) {
            return (
                <View style={styles.list}>
                    <View style={styles.listContent}>
                        <TextInput style={styles.inputContent} onChange={(e) => this.changeInput(e, 'newItem')} value={this.state.newItem} placeholder="Add new item"></TextInput>
                        <TouchableOpacity onPress={() => this.addItem()} style={styles.addbutton}>
                            <Text style={styles.addbutton}>Add</Text>
                        </TouchableOpacity>
                        <View style={styles.toDoItems}>
                        {this.state.user.list.map((item) => {
                            return (<Text style={styles.toDoItem}>{item}</Text>)
                        })}
                        </View>
                    </View>
                    
                </View>
            );
        } else {
            return (null);
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
    listContent: {
        width: 250,
        backgroundColor: 'white',
        borderWidth: 1,
        paddingHorizontal: 30,
        paddingVertical: 30,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    inputContent: {
        marginVertical: 20,
        width: '100%',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#04d387'
    },
    addbutton: {
        backgroundColor: '#04d387',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 3,
        color: 'white',
        borderRadius: 2
    },
    toDoItem:{
        marginVertical: 5,
        width: '100%',
        padding: 5,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4
    },
    toDoItems: {
        width: '100%',
        marginTop: 20
    }
});
