import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/LoginScreen';
import Register from '../screens/RegisterScreen';
import Comment from '../screens/Comment';

const Stack = createNativeStackNavigator()

class StackNavigation extends Component {
    render() {
      return (
        <Stack.Navigator>
          <Stack.Screen name='Login' component={ Login } options={ { headerShown: false } } />
          <Stack.Screen name='Register' component={ Register } options={ { headerShown: false } } />
          <Stack.Screen name='Comment' component={ Comment } options={ { headerShown: false } } />
        </Stack.Navigator>
      )
    }
}

export default StackNavigation;