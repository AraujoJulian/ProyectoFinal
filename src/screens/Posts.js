import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { auth, db } from '.././firebase/config'
import Camara from '../components/Camara'

class Posts extends Component {

    constructor() {
        super()
        this.state = {
            description: '',
            mostrarCamara: true,
            fotoUrl:'',
            likes:[],
            comments:[],
        }
    }

    sendPost(description){
        db.collection('posts').add({
            email:auth.currentUser.email,
            createdAt: Date.now(),
            description: description,
            likes:this.state.likes,
            comment:this.state.comments,
            foto: this.state.fotoUrl
        })
        .then(resp => 
           this.setState({
            email:"",
            createdAt: "",
            description: "",
            likes:[],
            comments:[],
            foto: ""
           }
           ) 
           )
        .catch(err => console.log(err))

    }

    onImageUpload(url){
        this.setState({
            mostrarCamara:false,
            fotoUrl: url
        })
    }
 
    render() {
        return (
            <View style = {styles.container}>


                <View style={styles.form}>
          {
          this.state.mostrarCamara ?
            <Camara onImageUpload={url => this.onImageUpload(url)}/>
            :
            <View>
                 <View>
        <TextInput
            keyboardType='default'
            onChangeText={text => this.setState({description:text})}
            value={this.state.description}
            style={styles.input}
            placeholder='Deja tu descripcion'
        />

                <TouchableOpacity
                onPress={()=> this.sendPost(this.state.description)}
                >
                    <Text>Enviar Post</Text>
                </TouchableOpacity>
                
                </View>
            </View>
    }
              </View>  

    
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }, 
    input:{
        borderWidth:1,
        height:48
    },
    form:{
        borderRadius: 10,
        alignSelf: "center",
        flex:1
    },
    input: {
        alignSelf: 'center',
        fontSize: 14,
        margin: 8,
        borderRadius: 10,
        textAlign: 'center',
    }
})

export default Posts