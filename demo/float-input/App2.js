import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  Keyboard,
  Platform,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native'

const rpx = v => v/2;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyBoardHeight: 0,
      showInput: true
    }
  }
  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  _keyboardDidShow(e) {
    this.setState({
      keyBoardHeight: e.endCoordinates.height
    });
  }
  _keyboardDidHide() {
    this.setState({
      keyBoardHeight: 0
    });
  }
  loseFocus() {
    this.refs.input.blur()
  }
  render() {
    let { keyBoardHeight } = this.state
    return (
      <View style={css.container}>
        <ScrollView style={{paddingBottom: rpx(100)}}>
          <Text>键盘高度: {keyBoardHeight}</Text>
          <View style={{backgroundColor: 'red', height: rpx(500)}}></View>
          <Button title="收起键盘" style={css.txt} onPress={() => this.loseFocus()}></Button>
          <View style={{backgroundColor: 'blue', height: rpx(500)}}></View>
          <View style={{backgroundColor: 'green', height: rpx(500)}}></View>
        </ScrollView>
        {
          this.state.showInput ? (
            <View style={[css.box, Platform.OS == 'ios' && { bottom: keyBoardHeight }]}>
              <TextInput
                ref="input"
                style={css.input}
                placeholderTextColor='#999999'
                placeholder={'输入代码、名称或简拼'}
                underlineColorAndroid="transparent" />
            </View>
          ) : null
        }
      </View>
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