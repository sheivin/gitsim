import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, Button, Image, TextInput,
        FlatList, ActivityIndicator, AsyncStorage, TouchableHighlight} from 'react-native';
import axios from 'axios';


function makeUserSearchRequest(url, username, password) {
  return axios({
    method: 'get',
    url: url,
    auth: {
      'username': username,
      'password': password,
    }
  });
}

function makeFollowingRequest(url, username, password) {
  return axios({
    method: 'get',
    url: url,
    auth: {
      'username': username,
      'password': password,
    }
  });
}

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  _handleResponse = (searchResponse, searchType, followingResponse) => {
    // console.log(searchResponse);
    followingUserList = followingResponse.data.map((item) => {return item.login});
    // console.log(followingLoginList);
    if (searchResponse.status === 200) {
      this.props.navigateToSearch(searchResponse.data.items, searchType, followingUserList);
    }
  }

  // _makeUserSearchRequest(url) {
  //   return ;
  // }

  _onPressUsers = async => {
    // console.log(this.state.searchTerm);
    // console.log('https://api.github.com/search/users?q=' + this.state.searchTerm);
    userSearchUrl = 'https://api.github.com/search/users?q=' + this.state.searchTerm;
    followingUrl = 'https://api.github.com/users/' + this.props.username + '/following';
    axios.all([makeUserSearchRequest(userSearchUrl, this.props.username, this.props.password),
               makeFollowingRequest(followingUrl, this.props.username, this.props.password)])
    .then(axios.spread((searchRes, followingRes) => this._handleResponse(searchRes, "User", followingRes)))
    .catch(err => {
      console.log('error: ' + err);
    });
  }

  _onPressRepos = async => {
    // console.log(this.state.searchTerm);
    // console.log('https://api.github.com/search/repositories?q=' + this.state.searchTerm);
    axios({
      method: 'get',
      url: 'https://api.github.com/search/repositories?q=' + this.state.searchTerm,
      auth: {
        'username': this.props.username,
        'password': this.props.password,
      }
    })
    .then(res => this._handleResponse(res, "Repo"))
    .catch(err => {
      console.log('error: ' + err);
    });
  }

  render() {
    return (
      <View style={styles.searchContainer}>
        <TextInput
          autoCapitalize="none"
          placeholder= 'search'
          style= {styles.searchText}
          onChangeText= {searchTerm => this.setState({searchTerm: searchTerm})}
          value={this.state.searchTerm}
        />
        <View style={styles.buttonContainer}>
          <Button
            style={styles.searchButton}
            title= "Users"
            onPress= {this._onPressUsers}
          />
          <View style= {styles.separator} />
          <Button
            style={styles.searchButton}
            title= "Repos"
            onPress= {this._onPressRepos}
          />
        </View>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
  },
  searchButton: {
    height: 20,
  },
  searchText: {
    flex: 1,
    height: 60,
    alignItems: 'stretch',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#48BBEC',
  },
  buttonContainer: {
    flexDirection: 'column',
  },
  separator: {
    height: 1,
    backgroundColor: '#77c475',
  },
});