import React, {Component} from 'react'
import { Text } from 'react-native'

class NewPost extends Component{
    constructor(){
        super()
        this.state = {
            profile: []
        }
    }

    render(){
        return(
            <Text>Estas New Post</Text>
        )
    }

}

export default NewPost;