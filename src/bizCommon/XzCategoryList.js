import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback
} from 'react-native';

import api from '../api';
import Util from '../util/Util';
import Swiper from '../common/Swiper';
import menuList from '../res/data/homeMenuList';
import bannerList from '../res/data/homeBannerList';
import CommonLinearGradient from '../common/LinearGradient';
import ZeroData from '../bizCommon/ZeroData';
import XzProductList from '../bizCommon/XzProductList';
import { Carousel } from '@ant-design/react-native';

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
    bannerList: bannerList,
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
    this.setState({
      loading: true
    });
    const fn = () => api.getXzProduct(
      this.state.currentCategoryId || 1,
      this.state.pageSize,
      this.state.pageIndex
    ).then(res => {
      let newList = [];
      if (!initial) {
        newList = this.state.xzProductList.concat(res.data.list);
      } else {
        newList = res.data.list;
      }
      this.setState({
        loading: false,
        xzProductList: newList,
        hasMore: newList.length < res.data.pageInfo.total
      })
    }).catch(err => {
      console.log(err);
      this.setState({
        loading: false
      });
    });
    setTimeout(fn, 100);
  };

  _doGetXzCategoryList = () => {
    api.getXzCategoryList().then(res => {
      if (res && res.success) {
        const list = res.data.list || [];
        this.setState({
          categoryList: list,
          currentCategoryId: list.length ? list[0].id : ''
        })
      }
    })
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
          <CommonLinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} style={styles.linearGradient} colors={[ '#ff4f3b', '#f5aba3' ]}>
            <View style={{ height: 4 }}/>
          </CommonLinearGradient>
        )
      }
      return (
        <View style={{
          marginHorizontal: 12,
          display: 'flex',
        }}>
          <View>
            <Text style={cls} onPress={() => _onClick(element)}>{element.name}</Text>
          </View>
          <View style={{
            zIndex: 2,
            marginTop: -8,
          }}>
            { line }
          </View>
        </View>
      )
    });
    return (
      <View style={{
        zIndex: 2,
        backgroundColor: '#f6f6f6',
        top: 0
      }}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {listElement}
        </ScrollView>
      </View>
    )
  };

  _onScroll = (e) => {
    let offsetY = e.nativeEvent.contentOffset.y; //滑动距离
    this.setState({
      showTopFixed: offsetY > 300
    })
  };

  /**
   * 上拉触底
   */
  _contentViewScroll=(e)=>{
    let offsetY = e.nativeEvent.contentOffset.y; //滑动距离
    let contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
    let oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
    if (offsetY + oriageScrollHeight >= contentSizeHeight){
      // 在这里面加入你需要指行得方法和加载数据
      if (!this.state.hasMore || this.state.loading) {
        return;
      }
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
      <>
      <StatusBar barStyle="light-content" translucent={true}/>
      <SafeAreaView style={{flex: 1, backgroundColor: '#c82519', position: 'relative'}}>
        {/* 顶部固定模块 */}
        <View style={styles.header}>
          <Image style={styles.menu_icon} source={require('../res/img/menu.png')} />
          <TextInput
            style={styles.search_input}
            onChangeText={text => this._onChangeText(text)}
            value={this.state.searchKey}
            placeholder="输入您要搜索的内容"
          />
          <Text style={styles.scan_btn} onPress={this._handleScan}>扫一扫</Text>
        </View>
        <View style={{flex: 1, backgroundColor: '#f5f5f5', position: 'relative'}}>
          {
            this.state.showTopFixed ? this._renderCategoryList() : null
          }
          <ScrollView
            scrollEventThrottle={10}
            onScroll={this._onScroll}
            onMomentumScrollEnd = {this._contentViewScroll}
            showsVerticalScrollIndicator={false} style={styles.scrollView}>
            <View style={styles.body}>
              {/* 轮播广告模块 */}
              <View style={styles.main_slide}>
                <CommonLinearGradient style={styles.linearGradient} colors={[ '#c82519', '#fff' ]}>
                  <View style={{ height: 4 }}/>
                  <Swiper data={this.state.bannerList} onClickItem={(index) => {
                    navigation.push('H5', {
                      url: this.state.bannerList[index].url
                    })
                  }}/>
                </CommonLinearGradient>
              </View>

              {/*主菜单列表*/}
              <View style={styles.entry_list}>
                {
                  menuList.map((item, index) => {
                    return (
                      <TouchableWithoutFeedback onPress={() => {
                        navigation.push('H5', {
                          url: item.url
                        })
                      }} key={index}>
                        <View style={styles.entry_item}>
                          <Image style={styles.entry_icon} source={{ url: 'http:' + item.icon }} />
                          <Text style={styles.entry_name}>{item.name}</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    )
                  })
                }
              </View>
              <Carousel selectedIndex={0}>
                {
                  [0, 1, 2, 3].map((slide, index) => {
                    return (
                      <View style={{
                        height: 100
                      }} key={index}>
                        <Text>{slide}</Text>
                      </View>
                    )
                  })
                }
              </Carousel>
              {
                !this.state.showTopFixed ? this._renderCategoryList() : null
              }
              <XzProductList
                navigation={navigation}
                loading={this.state.loading}
                xzProductList={this.state.xzProductList}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
      </>
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
    backgroundColor: '#c82519'
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
  // 轮播广告
  main_slide: {
    width: window.width,
  },
  // 菜单配置
  entry_list: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 8,
    backgroundColor: '#fff'
  },
  entry_item: {
    width: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 10
  },
  entry_icon: {
    width: 40,
    height: 40
  },
  entry_name: {
    fontSize: 12,
    lineHeight: 16,
    color: '#666',
    marginTop: 10
  },
});
