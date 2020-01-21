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

/**
 * @description 我的地址
 * actType = 1 查看地址
 * actType = 2 选择地址
 */
export default class MyFollow extends Component {
  state = {
    dataList: [],
    actType: this.props.actType || '1'
  };

  componentDidMount() {
    this._doGetDataList();
  }

  _doGetDataList = async () => {
    let res = await api.getMyAddress();
    if (res && res.success) {
      this.setState({
        dataList: res.data.list
      })
    }
  };

  _handleDelete = (addressId) => {
    api.removeAddress(addressId).then(res => {
      if (res && res.success) {
        this._doGetDataList();
      }
    })
  };

  _handleEdit = (address) => {
    this.props.navigation.push('EditAddress', {
      ...address,
      actType: '2'
    })
  };

  render() {
    const { dataList, actType } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.wrapper}>
        <SafeAreaViewPlus style={{display: 'flex',}} topColor="#fff">
          <NavigationBar
            style={{backgroundColor: '#fff'}}
            leftButton={ViewUtil.getLeftBackButton(() => navigation.goBack(), '#333')}
            title={'我的地址'}
            titleColor={'#333'}
          />
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.list}>
              {
                dataList.map((item) => {
                  return (
                    <View style={styles.item} key={item.id}>
                      <View style={styles.item_header}>
                        <View style={styles.side}>
                          <Text style={styles.title}>
                            <Text>{item.username}&nbsp;&nbsp;{item.mobile}</Text>
                          </Text>
                          <View style={styles.tag}>
                            <Text style={styles.tag_text}>公司</Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.item_body}>
                        <View style={{ marginBottom: 10 }}>
                          <Text>{item.province+item.city+item.district+item.address}</Text>
                        </View>
                      </View>
                      <View style={styles.item_footer}>
                        <View style={styles.act_btn}>
                          <Text onPress={() => this._handleEdit(item)} style={styles.act_btn_text}>编辑</Text>
                        </View>
                        <View style={styles.act_btn}>
                          <Text onPress={() => this._handleDelete(item.id)} style={styles.act_btn_text}>删除</Text>
                        </View>
                      </View>
                    </View>
                  )
                })
              }
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <Text style={styles.footer_text} onPress={() => navigation.navigate('EditAddress')}>
              <Text>新增地址</Text>
            </Text>
          </View>
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
  title: {
    fontSize: 16
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginLeft: 10,
    backgroundColor: '#07c160'
  },
  tag_text: {
    fontSize: 10,
    color: '#fff'
  },
  item_body: {
    paddingTop: 10,
    paddingBottom: 10,
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
    justifyContent: 'flex-end',
    borderColor: theme.grayBorderColor,
    borderTopWidth: .5,
    paddingVertical: 10,
  },
  act_btn: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: .5,
    borderRadius: 2,
    borderColor: theme.grayBorderColor,
    marginLeft: 12
  },
  act_btn_text: {
    color: '#666'
  },
  footer: {
    backgroundColor: theme.primaryColor,
    marginBottom: 30,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 12,
    borderRadius: 4
  },
  footer_text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  }
});