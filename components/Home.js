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
          <View style={styles.home}>
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
            <View style={styles.home}>
              <View style={styles.logedText}>
                <View style={styles.homeText1}>
                  <Text style={styles.text1}>Welcome to Organizer app, {props.logedAc}</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigation.push('List')}>
                  <Text style={styles.text2}>Start Now</Text>
                </TouchableOpacity>
                <View style={styles.homeText1}>
                  <Text style={styles.text1}>Or if you want to log out</Text>
                </View>
                <TouchableOpacity onPress={() => props.changeAc("")}>
                  <Text style={styles.text2}>Sign Out</Text>
                </TouchableOpacity>
              </View>
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
          width: "100%",
    height: "100%"
  },
  home: {
          position: 'absolute',
    zIndex: 5,
    top: 0,
    height: '100%',
    width: '100%',
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeText: {
          position: 'relative',
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
    marginVertical: -300,
    flexDirection: 'column',
    width: 150,
    flex: 0,
    paddingVertical: 20,
    paddingHorizontal: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 100,
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
