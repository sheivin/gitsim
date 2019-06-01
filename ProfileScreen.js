import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, YellowBox, Image, TextInput,
        AsyncStorage, ActivityIndicator, TouchableHighlight} from 'react-native';

export default class ProfileScreen extends Component {

  render() {
    const avatar = this.props.avatar;
    const name = this.props.name;
    const username = this.props.username;
    const email = this.props.email;
    const bio = this.props.bio;
    const website = this.props.website;
    const repositories = this.props.repositories;
    const repositoriesURL = this.props.repositoriesURL;
    const followers = this.props.followers;
    const following = this.props.following;
    const isMainUser = this.props.isMainUser;
    return (
      // <View style={{flex: 1}}>
      //   <Text>Home Screen</Text>
      // </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={{uri: avatar}} style={styles.image}/>
        <Text style={styles.name}>{name}</Text>
        <Text>{username}</Text>
        <Text>{email}</Text>
        <Text style={styles.bio}>{bio}</Text>
        {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam fringilla commodo sem, sit amet laoreet sem lobortis eu. Curabitur eu.</Text> */}
        <Text>{website}</Text>
        {/* <Button
          title= "Access Git API"
          onPress= {() =>
            this.props.navigation.navigate('Github')
          }
        /> */}
        <View style={styles.touchable}>
          <TouchableHighlight
            onPress={isMainUser ? this.props.repositoriesPressed : () => {}} //{this._repositoriesPressed}
            underlayColor='#77c475'>
            <View>
              <View style= {styles.rowContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Repositories</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.number}>{repositories}</Text>
                </View>
              </View>
              <View style={styles.separator}/>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={isMainUser ? this.props.followingPressed : () => {}} //{this._followingPressed}
            underlayColor='#77c475'>
            <View>
              <View style= {styles.rowContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Following</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.number}>{following}</Text>
                </View>
              </View>
              <View style={styles.separator}/>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={isMainUser ? this.props.followersPressed : () => {}} //{this._followersPressed}
            underlayColor='#77c475'>
            <View>
              <View style= {styles.rowContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Followers</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.number}>{followers}</Text>
                </View>
              </View>
              <View style={styles.separator}/>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
  },
  bio: {
    fontSize: 16,
    margin: 20,
  },
  image: {
    height: 200,
    borderRadius: 100,
    width: 200,
  },
  rowContainer: {
    flexDirection: 'row',
    // flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  separator: {
    height: 1,
    backgroundColor: '#77c475',
  },
  touchable: {
    flex: 1,
    width: 200,
    alignItems: 'stretch',
  },
  textContainer: {
    // flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    // alignItems: 'center',
  },
  number: {
    // alignItems: 'center',
    fontSize: 18,
  }
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#F5FCFF',
  // },
  // welcome: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   margin: 10,
  // },
  // instructions: {
  //   textAlign: 'center',
  //   color: '#333333',
  //   marginBottom: 5,
  // },
});