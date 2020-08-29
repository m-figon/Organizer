import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function NavBar({navigation}) {
    const onPressFunc =(value) =>{
        alert('You tapped ' + value)
    }
        return (
            <View style={styles.navbar}>
                <Text style={styles.text}>Home</Text>
            </View>
        );
}

const styles = StyleSheet.create({
    navbar: {
        flex: 1,
        margin:0,
        flexDirection: 'row',
        backgroundColor: '#5b6467',
        backgroundImage: 'linear-gradient(315deg, #5b6467 0%, #8b939a 74%)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20
    }
});
