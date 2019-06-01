import React, {Component} from 'react';

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Button,
  Image,
  TextInput,
} from 'react-native';

import axios from 'axios';
// const instance = axios.create({
//   baseURL: 'https://api.github.com'
// });

// function githubAuthenticate(username, password) {
//   // console.log('Received username: ' + username);
//   // console.log('Received password: ' + password);
//   authToken = '';
//   return (axios({
//       method: 'get',
//       url: 'https://api.github.com/user',
//       auth: {
//         username: username,
//         password: password,
//       },
//     })
//     .then(res => {
//       // console.log(res);
//       if (res.status === 200) {
//         console.log("Login successful");
//         authToken = res.config.headers['Authorization'].split(' ')[1];
//         // console.log(authToken);
//         // console.log(res.config.headers['Authorization'].split(' ')[1]);
//         // setState({authToken: res.config.headers['Authorization'].split(' ')[1]});
//         return authToken;
//       }
//     })
//     .catch(err => {
//       console.log('error: ' + err);
//       return authToken;
//     }));
// }

// import githubAuthenticate from './GithubApi.js'

export default class SignInScreen extends Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      authToken: '',
      isLoading: false,
    };
  }

  async _saveItem(item, value) {
    try {
      await AsyncStorage.setItem(item, value);
    } catch (error) {
      console.log(error);
    }
  }

  // _storeData = async (username, password, authToken) => {
  //   // console.log(username);
  //   await AsyncStorage.setItem('username', username);
  //   await AsyncStorage.setItem('password', password);
  //   await AsyncStorage.setItem('authToken', authToken);
  //   // await AsyncStorage.setItem('response', response);
  // }

  _handleResponse = (response) => {
    config = response.config;
    data = response.data;
    // console.log(config);
    // console.log(data);
    // console.log(response);
    this.setState({isLoading: false});
    if (response.status === 200) {
      console.log("Login successful");
      authToken = config.headers['Authorization'].split(' ')[1];
      // console.log(authToken);
      // console.log(response.config.auth['username']);
      username = config.auth['username'];
      password = config.auth['password'];
      followingURL = data['following_url'].split('{')[0];
      followersURL = data['followers_url'].split('{')[0];
      // this._storeData(username, password, authToken);
      this._saveItem('authToken', authToken);
      this._saveItem('username', username);
      this._saveItem('password', password);
      this._saveItem('following_url', followingURL);
      this._saveItem('followers_url', followersURL);
      this.props.navigation.navigate('App');
    }
  }

  _executeSignInRequest = async (username, password) => {
    this.setState({isLoading: true});
    axios({
        method: 'get',
        url: 'https://api.github.com/user',
        auth: {
          username: username,
          password: password,
        },
      })
      .then(res => this._handleResponse(res))
        // {
        // // console.log(res);
        // if (res.status === 200) {
        //   console.log("Login successful");
        //   authToken = res.config.headers['Authorization'].split(' ')[1];
        //   console.log(authToken);
        //   this.setState({isLoading: false});
        //   this._storeData(username, password, authToken);
        //   this.props.navigation.navigate('App');
        //   // console.log(res.config.headers['Authorization'].split(' ')[1]);
        //   // setState({authToken: res.config.headers['Authorization'].split(' ')[1]});
        // }
      // })
      .catch(err => {
        console.log('error: ' + err);
        this.setState({isLoading: false});
      });
  }

  // _signInAsync = async () => {
  //   this.setState({isLoading: false});
  //   await AsyncStorage.setItem('userToken', 'abc');
  //   console.log(this.state.username);
  //   console.log(this.state.password);
  //   responseAuthToken = githubAuthenticate(this.state.username, this.state.password);
  //   // await AsyncStorage.setItem('authToken', response);
  //   // console.log(response.contents);
  //   if (responseAuthToken != '') {
  //     this.setState({authToken: responseAuthToken});
  //     this.props.navigation.navigate('App', {
  //       username: this.state.username,
  //       password: this.state.password,
  //       authToken: this.state.authToken,
  //     });
  //   }
  //   console.log(this.state.username);
  // };

  _onSignInPressed = () => {
    const username = this.state.username;
    const password = this.state.password;
    this._executeSignInRequest(username, password);
  }

  _onUsernameTextChanged = (event) => {
    this.setState({username: event.nativeEvent.text});
  }

  _onPasswordTextChanged = (event) => {
    this.setState({password: event.nativeEvent.text});
  }

  // _queryForAuthentication = () => {
  //   return 
  // }
  
  render() {
    return (
      <View style = {styles.container}>
        <View style = {styles.loginContainer}>
          <Image
            resizeMode="contain"
            style= {styles.logo}
            source={require('./Resources/GithubLogo.png')}
          />
          <TextInput style={styles.input}
            autoCapitalize="none"
            onSubmitEditing={() => this.passwordInput.focus()}
            autoCorrect= {false}
            keyboardType= 'email-address'
            returnKeyType= 'next'
            placeholder= 'Username or email address'
            onChange= {this._onUsernameTextChanged}
          />
          <TextInput style={styles.input}
            returnKeyType= "go"
            ref= {(input) => this.passwordInput = input}
            placeholder= 'Password'
            onChange= {this._onPasswordTextChanged}
            secureTextEntry
          />
          <Button
            title="Sign in!"
            style={styles.buttonContainer}
            onPress={this._onSignInPressed}
          />
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#2c3e50',
  },
  loginContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    // position: 'absolute',
    width: 300,
    height: 100,
  },
  buttonContainer: {
    paddingVertical: 15,
  },
  input: {
    height: 40,
    width: 200,
    alignItems: 'stretch',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#48BBEC',
  },
});