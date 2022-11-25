import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {Camera} from 'expo-camera'
import {storage} from "../firebase/config"

class Camara extends Component {
    constructor(props){
        super(props)

        this.state = {
            permisos: false,
            mostrarCamara:true,
            fotoUri:''
        }
        this.metodosCamara = ""
    }


    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(()=> {
            this.setState({
                permisos : true,
            })
        })
        .catch(err => console.log(err))
    }

    tomarFoto(){
        this.metodosCamara.takePictureAsync()
        .then(foto => this.setState({
            fotoUri: foto.uri,
            mostrarCamara:false
        }))
        .catch(err => console.log(err))
    }

    aceptarImagen(){
        fetch(this.state.fotoUri)
        .then(res => res.blob())
        .then(imagen => {
            const ref = storage.ref(`photos/${Date.now()}.jpg`)
            ref.put(imagen)
            .then(()=> {
                ref.getDownloadURL()
                .then((url)=> this.props.onImageUpload(url))
                .catch(err => console.log(err))
            })
        })
        .catch(err => console.log(err))
    }

    rechazarImagen(){
        this.setState({
            fotoUri: "",
            mostrarCamara: true
        })
    }

  render() {
    return (
      <View style={styles.container}>
        {
            this.state.permisos ?
                this.state.mostrarCamara ?
                <View stlye={styles.camarabody}>
                    <TouchableOpacity onPress={ () => this.tomarFoto()}>
                        <Text>tomar foto</Text>
                    </TouchableOpacity>
                        <Camera
                    style={styles.camarabody}
                    type={Camera.Constants.Type.back}
                    ref={metodosCamara => this.metodosCamara = metodosCamara}
                    />
                </View>  
            : 
            <View>
                <TouchableOpacity  onPress={()=> this.rechazarImagen()}>
                    <Text>
                        Rechazar imagen
                    </Text>
                    </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.aceptarImagen()}>
                    <Text>
                        Aceptar imagen
                    </Text>
                </TouchableOpacity>
                <Image
                source={{uri: this.state.fotoUri}}
                style={styles.preview}
                resizeMode = "cover"
                />
            </View>
            : 
            <Text>No me haz dado permisos para mostrar la foto</Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    camarabody:{
        height: "125vh",
        width: "125vh"
    },
    preview:{
        height: "100vh",
        width: "100vh"
    }
})

export default Camara