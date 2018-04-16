import React, { Component } from 'react';
import { connect } from "react-redux"
import { Button } from 'react-native'
import Documents from './Documents'
import { bindActionCreators } from 'redux'
import { getDocuments, getSharedDocuments, getTrashDocuments, loadCurrentUser, logoutUser, setTab, createFolder, getChildren,
  removeForever, restoreTrash,
  rename, remove, sharepg, changeModalText, changeModalState, } from "../actions";


class Shared extends Component {
  render() {
    const documentsProps = {...this.props, type: 'shared'}
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
  const {userData, documents, sharedDocuments, trashDocuments, messageText, messageType, isLoading, isAuthenticated} = state.entities
  return {tab, documents, sharedDocuments, trashDocuments, userData, modalState, modalText,
    messageText, messageType, isLoading, isAuthenticated,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shared)
