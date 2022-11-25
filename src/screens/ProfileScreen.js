import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity} from 'react-native';
import { db, auth } from '../firebase/config';
import Post from '../components/Post';

class Profile extends Component {
    constructor(){
        super()
        this.state = {
            posteos: [],
            user: [],
            username: "",
            bio: "",
            foto: ""
        }
    }

   
  componentDidMount(){
   
      db.collection('users').where('email','==',auth.currentUser.email).onSnapshot(docs => {
        let user = []
        docs.forEach(doc => {
          user.push({
            id: doc.id,
            data: doc.data()
          })
      this.setState ({
        user: user[0].data,
        username: user[0].data.userName,
        bio: user[0].data.miniBio,
        email: user[0].data.email,
        foto: user[0].data.foto
        },()=> {
            console.log(this.state)
        })
        })
    })
    db.collection('posteos').where("email", "==", auth.currentUser.email).onSnapshot(
      docs => {
          let posteos = []
          docs.forEach(doc => {
              posteos.push({
                  data: doc.data(),
                  id: doc.id
              })
          })
          this.setState({
              posteos: posteos
          })
      }
  
 

)
}


  buscarPosteos(){
    db.collection('posts').where('email','==',auth.currentUser.email).onSnapshot(docs => {
      let posts = []
      docs.forEach(doc => {
        posts.push({
          id: doc.id,
          data: doc.data()
        })
        this.setState({        posteos: posts,
        }, () => console.log(this.state))
      })
       })
  }

  borrarPost(id){
    db.collection('posts').doc(id).delete()
    this.buscarPosteos()
  }

  logOut(){
    auth.signOut()
    this.props.navigation.navigate('Login')
  }

    render(){
        return(
            <View> 
                    <Text>My Profile</Text>
                    {
                            this.state.user.foto != '' ?
                                <Image
                                    style={styles.foto}
                                    source={{ uri: this.state.user.foto}}
                                    resizeMode='contain'
                                />
                                :
                                <Image
                                    style={styles.foto}
                                    source={require('../../assets/icon.png')}
                                    resizeMode='contain'
                                />

                        }
                    <View>
                        <Text>{this.state.username}</Text>
                        <Text>{this.state.email}</Text>
                        <Text>Posts: {this.state.posteos.length}</Text>
                        <Text>{this.state.bio}</Text>
                    </View>
                    <FlatList
                    data={this.state.posteos}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <Post navigation={this.props.navigation} id={item.id} data={item.data} borrar={(id) => this.borrarPost(id)} />}
                    />
                    <TouchableOpacity onPress={() => this.logOut()}><Text>Cerrar Sesión</Text>
                    </TouchableOpacity>
            </View>
        )
    }
    
}
const styles = StyleSheet.create({foto: { height: 115, width: 115, marginLeft: 14 },})
export default Profile;