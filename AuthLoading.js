import React, {Component} from 'react';

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';


export default class AuthLoadingScreen extends Component {
  static KEY_LOGGED_IN_USER = 'loggedInUser';
  
  constructor(props) {
      super(props);
      this._bootstrapAsync = this._bootstrapAsync.bind(this);
      this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    // const userToken = await AsyncStorage.getItem('userToken');
    AuthLoadingScreen._isLoggedIn()
      .then(() => {
        this.props.navigation.navigate('App');
      }, () => {
        this.props.navigation.navigate('Auth');
      });
    // this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  static _isLoggedIn = () => {
    return new Promise(((resolve, reject) => {
      AsyncStorage.getItem(AuthLoadingScreen.KEY_LOGGED_IN_USER, (exception, userObj) => {
        if (userObj) {
          resolve(userObj);
        }
        reject(userObj);
      });
    }));
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle= "default"/>
      </View>
    );
  }
}
