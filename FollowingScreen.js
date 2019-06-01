import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, Button, ActivityIndicator, Image, TextInput,
        AsyncStorage, TouchableHighlight, FlatList} from 'react-native';
import axios from 'axios';

class ListItem extends PureComponent {

  _onPress = () => {
    this.props.onPressItem(this.props.index, this.props.item);
  }

  render() {
    const item = this.props.item;
    // console.log(item);
    // console.log("Displaying index: " + this.props.index);
    return (
      <TouchableHighlight
        onPress={this._onPress}
        underlayColor='#77c475'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{uri: item.avatar_url}}/>
            <View style={styles.textContainer}>
              <Text style={styles.username}>{item.login}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }
}

export default class FollowingScreen extends Component {
  static navigationOptions = {
    title: 'Following',
  };

  constructor(props) {
    super(props);
    this.state = {
      followingLoaded: false,
      username: '',
      password: '',
      url: '',
      data: [],
    };
  }

  componentDidMount() {
    // console.log(this.props);
    AsyncStorage.getItem('username').then((uname) => {
      this.setState({username: uname});
    });
    AsyncStorage.getItem('password').then((pwd) => {
      this.setState({password: pwd});
    });
    AsyncStorage.getItem('following_url').then((following_url) => {
      this.setState({url: following_url});
    }).then(this._fetchInformation);
    this.setState({followingLoaded: false});
  }

  _fetchInformation = async => {
    this.setState({followingLoaded: false});
    console.log("url: " + this.state.url);
    axios({
      method: 'get',
      url: this.state.url,
      auth: {
        'username': this.state.username,
        'password': this.state.password,
      }
    })
    .then(res => this._handleResponse(res))
    .catch(err => {
      console.log('error: ' + err);
      this.setState({followersLoaded: true});
    });
  }

  _handleResponse = (response) => {
    if (response.status === 200) {
      console.log(response);
      this.setState({data: response.data});
      this.setState({followingLoaded: true});
      // this.props.navigation.navigate('FollowersResults', {
      // data: response.data,
      // });
    }
  }

  _keyExtractor = (item, index) => index.toString();

  _onPressItem = (index, item) => {
    // Change to Profile Screen for an user
    this.props.navigation.push('Details', {
      username: item.login,
      url: item.url,
    });
  };

  _renderItem = ({item, index}) => (
    <ListItem
      item = {item}
      index = {index.toString()}
      onPressItem= {this._onPressItem}
    />
  )

  render() {
    if (!this.state.followingLoaded) {
      // console.log("Loading");
      return (
        <View style={{flex: 1}}>
          <ActivityIndicator />
        </View>
      );
    } else {
      // console.log("Loaded");
      // console.log(this.state.data);
      const followingData = this.state.data;
      return (
        <FlatList
          data = {followingData}
          keyExtractor = {this._keyExtractor}
          renderItem = {this._renderItem}
        />
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