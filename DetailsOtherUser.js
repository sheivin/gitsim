import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, Button, YellowBox, Image, TextInput,
        AsyncStorage, ActivityIndicator, TouchableHighlight} from 'react-native';
import axios from 'axios';

import ProfileScreen from "./ProfileScreen";

export default class DetailsOtherUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      detailsLoaded: false,
      username: '',
      name: '',
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
    // console.log(url);
    AsyncStorage.getItem('username').then(this._fetchDetails);
    this.setState({detailsLoaded: false});
  }

  _fetchDetails = async => {
    this.setState({detailsLoaded: false});
    console.log("url: " + this.props.navigation.getParam('url'));
    url = this.props.navigation.getParam('url');
    axios({
      method: 'get',
      url: url,
    })
    .then(res => this._handleResponse(res))
    .catch(err => {
      console.log('error: ' + err);
      this.setState({detailsLoaded: true});
    });
  }

  _handleResponse = (response) => {
    if (response.status === 200) {
      this.setState({avatar: response.data.avatar_url});
      this.setState({name: response.data.name});
      this.setState({username: response.data.login});
      this.setState({email: response.data.email});
      this.setState({bio: response.data.bio});
      this.setState({website: response.data.blog});
      this.setState({repositoriesURL: response.data.repos_url});
      this.setState({repositories: response.data.public_repos})
      this.setState({followersURL: response.data.followers_url});
      this.setState({followers: response.data.followers});
      this.setState({followingURL: response.data.following_url});
      this.setState({following: response.data.following});
      this.setState({isMainUser: false});
    }
    this.setState({detailsLoaded: true});
  }


  render() {
    if (!this.state.detailsLoaded) {
      return (
        <ActivityIndicator />
      );
    } else {
      return (
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
      );
    }
  }
}