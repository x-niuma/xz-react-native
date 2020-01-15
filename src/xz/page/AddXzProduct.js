import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  PermissionsAndroid
} from 'react-native';
import {
  Picker,
  List,
  Provider,
} from '@ant-design/react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';

import api from '../api';
import theme from '../res/style/theme';
import ViewUtil from '../util/ViewUtil';
import NavigationBar from '../common/NavigationBar';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';

/**
 * @description 闲置宝贝编辑
 * @param actType 编辑类型 actType = 1 为新增 actType
 */
export default class AddXzProduct extends Component {
  state = {
    actType: this.props.navigation.state.params ? (this.props.navigation.state.params.actType || '1') : '1',
    title: '',
    price: '',
    description: '',
    depreciation: '',
    category: [],
    city: [],
    cityValue: [],
    cityLabel: '',
    files: [],
    xzCategoryList: [],
    xzCategoryValue: [],
    xzCategoryLabel: ''
  };

  async componentDidMount() {
    await this._doGetSfCity();
    await this._doGetXzCategoryList();
    await this._getXzProductInfo();
    if (Platform.OS === 'android') {
      await this.requestCameraPermission();
    }
  }

  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          'title': '需要访问相册',
          'message': '需要访问相册',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({granted: true,})
      } else {
        this.setState({granted: false,})
      }
    } catch (err) {
      console.warn(err)
    }
  }

  _doGetXzCategoryList = () => {
    return api.getXzCategoryList().then(res => {
      if (res && res.success) {
        let list = JSON.stringify(res.data.list);
        list = list.replace(/id/g, 'value').replace(/name/g, 'label');
        list = JSON.parse(list);
        this.setState({xzCategoryList: list})
      }
    });
  };

  _getXzProductInfo = () => {
    if (this.state.actType === '2') {
      const { xzProductId } = this.props.navigation.state.params;
      return api.getXzProductDetail(xzProductId).then(res => {
        if (res && res.success) {
          const info = res.data;
          const imgs = info.imgs.map(item => {
            return { data: 'http:' + item};
          });
          this.setState({
            title: info.title,
            price: info.price,
            description: info.description,
            depreciation: +info.depreciation,
            files: imgs
          });
          this.onChange([info.province_code, info.city_code, info.district_code]);
          this._onXzCategoryChange([info.category_id, info.brand_id, info.sku_id]);
        }
      });
    }
  };

  _doGetSfCity = () => {
    return api.getSfCity().then(res => {
      if (res && res.success) {
        let list = JSON.stringify(res.data.list);
        list = list.replace(/areaId/g, 'value').replace(/areaName/g, 'label');
        list = JSON.parse(list);
        this.setState({sfCity: list})
      }
    })
  };

  _getLabelByValue = (values, oriList) => {
    const picker = [];
    const find = (index, list) => {
      list.forEach((element) => {
        if (`${element.value}` === `${values[index]}`) {
          picker.push(element);
          if (picker.length < values.length) {
            find(index + 1, element.children || []);
          }
        }
      })
    };
    find(0, oriList);
    return picker;
  };

  _handleSubmit = () => {
    const {state} = this;
    if (!state.cityValue.length) return alert('选择城市');
    if (!state.xzCategoryValue.length) return alert('选择分类');
    const form = {
      title: state.title,
      price: state.price,
      description: state.description,
      depreciation: state.depreciation,
      imgs: JSON.stringify([
        '//img.alicdn.com/bao/uploaded/i2/O1CN01Lqzd271pR5pIkYLO4_!!0-fleamarket.jpg',
        '//img.alicdn.com/bao/uploaded/i2/O1CN01CI5RaL1wOzJiU1OTC_!!0-fleamarket.jpg'
      ]),
      province: state.cityValue[0].label,
      provinceCode: state.cityValue[0].value,
      city: state.cityValue[1].label,
      cityCode: state.cityValue[1].value,
      district: state.cityValue[2] ? state.cityValue[2].label : '',
      districtCode: state.cityValue[2] ? state.cityValue[2].value : '',
      categoryId: state.xzCategoryValue[0].value,
      categoryName: state.xzCategoryValue[0].label,
      brandId: state.xzCategoryValue[1].value,
      brandName: state.xzCategoryValue[1].label,
      skuId: state.xzCategoryValue[2].value,
      skuName: state.xzCategoryValue[2].label,
    };

    if (this.state.actType === '1') {
      return api.addXzProduct(form).then(res => {
        if (res && res.success) {
          alert('发布成功');
        }
      })
    }
    if (this.state.actType === '2') {
      const { xzProductId } = this.props.navigation.state.params;
      api.updateXzProduct(xzProductId, form).then(res => {
        if (res && res.success) {
          alert('更新成功');
        }
      })
    }
  };

  /**
   * @param value
   * @private
   */
  _onXzCategoryChange = (value) => {
    const oriList = this.state.xzCategoryList;
    const valueList = this._getLabelByValue(value, oriList);
    this.setState({
      xzCategoryValue: valueList,
      xzCategoryLabel: valueList.map(item => item.label).join('')
    });
  };

  /**
   * @param value
   */
  onChange = (value) => {
    const oriCityList = this.state.sfCity;
    const cityValue = this._getLabelByValue(value, oriCityList);
    this.setState({
      cityValue,
      cityLabel: cityValue.map(item => item.label).join('')
    });
  };

  onChangeText = (key, value) => {
    this.setState({[key]: value})
  };

  _handleChoose = () => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const files = this.state.files;
        files.push({
          url: response.uri,
          data: 'data:image/jpeg;base64,' + response.data
        });
        // const source = { uri: response.uri };
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          files: files,
        });
      }
    });
  };

  render() {
    const { cityLabel } = this.state;
    const { navigation } = this.props;
    return (
      <Provider style={styles.wrapper}>
        <SafeAreaViewPlus style={{display: 'flex',}} topColor="#fff">
          <NavigationBar
            style={{backgroundColor: '#fff'}}
            leftButton={ViewUtil.getLeftBackButton(() => navigation.goBack(), '#333')}
            title={'发布闲置'}
            titleColor={'#333'}
          />
          <ScrollView style={{flex: 1}}>
            <View style={{
              margin: 12,
              marginTop: 0,
              marginRight: 0
            }}>
              <TextInput
                style={styles.input}
                onChangeText={text => this.onChangeText('title', text)}
                value={this.state.title}
                placeholder='标题标题(搜索关键词)'
              />
              <TextInput
                style={styles.input}
                onChangeText={text => this.onChangeText('description', text)}
                value={this.state.description}
                placeholder='宝贝描述(入手渠道使用感受等)'
              />
              <TextInput
                style={styles.input}
                onChangeText={text => this.onChangeText('price', text)}
                value={`${this.state.price}`}
                placeholder='宝贝价格(单位为元)'
              />
              <TextInput
                style={[styles.input, {marginBottom: -12}]}
                keyboardType="phone-pad"
                onChangeText={text => this.onChangeText('depreciation', text)}
                value={`${this.state.depreciation}`}
                placeholder='新旧程度(例如 88新)'
              />
            </View>
            <Picker
              onOk={this.onChange}
              value={this.state.value}
              data={this.state.sfCity}
              cols={3}
              cascade={true}
              extra={<Text/>}
            >
              <List.Item style={{
                height: 50,
                marginLeft: -4,
              }} arrow="horizontal">
                {
                  cityLabel ? cityLabel : (
                    <Text style={{
                      fontSize: 15,
                      color: '#c2c3c3',
                    }}>宝贝所在城市</Text>
                  )
                }
              </List.Item>
            </Picker>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              padding: 16
            }}>
              {
                this.state.files.map((item, index) => {
                  return (
                    <View style={styles.img_item} key={index}>
                      <Image source={{uri: item.data}} style={styles.img_item_img}/>
                      <View style={{
                        position: 'absolute',
                        right: 4,
                        top: 4,
                      }}>
                        <AntDesign onPress={() => {
                          this.state.files.splice(index, 1);
                          this.setState({
                            files: this.state.files
                          })
                        }} size={16} name="closecircle" color="#ddd"/>
                      </View>
                    </View>
                  )
                })
              }
              <View
                style={[styles.img_item, {
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }]}
              >
                <Text onPress={this._handleChoose}>
                  <MaterialIcons size={36} name="add" color="#666"/>
                </Text>
              </View>
            </View>
            <Picker
              onOk={this._onXzCategoryChange}
              value={this.state.xzCategoryValue}
              data={this.state.xzCategoryList}
              cols={3}
              cascade={true}
              extra={<Text/>}
            >
              <List.Item style={{
                height: 50,
                marginLeft: -4,
              }} arrow="horizontal">
                {
                  this.state.xzCategoryLabel ? this.state.xzCategoryLabel : (
                    <Text style={{
                      fontSize: 15,
                      color: '#c2c3c3',
                    }}>宝贝所在城市</Text>
                  )
                }
              </List.Item>
            </Picker>
          </ScrollView>
          <TouchableOpacity style={styles.footer} onPress={this._handleSubmit}>
            <Text style={styles.footer_btn} >提交保存</Text>
          </TouchableOpacity>
        </SafeAreaViewPlus>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.grayBgColor
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderBottomWidth: .5,
    paddingHorizontal: 10,
    paddingLeft: 0
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
  footer_btn: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  img_item: {
    position: 'relative',
    width: 85,
    height: 85,
    borderColor: '#ccc',
    borderWidth: .5,
    marginRight: 8,
    marginBottom: 8
  },
  img_item_img: {
    width: 85,
    height: 85,
  }
});