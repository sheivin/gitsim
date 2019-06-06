import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, Button, Image, TextInput,
        FlatList, ActivityIndicator, AsyncStorage, TouchableHighlight} from 'react-native';
import axios from 'axios';


class UserListItem extends PureComponent {
  render() {
    const item = this.props.item;
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
  // constructor(props) {
  //   super(props);
  // }

  _keyExtractor = (item, index) => index.toString();

  _renderUserItem = ({item, index}) => (
    <UserListItem
      item = {item}
      index = {index.toString()}
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
    console.log(searchType);
    return (
      <FlatList
        data = {data}
        keyExtractor = {this._keyExtractor}
        renderItem = {searchType === "User" ? this._renderUserItem : this._renderRepoItem}
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