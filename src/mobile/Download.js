import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import { Platform } from 'react-native';

function getLocalPath (url) {
  const filename = url.split('/').pop();
  // feel free to change main path according to your requirements
  return `${RNFS.DocumentDirectoryPath}/${filename}`;
}

const url = 'https://www.adobe.com/content/dam/Adobe/en/devnet/pdf/pdfs/PDF32000_2008.pdf';
const localFile = getLocalPath(url);

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
