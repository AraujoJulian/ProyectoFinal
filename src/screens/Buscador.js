import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList} from "react-native";
import { db, auth } from "../firebase/config";

class Buscador extends Component{
    constructor(){
        super()
        this.state = {
            busqueda: '',
            usuarios: [],
            resultado: [],
            buscando: false
        }
    }

    componentDidMount(){
        db.collection('users').onSnapshot(
            docs => {
                let usuarios = [];
                docs.forEach(doc => {
                    usuarios.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({usuarios: usuarios})
            }
        )
    }

    buscador(text){
        if( text === '') {
            this.setState({
                resultado: [],
                busqueda: '',
                buscando: false
            })
        }else{
            let filtrado = this.state.usuarios.filter((usuarios) => usuarios.data.userName.toLowerCase().includes(text.toLowerCase()))
            this.setState({
                resultado: filtrado,
                busqueda: text,
                buscando: true
            })
        }
    }

    perfil(item){
        if(item.data.userName !== auth.currentUser.userName){
            this.props.navigation.navigate('FriendProfile', {userName: item.data.userName})}
        else{this.props.navigation.navigate('ProfileScreen')}
    }

    render(){
        return(
            <View>
                <View>
                    <Text>Buscador</Text>
                    <TextInput placeholder="Buscar" keyboardType="default" onChangeText={text => this.buscador(text)} value= {this.state.busqueda}/>
                </View>
                {this.state.resultado.length === 0 && this.state.buscando === true ? <Text>No hay se encontro ese nombre de usuario</Text> 
                : <FlatList data={this.state.resultado} keyExtractor={usuarios => usuarios.id.toString()} renderItem={(item)=> <Text onPress={() => this.perfil(item)}>{item.data.userName}</Text>}
                />}
            </View>
        )
    }
}

export default Buscador;