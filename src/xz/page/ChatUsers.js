import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class extends Component {
  render() {
    return(
      <View>
        <View>
          <Text>聊天列表</Text>
          <Text onPress={() => this.props.navigation.push('Chat')}>聊天</Text>
        </View>
      </View>
    )
  }
}