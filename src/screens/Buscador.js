import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList} from "react-native";
import { db, auth } from "../firebase/config";

class Buscador extends Component{
    constructor(){
        super()
        this.state = {
            buscar: '',
            usuarios: [],
            resultadoBuscar: [],
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
                this.setState({
                    usuarios: usuarios,
                },()=>console.log(this.state))
            }
        )
    }

    buscar(text){
        let result = this.state.usuarios.filter((unUsuario) => {
            return unUsuario.data.userName.toLowerCase().includes(text.toLowerCase())
        })
        console.log(result);
        this.setState({result: result, busqueda: text});
    }

    render(){
        return(
            <View>
                <View>
                    <Text>Buscador</Text>
                    <TextInput 
                    placeholder= 'Search' 
                    onChangeText= {text => this.buscar(text)} 
                    value= {this.state.busqueda}
                />

                </View>
                <FlatList
                        data={this.state.result}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item}) => 
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate(
                            'HomeNavigation',
                            {
                              screen: 'FriendProfile',
                              params: {
                                mail: item.data.email
                              }
                            }
                          )}>
                          <Text>{item.data.email}</Text>
                          </TouchableOpacity>
                        
                        } 
                    />

            </View>
        )
    }
}

export default Buscador;