import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert } from 'react-native';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
            account: "",
            password: ""
        }
    }
    componentDidMount() {
        fetch('https://rocky-citadel-32862.herokuapp.com/Organizer/users')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    users: responseJson
                })
            })
    }
    changeInput = (value, type) => {
        this.setState({
            [type]: value
        })
    }
    loginFunc = () => {
        console.log(this.state.users);
        console.log(this.state.account);
        console.log(this.state.password);
        if (this.state.users) {
            let correctFlag = false;
            for (let item of this.state.users) {
                if (this.state.account === item.account && this.state.password === item.password) {
                    correctFlag = true;
                    this.props.changeAc(this.state.account);
                    this.props.navigation.navigation.push('Home');
                    Alert.alert('You loged', 'Correct user data', [
                        { text: 'Understood', onPress: () => console.log('alert closed') }
                    ])
                }
            }
            if (!correctFlag) {
                Alert.alert('Ooops!', 'Invalid user data', [
                    { text: 'Understood', onPress: () => console.log('alert closed') }
                ])
            }
        }

    }
    render() {
        return (
            <View style={styles.login}>
                <View style={styles.loginContent}>
                    <Text>Account</Text>
                    <TextInput placeholder="Enter Account Name" onChangeText={(value) => this.changeInput(value, 'account')} style={styles.inputContent}></TextInput>
                    <Text>Password</Text>
                    <TextInput placeholder="Enter Password" secureTextEntry={true} onChangeText={(value) => this.changeInput(value, 'password')} style={styles.inputContent}></TextInput>
                    <Button onPress={() => this.loginFunc()} title="Login" color="#04d387"></Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    login: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginContent: {
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
        borderBottomWidth: 1,
        borderBottomColor: '#04d387'
    }
});
