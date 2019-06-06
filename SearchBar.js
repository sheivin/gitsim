import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, Button, Image, TextInput,
        FlatList, ActivityIndicator, AsyncStorage, TouchableHighlight} from 'react-native';
import axios from 'axios';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  _handleResponse = (response, searchType) => {
    // console.log(response);
    if (response.status === 200) {
      this.props.navigateToSearch(response.data.items, searchType);
    }
  }

  _onPressUsers = async => {
    // console.log(this.state.searchTerm);
    // console.log('https://api.github.com/search/users?q=' + this.state.searchTerm);
    axios({
      method: 'get',
      url: 'https://api.github.com/search/users?q=' + this.state.searchTerm,
      auth: {
        'username': this.props.username,
        'password': this.props.password,
      }
    })
    .then(res => this._handleResponse(res, "User"))
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