import React, { Component } from "react";
import { View, Text } from 'react-native';
import { auth } from '../firebase/config'

class Login extends Component{
    constructor(){
        super()
        this.state = {
            email: '',
            password:'',
        }
    }

    login(email, pass);{
        auth.signInWithEmailAndPassword(email, pass)
        .then((response) => {
            this.setState({loggedIn: true});
        })
        .catch(error => {
            this.setState({error: 'Credenciales inválidas'})
        })
    }

    // render(){
    //     return(
    //         <View></View>
    //     )
    // }

}

export default Login;