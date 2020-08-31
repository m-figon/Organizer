import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import _, { map } from 'underscore';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
            user: null,
            newItem: "",
            itemHour: "",
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
                        }, () => {
                            let tmpUser = this.state.user;
                            tmpUser.list = _.sortBy(this.state.user.list, 'hour');
                            this.setState({
                                user: tmpUser
                            })
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

    deleteItem = (item) => {
        console.log(item);
        let userData = this.state.user;
        for(let i=0; i<userData.list.length; i++){
            if(userData.list[i].id===item){
                userData.list.splice(i,1);
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
                            user: tmpUser
                        })
                    })
                })
        })
    }
    markAsCompleted = (id,value) =>{
        let tmpUser = this.state.user;
        for(let item of tmpUser.list){
            if(item.id===id){
                item.completed=value;
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
        console.log(!(this.state.newItem.match(/^[a-zA-Z]{4,15}$/) === null));
        console.log(!(this.state.itemHour.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/) === null));
        if (!(this.state.newItem.match(/^[a-zA-Z]{4,15}$/) === null) && !(this.state.itemHour.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/) === null)) {
            let user;
            let updatedList;
            for (let item of this.state.users) {
                if (item.account === this.state.logedAc) {
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
                                            user: tmpUser
                                        })
                                    })
                                })
                        })
                    })
                }
            }

        } else if ((this.state.newItem.match(/^[a-zA-Z]{4,15}$/) === null) && !(this.state.itemHour.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/) === null)) {
            alert('item value must consist of letters and be 4-15 letters long');
        } else if (!(this.state.newItem.match(/^[a-zA-Z]{4,15}$/) === null) && (this.state.itemHour.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/) === null)) {
            alert('time must be in HH:MM format');
        } else {
            alert('item value must consist of letters and be 4-15 letters long and time must be in HH:MM format');
        }
    }
    render() {
        if (this.state.user) {
            return (
                <View style={styles.list}>
                    <View style={styles.listContent}>
                        <View style={styles.line}>
                            <TextInput style={styles.inputContent1} onChange={(e) => this.changeInput(e, 'newItem')} value={this.state.newItem} placeholder="Add new item"></TextInput>
                            <TextInput style={styles.inputContent2} onChange={(e) => this.changeInput(e, 'itemHour')} value={this.state.itemHour} placeholder="00:00"></TextInput>
                        </View>
                        <TouchableOpacity onPress={() => this.addItem()} style={styles.addbutton}>
                            <Text style={styles.addbutton}>Add</Text>
                        </TouchableOpacity>
                        <View style={styles.toDoItems}>
                            {this.state.user.list.map((item) => {
                                return (
                                    <View style={styles.line}>
                                        <Text style={[
                        styles.toDoItem1,
                        item.completed===1 ?
                            { backgroundColor: '#04d387' }
                            : { backgroundColor: 'white' }]}>{item.title}</Text>
                                        <Text style={[
                        styles.toDoItem2,
                        item.completed===1 ?
                            { backgroundColor: '#04d387' }
                            : { backgroundColor: 'white' }]}>{item.hour}</Text>
                                        <TouchableOpacity style={[
                        item.completed===1 ?
                            { display: 'none' }
                            : { display: 'flex' }]}onPress={() => { this.markAsCompleted(item.id,1) }}>
                                            <AntDesign name="check" size={15} color="green" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[
                        item.completed===1 ?
                            { display: 'flex' }
                            : { display: 'none' }]}onPress={() => { this.markAsCompleted(item.id,0) }}>
                                            <AntDesign name="close" size={15} color="red" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { this.deleteItem(item.id) }}>
                                            <AntDesign name="delete" size={15} color="black" />
                                        </TouchableOpacity>

                                    </View>)
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
    line: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    listContent: {
        width: 300,
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 3,
        color: 'white',
        borderRadius: 2
    },
    toDoItem1: {
        marginVertical: 5,
        width: '75%',
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
    }
});
