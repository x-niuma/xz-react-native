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
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import { WebView } from 'react-native-webview';

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

  componentWillUnmount() {
    this.setState({
      second: 0
    })
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaViewPlus topColor={'#f44336'}>
        <NavigationBar
          style={styles.navigationBarStyle}
          leftButton={ViewUtil.getLeftBackButton(() => navigation.goBack())}
          title={'关于我们'}
          titleColor={'#fff'}
        />
        {/*<ScrollView style={{ flex: 1 }}>*/}
          <WebView style={{ flex: 1 }} source={{uri: this.props.navigation.state.params.url }}/>
        {/*</ScrollView>*/}
      </SafeAreaViewPlus>
    )
  }
}

const styles = StyleSheet.create({
  navigationBarStyle: {
    color: '#333',
    backgroundColor: '#f44336'
  }
});
