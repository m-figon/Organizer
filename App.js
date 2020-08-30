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

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="List"
        component={List}
        options={{ headerTitle: (navigation) => <NavBar navigation={navigation}/> }} />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: (navigation) => <NavBar navigation={navigation}/> }} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}