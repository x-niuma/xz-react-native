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
  findNodeHandle,
  UIManager,
} from 'react-native';

import api from '../api';
import Util from '../util/Util'
import bannerList from '../res/data/homeBannerList';
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
    showTopFixed: false,
    xzProductData: [],
    curIndex: 0
  };

  async componentDidMount() {
    await this._doGetXzCategoryList();
    await this._doGetXzProduct(true);
  }

  _onChangeText = (searchKey) => {
    this.setState({ searchKey })
  };

  _doGetXzProduct = (initial) => {
    const { currentCategoryId } = this.state;
    const findIndex = this.state.categoryList.findIndex(element => element.id === currentCategoryId);
    const currentElement = this.state.xzProductData[findIndex];
    currentElement.loading = true;
    if (initial) currentElement.pageIndex = 0;
    this.state.xzProductData[findIndex] = currentElement;

    this.setState({
      xzProductData: this.state.xzProductData
    });

    api.getXzProduct(
      this.state.currentCategoryId || 1,
      currentElement.pageSize,
      currentElement.pageIndex
    ).then(res => {
      let newList = [];
      if (!initial) {
        newList = currentElement.list.concat(res.data.list);
      } else {
        newList = res.data.list;
      }
      currentElement.list = newList;
      currentElement.loading = false;
      currentElement.hasMore = newList.length < res.data.pageInfo.total;
      this.state.xzProductData[findIndex] = currentElement;
      this.setState({
        xzProductData: this.state.xzProductData,
      });
      console.log(this.state.xzProductData);
    }).catch(err => {
      currentElement.loading = false;
      this.setState({
        xzProductData: this.state.xzProductData,
      });
    });
  };

  _doGetXzCategoryList = () => {
    api.getXzCategoryList().then(res => {
      if (res && res.success) {
        const list = res.data.list || [];
        const xzProductData = list.map(element => {
          return {
            pageSize: 10,
            pageIndex: 0,
            loading: false,
            hasMore: true,
            list: []
          }
        });
        this.setState({
          xzProductData,
          categoryList: list,
          currentCategoryId: list.length ? list[0].id : ''
        }, () => {
          this._doGetXzProduct(true);
        })
      }
    })
  };

  _handleScan = () => {
    this.props.navigation.push('Scan');
  };

  _renderCategoryList = () => {
    const list = this.state.categoryList;
    const _onClick = (element, index) => {
      this.setState({
        currentCategoryId: element.id,
        pageIndex: 0,
        hasMore: true,
        curIndex: index
      }, () => {
        this.onHorizontalSelectedIndexChange(index);
        this._doGetXzProduct(true);
      })
    };
    const listElement = list.map((element, index) => {
      const cls = [{
        lineHeight: 40,
        fontSize: 14,
        color: '#666',
      }];
      let line = null;
      if (element.id === this.state.currentCategoryId) {
        cls.push({ color: '#c82519' });
        line = <View style={{
          zIndex: 5,
          width: 20,
          height: 3,
          marginTop: -6,
          borderRadius: 2,
          backgroundColor: '#c82519'
        }}/>
      }
      return (
        <View key={index} style={{
          marginHorizontal: 12,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
          <Text style={cls} onPress={() => _onClick(element, index)}>{element.name}</Text>
          {line}
        </View>
      )
    });
    return (
      <View style={{zIndex: 2, backgroundColor: '#f6f6f6', top: 0}}>
        <ScrollView
          style={{}}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          ref={ref => this.scrollRef = ref}>
          <View style={{display: 'flex', flexDirection:'row',}} ref={ref => this.cateRef = ref}>{listElement}</View>
        </ScrollView>
      </View>
    )
  };

  onHorizontalSelectedIndexChange = (index) => {
    this.setState({
      curIndex: index,
      currentCategoryId: this.state.categoryList[index].id
    }, () => {
      this._doGetXzProduct(true);
    });
    this.cateRef._children[index].measure((x, y, width, height, left, top) => {
      this.cateRef.measure((x1, y1, w1, h1, l1, t1) => {
        console.log(x, y, width, height, left, top);
        console.log(x1, y1, w1, h1, l1, t1);
        if (x > (Util.gWidth) / 2) {
          let dest = x + width / 2 - Util.gWidth / 2;
          if (dest < 0) dest = 0;
          this.scrollRef.scrollTo({
            x: dest,
            y: 0,
            animated: true
          });
        } else {
          this.scrollRef.scrollTo({
            x: 0,
            y: 0,
            animated: true
          });
        }
      });
    });
  };

  _onScroll = (e) => {};

  /**
   * 上拉触底
   */
  _contentViewScroll=(e)=>{
    const { currentCategoryId } = this.state;
    const findIndex = this.state.categoryList.findIndex(element => element.id === currentCategoryId);
    const currentElement = this.state.xzProductData[findIndex];

    let offsetY = e.nativeEvent.contentOffset.y; //滑动距离
    let contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
    let oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
    if (offsetY + oriageScrollHeight >= contentSizeHeight){
      // 在这里面加入你需要指行得方法和加载数据
      if (!currentElement.hasMore || currentElement.loading) {
        return;
      }
      currentElement.pageIndex += 1;
      this.setState({
        xzProductData: this.state.xzProductData
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
          <ScrollView
            scrollEventThrottle={10}
            onScroll={this._onScroll}
            onMomentumScrollEnd = {this._contentViewScroll}
            showsVerticalScrollIndicator={false} style={styles.scrollView}>
            <View style={styles.body}>
              {this._renderCategoryList()}
              <Carousel
                ref={ref => this.carousel = ref}
                dots={false}
                selectedIndex={this.state.curIndex}
                        afterChange={this.onHorizontalSelectedIndexChange}>
                {
                  this.state.xzProductData.map((slide, index) => {
                    return (
                      <View key={index}>
                        <XzProductList
                          navigation={navigation}
                          loading={slide.loading}
                          xzProductList={slide.list}
                        />
                      </View>
                    )
                  })
                }
              </Carousel>
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
