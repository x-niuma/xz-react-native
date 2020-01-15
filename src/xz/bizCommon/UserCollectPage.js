import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet
} from 'react-native';

import api from '../api';
import theme from '../res/style/theme';
import ViewUtil from '../util/ViewUtil';
import NavigationBar from '../common/NavigationBar';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';

const user = {
  avatar: 'https://img.alicdn.com/bao/uploaded/i3/1905882464/TB2CXh1l5CYBuNkSnaVXXcMsVXa_!!1905882464.jpg',
  nickname: '夜袭寡妇村',
  residence: '广东省深圳市南山区'
};

export default class MyFollow extends Component {
  state = {
    dataList: [],
    actType: this.props.actType || '1'
  };

  componentDidMount() {
    this._doGetDataList();
  }

  _doGetDataList = async () => {
    let res = await api.getCollectList();
    if (res && res.success) {
      this.setState({
        dataList: res.data.list
      })
    }
  };

  _doAddFollow = (uid) => {
    api.addFollow(uid).then(res => {
      if (res && res.success) {
        alert('添加成功');
      }
    })
  };

  _doRemoveFollow = async (uid) => {
    let res = await api.removeFollow(uid);
    if (res && res.success) {
      this._doGetFollowList();
    }
  };

  render() {
    const { dataList, actType } = this.state;
    const { navigation } = this.props;
    const title = actType === '1' ? '我的收藏' : '我的点赞';
    const actName = actType === '1' ? '收藏' : '点赞';
    return (
      <View style={styles.wrapper}>
        <SafeAreaViewPlus style={{display: 'flex',}} topColor="#fff">
          <NavigationBar
            style={{backgroundColor: '#fff'}}
            leftButton={ViewUtil.getLeftBackButton(() => navigation.goBack(), '#333')}
            title={title}
            titleColor={'#333'}
          />
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.list}>
              {
                dataList.map((item) => {
                  const product = item.itemInfo;
                  return (
                    <View style={styles.item} key={item.id}>
                      <View style={styles.item_header}>
                        <View style={styles.side}>
                          <Image style={styles.avatar} source={{ uri: user.avatar }} />
                          <View>
                            <Text>{user.nickname}</Text>
                            <Text style={styles.desc}>{user.residence}</Text>
                          </View>
                        </View>
                        {/*<View style={styles.btn}>*/}
                        {/*<Text style={styles.btn_text} onPress={() => this._doRemoveFollow(user.id)}>已关注</Text>*/}
                        {/*</View>*/}
                      </View>
                      <View style={styles.item_body}>
                        <View style={{ marginBottom: 10 }}>
                          <Text>{product.title}</Text>
                        </View>
                        <View style={styles.img_list}>
                          {
                            product.imgs.map((img, index) => {
                              return (
                                <Image key={index} style={styles.img_item} source={{uri: 'http:' + img}}/>
                              )
                            })
                          }
                        </View>
                      </View>
                      <View style={styles.item_footer}>
                        <Text style={{ color: 'blue' }}>来自重庆</Text>
                        <View style={{
                          display: 'flex',
                          alignItems: 'center',
                          paddingVertical: 6,
                          paddingHorizontal: 8,
                          borderWidth: .5,
                          borderRadius: 2,
                          borderColor: theme.grayBorderColor,
                        }}>
                          <Text style={{
                            color: '#666',
                          }}>取消{actName}</Text>
                        </View>
                      </View>
                    </View>
                  )
                })
              }
            </View>
          </ScrollView>
        </SafeAreaViewPlus>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.grayBgColor
  },
  list: {
    margin: 10,
    marginTop: 0,
    flex: 1
  },
  item: {
    padding: 12,
    paddingBottom: 0,
    backgroundColor: '#fff',
    borderRadius: 4,
    marginTop: 10
  },
  item_header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: theme.grayBorderColor,
    borderBottomWidth: .5,
    paddingBottom: 10
  },
  item_body: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  img_list: {
    display: 'flex',
    flexDirection: 'row'
  },
  img_item: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 4
  },
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: .5,
    borderColor: '#ddd',
    borderRadius: 2
  },
  btn_text: {
    color: '#666',
    fontSize: 12
  },
  desc: {
    color: '#999',
    marginTop: 6,
    fontSize: 12
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 4,
  },
  side: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  item_footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: theme.grayBorderColor,
    borderTopWidth: .5,
    paddingVertical: 10,
  }
});