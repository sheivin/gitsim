import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, Button, ActivityIndicator, Image, TextInput,
        AsyncStorage, FlatList, TouchableHighlight} from 'react-native';
import axios from 'axios';

class ListItem extends PureComponent {

  _onPress = () => {
    this.props.onPressItem(this.props.index);
  }

  render() {
    const item = this.props.item;
    console.log(item);
    console.log("Displaying index: " + this.props.index);
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

export default class FollowersResults extends Component {
  static navigationOptions = {
    title: 'Followers',
    headerLeft: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      followersLoaded: false,
      username: '',
      password: '',
      url: '',
      data: [],
    }
  }

  // componentDidMount() {
  //   // console.log(this.props);
  //   this.setState({followersLoaded: false});
  //   AsyncStorage.getItem('username').then((uname) => {
  //     this.setState({username: uname});
  //   });
  //   AsyncStorage.getItem('password').then((pwd) => {
  //     this.setState({password: pwd});
  //   });
  //   AsyncStorage.getItem('followers_url').then((followers_url) => {
  //     this.setState({url: followers_url});
  //   }).then(this._fetchInformation);
  // }

  _fetchInformation = async => {
    this.setState({followersLoaded: false});
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
        // this.props.navigation.navigate('FollowersResults', {
        // data: response.data,
      this.setState({data: response.data});
      this.setState({followersLoaded: true});
    }
  }

  _keyExtractor = (item, index) => index.toString();

  _onPressItem = (index) => {
    console.log("Pressed row: " + index);
    // Change to Profile Screen for an user
  };

  _renderItem = ({item, index}) => (
    <ListItem
      item = {item}
      index = {index.toString()}
      onPressItem= {this._onPressItem}
    />
  )

  render() {
    // console.log(this.props.navigation.getParam('data'));
    const data = this.props.data;
    console.log(data);
    console.log("here");
    return (
      <FlatList
        data = {data}
        keyExtractor = {this._keyExtractor}
        renderItem = {this._renderItem}
      />
      // <View styles={{flex: 1}}>
      //   <Text>Here</Text>
      // </View>
    );
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