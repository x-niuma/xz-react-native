import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Image,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';

import { Carousel } from '@ant-design/react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import SafeAreaViewPlus from '../common/SafeAreaViewPlus';
import Util from '../util/Util';
import Swiper from '../common/Swiper';
import CommonLinearGradient from '../common/LinearGradient';
import ZeroData from '../bizCommon/ZeroData';
import XzProductList from '../bizCommon/XzProductList';
import HomeMenu from '../bizCommon/HomeMenu';
import HomeGallery from '../bizCommon/HomeGallery';

import api from '../api';
import theme from '../res/style/theme';

/**
 * @description 首页
 * @author Gaollard
 * @create date 2019-11-30
 * @last modify date 2019-11-30
 */
export default class Home extends React.Component {
  state = {
    searchKey: '',
    xzProductList: [],
    categoryList: [],
    currentCategoryId: '',
    pageSize: 10,
    pageIndex: 0,
    hasMore: true,
    loading: false,
    showTopFixed: false
  };

  async componentDidMount() {
    await this._doGetXzCategoryList();
    await this._doGetXzProduct(true);
  }

  _onChangeText = (searchKey) => {
    this.setState({ searchKey })
  };

  _doGetXzProduct = (initial) => {
    this.setState({ loading: true });
    api.getXzProduct(
      this.state.currentCategoryId || 1,
      this.state.pageSize,
      this.state.pageIndex
    ).then(res => {
      let { list } = res.data
      let newList = initial ? list : this.state.xzProductList.concat(list)
      this.setState({
        loading: false,
        xzProductList: newList,
        hasMore: newList.length < res.data.pageInfo.total
      })
    }).catch(err => {
      this.setState({ loading: false });
    });
  };

  _doGetXzCategoryList = async () => {
    let res = await api.getXzCategoryList()
    if (res && res.success) {
      const list = res.data.list || [];
      this.setState({
        categoryList: list,
        currentCategoryId: list.length ? list[0].id : ''
      })
    }
  };

  _handleScan = () => {
    this.props.navigation.push('Scan');
  };

  _renderCategoryList = () => {
    const list = this.state.categoryList;
    const _onClick = (element) => {
      this.setState({
        currentCategoryId: element.id,
        pageIndex: 0,
        hasMore: true
      }, () => {
        this._doGetXzProduct(true);
      })
    };
    const listElement = list.map((element) => {
      const cls = [{
        lineHeight: 40,
        fontSize: 14,
        color: '#666',
      }];
      let line = null;
      if (element.id === this.state.currentCategoryId) {
        cls.push({ color: '#333', fontWeight: 'bold', fontSize: 15 });
        line = (
          <CommonLinearGradient
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}
            style={styles.linearGradient}
            colors={[ '#ff4f3b', '#f5aba3' ]}
          >
            <View style={{ height: 4 }}/>
          </CommonLinearGradient>
        )
      }
      return (
        <View key={element.id} style={{marginHorizontal: 12, display: 'flex',}}>
          <Text style={cls} onPress={() => _onClick(element)}>{element.name}</Text>
          <View style={{zIndex: 2, marginTop: -8,}}>
            { line }
          </View>
        </View>
      )
    });
    return (
      <View style={{zIndex: 2, backgroundColor: '#f6f6f6', top: 0}}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {listElement}
        </ScrollView>
      </View>
    )
  };

  _onScroll = (e) => {
    let offsetY = e.nativeEvent.contentOffset.y; //滑动距离
    this.setState({ showTopFixed: offsetY > 300 })
  };

  /**
   * 上拉触底
   */
  _contentViewScroll=(e)=>{
    let offsetY = e.nativeEvent.contentOffset.y; // 滑动距离
    let contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
    let oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
    if (offsetY + oriageScrollHeight >= contentSizeHeight){
      // 在这里面加入你需要指行得方法和加载数据
      if (!this.state.hasMore || this.state.loading) return;
      this.setState({
        pageIndex: this.state.pageIndex + 1,
      }, () => {
        this._doGetXzProduct();
      })
    }else if(offsetY + oriageScrollHeight <= 1){
      // 这个是没有数据了然后给了false  得时候还在往上拉
    }else if(offsetY === 0){
      // 这个地方是下拉刷新，意思是到顶了还在指行，可以在这个地方进行处理需要刷新得数据
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaViewPlus style={{flex: 1, backgroundColor: theme.primaryColor, position: 'relative'}}>
        {Platform.OS === 'ios' ? null : <View style={{ height: 20 }}/>}
        <StatusBar barStyle="light-content" backgroundColor={theme.primaryColor} translucent={true} hidden={false}/>
        <View style={styles.header}>
          <Image style={styles.menu_icon} source={require('../res/img/menu.png')} />
          {/*<TextInput*/}
            {/*style={styles.search_input}*/}
            {/*onChangeText={text => this._onChangeText(text)}*/}
            {/*value={this.state.searchKey}*/}
            {/*placeholder="输入您要搜索的内容"*/}
          {/*/>*/}
          {/*<View></View>*/}
          <View style={styles.search_input}>
            <TouchableWithoutFeedback onPress={() => {
              this.props.navigation.push('Search')
            }}>
              <Text style={{ lineHeight: 30, fontSize: 12 }}>输入您要搜索的内容</Text>
            </TouchableWithoutFeedback>
          </View>
          <AntDesign onPress={this._handleScan} name="scan1" size={24} style={{marginHorizontal: 8}} color="#fff" />
        </View>
        <View style={{flex: 1, backgroundColor: '#f5f5f5', position: 'relative'}}>
          {/*悬浮分类导航*/}
          {this.state.showTopFixed ? this._renderCategoryList() : null}
          <ScrollView
            scrollEventThrottle={10}
            onScroll={this._onScroll}
            onMomentumScrollEnd = {this._contentViewScroll}
            showsVerticalScrollIndicator={false} style={styles.scrollView}>
            <View style={styles.body}>
              {/*广告栏*/}
              <HomeGallery navigation={navigation} />
              {/*主菜单*/}
              <HomeMenu navigation={navigation} />
              {/*分类导航*/}
              {!this.state.showTopFixed ? this._renderCategoryList() : null}
              {/*商品列表*/}
              <XzProductList
                navigation={navigation}
                loading={this.state.loading}
                xzProductList={this.state.xzProductList}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaViewPlus>
    )
  }
}

const styles = StyleSheet.create({
  // 顶部悬浮
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    backgroundColor: theme.primaryColor
  },
  menu_icon: {
    width: 20,
    height: 18,
    marginLeft: 10,
    marginRight: 10
  },
  search_input: {
    flex: 1,
    height: 30,
    padding: 0,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#fff'
  },
  scan_btn: {
    paddingLeft: 6,
    paddingRight: 6,
    color: '#fff'
  },
  body: {
    position: 'relative'
  },
});
