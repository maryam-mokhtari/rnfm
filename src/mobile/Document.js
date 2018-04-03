import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail,
  Text, Body, Button, Left, Right, } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BASEURL} from '../utils'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

})
// const cards = [
//   {
//     text: 'Card One',
//     name: 'One',
//     image: require('../../img/stamp.png'),
//   },
// ];
class Document extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    console.log('Document props:', this.props);
    const {params, } = this.props.navigation.state
    const {documents} = params
    const cards = documents
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='angle-left'
                size={30} onPress={() => this.props.navigation.goBack()} />
            </Button>
          </Left>
          <Right />
        </Header>
        <View>
          <DeckSwiper
            ref={(c) => this._deckSwiper = c}
            dataSource={cards}
            renderEmpty={() =>
              <View style={{ alignSelf: "center" }}>
                <Image style={{ height: 40, width: 40, marginTop: 40, opacity: 0.4 }} source={require('../img/pg.png')} />
              </View>
            }
            renderItem={item =>
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  <Left>
                    <Thumbnail source={{ uri: `${BASEURL}/preview/${item.uuid}/medium/${item.name}` }} />
                    <Body>
                      <Text>{item.name}</Text>
                      <Text note>{item.mimeType}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image style={{ height: 300, flex: 1 }} source={{ uri: `${BASEURL}/preview/${item.uuid}/medium/${item.name}` }} />
                  <Button style= {{position: 'absolute', top: '50%', left: 0,
                  backgroundColor: 'transparent',
                  }}
                   light onPress={() => this._deckSwiper._root.swipeLeft()}>
                    <Icon name="angle-left" style={{color: '#ccc', fontSize: 50 }} />
                  </Button>
                  <Button style= {{position: 'absolute', top: '50%', right: 0,
                  backgroundColor: 'transparent',
                  }}
                   light onPress={() => this._deckSwiper._root.swipeLeft()}>
                    <Icon name="angle-right" style={{color: '#ccc', fontSize: 50 }} />
                  </Button>
                </CardItem>
                <CardItem>
                  <Icon name="cloud-download" style={{ color: '#7e96bd' }} size={25} />
                </CardItem>
              </Card>
            }
          />
        </View>
      </Container>
    )
  }
}

Document.navigationOptions = {
  title: 'Document'
}

export default Document
