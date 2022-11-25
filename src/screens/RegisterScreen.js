import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { auth, db } from '../firebase/config'
import Camara from "../components/Camara";

class Register extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password:'',
            image: "",
            userName: '',
            miniBio: '',
            showCamera: false,
        }
    }

    onImageUpload(url){
        this.setState({
            image: url,
            showCamera: false
        })
    }
    register(email, password, userName, miniBio, image){
        auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            return(
                db.collection('users').add({
                    email: email,
                    userName: userName,
                    miniBio: miniBio,
                    foto: image,
                    createdAt: Date.now()
                })
            )
        })
        .then(response => this.props.navigation.navigate('Login'))
        .catch(error => {
            this.setState({error: error.message})
        })
    }

    render(){
        return(
            <View>
                <Text>Registrarse</Text>
                <TextInput placeholder='Email' keyboardType='email-adress' onChangeText={ (text) => this.setState({email:text})} value={this.state.email} />
                <TextInput placeholder='Password' keyboardType='default' secureTextEntry={true} onChangeText={ (text) => this.setState({password:text})} value={this.state.password} />
                <TextInput placeholder='UserName' keyboardType='default' onChangeText={ (text) => this.setState({userName:text})} value={this.state.userName} />
                <TextInput placeholder='MiniBio' keyboardType='default' onChangeText={ (text) => this.setState({miniBio:text})} value={this.state.miniBio} />
                {this.state.error?<Text>{this.state.error}</Text>:''}




                {   this.state.showCamera ?
                        <View>
                            <Camara onImageUpload={url => this.onImageUpload(url)} style={{width: "50vw", heigth: "50vh", alignItems: 'center'}}/> 
                        </View> 
                        :
                        <TouchableOpacity onPress={()=> this.setState({showCamera:true})}>
                            <Text> Subir foto</Text>
                        </TouchableOpacity>
                }
                



                {this.state.email == '' || this.state.password == '' || this.state.userName == '' ? 
                    <TouchableOpacity>
                        <Text> Registrar </Text>
                    </TouchableOpacity>
                    :
                <TouchableOpacity onPress={() => this.register(this.state.email, this.state.password, this.state.userName, this.state.miniBio, this.state.image)}>
                        <Text> Registrar </Text>
                </TouchableOpacity>
                }
                <Text onPress={ () => this.props.navigation.navigate('Login')} >¿Ya tienes cuenta? Incia Sesión</Text>
            </View>
        )
    }

}

export default Register;