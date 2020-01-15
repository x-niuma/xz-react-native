// import React from 'react';
// import {
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   Image,
//   Platform
// } from 'react-native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import SafeAreaViewPlus from '../common/SafeAreaViewPlus';
// import api from '../api';
// import theme from '../res/style/theme';
// import CommonLinearGradient from '../common/LinearGradient';
// import ZeroData from '../bizCommon/ZeroData';
// import XzProductList from '../bizCommon/XzProductList';
// import ViewUtil from '../util/ViewUtil';
// import NavigationBar from '../common/NavigationBar';
//
// /**
//  * @description 首页
//  * @author Gaollard
//  * @create date 2019-11-30
//  * @last modify date 2019-11-30
//  */
// export default class MyXzProduct extends React.Component {
//   state = {
//     xzProductList: [],
//     pageSize: 10,
//     pageIndex: 0,
//     hasMore: true,
//     loading: false,
//   };
//
//   componentDidMount() {
//     this._doGetXzProduct(true);
//   }
//
//   _doGetXzProduct = (initial) => {
//     this.setState({
//       loading: true
//     });
//     const fn = () => api.getUserXzProduct({
//       pageIndex: this.state.pageIndex,
//       pageSize: this.state.pageSize,
//     }).then(res => {
//       let newList = [];
//       if (!initial) {
//         newList = this.state.xzProductList.concat(res.data.list);
//       } else {
//         newList = res.data.list;
//       }
//       this.setState({
//         loading: false,
//         xzProductList: newList,
//         hasMore: newList.length < res.data.pageInfo.total
//       })
//     }).catch(err => {
//       this.setState({
//         loading: false
//       });
//     });
//     setTimeout(fn, 100);
//   };
//
//   /**
//    * 上拉触底
//    */
//   _contentViewScroll=(e)=>{
//     let offsetY = e.nativeEvent.contentOffset.y; //滑动距离
//     let contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
//     let oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
//     if (offsetY + oriageScrollHeight >= contentSizeHeight){
//       // 在这里面加入你需要指行得方法和加载数据
//       if (!this.state.hasMore || this.state.loading || !this.state.xzProductList.length) {
//         return;
//       }
//       this.setState({
//         pageIndex: this.state.pageIndex + 1,
//       }, () => {
//         this._doGetXzProduct();
//       })
//     }else if(offsetY + oriageScrollHeight <= 1){
//       // 这个是没有数据了然后给了false  得时候还在往上拉
//     }else if(offsetY === 0){
//       // 这个地方是下拉刷新，意思是到顶了还在指行，可以在这个地方进行处理需要刷新得数据
//     }
//   };
//
//   render() {
//     const { navigation } = this.props;
//     return (
//       <SafeAreaViewPlus style={{flex: 1, backgroundColor: '#fff', position: 'relative'}}>
//         {Platform.OS === 'ios' ? null : <View style={{ height: 20 }}/>}
//         <View style={{flex: 1, backgroundColor: '#f5f5f5', position: 'relative'}}>
//           <NavigationBar
//             style={{backgroundColor: '#fff'}}
//             leftButton={ViewUtil.getLeftBackButton(() => navigation.goBack(), '#333')}
//             title={'我的发布'}
//             titleColor={'#333'}
//           />
//           <ScrollView
//             scrollEventThrottle={10}
//             onMomentumScrollEnd = {this._contentViewScroll}
//             showsVerticalScrollIndicator={false} style={styles.scrollView}>
//             <View style={styles.body}>
//               <XzProductList
//                 navigation={navigation}
//                 loading={this.state.loading}
//                 xzProductList={this.state.xzProductList}
//               />
//             </View>
//           </ScrollView>
//         </View>
//       </SafeAreaViewPlus>
//     )
//   }
// }
//
// const styles = StyleSheet.create({
//   // 顶部悬浮
//   header: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: 44,
//     backgroundColor: theme.primaryColor
//   },
//   menu_icon: {
//     width: 20,
//     height: 18,
//     marginLeft: 10,
//     marginRight: 10
//   },
//   search_input: {
//     flex: 1,
//     height: 30,
//     padding: 0,
//     paddingLeft: 8,
//     paddingRight: 8,
//     backgroundColor: '#fff'
//   },
//   scan_btn: {
//     paddingLeft: 6,
//     paddingRight: 6,
//     color: '#fff'
//   },
//   body: {
//     position: 'relative'
//   },
// });


import React, { Component } from 'react';
import UserXzProduct from '../bizCommon/UserXzProduct'

export default class MyXzProduct extends Component {
  render() {
    const { navigation } = this.props;
    return <UserXzProduct navigation={navigation} />
  }
}