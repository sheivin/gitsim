/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Image, TextInput,
        AsyncStorage} from 'react-native';
import {createStackNavigator, createAppContainer, createBottomTabNavigator,
        createSwitchNavigator} from 'react-navigation';
// YellowBox.ignoreWarnings(['Warning: ...']);

import GithubScreen from "./GithubApi"
import AuthLoadingScreen from "./AuthLoading"
import SignInScreen from "./SignIn"
import HomeScreen from "./HomeScreen"
import RepositoriesScreen from "./RepositoriesScreen"
import FollowingScreen from "./FollowingScreen"
import FollowersScreen from "./FollowersScreen"
import FollowersResults from "./FollowersResults"
import DetailsOtherUser from './DetailsOtherUser';

import axios from 'axios';

{/* <script src="http://localhost:8097"></script> */}

// export class GithubScreen extends Component {
//   render() {
//     return (
//       <View style={{flex: 1}}>
//         <Text>Inside github page</Text>
//       </View>
//     );
//   }
// }


const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

const RepositoriesStack = createStackNavigator({
  Repositories: RepositoriesScreen,
});

const FollowingStack = createStackNavigator({
  Following: FollowingScreen,
  Details: DetailsOtherUser,
});

const FollowersStack = createStackNavigator({
  Followers: FollowersScreen,
  Details: DetailsOtherUser,
});


const AppStack = createBottomTabNavigator(
  {
    Home: HomeStack,
    Repositories: RepositoriesStack,
    Following: FollowingStack,
    Followers: FollowersStack,
  },
  {
    initialRouteName: 'Home',
  }
);

const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
});


const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}




// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React Native!</Text>
//         <Text style={styles.instructions}>To get started, edit App.js</Text>
//         <Text style={styles.instructions}>{instructions}</Text>
//       </View>
//     );
//   }
// }

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
