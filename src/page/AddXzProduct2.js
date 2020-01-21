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
  ImagePicker as ImagePicker2
} from '@ant-design/react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ImagePicker from 'react-native-image-crop-picker';
import ImagePicker3 from 'react-native-image-picker';

// console.log(222, ImagePicker2);

import api from '../api';
import theme from '../res/style/theme';
import ViewUtil from '../util/ViewUtil';
import NavigationBar from '../common/NavigationBar';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';

/**
 * @description 编辑地址
 * @param actType 编辑类型 actType = 1 为新增 actType
 */
export default class AddXzProduct extends Component {
  state = {
    title: '',
    price: '',
    description: '',
    depreciation: '',
    category: [],
    city: [],
    cityValue: [],
    cityLabel: '',
    actType: (this.props.navigation.state.params || {}).actType || '1',
    addrInfo: this.props.navigation.state.params,
    files: [
      {
        url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
        id: '2121',
      },
      {
        url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
        id: '2122',
      },
      {
        url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
        id: '2123',
      },
      {
        url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
        id: '2124',
      },
      {
        url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
        id: '2125',
      },
      {
        url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
        id: '2126',
      },
    ],
    files2: [],
    files3: []
  };

  async componentDidMount() {
    await this._doGetSfCity();
    this._getAddressInfo();
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
        this.setState({
          granted: true,
        })
      } else {
        this.setState({
          granted: false,
        })
      }
    } catch (err) {
      console.warn(err)
    }
  }

  _getAddressInfo = () => {
    if (this.state.actType === '2') {
      const { addrInfo } = this.state;
      this.setState({
        username: addrInfo.username,
        mobile: addrInfo.mobile,
        address: addrInfo.address,
      });
      this.onChange([addrInfo.province_code, addrInfo.city_code, addrInfo.district_code]);
    }
  };

  handleFileChange = (files) => {
    this.setState({
      files,
    });
  };

  handleFile2Change = (files2) => {
    this.setState({
      files2,
    });
  };

  _doGetSfCity = () => {
    return api.getSfCity().then(res => {
      if (res && res.success) {
        let list = JSON.stringify(res.data.list);
        list = list.replace(/areaId/g, 'value').replace(/areaName/g, 'label');
        list = JSON.parse(list);
        this.setState({
          sfCity: list
        })
      }
    })
  };

  _getLabelByValue = (value) => {
    const values = value;
    const picker = [];
    const oriCityList = this.state.sfCity;
    const find = (index, list) => {
      list.forEach((element) => {
        if (element.value === values[index]) {
          picker.push(element);
          if (picker.length < values.length) {
            find(index + 1, element.children || []);
          }
        }
      })
    };
    find(0, oriCityList);
    return picker;
  };

  _handleSubmit = () => {
    const {state} = this;
    const form = {
      address: state.address,
      mobile: state.mobile,
      username: state.username,
      city: state.cityValue[0].label,
      province: state.cityValue[1].label,
      district: state.cityValue[2] ? state.cityValue[2].label : '',
      zip: 7000,
      provinceCode: state.cityValue[0].value,
      cityCode: state.cityValue[1].value,
      districtCode: state.cityValue[2] ? state.cityValue[2].value : '',
    };
    if (this.state.actType === '1') {
      return api.addAddress(form).then(res => {
        if (res && res.success) {
          alert('新增地址成功');
        }
      })
    }
    form.id = this.state.addrInfo.id;
    api.updateAddress(form).then(res => {
      if (res && res.success) {
        alert('更新地址成功');
      }
    })
  };

  onChange = (value) => {
    const cityValue = this._getLabelByValue(value);
    this.setState({
      cityValue,
      cityLabel: cityValue.map(item => item.label).join('')
    });
  };

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    })
  };

  _handleChoose = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
    });
  };

  _handleChoose3 = () => {
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
    ImagePicker3.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const files = this.state.files3;
        files.push({
          url: response.uri,
          data: 'data:image/jpeg;base64,' + response.data
        });
        console.log(response);
        // const source = { uri: response.uri };
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          files3: files,
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
          <ScrollView style={{
            flex: 1
          }}>

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
                keyboardType="phone-pad"
                onChangeText={text => this.onChangeText('price', text)}
                value={this.state.d}
                placeholder='宝贝价格(单位为元)'
              />
              <TextInput
                style={[styles.input, {
                  marginBottom: -12
                }]}
                keyboardType="phone-pad"
                onChangeText={text => this.onChangeText('depreciation', text)}
                value={this.state.depreciation}
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
                this.state.files3.map((item, index) => {
                  return (
                    <View style={styles.img_item} key={index}>
                      <Image source={{uri: item.data}} style={styles.img_item_img}/>
                      <View style={{
                        position: 'absolute',
                        right: 4,
                        top: 4,
                      }}>
                        <AntDesign onPress={() => {
                          this.state.files3.splice(index, 1);
                          this.setState({
                            files3: this.state.files3
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
                <Text onPress={this._handleChoose3}>
                  <MaterialIcons size={36} name="add" color="#666"/>
                </Text>
              </View>
            </View>
            <Text onPress={this._handleChoose}>选择图片</Text>
            <Text onPress={this._handleChoose3}>选择图片</Text>
            <View>
              {
                (Platform.OS === 'android' && !this.state.granted) ? (
                  <Text>需要访问相册的权限</Text>
                ) : (
                  <View style={{ marginTop: 20, marginLeft: 20 }}>
                    <ImagePicker2
                      onChange={this.handleFileChange}
                      files={this.state.files}
                    />
                    {/*<ImagePicker2*/}
                    {/*onChange={this.handleFile2Change}*/}
                    {/*files={this.state.files2}*/}
                    {/*/>*/}
                  </View>
                )
              }
            </View>
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