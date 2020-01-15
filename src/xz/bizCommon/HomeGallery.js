import React from 'react';
import {StyleSheet, View,} from 'react-native';
import theme from '../res/style/theme';
import Swiper from '../common/Swiper';
import bannerList from '../res/data/homeBannerList';
import LinearGradient from 'react-native-linear-gradient';

/**
 * @description 首页广告
 */
export default class HomeGallery extends React.Component {
  state = {
    bannerList: bannerList,
  };

  _switchPage = (index) => {
    this.props.navigation.push('H5', {
      url: this.state.bannerList[index].url
    })
  };

  render() {
    return (
      <View style={styles.main_slide}>
        <LinearGradient colors={[ theme.primaryColor, '#fff' ]}>
          <View style={{ height: 4 }}/>
          <Swiper
            data={this.state.bannerList}
            onClickItem={(index) => this._switchPage(index)}
          />
        </LinearGradient>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_slide: {
    width: window.width,
  },
});
