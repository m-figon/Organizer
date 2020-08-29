import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';


export default class Login extends Component {
       loginFunc = () =>{
            console.log('you logged');
        }
        render(){
            return (
                <View style={styles.login}>
                    <Text>Account</Text>
                    <TextInput placeholder="Account"></TextInput>
                    <Text>Password</Text>
                    <TextInput placeholder="Password"></TextInput>
                    <TouchableOpacity onPress={()=>{loginFunc()}}>
                    <Button></Button>
                    </TouchableOpacity>
                </View>
            );
        }   
}

const styles = StyleSheet.create({
    login: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
