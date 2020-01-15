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

export default class UserXzProduct extends Component {
  state = {
    dataList: []
  };

  componentDidMount() {
    this._doGetDataList();
  }

  _doGetDataList = async () => {
    let res = await api.getUserXzProduct({
      pageIndex: 0,
      pageSize: 500
    });
    if (res && res.success) {
      this.setState({
        dataList: res.data.list
      })
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
            title={'我的发布'}
            titleColor={'#333'}
          />
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.list}>
              {
                dataList.map((item) => {
                  const product = item;
                  return (
                    <View style={styles.item} key={item.id}>
                      <View style={styles.item_header}>
                        <View style={styles.side}>
                          <Image style={styles.avatar} source={{ uri: 'http:' + product.imgs[0] }} />
                          <View style={{
                            flex: 1
                          }}>
                            <Text>{product.title}</Text>
                            <Text style={[styles.desc, {
                              fontSize: 16,
                              color: theme.primaryColor
                            }]}>{product.price / 100}</Text>
                            <View style={{
                              display: 'flex',
                              flexDirection: 'row',
                              marginTop: 4
                            }}>
                              <Text style={[styles.desc, {
                                marginRight: 10
                              }]}>留言32</Text>
                              <Text style={styles.desc}>留言100</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={styles.item_footer}>
                        <View style={styles.act_btn}>
                          <Text style={styles.grey_color_1}>下架</Text>
                        </View>
                        <View style={styles.act_btn}>
                          <Text style={styles.grey_color_1} onPress={() => {
                            this.props.navigation.push('AddXzProduct', {
                              xzProductId: product.id,
                              actType: '2'
                            })
                          }}>编辑</Text>
                        </View>
                        <View style={styles.act_btn}>
                          <Text style={styles.grey_color_1}>删除</Text>
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
  grey_color_1: {
    color: '#666'
  },
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
    width: 65,
    height: 65,
    marginRight: 10,
    borderRadius: 4,
  },
  side: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  item_footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // borderColor: theme.grayBorderColor,
    // borderTopWidth: .5,
    paddingVertical: 10,
  },
  act_btn: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: .5,
    borderRadius: 2,
    marginLeft: 10,
    borderColor: theme.grayBorderColor,
  }
});