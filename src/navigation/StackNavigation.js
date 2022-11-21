import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/LoginScreen';
import Register from '../screens/RegisterScreen';
import TabNavigation from './TabNavigation';

const Stack = createNativeStackNavigator()

class StackNavigation extends Component {
    render() {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Login' component={ Login } options={ { headerShown: false } } />
            <Stack.Screen name='Register' component={ Register } options={ { headerShown: false } } />
            <Stack.Screen name='TabNavigation' component={ TabNavigation } />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }
}

export default StackNavigation;