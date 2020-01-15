import React from 'react';
import { View, Text, Animated } from 'react-native';

export default class extends React.Component {
  state = {
    value1: new Animated.Value(0),
    value2: new Animated.Value(200)
  };

  _startAnimated = () => {
    Animated.parallel([
      Animated.timing(this.state.value1, {
        toValue: 200,
        duration: 1000,
      }),
      Animated.timing(this.state.value2, {
        toValue: 0,
        duration: 1000,
      }),
    ]).start(() => {
      alert('动画执行完成');
    });
  };

  _startAnimated2 = () => {
    Animated.sequence([
      Animated.timing(this.state.value1, {
        toValue: 200,
        duration: 1000,
      }),
      Animated.timing(this.state.value2, {
        toValue: 0,
        duration: 1000,
      }),
    ]).start(() => {
      alert('动画执行完成');
    });
  };

  render() {
    const { value1, value2 } = this.state;
    return (
      <View style={{margin: 12}}>
        <Animated.View style={{ marginLeft: value1, height: 100, width: 100, backgroundColor: 'red' }}/>
        <Animated.View style={{ marginLeft: value2, height: 100, width: 100, backgroundColor: 'blue' }}/>
        <View>
          <Text onPress={this._startAnimated}>并行执行</Text>
          <Text onPress={this._startAnimated2}>串行执行</Text>
        </View>
      </View>
    )
  }
}