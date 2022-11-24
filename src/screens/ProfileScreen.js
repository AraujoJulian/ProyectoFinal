import React, { Component } from 'react';
import { View, Text} from 'react-native';
import { FlatList } from 'react-native-web';
import { db, auth } from '../firebase/config';
import Post from '../components/Post';

class Profile extends Component {
    constructor(){
        super()
        this.state = {
            posteos: [],
            user: [],
        }
    }

   
  componentDidMount(){
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
      db.collection('users').where('email','==',auth.currentUser.email).onSnapshot(docs => {
        let user = []
        docs.forEach(doc => {
          user.push({
            id: doc.id,
            data: doc.data()
          })
      this.setState ({
        user: user[0],
        username: user[0].data.userName,
        bio: user[0].data.miniBio,
        email: user[0].data.email
        },()=> {
            console.log(this.state)
        })
        })
    })
  }
    render(){
        return(
            <View> 
                    <Text>My Profile</Text>
                    <View>
                        <Text>{this.state.username}</Text>
                        <Text>{this.state.email}</Text>
                        <Text>Posts: {this.state.posteos.length}</Text>
                        <Text>{this.state.bio}</Text>
                    </View>
                    <FlatList
                    data={this.state.posteos}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <Post navigation={this.props.navigation} id={item.id} data={item.data} />}
          />
            </View>
        )
    }
    
}

export default Profile;