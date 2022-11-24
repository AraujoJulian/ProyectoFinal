import React, { Component } from 'react'
import { FlatList, Text, View } from 'react-native'
import { db } from '.././firebase/config'
import Post from '../components/Post'
import { StyleSheet } from 'react-native-web'

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
        <View style={styles.lista}>
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

const styles = StyleSheet.create({
  lista: {
    flex: 1,
  }
})

export default Home;