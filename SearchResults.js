import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, Button, Image, TextInput,
        FlatList, ActivityIndicator, AsyncStorage, TouchableHighlight} from 'react-native';
import axios from 'axios';

class UserListItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFollowing: false,
      userLogin: '',
    }
  }

  componentDidMount() {
    this.setState({userLogin: this.props.item.login});
    this.setState({isFollowing: this.props.isAlreadyFollowing});
  }

  // _followUser = async (userLogin) => {
  //   // this.setState({isFollowing: false});
  //   const followToggle = await this.props.followUserRequest(userLogin);
  //   this.setState({isFollowing: followToggle});
  //   console.log("follow toggle");
  // }

  render() {
    const item = this.props.item;
    console.log(this.state.userLogin);
    console.log(this.state.isFollowing);
    // this.setState({userLogin: item})
    // console.log(item);
    // const isAlreadyFollowing = this.props.isAlreadyFollowing;
    // console.log(isAlreadyFollowing);
    // console.log(searchType);
    // if (searchType === "User") {
    //   console.log(item);
    // }
    return(
      <View>
        <View style={styles.rowContainer}>
          <Image style={styles.thumb} source={{uri: item.avatar_url}} />
          <View style={styles.textContainer}>
            <Text style={styles.username}>{item.login}</Text>
          </View>
          <TouchableHighlight
            onPress={() => {this.setState({isFollowing: this.props.followUserRequest(item.login)})}}
            underlayColor='#77c475'>
            <View>
              <View style={styles.buttonTextContainer}>
                <Text style={styles.followText}>{this.state.isFollowing ? 'Following' : 'Follow'}</Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.separator}/>
      </View>
    );
  }
}

class RepoListItem extends PureComponent {
  render() {
    const item = this.props.item;
    // console.log(item);
    return (
      <View>
        <View style={styles.rowContainer}>
          <Image style={styles.thumb} source={{uri: item.owner.avatar_url}}/>
          <View style={styles.textContainer}>
            <Text style={styles.username}>{item.full_name}</Text>
          </View>
        </View>
        <View style={styles.separator}/>
      </View>
    );
  }
}

export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      followingList: [],
    }
  }

  componentDidMount() {
    console.log("SearchResults.component");
    this.setState({username: this.props.navigation.getParam('username')});
    this.setState({password: this.props.navigation.getParam('password')});
    this.setState({followingList: this.props.navigation.getParam('list')});
    console.log(this.state.followingList);
    // console.log(this.props.navigation.getParam('list'));
  }

  _followUserRequest = async (userToFollow) => {
    console.log("Follow request");
    // console.log(this.state.username);
    // console.log(this.state.password);
    url = 'https://api.github.com/user/following/' + userToFollow;
    method = 'put';
    // if (!this.state.isFollowing) {
    //   method = 'delete';
    // }
    console.log(url);
    axios({
      method: method,
      url: url,
      auth: {
        'username': this.state.username,
        'password': this.state.password,
      },
      headers: {
        'Content-Length': 0,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        return !this.state.isFollowing;
      // } else if (res.status === 204) {
      //   return false;
      } else {
        console.log("Else");
        return false;
      }
    })
    .catch(err => {
      console.log('error: ' + err);
      return false;
    })
  }


  _keyExtractor = (item, index) => item.login;

  _renderUserItem = ({item, index}) => (
    <UserListItem
      item = {item}
      index = {item.login}
      followUserRequest = {this._followUserRequest}
      isAlreadyFollowing = {this.state.followingList.indexOf(item.login) > -1 ? true : false}
    />
  );

  _renderRepoItem = ({item, index}) => (
    <RepoListItem
      item = {item}
      index = {index.toString()}
    />
  );

  render() {
    const data = this.props.navigation.getParam('data');
    const searchType = this.props.navigation.getParam('searchType');
    // console.log(this.props.navigation.getParam('list'));
    // this.setState({followingList: this.props.navigation.getParam('list')});
    // console.log(this.state.followingList.indexOf("LieutenantChips"));
    return (
      <FlatList
        data = {data}
        keyExtractor = {this._keyExtractor}
        renderItem = {searchType === "User" ? this._renderUserItem : this._renderRepoItem}
        extraData = {this.state.followingList}
      />
    );
  }
}

const styles = StyleSheet.create({
  thumb: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
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
  followText: {
    fontSize: 14,
  },
  buttonTextContainer: {
    flex: 1,
    justifyContent: 'center',
  }
});