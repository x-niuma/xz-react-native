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

export default class MyFollow extends Component {
  state = {
    dataList: []
  };

  componentDidMount() {
    this._doGetFollowList();
  }

  _doGetFollowList = () => {
    api.getMyFollow().then(res => {
      if (res && res.success) {
        const { list } = res.data;
        this.setState({
          dataList: list
        })
      }
    })
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
    const { dataList } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.wrapper}>
        <SafeAreaViewPlus style={{display: 'flex',}} topColor="#fff">
          <NavigationBar
            style={{backgroundColor: '#fff'}}
            leftButton={ViewUtil.getLeftBackButton(() => navigation.goBack(), '#333')}
            title={'我的关注'}
            titleColor={'#333'}
          />
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.list}>
              {
                dataList.map((item) => {
                  const user = item.userInfo || {};
                  return (
                    <View style={styles.item} key={item.id}>
                      <View style={styles.side}>
                        <Image style={styles.avatar} source={{ uri: user.avatar }} />
                        <View>
                          <Text>{user.nickname}</Text>
                          <Text style={styles.desc}>{user.residence}</Text>
                        </View>
                      </View>
                      <View style={styles.btn}>
                        <Text style={styles.btn_text} onPress={() => this._doRemoveFollow(user.id)}>已关注</Text>
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    marginTop: 10
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
    width: 45,
    height: 45,
    marginRight: 10,
    borderRadius: 4,
  },
  side: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});