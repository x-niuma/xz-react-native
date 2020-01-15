import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Image,
  Button,
  Dimensions,
  SafeAreaView
} from 'react-native';

const window = Dimensions.get('window');
const g_width = window.width;
const g_height = window.height;

/**
 * @description 闲置商品搜索页面
 */
export default class Welcome extends React.Component {
  state = {
    second: 0,
    maxCount: 3
  };

  componentDidMount() {
    let count = 0;
    const run = () => {
      count++;
      this.setState({
        second: count
      })
      if (count >= this.state.maxCount) {
        this.props.navigation.replace('Main');
      } else {
        setTimeout(run, 1000);
      }
    }
    setTimeout(run, 1000);
  }

  componentWillUnmount() {
    this.setState({
      second: 0
    })
  }

  render() {
    return (
      <View style={styles.wrapper}>
        {/* <View style={styles.notice}>
          <Text style={styles.text}>{this.state.maxCount - this.state.second}S后跳转</Text>
        </View> */}
        <Button title="登陆"/>
        <Image style={styles.slash_img} source={require('../res/img/start.jpg')}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#fff'
  },
  slash_img: {
    width: g_width,
    height: g_height
  },
  text: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center'
  },
  notice: {
    zIndex: 2,
    position: 'absolute',
    width: 80,
    right: 10,
    top: 40,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#f44336'
  }
});
