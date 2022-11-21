import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { auth, db } from '../firebase/config'


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

    register(email, password){
        auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            return(
                db.collection('users').add({
                    email: this.state.email,
                    userName: this.state.userName,
                    miniBio: this.state.miniBio,
                    createdAt: Date.now()
                })
            )
        })
        .then(response => this.props.navigation.navigate('Login'))
        .catch(error => {
            this.setState({error: error.message})
        })
    }

    // searchImage(){
    // }

    render(){
        return(
            <View>
                <Text>Registrarse</Text>
                <TextInput placeholder='Email' keyboardType='email-adress' onChangeText={ (text) => this.setState({email:text})} value={this.state.email} />
                <TextInput placeholder='Password' keyboardType='default' secureTextEntry={true} onChangeText={ (text) => this.setState({password:text})} value={this.state.password} />
                <TextInput placeholder='UserName' keyboardType='default' onChangeText={ (text) => this.setState({userName:text})} value={this.state.userName} />
                <TextInput placeholder='MiniBio' keyboardType='default' onChangeText={ (text) => this.setState({miniBio:text})} value={this.state.miniBio} />
                {this.state.error?<Text>{this.state.error}</Text>:''}
                <TouchableOpacity onPress={() => this.register(this.state.email, this.state.password)}>
                        <Text> Registrar </Text>
                </TouchableOpacity>
                <Text onPress={ () => this.props.navigation.navigate('Login')} >Ir a Login</Text>
            </View>
        )
    }

}

export default Register;