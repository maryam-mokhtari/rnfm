import React, { Component } from 'react';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import { Platform, View } from 'react-native';

export default class Download extends Component {
  getLocalPath (url) {
    const filename = url.split('/').pop();
    // feel free to change main path according to your requirements
    return `${RNFS.DocumentDirectoryPath}/${filename}`;
  }

  componentDidMount() {
    const url = 'http://po.stg.persiangig.com/preview/71lT9xpYNI/2.pdf';
    const localFile = this.getLocalPath(url);

    const options = {
      fromUrl: url,
      toFile: localFile
    };
    RNFS.downloadFile(options).promise
    .then(() => FileViewer.open(localFile))
    .then(() => {
    	// success
    })
    .catch(error => {
    	// error
    });
  }
  render() {
    return <View />
  }
}
