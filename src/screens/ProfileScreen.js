import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity,StyleSheet,Image} from 'react-native';
import { ActivityIndicator, FlatList } from 'react-native-web';
import { db, auth } from '../firebase/config';
import Post from '../components/Post';

class Profile extends Component {
    constructor(){
        super()
        this.state = {
            posteos: [],
            usuario: [],
            username: '',
            bio:'',
            foto:'',
            mail:'',
        }
    }

    componentDidMount(){
        this.obtenerPosteos();
        this.obtenerUsuario()
    }

    obtenerPosteos(){
        db.collection('posts').where('email', '==', auth.currentUser.email).orderBy('createdAt', 'desc').onSnapshot(
            docs =>{
                let posts = [];
                docs.forEach (doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                this.setState({
                    posteos: posts,
                },()=>console.log(this.state))
                })
            }
        )
    }

    obtenerUsuario(){
        db.collection('users').where('email', '==', auth.currentUser.email).onSnapshot(
            docs =>{
                let usuario = [];
                docs.forEach (doc => {
                    usuario.push({
                        id: doc.id,
                        data: doc.data()
                    })
                this.setState({
                    usuario: usuario[0],
                    username: usuario[0].data.userName,
                    bio:usuario[0].data.miniBio,
                },()=>console.log(this.state))
                })
            }
        )
    }
    render(){
        return(
            <View> 
                    <Text>My Profile</Text>
                    <View>
                        <Text>{this.state.username}</Text>
                        <Text>{auth.currentUser.email}</Text>
                        <Text>Posts: {this.state.posteos.length}</Text>
                        <Text>{this.state.bio}</Text>
                    </View>
                    <FlatList
                        data={this.state.posteos}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item}) => <Post data={item}/>}
                    />
            </View>
        )
    }
    
}

export default Profile;