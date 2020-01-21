import React, { Component } from 'react';
import { Text, View, Image, ScrollView, StyleSheet, Button } from 'react-native';
import { Grid, List } from '@ant-design/react-native';
import apis from '../api';
import Storage from '../util/Storage';
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 

const { Item } = List;

// 个人中心
export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      totalInfo: {
        followNum: 0,
        collectNum: 0,
        likeNum: 0,
        pointNum: 0,
      },
      checkStatus: true,
      menuList: [
        {
          text: '关注',
          path: 'Follow',
          num: 0
        }, {
          text: '收藏',
          path: 'Collect',
          num: 0
        }, {
          text: '点赞',
          path: 'Star',
          num: 0
        }, {
          text: '积分',
          path: 'MyPoint',
          num: 0
        }
      ]
    }
  }

  async componentDidMount() {
    this._doGetCheckinStatus();
    this._doGetUserTotalInfo();
    const { navigation } = this.props;
    this._navListener = navigation.addListener('didFocus', this._onLoginCallback);
  }

  componentWillUnmount() {
    this._navListener.remove()
  }

  _onLoginCallback = async () => {
    let res = await Storage.getItem('userInfo')
    if (res) {
      this.setState({userInfo: res})
    }
  };

  _doGetCheckinStatus = async() => {
    let res = await apis.getCheckinStatus();
    this.setState({
      checkStatus: res.data.status === 1
    })
  };

  _doGetUserTotalInfo = async() => {
    let res = await apis.getUserTotalInfo();
    const totalInfo = res.data;
    const { menuList } = this.state;
    menuList[0].num = totalInfo.collectNum;
    menuList[1].num = totalInfo.followNum;
    menuList[2].num = totalInfo.likeNum;
    menuList[3].num = totalInfo.pointNum;
    this.setState({
      menuList: menuList,
      totalInfo: totalInfo
    });
  };

  _renderCard = () => {
    const { userInfo } = this.state;
    return (
      <View>
        {
          userInfo ? (
            <View style={styles.avatarLogin}>
              <Image style={styles.avatar} source={{ uri: userInfo.avatar }} />
              <Text style={styles.nickname}>{userInfo.nickname}</Text>
              <Text style={styles.checkinBtn}>{this.state.checkStatus ? '已签到' : '签到'}</Text>
            </View>
          ) : (
            <View style={styles.avatarLogin}>
              <Image style={styles.avatar} source={require('../res/img/avatar.png')}/>
              <Text style={styles.nickname}>登录/注册</Text>
            </View>
          )
        }
      </View>
    )
  };

  render() {
    const { navigation } = this.props;
    const totalInfo = this.state.totalInfo || {};
    const { menuList } = this.state;
    return (
      <ScrollView style={styles.container}>
        {/* 顶部区域 */}
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          locations={[0, 1]}
          colors={[ '#ffeb3b', '#ffeb3b' ]}
          style={styles.linearGradient}>
          <View style={styles.cardBox}>
            {this._renderCard()}
            <View style={styles.grid_menu}>
              <View style={styles.grid_menu_item}>
                <FontAwesome name="heart-o" size={24}/>
                <Text onPress={() => navigation.push('MyFollow')} style={styles.grid_menu_item_name}>关注({totalInfo.followNum})</Text>
              </View>
              <View style={styles.grid_menu_item}>
                <FontAwesome name="star-o" size={24}/>
                <Text onPress={() => navigation.push('MyCollect')} style={styles.grid_menu_item_name}>收藏({totalInfo.collectNum})</Text>
              </View>
              <View style={styles.grid_menu_item}>
                <FontAwesome name="thumbs-o-up" size={24}/>
                <Text onPress={() => navigation.push('MyStar')} style={styles.grid_menu_item_name}>点赞({totalInfo.likeNum})</Text>
              </View>
              <View style={styles.grid_menu_item}>
                <FontAwesome name="diamond" size={24}/>
                <Text onPress={() => navigation.push('MyPoint')} style={styles.grid_menu_item_name}>积分({totalInfo.pointNum})</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        <List>
          <Item arrow='horizontal' onPress={() => navigation.navigate('MyXzProduct')}>
            <Text>我的发布</Text>
          </Item>
          <Item arrow='horizontal' onPress={() => navigation.navigate('AddXzProduct')}>
            <Text>发布闲置</Text>
          </Item>
          <Item arrow='horizontal' onPress={() => navigation.navigate('MyAddress')}>
            <Text>地址管理</Text>
          </Item>
          <Item arrow='horizontal' onPress={() => navigation.navigate('AboutUs')}>
            <Text>关于我们</Text>
          </Item>
          <Item arrow='horizontal' onPress={() => navigation.navigate('AboutAuthor')}>
            <Text>关于作者</Text>
          </Item>
          <Item arrow='horizontal' onPress={() => navigation.navigate('AMap')}>
            <Text>高德地图</Text>
          </Item>
          <Item arrow='horizontal' onPress={() => navigation.navigate('Login')}>
            <Text>立即登陆</Text>
          </Item>
        </List>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  // 顶部banner
  cardBox: {
    height: 230,
    paddingTop: 40,
  },
  avatarLogin: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    paddingLeft: 16
  },
  avatar: {
    width: 55,
    height: 55,
    marginRight: 10,
    borderRadius: 27.5
  },
  nickname: {
    fontSize: 14,
    color: '#333'
  },
  checkinBtn: {
    position: 'absolute',
    width: 64,
    height: 24,
    lineHeight: 22,
    fontSize: 13,
    textAlign: 'center',
    borderColor: '#333',
    borderWidth: 1,
    right: 24,
    borderRadius: 2
  },
  // menu one
  grid_menu: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30
  },
  grid_menu_item: {
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  grid_menu_item_name: {
    marginTop: 10
  },
  // cardMenu
  cardMenu: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  cardMenu_item: {
    flex: 1,
    lineHeight: 37,
    color: '#333',
    textAlign: 'center'
  },
  cell: {
    paddingLeft: 16,
    backgroundColor: '#fff'
  },
  cellInner: {
    height: 44,
    lineHeight: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#ebedf0'
  },
})
