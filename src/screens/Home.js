import React, { Component } from 'react'
import { FlatList, Text, View } from 'react-native'
import { db } from '.././firebase/config'
import Post from '../components/Post'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      allPosts: []
    }
  }

  componentDidMount() {
    db.collection('posts').onSnapshot(docs => {
      let publicaciones = []
      docs.forEach(doc => { //firebase for each
        publicaciones.push({
          id: doc.id,  //id que trae firebase
          data: doc.data() //informacion del id
        })
      })

      this.setState({
        allPosts: publicaciones
      })
    })
  }


  render() {
    return (
      <>
        <View>
          <Text>Estas en la Home</Text>
        </View>
        <View>
          <FlatList
            data={this.state.allPosts}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <Post navigation={this.props.navigation} id={item.id} data={item.data} />}
          />
        </View>
      </>
    )
  }
}

export default Home;