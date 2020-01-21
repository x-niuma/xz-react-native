import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput } from 'react-native';

export default class CommentTalk extends Component {
  state = {
    content: ''
  };

  _handleFocus = () => {
    this.props.onFocus && this.props.onFocus(366);
  };

  _handleBlur = () => {
    this.props.onBlur && this.props.onBlur();
  };

  _handleSubmit = () => {
    this.props.onSubmit && this.props.onSubmit(this.state.content);
  };

  render(){
    return (
      <View style={styles.wrapper}>
        <View style={styles.input_wrapper}>
          <TextInput
            style={styles.input}
            onChangeText={(content) => this.setState({content})}
            value={this.state.content}
            placeholder="写评论..."
            onFocus={this._handleFocus}
            autoFocus={true}
            onBlur={this._handleBlur}
          />
        </View>
        <Text style={styles.submit_btn} onPress={this._handleSubmit}>发送</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  input_wrapper: {
    flex: 1,
    borderWidth: .5,
    borderColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: '#f5f5f5'
  },
  submit_btn: {
    marginLeft: 8
  },
  input: {
    height: 24,
  }
});