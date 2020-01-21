import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class extends Component {
  static navigationOptions = {
    title: '聊天'
  };
  
  render() {
    return(
      <View>
        <View>
          <Text>聊天详情</Text>
        </View>
      </View>
    )
  }
}