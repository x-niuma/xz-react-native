import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  Platform,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view';

class Page extends Component {
  render(){
    return (
      <View>
        <Text>{this.props.tabLabel}</Text>
      </View>
    )
  }
}

export default class App extends React.Component {
  render() {
    return (
      <View>
        <View style={{
          height: 52
        }}/>
        <ScrollableTabView>
          <Page tabLabel="React" />
          <Page tabLabel="Flow" />
          <Page tabLabel="Jest" />
        </ScrollableTabView>
      </View>
    );
  }
}

