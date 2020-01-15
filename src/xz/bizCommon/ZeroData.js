import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput } from 'react-native';

export default class ZeroData extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Image style={styles.icon} source={require('../res/img/zero_data.png')}/>
        <Text style={styles.desc}>{this.props.desc || '- 暂无数据 -'}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50
  },
  icon: {
    width: 180,
    height: 139
  },
  desc: {
    fontSize: 14,
    marginTop: 10,
    color: '#999',
  }
});