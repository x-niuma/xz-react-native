import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';

import api from '../api';
import theme from '../res/style/theme';
import ViewUtil from '../util/ViewUtil';
import NavigationBar from '../common/NavigationBar';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';

export default class MyPoint extends Component {
  state = {
    dataList: []
  };

  componentDidMount() {
    this._doGetDateList();
  }

  _doGetDateList = () => {
    api.getPointInfo().then(res => {
      if (res && res.success) {
        const { list } = res.data;
        this.setState({
          dataList: list
        })
      }
    })
  };

  render() {
    const { dataList } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.wrapper}>
        <SafeAreaViewPlus style={{display: 'flex',}} topColor="#fcdb00">
          <NavigationBar
            style={{backgroundColor: '#fcdb00'}}
            leftButton={ViewUtil.getLeftBackButton(() => navigation.goBack(), '#333')}
            title={'我的积分'}
            titleColor={'#333'}
          />
          <ScrollView style={{ flex: 1 }}>
            <View style={{
              height: 150,
              backgroundColor: '#fcdb00'
            }}>
              <Text style={{
                fontSize: 20,
                textAlign: 'center',
                marginTop: 40
              }}>当前积分余额</Text>
              <Text style={{
                fontSize: 40,
                textAlign: 'center',
                marginTop: 20
              }}>110.00</Text>
            </View>
            <View style={styles.list}>
              {
                dataList.map((item) => {
                  return (
                    <View style={styles.item} key={item.id}>
                      <View style={styles.side}>
                        <Text>{item.createTime}</Text>
                        <Text style={styles.desc}>{item.description}</Text>
                      </View>
                      <View style={styles.btn}>
                        <Text style={styles.btn_text}>+{item.value}</Text>
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
  btn_text: {
    color: '#f44',
    fontSize: 16
  },
  desc: {
    color: '#999',
    marginTop: 6,
    fontSize: 12
  },
  side: {
    flex: 1,
    display: 'flex',
  }
});