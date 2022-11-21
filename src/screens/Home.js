import React, {Component} from 'react'
import { Text } from 'react-native' 
  
  class Home extends Component {
    constructor(){
      super()
      this.state={
        posts:[]
      }
    }

    render(){
      return(
        <Text>Estas en la Home</Text>
      )
    }
 
  }

export default Home;