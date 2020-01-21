import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback
} from 'react-native';
import api from '../api';
import ZeroData from '../bizCommon/ZeroData';
const window = Dimensions.get('window');
const g_width = window.width;
const g_height = window.height;

// 分类页面
export default class Welcome extends React.Component {
  state = {
    second: 0,
    categoryList: [],
    currentCategoryId: ''
  };

  componentDidMount() {
    api.getXzCategoryList().then(res => {
      if (res && res.success) {
        this.setState({
          categoryList: res.data.list,
          currentCategoryId: res.data.list[0].id
        })
      }
    })
  }

  _renderSide = () => {
    const { categoryList } = this.state;
    return (
      <View style={styles.category_list}>
        {
          categoryList.map((element, elementIndex) => {
            const cls = [styles.category_name];
            if (element.id === this.state.currentCategoryId) {
              cls.push(styles.category_name__active);
            }
            return (
              <View style={styles.category_item} key={elementIndex}>
                <Text style={cls} onPress={() => {
                  this.setState({
                    currentCategoryId: element.id
                  })
                }}>{element.name}</Text>
              </View>
            )
          })
        }
      </View>
    )
  };

  _renderMain = () => {
    const { currentCategoryId, categoryList } = this.state;
    const findIndex = categoryList.findIndex((element) => {
      return element.id === currentCategoryId
    });
    if (findIndex === -1) {
      return <ZeroData>000</ZeroData>
    }
    const children = categoryList[findIndex].children || [];
    if (!children.length) {
      return <ZeroData>000</ZeroData>
    }
    const renderItem = (element) => {
      return (
        <View key={element.id}>
          <Text style={[styles.brand_name, {
            paddingHorizontal: 12,
            paddingVertical: 16,
          }]}>{element.name}</Text>
          <View style={styles.brand_list}>
            {
              element.children.map(childEl => {
                return (
                  <View
                    style={styles.brand_item}
                    key={childEl.id}
                    onPress={() => {
                      alert(childEl.name);
                    }}
                  >
                    <TouchableWithoutFeedback onPress={() => {
                      this.props.navigation.push('XzProductList', {
                        params: {
                          search_tag: `${currentCategoryId}_${element.id}_${childEl.id}`
                        }
                      })
                    }}>
                      <View>
                        <Image style={styles.brand_logo} source={{ uri: 'http:' + childEl.logo }} />
                        <Text style={[styles.brand_name, {
                          color: '#666',
                          marginTop: 8
                        }]}>{childEl.name}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                )
              })
            }
          </View>
        </View>
      );
    };

    return (
      <View style={styles.brand_list}>
        {
          children.map((element) => {
            return renderItem(element);
          })
        }
      </View>
    )
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={{ height: 52 }} />
        <View style={styles.body}>
          <View style={styles.category_wrapper}>
            <ScrollView style={styles.category_scroll} showsVerticalScrollIndicator={false}>
              {this._renderSide()}
            </ScrollView>
          </View>
          <View style={styles.brand_wrapper}>
            <ScrollView style={styles.brand_scroll} showsVerticalScrollIndicator={false}>
              {this._renderMain()}
            </ScrollView>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex'
  },
  body: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  category_wrapper: {
    width: 90,
    display: 'flex',
  },
  brand_wrapper: {
    flex: 1
  },
  category_scroll: {
    flex: 1,
    backgroundColor: '#f6f6f6'
  },
  category_item: {},
  category_item__active: {},
  category_name: {
    fontSize: 14,
    height: 60,
    lineHeight: 60,
    textAlign: 'center'
  },
  category_name__active: {
    fontSize: 16,
    color: '#ff5722',
    fontWeight: 'bold',
    backgroundColor: '#fff'
  },
  brand_list: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 10
  },
  brand_item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginBottom: 10,
    width: 80
  },
  brand_logo: {
    width: 60,
    height: 60,
  }
});
