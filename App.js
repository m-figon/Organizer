import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NavBar from './components/NavBar.js';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import List from './components/List.js';

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      logedAc: ""
    }
    this.changeAc = this.changeAc.bind(this);
  }
  changeAc(value) {
    this.setState({
      logedAc: value
    })
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
            name="Home"
            options={{ headerTitle: (navigation) => <NavBar navigation={navigation} /> }}>
            {navigation => <Home navigation={navigation} changeAc={this.changeAc} logedAc={this.state.logedAc} />}
          </Stack.Screen>
          <Stack.Screen
            name="List"
            options={{ headerTitle: (navigation) => <NavBar navigation={navigation} /> }} >
            {navigation => <List navigation={navigation} changeAc={this.changeAc} logedAc={this.state.logedAc} />}
          </Stack.Screen>
          <Stack.Screen
            name="Login"
            options={{ headerTitle: (navigation) => <NavBar navigation={navigation} /> }}>
            {navigation => <Login navigation={navigation} changeAc={this.changeAc} logedAc={this.state.logedAc} />}
          </Stack.Screen>
          <Stack.Screen
            name="Register"
            options={{ headerTitle: (navigation) => <NavBar navigation={navigation} /> }}>
            {navigation => <Register navigation={navigation} changeAc={this.changeAc} logedAc={this.state.logedAc} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}