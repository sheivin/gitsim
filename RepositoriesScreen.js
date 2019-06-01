import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Image, TextInput,
        AsyncStorage, TouchableHighlight} from 'react-native';
// import axios from 'axios';


export default class RepositoriesScreen extends Component {
  static navigationOptions = {
    title: 'Repositories',
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Repositories Screen</Text>
      </View>
    );
  }
}