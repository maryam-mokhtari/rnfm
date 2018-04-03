import React from 'react';
import { Image } from 'react-native'


export function ThumbnailOf(format) {

  const audio = ['mp3', 'amr', 'm4a', 'wma']
  const video = ['mp4', 'mkv', 'avi']
  const zip = ['zip', 'rar', '7z', 'gz', 'tar', 'bz']
  const text = ['txt']
  const word = ['docx', 'doc']
  const ppt = ['ppt', 'pps']
  const excel = ['xls', 'xlsx']
  const pdf = ['pdf', 'mobi', 'epub']
  const image = ['jpeg', 'jpg', 'gif', 'png', 'svg']
  const code = ['php', 'py', 'java', 'c', 'cp', 'cpp', 'asp']
  const js = ['js', 'ts', 'jsx', 'coffee']
  const css = ['css', 'sass', 'scss', 'styl', 'less']
  const web = ['html', 'htm', 'shtml', 'jade', 'ejs', 'hbs', 'haml']
  const android = ['apk']
  const apple = ['ipa', 'app']
  const flash = ['swf']
  const script = ['bash', 'bat', 'sh']

  const formatsMap = {
    android,
    apple,
    audio,
    code,
    css,
    excel,
    flash,
    image,
    js,
    pdf,
    ppt,
    script,
    text,
    video,
    web,
    word,
    zip
  }

  const formatsMapPath = {
    android: require('../img/icon-pack/android.png'),
    apple: require('../img/icon-pack/apple.png'),
    audio: require('../img/icon-pack/audio.png'),
    code: require('../img/icon-pack/code.png'),
    css: require('../img/icon-pack/css.png'),
    excel: require('../img/icon-pack/excel.png'),
    flash: require('../img/icon-pack/flash.png'),
    image: require('../img/icon-pack/image.png'),
    js: require('../img/icon-pack/js.png'),
    pdf: require('../img/icon-pack/pdf.png'),
    ppt: require('../img/icon-pack/ppt.png'),
    script: require('../img/icon-pack/script.png'),
    text: require('../img/icon-pack/text.png'),
    video: require('../img/icon-pack/video.png'),
    web: require('../img/icon-pack/web.png'),
    word: require('../img/icon-pack/word.png'),
    zip: require('../img/icon-pack/zip.png')
  }
  const detect = (format) => {
    let path = '../img/icon-pack/other.png'
    for (let key in formatsMapPath) {
      if (formatsMap[key].indexOf(format) != -1) {
        return <Image source={formatsMapPath[key]} style={{width: 30, height: 30}} />
      }
    }
    return <Image source={require('../img/icon-pack/other.png')} style={{width: 30, height: 30}} />
  }

  return detect(format)
}
