import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';


export default function Register(props) {
    const [inputs, setInputs] = useState({
        account: "",
        email: "",
        password: "",
        password2: ""
    });
    const [email, setEmail] = useState(false);
    const [account, setAccount] = useState(false);
    const [password, setPassword] = useState(false);
    const [password2, setPassword2] = useState(false);

    const registerFunc = () => {
        let registerFlag = true;
        if (
            !(inputs.email.match(/^[a-z0-9\._\-]+@[a-z0-9\.\-]+\.[a-z]{2,4}$/) ===
                null
            )
        ) {
            setEmail(false);
            console.log('email ok');
        } else {
            setEmail(true);
            registerFlag = false;
        }
        if (
            !(inputs.account.match(/^[a-zA-Z0-9\.\-_]{4,10}$/) === null)
        ) {
            setAccount(false);
            console.log('ac ok');
        } else {
            setAccount(true);
            registerFlag = false;
        }
        if (
            !(
                inputs.password.match(
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\.\-_@$!%*#?&])[A-Za-z\d\.\-_@$!%*#?&]{8,13}$/
                ) === null
            )
        ) {
            setPassword(false);
        } else {
            setPassword(true);
            registerFlag = false;
        }
        if (
            inputs.password === inputs.password2 &&
            !(
                inputs.password.match(
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\.\-_@$!%*#?&])[A-Za-z\d\.\-_@$!%*#?&]{8,13}$/
                ) === null
            )
        ) {
            setPassword2(false);
        } else {
            setPassword2(true);
            registerFlag = false;
        }
        if (registerFlag) {
            fetch("https://rocky-citadel-32862.herokuapp.com/Organizer/users", {
                method: "POST",
                body: JSON.stringify({
                    email: inputs.email,
                    account: inputs.account,
                    password: inputs.password,
                    list: [],
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }).then(() => {
                Alert.alert('New user created', 'Correct user data', [
                    {
                        text: 'Understood', onPress: () => {
                            setInputs({...inputs, account: "", email: "", password: "", password2: ""})
                            setEmail(false);
                            setAccount(false);
                            setPassword(false);
                            setPassword2(false);
                        }
                    }
                ])

            });

        }
    }
        return (
            <View style={styles.login}>
                <View style={styles.loginContent}>
                    <Text>Email</Text>
                    <TextInput placeholder="Enter Email Address" value={inputs.email} onChangeText={(value) => setInputs({...inputs, email: value})} style={styles.inputContent}></TextInput>
                    <Text style={[
                        styles.warning,
                        email ?
                            { display: 'flex' }
                            : { display: 'none' }]} > Please enter correct email</Text>
                    <Text>Account</Text>
                    <TextInput placeholder="Enter Account Name" value={inputs.account} onChangeText={(value) => setInputs({...inputs, account: value})} style={styles.inputContent}></TextInput>
                    <Text style={[
                        styles.warning,
                        account ?
                            { display: 'flex' }
                            : { display: 'none' }]} >Account name must be 4-10 letters or digits</Text>
                    <Text>Password</Text>
                    <TextInput placeholder="Enter Password" value={inputs.password} secureTextEntry={true} onChangeText={(value) => setInputs({...inputs, password: value})} style={styles.inputContent}></TextInput>
                    <Text style={[
                        styles.warning,
                        password ?
                            { display: 'flex' }
                            : { display: 'none' }]} >Password name must be 8-13 characters, at least one upper and lower case letter, special sign, a digit</Text>
                    <Text>Confirm Password</Text>
                    <TextInput placeholder="Confirm Password" value={inputs.password2} secureTextEntry={true} onChangeText={(value) => setInputs({...inputs, password2: value})} style={styles.inputContent}></TextInput>
                    <Text style={[
                        styles.warning,
                        password2 ?
                            { display: 'flex' }
                            : { display: 'none' }]} >Password must be correct and same as password confirmation</Text>
                    <Button onPress={() => registerFunc()} title="Register" color="#04d387"></Button>
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
    inputContent: {
        marginVertical: 7,
        borderBottomWidth: 1,
        width: '100%',
        borderBottomColor: '#04d387'
    },
    warning: {
        color: 'red',
        marginBottom: 7
    },
});
