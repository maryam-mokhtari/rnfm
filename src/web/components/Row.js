import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text, Icon, Footer, FooterTab } from "native-base";
// import Icon from 'react-native-vector-icons/FontAwesome'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1FBFC',
    width: 400,
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 2,
  },
});

const Row = (props) => (
  <View style={styles.container}>
    {props.discriminator == 'D'?
    <Icon name="logo-apple" style={{ color: "#999" }} />
    
    :
    <Image source={{ uri: `http://local.persiangig.com/preview/${props.uuid}/medium/${props.name}`
    }}
       style={styles.photo} />
    }
    <Text style={styles.text}>
      {`${props.name}`}
    </Text>

  </View>
);

export default Row;
