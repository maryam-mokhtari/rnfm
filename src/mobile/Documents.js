import React, { Component } from 'react';
import { Image, View, ListView, StyleSheet, TextInput } from 'react-native'
import { Item, Input, Fab, List, ListItem, Thumbnail, Text, Body, Grid, Col,
  Button, ActionSheet, Header, Left, Title, Right, Toast, } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal"
import {BASEURL} from '../utils'
import {isArrayOK} from '../utils/array'
import {ThumbnailOf} from '../utils/format'
//import Row from './Row'

const CANCEL_INDEX = 0;

const ADDBUTTONS = [
  { text: "انصراف", icon: "close", iconColor: "#4f8ef7" },
  { text: "آپلود فایل", icon: "american-football", iconColor: "#4f8ef7" },
  { text: "ایجاد پوشه", icon: "analytics", iconColor: "#4f8ef7" },
];

const CANCELOPTIONBUTTON = { text: "انصراف", icon: "close", iconColor: "#4f8ef7" }

const DOCSOPTIONSBUTTONS = [
  { text: "حذف", icon: "trash", iconColor: "#4f8ef7" },
  { text: "تغییر نام", icon: "edit", iconColor: "#4f8ef7" },
  { text: "اشتراک گذاری", icon: "share-alt", iconColor: "#4f8ef7" },
  { text: "اشتراک با کاربران پرشین گیگ", icon: "user-circle", iconColor: "#4f8ef7" },
];

const TRASHOPTIONSBUTTONS = [
  { text: "حذف برای همیشه", icon: "trash", iconColor: "#4f8ef7" },
  { text: "بازگردانی", icon: "redo-alt", iconColor: "#4f8ef7" },
];

const FILEOPTIONSBUTTONS = [
  { text: "لینک مستقیم", icon: "link", iconColor: "#4f8ef7" },
  { text: "دانلود", icon: "cloud-download-alt", iconColor: "#4f8ef7" },
]

const isLoaded = false

export default class Documents extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      isFolderShown: false,
      selectedForRename: false,
      sharepg: false,
      showToast: false,
      renameText: null,
    }
  }
  async stateSet() {
    this.setState({isLoading: true})
    let type = this.props.type
    // type = this.props.navigation.state.params && this.props.navigation.state.params.type || 'home'
    if (type == 'shared') {
      await this.props.getSharedDocuments()
    } else if (type == 'trash') {
      await this.props.getTrashDocuments()
    } else {
      await this.props.getDocuments()
    }
    this.setState({
      isLoading: false,
    })
    if (this.props.isAuthenticated == false && !isLoaded) {
      this.props.navigation.navigate("Login")
    }
    isLoaded = true
    // )
    this.props.loadCurrentUser()
  }
  componentDidMount() {
    this.stateSet()
  }
  componentDidUpdate(nextProps) {
    if (this.props.messageText) {
      Toast.show({
          text: this.props.messageText,
          type: this.props.messageType,
          duration: 3000,
          position: 'bottom',
          buttonText: 'x'
        })
    }
  }
  createFolder() {
    this.setState({isLoading: true})
    this.props.createFolder(this.folderName.props.value).then(() => {
        this.setState({
          isFolderShown: false,
        })
      }).then(() => this.props.getDocuments()
      .then(() => this.setState({isLoading: false}))
    )
  }
  openFolder(fullPath) {
    this.setState({isLoading: true})
    this.props.getChildren(fullPath).then(() => this.setState({isLoading: false}))
    this.setState({fullPath, backIcon: true})
  }
  backToParent() {
    let fullPath = this.state.fullPath
    if (fullPath.startsWith('/')) {
      fullPath = fullPath.substr(1)
    }
    fullPath = fullPath.split('/')
    if (fullPath.length == 1) {
      this.setState({backIcon: false, fullPath, isLoading: true})
      this.props.getDocuments().then(() => this.setState({isLoading: false}))
    } else {
      fullPath.pop()
      fullPath = fullPath.join('/')
      this.setState({fullPath, isLoading: true})
      this.props.getChildren(fullPath).then(() => this.setState({isLoading: false}))
    }
  }

  directLink() {
    console.log('Direct Link');
  }
  download() {
    console.log('Download');
  }
  share() {
    console.log('Share');
  }
  removeForever(id) {
      this.setState({isLoading: true})
      this.props.removeForever(id)
        .then(() => this.props.getTrashDocuments()
        .then(() => this.setState({isLoading: false}))
      )
  }
  restoreTrash(id) {
      this.setState({isLoading: true})
      this.props.restoreTrash(id)
        .then(() => this.props.getTrashDocuments()
        .then(() => this.setState({isLoading: false}))
      )
  }

  showOptions(item) {
    ActionSheet.show(
      {
        options: this.props.type == 'shared'?
            [CANCELOPTIONBUTTON, ...FILEOPTIONSBUTTONS]
          : this.props.type == 'trash'?
            [CANCELOPTIONBUTTON, ...TRASHOPTIONSBUTTONS]
          : item.discriminator == 'F'? [CANCELOPTIONBUTTON, ...DOCSOPTIONSBUTTONS, ...FILEOPTIONSBUTTONS]
                                     : [CANCELOPTIONBUTTON, ...DOCSOPTIONSBUTTONS]
            ,

        cancelButtonIndex: CANCEL_INDEX,
        title: ""
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 1:
            this.props.type == 'trash'? this.removeForever(item.id): this.props.type == 'shared'? this.directLink(): this.props.remove(item.id)
            break;
          case 2:
            this.props.type == 'trash'? this.restoreTrash(item.id): this.props.type == 'shared'? this.download():
              // Rename
              this.setState({selectedForRename: item.id, renameText: item.name})
            break;
          case 3:
            this.share()
            break;
          case 4:
            // Share with PG users
            this.setState({sharepg: item.id})
            break;

          case 5:
            this.directLink()
            break;
          case 6:
            this.download()
            break;
          // default:

        }
        this.setState({ clicked: DOCSOPTIONSBUTTONS[buttonIndex] });
      }
    )
  }
  press(selectedItem) {
    if (selectedItem.discriminator == 'D') {
      this.openFolder(selectedItem.fullPath)
    } else if (selectedItem.discriminator == 'F') {
      if (selectedItem.mimeType.includes('image')) {
        let type = this.props.type
        let documents = type == 'shared'? this.props.sharedDocuments:
          type == 'trash'? this.props.trashDocuments: this.props.documents
        documents = documents.filter(item =>
          item.discriminator == 'F' && item.mimeType.includes('image'))
        const selectedItemIndex = documents.findIndex(item => item.id == selectedItem.id)
        this.props.navigation.navigate("Document",
          {documents: [selectedItem, ...documents.slice(selectedItemIndex + 1), ...documents.slice(0, selectedItemIndex)]
          })
      }
    }
  }
  render() {
    console.log('Documents props', this.props)
    const {navigation, userData,
      changeModalText, changeModalState,
      modalText, modalState, sharedDocuments, trashDocuments,
      messageText, messageType, isLoading,
      isAuthenticated, type,
    } = this.props
    let documents = type == 'shared'? this.props.sharedDocuments:
      type == 'trash'? this.props.trashDocuments: this.props.documents
    console.log('type:', type, documents);
    const { navigate } = navigation;
    const renameModalShowProps = {
      changeModalText, changeModalState,
      modalText, modalState,
      placeHolder: 'New Name',
      buttonText: 'Rename',
      modalPress: this.props.rename,
    }
    return (
      <View style={{height: '100%', backgroundColor: 'white'}}>
        <Header>
          <Left>
            <Button transparent>
              {this.state.backIcon &&
                <Icon name='angle-left'
                  size={30} onPress={() => this.backToParent()} />
              }
            </Button>
            <Button
              onPress={() => {
            // const url = 'http://po.stg.persiangig.com/cfs/rest/users/currentUser'
            const url = 'http://po.stg.persiangig.com/cfs/rest/languages'
            console.log('url::', url);
            fetch(url,
              // {
              //   headers:{
              //     'Content-Type': 'application/json',
              //     'Accept': 'application/json',
              //     token: 'R+x1xk1uLPUOP/lV+viI0g==',
              //   }
              // }
            )
          .then(response => {
            console.log('success', response);
            const res = response.json()
            console.log('res', res);
            return res
          })
           .then(res => console.log('res:', res))
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            // ADD THIS THROW error
            throw error;
          });
        }}
        ><Text>Click</Text></Button>









          </Left>
          <Body>
            <Text style={{color: '#bbb', position: 'absolute', right: -120, paddingTop: 10, fontSize: 15,}}>
              {userData && userData.username}
            </Text>
            <View style={{flexDirection: 'row'}}>
            <Image style={{width: 110, height: 30, paddingTop: 10 }}
              source={require('../img/persiangig.png')} />
            </View>

          </Body>
          <Right />
        </Header>

        <Modal isVisible={!!this.state.sharepg}
          onBackdropPress={() => this.setState({ sharepg: false })}
          onSwipe={() => this.setState({ sharepg: false })}
          swipeDirection="left"
          >
          <View style={styles.folder}>
            <Text style={{marginLeft: 5, marginBottom: 10 }}>اشتراک با کاربران پرشین‌گیگ</Text>
             <Item floatingLabel last>
              <Input placeholder='ایمیل'
                autoCapitalize = 'none'
                getRef={ (c) => this.sharepgName = c }
                />
             </Item>
            <Button block
              onPress={() => {
                this.props.sharepg(this.state.sharepg,
                this.sharepgName).then(() => this.setState({sharepg: false}))
              }}
              style={{marginLeft: 5, marginRight: 5, marginTop: 20, marginBottom: 20 }}>
              <Text>اشتراک‌گذاری</Text>
            </Button>
          </View>
        </Modal>

        <Modal isVisible={!!this.state.selectedForRename}
          onBackdropPress={() => this.setState({ selectedForRename: false })}
          onSwipe={() => this.setState({ selectedForRename: false })}
          swipeDirection="left"
          >
          <View style={styles.folder}>
            <Text style={{marginLeft: 5, marginBottom: 10 }}>تغییر نام</Text>
             <Item floatingLabel last>
              <Input placeholder='نام جدید'
                autoCapitalize = 'none'
                value={this.state.renameText}
                onChangeText={(text) => this.setState({renameText: text})}
                />
             </Item>
            <Button block
              onPress={() => {
                this.props.rename(this.state.selectedForRename,
                this.state.renameText).then(() => this.setState({selectedForRename: false}))
              }}
              style={{marginLeft: 5, marginRight: 5, marginTop: 20, marginBottom: 20 }}>
              <Text>تغییر</Text>
            </Button>
          </View>
        </Modal>

        <Modal isVisible={this.state.isFolderShown}
          onBackdropPress={() => this.setState({ isFolderShown: false })}
          onSwipe={() => this.setState({ isFolderShown: false })}
          swipeDirection="left"
          >
          <View style={styles.folder}>
            <Text style={{marginLeft: 5, marginBottom: 10 }}>New Folder</Text>
             <Item floatingLabel last>
              <Input placeholder='Folder name'
                autoCapitalize = 'none'
                getRef={ (c) => this.folderName = c }
                />
             </Item>
            <Button block
              disabled={!!this.state.isLoading}
              onPress={() => {
                !this.state.isLoading && this.folderName.props.value
                && this.folderName.props.value.trim() != '' && this.createFolder()
              }}
              style={{marginLeft: 5, marginRight: 5, marginTop: 20, marginBottom: 20 }}>
              <Text>Create</Text>
              {this.state.isLoading &&
                <Text>
                  <Icon name='spinner' size={20} />
                </Text>}
            </Button>
          </View>
        </Modal>
        {this.state.isLoading &&

            <View style={{position: 'absolute', zIndex: 2,
              backgroundColor: '#999', width: '100%', height: '100%',
                opacity: 0.4,
                marginTop: 50,
                paddingTop: 50, }}>
                <View  style={{position: 'absolute', left: '38%', top: 40,
                borderRadius: 20,
                padding: 20, backgroundColor: 'white',
              }}>
                  <Image style={{width: 50, height: 28,  }}
                  source={require('../img/loading.gif')} />
                </View>
            </View>
          }
          {documents && isArrayOK(documents)?
            <List dataArray={documents}
              style={{marginBottom: 0}}
              renderRow={item =>
              <ListItem onPress={() => this.press(item)}>
                {item.discriminator == 'D'?
                  <Icon name="folder" size={30} color="#48bef7" />
                  :
                  <Text>
                    {item.mimeType.includes('image')?
                      <Thumbnail square small size={80}
                        source={{ uri: `${BASEURL}/preview/${item.uuid}/medium/${item.name}`
                      }} />
                      :
                      ThumbnailOf(item.name.substr(item.name.lastIndexOf('.') + 1))
                    }
                  </Text>
                }

                <Body>
                  <Text>{item.name}</Text>
                  <Text note>{item.mimeType}</Text>
                </Body>
                <Right>
                  <Text style={{paddingLeft: 5, paddingRight: 5,}}
                    onPress={() => this.showOptions(item)}
                    >
                    <Icon name="ellipsis-v" size={15} color="#334a71"/>
                  </Text>
                </Right>
              </ListItem>
            }>
            </List>
            :
            this.state.isLoading?
            <Text></Text>
            :
            <Text style={{padding: 20, color: '#ccc'}}>فایلی در این پوشه قرار ندارد</Text>
          }
      <Fab
        active={this.state.active}
        direction="down"
        containerStyle={{ }}
        style={{ backgroundColor: '#48bef7' }}
        position="bottomRight"
            onPress={() =>
            ActionSheet.show(
              {
                options: ADDBUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                title: ""
              },
              buttonIndex => {
                switch (buttonIndex) {
                  case 2:
                    this.setState({isFolderShown: true})
                    break;

                }
                this.setState({ clicked: ADDBUTTONS[buttonIndex] });
              }
            )}
        >
        <Icon name="plus" />

      </Fab>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  folder: {
    backgroundColor: 'white',
    height: 200,
    padding: 20,
    marginTop: -50,
  },
});
