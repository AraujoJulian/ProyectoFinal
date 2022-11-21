import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { auth } from '../firebase/config'

class Login extends Component{
    constructor(){
        super()
        this.state = {
            email: '',
            password:'',
        }
    }

    login(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
        .then(response => {
            this.props.navigation.navigate('TabNavigation')
        })
        .catch(error => {
            this.setState({error: error.message})
        })
    }

    render(){
        return(
            <View>
                <Text>Iniciar Sesión</Text>
                <TextInput placeholder='Email' keyboardType='email-adress' onChangeText={ (text) => this.setState({email:text})} value={this.state.email} />
                <TextInput placeholder='Password' keyboardType='default' secureTextEntry={true} onChangeText={ (text) => this.setState({password:text})} value={this.state.password} />
                {this.state.error?<Text>{this.state.error}</Text>:''}
                <TouchableOpacity onPress={() => this.login(this.state.email, this.state.password)}>
                        <Text> Iniciar </Text>
                </TouchableOpacity>
                <Text onPress={ () => this.props.navigation.navigate('Register')} >Ir a registrarse</Text>
            </View>
        )
    }

}

export default Login;