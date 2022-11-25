import { Text, View, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import {FontAwesome} from '@expo/vector-icons'
import { auth, db } from '.././firebase/config'
import firebase from 'firebase'
import { StyleSheet } from 'react-native-web'

class Post extends Component {
  constructor(props) {
      super(props)
      this.state = {
          likesCount: props.data.likes?.length,
          commentCount: props.data.comments?.length,
          isMyLike: false
      }
    }
    componentDidMount(){
      console.log(this.props);
      this.obtenerUsuario()
        let myLike = this.props.data.likes?.includes(auth.currentUser.email)
        if(myLike){
          this.setState({
            isMyLike:true
          })
        }
      }
      obtenerUsuario(){
        db.collection('users').where('email', '==', this.props.data.email).onSnapshot(
            docs =>{
                let usuario = [];
                docs.forEach (doc => {
                    usuario.push({
                        id: doc.id,
                        data: doc.data()
                    })
                this.setState({
                    userName: usuario[0].data.userName,
                },()=>console.log(this.state))
            }
        )
    }
        )}
      like(){
        db
        .collection('posts')
        .doc(this.props.id)
        .update({
          likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=> {
          this.setState({
            isMyLike:true,
            likesCount: this.state.likesCount + 1
          })
        })
        .catch(err => console.log(err))
  
      }
  
      unlike(){
        db
        .collection('posts')
        .doc(this.props.id)
        .update({
          likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=> {
          this.setState({
            isMyLike:false,
            likesCount: this.state.likesCount - 1
          })
        })
        .catch(e => console.log(e))
      }



    render() {
        console.log(this.props)
        return (
          <View>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate(
              'HomeNavigation',
              {
                screen: 'FriendProfile',
                params: {
                  mail: this.props.data.email
                }
              }
            )}>
            <Text>{this.props.data.email}</Text>
            </TouchableOpacity>

            <Text>{this.state.userName}</Text>
            <Image 
              style={styles.image}
                source={{uri: this.props.data.foto}}
                resizeMode='contain' 
              />
            <Text>{this.props.data.description}</Text>
            <View>
            <Text>{this.state.likesCount}</Text>  
            {
               this.state.isMyLike ?
                    <TouchableOpacity onPress={()=> this.unlike()}>
                        <FontAwesome name='heart' color='black' size={16} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={()=> this.like()}>
                        <FontAwesome name='heart-o' color='red' size={16} />
                    </TouchableOpacity>
    
            }
            </View>
            <View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate(
                'Comments',
                {id:this.props.id}
                )}>
                <Text>Agregar comentario</Text>
              </TouchableOpacity> 
            </View>
            <View>
              {this.props.borrar ?
              <TouchableOpacity onPress={() => this.props.borrar(this.props.id) }>
                <Text>Eliminar Posteo</Text>
              </TouchableOpacity> : '' }
            </View>
            
          </View>
        )
      }
    }

    const styles = StyleSheet.create({
      image: {
          height: 500,
          width:350,
          alignSelf:'center',
          borderRadius: 20,
          overflow: 'hidden',
          margin:10
      }
    })

export default Post