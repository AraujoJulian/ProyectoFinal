import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/ProfileScreen';
import Posts from '../screens/Posts';
import HomeNavigation from './HomeNavigation';
import Buscador from '../screens/Buscador';

const Tab = createBottomTabNavigator()

export default function TabNavigation(){
        return(
            <Tab.Navigator>
                <Tab.Screen name="HomeNavigation" component={HomeNavigation} options= {{headerShown: false }}/>
                <Tab.Screen name="Profile" component={Profile} />
                <Tab.Screen name="NewPost" component={Posts} />
                <Tab.Screen name="Buscador" component={Buscador}/>
            </Tab.Navigator>
        )
    }