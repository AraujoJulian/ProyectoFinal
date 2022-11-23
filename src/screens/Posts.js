import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '.././firebase/config'

class Posts extends Component {

    constructor() {
        super()
        this.state = {
            description: ''
        }
    }

    sendPost(description){
        db.collection('posts').add({
            owner:auth.currentUser.email,
            createdAt: Date.now(),
            description: description,
            likes:[],
            comments:[]
        })
        .then(resp => console.log('hizo el posteo'))
        .catch(err => console.log(err))

    }
    render() {
        return (
            <View>
                <TextInput
                    keyboardType='default'
                    onChangeText={text => this.setState({ description: text })}
                    value={this.setState.description}
                    //style={styles.input}
                    placeholder='Descripcion'
                />
                <TouchableOpacity onPress={() => this.sendPost(this.state.description)}>
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