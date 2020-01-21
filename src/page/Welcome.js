import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import Util from '../util/Util';

const g_width = Util.gWidth;
const g_height = Util.gHeight;

/**
 * @description 启动页面
 * @author Gaollard
 * @create date 2019-11-27
 * @last modify date 2019-11-27
 */
export default class Welcome extends React.Component {
  state = {
    second: 0,
    maxCount: 3
  };

  componentDidMount() {
    this.setTimeId();
  }

  setTimeId = () => {
    let count = 0;
    const run = () => {
      count++;
      this.setState({
        second: count
      });
      if (count >= this.state.maxCount) {
        this.navigateToHome();
      } else {
        this._timeId = setTimeout(run, 1000);
      }
    };
    this._timeId = setTimeout(run, 1000);
  };

  navigateToHome = () => {
    this.clearTimeId();
    this.props.navigation.replace('Main');
  };

  clearTimeId = () => {
    clearTimeout(this._timeId);
    this.setState({
      second: 0
    });
  };

  componentWillUnmount() {
    this.clearTimeId();
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.notice}>
          <Text style={styles.text} onPress={this.navigateToHome}>
            {this.state.maxCount - this.state.second}S后跳转
          </Text>
        </View>
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
    fontSize: 10,
    textAlign: 'center'
  },
  notice: {
    zIndex: 2,
    position: 'absolute',
    right: 10,
    top: 40,
    width: 54,
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, .2)'
  }
});
