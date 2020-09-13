import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert } from 'react-native';


export default function Login(props) {
    const [users, setUsers] = useState(null);
    const [inputs, setInputs] = useState({
        account: "",
        password: ""
    });
    useEffect(()=>{
        fetch('https://rocky-citadel-32862.herokuapp.com/Organizer/users')
            .then((response) => response.json())
            .then((responseJson) => {
                setUsers(responseJson);
            })
    },[])
    const loginFunc = () => {
        console.log(inputs.users);
        console.log(inputs.account);
        console.log(inputs.password);
        if (users) {
            let correctFlag = false;
            for (let item of users) {
                if (inputs.account === item.account && inputs.password === item.password) {
                    correctFlag = true;
                    props.changeAc(inputs.account);
                    props.navigation.navigation.push('Home');
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
        return (
            <View style={styles.login}>
                <View style={styles.loginContent}>
                    <Text>Account</Text>
                    <TextInput placeholder="Enter Account Name" onChangeText={(value) => setInputs({ ...inputs, account: value})} style={styles.inputContent}></TextInput>
                    <Text>Password</Text>
                    <TextInput placeholder="Enter Password" secureTextEntry={true} onChangeText={(value) => setInputs({ ...inputs, password: value})} style={styles.inputContent}></TextInput>
                    <Button onPress={() => loginFunc()} title="Login" color="#04d387"></Button>
                </View>
            </View>
        );
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
