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

// import rpx from '../util/rpx'

const rpx = v => v / 2;

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  loseFocus() {
    this.refs.input.blur()
  }
  render() {
    let behavior = Platform.OS == 'ios' ? 'position' : null;
    return (
      <KeyboardAvoidingView style={css.container} behavior={behavior}>
        <ScrollView style={{paddingBottom: rpx(100)}}>
          <View style={{backgroundColor: 'red', height: rpx(500)}}></View>
          <Button title="收起键盘" style={css.txt} onPress={() => this.loseFocus()}></Button>
          <View style={{backgroundColor: 'blue', height: rpx(500)}}></View>
          <View style={{backgroundColor: 'green', height: rpx(500)}}></View></ScrollView>
        <View style={[css.box]}>
          <TextInput
            ref="input"
            style={css.input}
            placeholderTextColor='#999999'
            placeholder={'输入代码、名称或简拼'}
            underlineColorAndroid="transparent" />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const css = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    height: rpx(60),
    width: '100%',
    fontSize: rpx(26),
    color: '#333333',
    backgroundColor: '#eee',
    borderRadius: rpx(60),
    paddingHorizontal: rpx(20),
    paddingVertical: 0
  },
  box: {
    width: rpx(750),
    height: rpx(100),
    backgroundColor: '#fff',
    paddingHorizontal: rpx(30),
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  txt: {
    color: 'red'
  }
})