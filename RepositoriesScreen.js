import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, Button, Image, TextInput,
        FlatList, ActivityIndicator, AsyncStorage, TouchableHighlight} from 'react-native';
import axios from 'axios';

import SearchBar from "./SearchBar";


class ListItem extends PureComponent {

  _onPress = () => {
    this.props.onPressItem(this.props.index, this.props.item);
  }

  render() {
    const item = this.props.item;
    console.log(item);
    console.log("Displaying index: " + this.props.index);
    return (
      // <TouchableHighlight
      //   onPress={this._onPress}
      //   underlayColor='#77c475'>
        <View>
          <View style={styles.rowContainer}>
            {/* <Image style={styles.thumb} source={{uri: item.avatar_url}}/> */}
            <View style={styles.textContainer}>
              <Text style={styles.username}>{item.name}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      // </TouchableHighlight>
    );
  }
}

export default class RepositoriesScreen extends Component {
  static navigationOptions = {
    title: 'Repositories',
  };

  constructor(props) {
    super(props);
    this.state = {
      repositoriesLoaded: false,
      username: '',
      password: '',
      url: '',
      data: [],
    };
  }

  navigateToSearch = (items, searchType, followingOrStarList) => {
    this.props.navigation.push('SearchResults', {
      data: items,
      searchType: searchType,
      list: followingOrStarList,
      username: this.state.username,
      password: this.state.password,
    });
  }

  componentDidMount() {
    AsyncStorage.getItem('username').then((uname) => {
      this.setState({username: uname});
    });
    AsyncStorage.getItem('password').then((pwd) => {
      this.setState({password: pwd});
    });
    AsyncStorage.getItem('repositories_url').then((repo_url) => {
      this.setState({url: repo_url});
    }).then(this._fetchInformation);
    this.setState({repositoriesLoaded: false});
  }

  _fetchInformation = async => {
    this.setState({repositoriesLoaded: false});
    console.log("url: " + this.state.url);
    axios({
      method: 'get',
      url: this.state.url,
      auth: {
        'username': this.state.username,
        'password': this.state.password,
      },
      params: {
        'visibility': 'private',
      },
    })
    .then(res => this._handleResponse(res))
    .catch(err => {
      console.log('error: ' + err);
      this.setState({repositoriesLoaded: true});
    });
  }

  _handleResponse = (response) => {
    console.log(response);
    if (response.status === 200) {
      console.log(response);
      this.setState({data: response.data});
      this.setState({repositoriesLoaded: true});
    //   // this.props.navigation.navigate('FollowersResults', {
    //   // data: response.data,
    //   // });
    }
  }

  _keyExtractor = (item, index) => index.toString();

  _onPressItem = (index, item) => {
    // Change to Profile Screen for an user
    // this.props.navigation.push('Details', {
    //   username: item.login,
    //   url: item.url,
    // });
  };

  _renderItem = ({item, index}) => (
    <ListItem
      item = {item}
      index = {index.toString()}
      onPressItem= {this._onPressItem}
    />
  )

  render() {
    // return (
    //   <View style={{flex: 1}}>
    //     <ActivityIndicator />
    //   </View>
    // );
    if (!this.state.repositoriesLoaded) {
      return (
        <View style={{flex: 1}}>
          <ActivityIndicator />
        </View>
      );
    } else {
      // console.log("Loaded");
      // console.log(this.state.data);
      const repositoriesData = this.state.data;
      // console.log(repositoriesData);
      return (
        <View>
          <SearchBar 
            username={this.state.username}
            password={this.state.password}
            navigateToSearch={this.navigateToSearch}
          />
          <View style= {styles.separator} />
          <FlatList
            data = {repositoriesData}
            keyExtractor = {this._keyExtractor}
            renderItem = {this._renderItem}
          />
        </View>
        // <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        //   <Text>Repositories Screen</Text>
        // </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 80,
  },
  textContainer: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#77c475',
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  username: {
    fontSize: 20,
    color: '#656565',
  },
});