import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
            account: "",
            email: "",
            password: "",
            password2: "",
            emailShow: false,
            accountShow: false,
            passwordShow: false,
            password2Show: false
        }
    }
    settingState = (type, value) => {
        this.setState({
            [type]: value
        })
    }
    settingInput = (value, type) => {
        this.setState({
            [type]: value
        })
    }
    registerFunc = () => {
        console.log(this.state.email);
        console.log(this.state.email);
        console.log(this.state.email);
        console.log(this.state.email);

        let registerFlag = true;
        if (
            !(this.state.email.match(/^[a-z0-9\._\-]+@[a-z0-9\.\-]+\.[a-z]{2,4}$/) ===
                null
            )
        ) {
            this.settingState('emailShow', false);
        } else {
            this.settingState('emailShow', true);
            registerFlag = false;
        }
        if (
            !(this.state.account.match(/^[a-zA-Z0-9\.\-_]{4,10}$/) === null)
        ) {
            this.settingState('accountShow', false);
        } else {
            this.settingState('accountShow', true);
            registerFlag = false;
        }
        if (
            !(
                this.state.password.match(
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\.\-_@$!%*#?&])[A-Za-z\d\.\-_@$!%*#?&]{8,13}$/
                ) === null
            )
        ) {
            this.settingState('passwordShow', false);
        } else {
            this.settingState('passwordShow', true);
            registerFlag = false;
        }
        if (
            this.state.password === this.state.password2 &&
            !(
                this.state.password.match(
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\.\-_@$!%*#?&])[A-Za-z\d\.\-_@$!%*#?&]{8,13}$/
                ) === null
            )
        ) {
            this.settingState('password2Show', false);
        } else {
            this.settingState('password2Show', true);
            registerFlag = false;
        }
        if (registerFlag) {
            fetch("https://rocky-citadel-32862.herokuapp.com/Organizer/users", {
                method: "POST",
                body: JSON.stringify({
                    email: this.state.email,
                    account: this.state.account,
                    password: this.state.password,
                    list: [],
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            Alert.alert('New user created', 'Correct user data', [
                { text: 'Understood', onPress: () => console.log('alert closed') }
            ])
        }
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.login}>
                    <View style={styles.loginContent}>
                        <Text>Email</Text>
                        <TextInput placeholder="Enter Email Address" onChangeText={(value) => this.settingInput(value, 'email')} style={styles.inputContent}></TextInput>
                        <Text style={[
                            styles.warning,
                            this.state.emailShow ?
                                { display: 'flex' }
                                : { display: 'none' }]} > Please enter correct email</Text>
                        <Text>Account</Text>
                        <TextInput placeholder="Enter Account Name" onChangeText={(value) => this.settingInput(value, 'account')} style={styles.inputContent}></TextInput>
                        <Text style={[
                            styles.warning,
                            this.state.accountShow ?
                                { display: 'flex' }
                                : { display: 'none' }]} >Account name must be 4-10 letters or digits</Text>
                        <Text>Password</Text>
                        <TextInput placeholder="Enter Password" secureTextEntry={true} onChangeText={(value) => this.settingInput(value, 'password')} style={styles.inputContent}></TextInput>
                        <Text style={[
                            styles.warning,
                            this.state.passwordShow ?
                                { display: 'flex' }
                                : { display: 'none' }]} >Password name must be 8-13 characters, at least one upper and lower case letter, special sign, a digit</Text>
                        <Text>Confirm Password</Text>
                        <TextInput placeholder="Confirm Password" secureTextEntry={true} onChangeText={(value) => this.settingInput(value, 'password2')} style={styles.inputContent}></TextInput>
                        <Text style={[
                            styles.warning,
                            this.state.password2Show ?
                                { display: 'flex' }
                                : { display: 'none' }]} >Password must be correct and same as password confirmation</Text>
                        <Button onPress={() => this.registerFunc()} title="Register" color="#04d387"></Button>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    login: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginContent: {
        marginVertical: 50,
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
        borderBottomWidth: 1,
        width: '100%',
        borderBottomColor: '#04d387'
    },
    warning: {
        color: 'red',
        marginBottom: 30
    },
});
