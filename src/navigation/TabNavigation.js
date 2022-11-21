import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/ProfileScreen';
import NewPost from '../screens/NewPostScreen';
import Posts from '../screens/Posts';

const Tab = createBottomTabNavigator();

class TabNavigation extends Component{
    render(){
        return(
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Profile" component={Profile} />
                <Tab.Screen name="NewPost" component={Posts} />
            </Tab.Navigator>
        )
    }
}

export default TabNavigation;