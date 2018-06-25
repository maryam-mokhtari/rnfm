import React, { Component } from 'react';
import { connect } from "react-redux"
import { Button } from 'react-native'
import Documents from './Documents'
// import Upload from './Upload'
import { bindActionCreators } from 'redux'
import { getDocuments, getSharedDocuments, getTrashDocuments, loadCurrentUser, logoutUser, setTab, createFolder, getChildren,
  rename, remove, sharepg, changeModalText, changeModalState,
  removeForever, restoreTrash,
} from "../actions";


class Home extends Component {
  render() {
    const documentsProps = {...this.props, type: 'home'}
    return (
      <Documents {...documentsProps} />
    )
  }
}


const mapDispatchToProps = dispatch => {
  return bindActionCreators({getDocuments, getSharedDocuments, getTrashDocuments, loadCurrentUser, setTab, logoutUser,
    createFolder, getChildren, rename, remove, sharepg,
    changeModalText, changeModalState,
    removeForever, restoreTrash,
   }, dispatch)
}

const mapStateToProps = (state, ownProps) => {
  const {tab, modalState, modalText,} = state.nav
  const {userData, documents, messageText, messageType, isLoading, isAuthenticated} = state.entities
  return {tab, documents, userData, modalState, modalText,
    messageText, messageType, isLoading, isAuthenticated,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
