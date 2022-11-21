import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import {auth, db} from '.././firebase/config'

class Posts extends Component {

    constructor(){
        super()
        this.state={
            description: ''
        }
    }

    sendPost(text){
        db.collection('posts').add ({
            email: auth.currentUser.email,
            createdAt: Date.now(),
            description: text,
            likes: [],
            comments: []
        })
    }
  render() {
    return (
      <View>
        <TextInput
        keyboardType=''
        onChangeText={text => this.setState({description: text})}
        value={ this.setState.description}
        //style={styles.input}
        placeholder= 'Descripcion'
        />
        <TouchableOpacity onPress={()=> this.sendPost(this.state.description)}>
            <Text> Enviar post</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

/*const styles = StyleSheet.create({
    input: {
        borderWidth: 1
    }
})*/

export default Posts