import React, { Component } from 'react';
import firebase from 'firebase';
import {
  View,
} from 'react-native';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

export default class App extends Component {
  state = {
    loggedIn: null
  };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyC0Tyw6PZ9CV_w6PzljE-fyHM7STVAzaeQ',
      authDomain: 'auth-c2c4f.firebaseapp.com',
      databaseURL: 'https://auth-c2c4f.firebaseio.com',
      projectId: 'auth-c2c4f',
      storageBucket: 'auth-c2c4f.appspot.com',
      messagingSenderId: '368456541866'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={{ flexDirection: 'row' }}>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </View>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
  },
};
