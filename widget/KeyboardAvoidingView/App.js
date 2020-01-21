import React, { Component } from 'react'
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native'

export default class App extends Component {
  state = {
    value: '111'
  };

  render() {
    return (
      <ScrollView style={[styles.container, styles.horizontal]}>
        <KeyboardAvoidingView behavior="position" enabled keyboardVerticalOffset={20} style={{
          flex: 1
        }}>
        <View style={{ height: 200 }}/>
        <ActivityIndicator size="large" color="#0000ff" />
        <ActivityIndicator size="small" color="#00ff00" />
        <ActivityIndicator size="large" color="#0000ff" />
        <ActivityIndicator size="small" color="#00ff00" />
        <Button
          // onPress={onPressLearnMore}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <View style={{ height: 300 }} />
        <TextInput value={this.state.value} style={{
          borderWidth: 1,
          borderColor: 'red'
          }}
        />
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center'
  },
  horizontal: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    padding: 10
  }
})