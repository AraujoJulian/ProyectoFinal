import React, {Component} from 'react'
import { Text } from 'react-native'

class Profile extends Component{
    constructor(){
        super()
        this.state = {
            profile: []
        }
    }

    render(){
        return(
            <Text>Estas en perfil</Text>
        )
    }

}

export default Profile;