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
    changeInput = (e,type) =>{
        this.setState({
            [type]: e.target.value
        })
    }
    loginFunc = () => {
        console.log(this.state.users);
        if (this.state.users) {
            let correctFlag=false;
            for (let item of this.state.users) {
                if(this.state.account===item.account && this.state.password===item.password){
                    correctFlag=true;
                    alert('You loged');
                    // Alert.alert('You loged','Correct user data',[
                    //     {text: 'Understood', onPress: () => console.log('alert closed')}
                    // ])        
                }
            }
            if(!correctFlag){
                alert('Invalid user data');
                // Alert.alert('Ooops!','Invalid user data',[
                //     {text: 'Understood', onPress: () => console.log('alert closed')}
                // ])
            }
        }

    }
    render() {
        return (
            <View style={styles.login}>
                <View style={styles.loginContent}>
                    <Text>Account</Text>
                    <TextInput placeholder="Enter Account Name" onChange={(e)=>this.changeInput(e,'account')} style={styles.inputContent}></TextInput>
                    <Text>Password</Text>
                    <TextInput placeholder="Enter Password" secureTextEntry={true} onChange={(e)=>this.changeInput(e,'password')} style={styles.inputContent}></TextInput>
                        <Button onPress={() => this.loginFunc()} title="Login" color="#04d387"></Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    login: {
        paddingHorizontal: '30%',
        flex: 1,
        paddingTop: '20%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    loginContent: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    inputContent: {
        marginVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#04d387'
    }
});
