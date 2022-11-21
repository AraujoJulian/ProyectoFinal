import React, { Component } from "react";
import { View, Text } from 'react-native';
import { auth } from '../firebase/config'


class Register extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password:'',
            userName: '',
            miniBio: '',
            foto: '',
        }
    }

    register(email, password, userName);{
        auth.createUserWithEmailAndPassword(email, pass)
        .then(() => {
            return(
                db.collection('users').add({
                    email: email,
                    userName: userName,
                    createdAt: Date.now()
                })
            )
        })
        .then(response => this.props.navigation.navigate('Home'))
        .catch(error => {
            this.setState({error: 'Fallo en el registro'})
        })
    }

    // searchImage(){
    // }

    render(){
        return(
            <View>
                <Text>Registrarse</Text>
                <TextInput style={Style.input} placeholder='Email' keyboardType='email-adress' onChangeText={} />
            </View>
        )
    }

}

export default Register;