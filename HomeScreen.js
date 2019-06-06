import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, YellowBox, Image, TextInput,
        AsyncStorage, ActivityIndicator, TouchableHighlight} from 'react-native';
import axios from 'axios';

// import RepositoriesScreen from "./RepositoriesScreen";
import ProfileScreen from "./ProfileScreen";

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  _fetchInformation = async (key) => {
    try {
      const item = await AsyncStorage.getItem(key);
      return item;
    } catch (error) {
      console.log(error);
    }
    return;
  }

  _handleResponse = (response) => {
    console.log(response);
    if (response.status === 200) {
      this.setState({avatar: response.data.avatar_url});
      this.setState({name: response.data.name});
      this.setState({email: response.data.email});
      this.setState({bio: response.data.bio});
      this.setState({website: response.data.blog});
      this.setState({repositoriesURL: response.data.repos_url});
      this.setState({repositories: response.data.total_private_repos + response.data.public_repos})
      this.setState({followersURL: response.data.followers_url});
      this.setState({followers: response.data.followers});
      this.setState({followingURL: response.data.following_url});
      this.setState({following: response.data.following});
      this.setState({isMainUser: true});
    }
    this.setState({isLoaded: true});
  }

  _requestUserInformation = async => {
    this.setState({isLoaded: false});
    axios({
        method: 'get',
        url: 'https://api.github.com/user',
        auth: {
          // 'access_token': this.state.authToken,
          'username': this.state.username,
          'password': this.state.password,
        }
      })
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log('error: ' + err);
        this.setState({isLoaded: true});
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      hasToken: false,
      isLoaded: false,
      authToken: null,
      name: '',
      username: '',
      password: '',
      avatar: '',
      email: '',
      bio: '',
      website: '',
      repositories: 0,
      repositoriesURL: '',
      followers: 0,
      followersURL: '',
      following: 0,
      followingURL: '',
      isMainUser: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('authToken').then((token) => {
      this.setState({hasToken: token !== null, authToken: token !== null ? token : null, isLoaded: true})
    });
    AsyncStorage.getItem('username').then((uname) => {
      this.setState({username: uname});
    });
    AsyncStorage.getItem('password').then((pwd) => {
      this.setState({password: pwd});
    }).then(this._requestUserInformation);
  }

  _repositoriesPressed = () => {
    this.props.navigation.navigate('Repositories');
  }

  _followingPressed = () => {
    this.props.navigation.navigate('Following');
  }

  _followersPressed = () => {
    this.props.navigation.navigate('Followers');
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <ActivityIndicator />
      )
    } else { 
      // const username = () => this._fetchInformation('username').bind(this);
      username = this.state.authToken;
      console.log(username);
      return (
        <View style={{flex: 1}}>
          <ProfileScreen
            avatar= {this.state.avatar}
            name= {this.state.name}
            username= {this.state.username}
            email= {this.state.email}
            bio= {this.state.bio}
            website= {this.state.website}
            repositories= {this.state.repositories}
            repositoriesURL= {this.state.repositoriesURL}
            followers= {this.state.followers}
            followersURL= {this.state.followersURL}
            following= {this.state.following}
            followingURL= {this.state.followingURL}
            isMainUser= {this.state.isMainUser}
            repositoriesPressed= {this._repositoriesPressed}
            followingPressed= {this._followingPressed}
            followersPressed= {this._followersPressed}
          />
          <Button
            style={{flex: 1}}
            title= "Sign out!"
            onPress= {this._signOutAsync}
          />
        </View>
      );
      // return (
        
      // );
    }
  }
}