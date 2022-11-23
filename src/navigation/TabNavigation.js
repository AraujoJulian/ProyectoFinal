import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/ProfileScreen';
import Posts from '../screens/Posts';
import HomeNavigation from './HomeNavigation';
const Tab = createBottomTabNavigator()

export default function TabNavigation(){
        return(
            <Tab.Navigator>
                <Tab.Screen name="HomeNavigation" component={HomeNavigation}/>
                <Tab.Screen name="Profile" component={Profile} />
                <Tab.Screen name="NewPost" component={Posts} />
            </Tab.Navigator>
        )
    }