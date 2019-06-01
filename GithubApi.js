'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
} from 'react-native';

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.github.com'
});

export function githubAuthenticate(username) {
  console.log('Received username: ' + username);
  axios.get(baseURL + '/' + username)
    .then(response => {
      console.log(response.data.login);
    })
    .catch(err => {
      console.log(err);
    });
}

// const instance = axios.create({
//  baseURL: "https://api.github.com"
// })

// export default instance;

function urlForQuery(key, value, pageNumber) {
  const data = {
    // pretty: '1',
    // encoding: 'json',
    // page: pageNumber,
  };
  data[key] = value;

  const queryString = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return 'https://api.github.com/users/' + value;
}

export default class GithubScreen extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      searchString: 'sheivin',
      isLoading: false,
      message: '',
    };
  }

  _onSearchTextChanged = (event) => {
    console.log('_onSearchTextChanged');
    this.setState({searchString: event.nativeEvent.text});
    console.log('Current: ' + this.state.searchString + ', Next: ' + event.nativeEvent.text);
  };

  _handleResponse = (response) => {
    this.setState({isLoading: false, message: ''});
    // if (response.Status.substr(0, 3) == '200') {
    //   console.log('Properties found: ' + response.listings.length);
    // } else {
    //   this.setState({message: 'Username not recognized'});
    // }
    console.log('User Id found: ' + response['id']);
  };

  _executeQuery = (query) => {
    console.log(query);
    this.setState({isLoading: true});

    // fetch(query)
    //   .then(response => response.json())
    //   .then(json => this._handleResponse(json.response))
    //   .catch(error =>
    //     this.setState({
    //       isLoading: false,
    //       message: 'Something is not right ' + error
    //     }));

    axios.get(query).then(response => {
      console.log(response.data.name)
      this.setState({isLoading: false, message: ''})
    })
  };

  _onSearchPressed = () => {
    const query = urlForQuery('username', this.state.searchString, 1);
    this._executeQuery(query);
  }


  render() {
    const spinner = this.state.isLoading ? <ActivityIndicator size='large'/> : null;
    console.log('GithubScreen.render');
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text>Something is up</Text>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this._onSearchTextChanged}
            placeholder='Enter github username'/>
          <Button
            onPress={this._onSearchPressed}
            title='Search'
          />
        </View>
        {spinner}
        <Text style={{flex: 1}}>{this.state.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 8,
  },
});