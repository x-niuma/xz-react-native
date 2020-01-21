import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';

export default class XzProductList extends Component {
  render() {
    return (
      <View>
        <View style={{ height: 52 }}/>
        <Text onPress={() => {this.props.navigation.pop();}}>XzProductList</Text>
        <Text>{JSON.stringify(this.props.navigation.state.params)}</Text>
      </View>
    )
  }
}
