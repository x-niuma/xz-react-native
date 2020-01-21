import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback
} from 'react-native';

import Util from '../util/Util';
import ZeroData from '../bizCommon/ZeroData';
const g_width = Util.gWidth;

export default class Home extends React.Component {
  state = {
    xzProductList: [],
    currentCategoryId: '',
    pageSize: 10,
    pageIndex: 0,
    hasMore: true,
    loading: false
  };

  _handleToDetail = (item) => {
    this.props.navigation.push('XzProduct', {
      productId: item.id
    })
  };

  _renderXzProductList = () => {
    const { xzProductList } = this.props;
    const Loading = <Text>加载中...</Text>;
    if (!xzProductList.length) {
      return <ZeroData />;
    }
    return (
      <View style={styles.xzProductList}>
        {
          xzProductList.map((item, index) => {
            const stl = [styles.xzProductItem];
            if (index%2 === 0) stl.push({ marginRight: 12 });
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => this._handleToDetail(item)}
              >
                <View style={stl}>
                  <Image style={styles.xzProductLogo} source={{uri: 'http:' + item.imgs[0]}}/>
                  <Text style={styles.xzProductDesc} numberOfLines={2}>{item.description}</Text>
                </View>
              </TouchableWithoutFeedback>
            )
          })
        }
        {this.props.loading ? Loading : null}
      </View>
    )
  };

  render() {
    return (
      <View>
        {this._renderXzProductList()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  xzProductList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5'
  },
  xzProductItem: {
    width: (g_width-36)/2,
    height: 250,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8
  },
  xzProductLogo: {
    width: ((g_width-36)/2),
    height: ((g_width-36)/2),
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  xzProductName: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    paddingHorizontal: 6
  },
  xzProductDesc: {
    fontSize: 14,
    marginTop: 4,
    lineHeight: 20,
    paddingHorizontal: 6
  }
});
