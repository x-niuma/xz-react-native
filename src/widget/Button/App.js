import React, { Component } from 'react'
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native'

export default class App extends Component {
  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <View style={{ height: 100 }}/>
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
      </View>
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