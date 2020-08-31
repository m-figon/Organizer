import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import bg from './background.jpg';

export default function Home(props) {
  console.log(props);
  if (props.logedAc === "") {
    return (
      <>
        <View style={styles.container}>
          <Image
            style={styles.backgroundImg}
            source={bg}
          />
          <View style={styles.homeText}>
            <View style={styles.homeText1}>
              <Text style={styles.text1}>To use organizer</Text>
              <TouchableOpacity onPress={() => props.navigation.navigation.push('Login')}>
                <Text style={styles.text2}>sign in</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.homeText2}>
              <Text style={styles.text3}>Dont have an account?</Text>
              <TouchableOpacity onPress={() => props.navigation.navigation.push('Register')}>
                <Text style={styles.text4}>sign up</Text>
              </TouchableOpacity>
            </View>


          </View>
        </View>
      </>
    );
  } else {
    return (
      <>
        <View style={styles.container}>
          <Image
            style={styles.backgroundImg}
            source={bg}
          />
          <View style={styles.logedText}>
            <View style={styles.homeText1}>
              <Text style={styles.text1}>Welcome to Organizer app, {props.logedAc}</Text>
            </View>
            <TouchableOpacity onPress={() => props.navigation.navigation.push('List')}>
                <Text style={styles.text2}>Start Now</Text>
              </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backgroundImg: {
    width: 300,
    height: 500
  },
  homeText: {
    position: 'relative',
    marginVertical: -250,
    flexDirection: 'column',
    width: 200,
    flex: 0,
    paddingVertical: 20,
    paddingHorizontal: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: "rgba(0, 0, 0,0.3)",
  },
  logedText: {
    position: 'relative',
    marginVertical: -250,
    flexDirection: 'column',
    width: 200,
    flex: 0,
    paddingVertical: 20,
    paddingHorizontal: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: "rgba(0, 0, 0,0.3)",
  },
  homeText1: {
    flexDirection: "row"
  },
  homeText2: {
    flexDirection: "row"
  },
  text1: {
    color: 'white',
    fontSize: 12,
  },
  text2: {
    color: '#04d387',
    fontSize: 12,
    marginHorizontal: 5
  },
  text3: {
    color: 'white',
    fontSize: 12,
  },
  text4: {
    color: '#04d387',
    fontSize: 12,
    marginHorizontal: 5
  }
});
