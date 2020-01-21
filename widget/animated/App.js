import React, { Component } from 'react';
import { Animated, Text, Easing, Button, View, ScrollView, TouchableOpacity } from 'react-native';

export default class Comp1 extends React.Component {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isModalVisible: false,                      // 弹窗是否可见
      modalWidth: new Animated.Value(1),          // 弹窗初始宽度
      modalHeight: new Animated.Value(1),         // 弹窗初始高度
    };
  }

  startAnimated = () => {
    // 同步执行的动画
    Animated.parallel([
      Animated.timing(this.state.modalHeight, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
      }),
      Animated.timing(this.state.modalWidth, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
      }),
      // 可以添加其他动画
    ]).start(() => {
      // 这里可以添加动画之后要执行的函数
      setTimeout(() => {
        this.setState({ isModalVisible: false });
      }, 100);
    });
  };

  render() {
    const modalWidth = this.state.modalWidth.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 300],
    });
    const modalHeight = this.state.modalHeight.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 200],
    });

    return (
      <View>
        <Animated.View
          style={[
            styles.modalContent,
            {
              width: modalWidth,
              height: modalHeight,
            },
          ]}
        >
          <View style={{ }}>
            <Animated.Text style={[styles.title, { fontSize: 16 }]}>标题</Animated.Text>
            <ScrollView>
              <Animated.Text style={[styles.content, { fontSize: 12 }]}>这是提示文本，这是提示文本，这是提示文本。</Animated.Text>
            </ScrollView>
            <Button onClick={() => {}} title="跳转">
              <Animated.Text style={{ fontSize: 12 }}>11跳转</Animated.Text>
            </Button>
          </View>
          <TouchableOpacity
            style={{ marginTop: 20, padding: 10, alignItems: 'center' }}
            onPress={this.startAnimated}
          >
            <Text>222订单</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }
}

const styles = {};
