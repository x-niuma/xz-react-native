import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Picker,
  List,
  Provider
} from '@ant-design/react-native';

import api from '../api';
import theme from '../res/style/theme';
import ViewUtil from '../util/ViewUtil';
import NavigationBar from '../common/NavigationBar';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';

/**
 * @description 编辑地址
 * @param actType 编辑类型 actType = 1 为新增 actType
 */
export default class EditAddress extends Component {
  state = {
    username: '',
    mobile: '',
    address: '',
    sfCity: [],
    value: [],
    cityValue: [],
    cityLabel: '',
    actType: (this.props.navigation.state.params || {}).actType || '1',
    addrInfo: this.props.navigation.state.params
  };

  async componentDidMount() {
    await this._doGetSfCity();
    this._getAddressInfo()
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

  _doGetSfCity = () => {
    return api.getSfCity().then(res => {
      if (res && res.success) {
        let list = JSON.stringify(res.data.list);
        list = list.replace(/areaId/g, 'value').replace(/areaName/g, 'label');
        list = JSON.parse(list);
        console.log(list);
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

  render() {
    const { cityLabel } = this.state;
    const { navigation } = this.props;
    return (
      <Provider style={styles.wrapper}>
        <SafeAreaViewPlus style={{display: 'flex',}} topColor="#fff">
          <NavigationBar
            style={{backgroundColor: '#fff'}}
            leftButton={ViewUtil.getLeftBackButton(() => navigation.goBack(), '#333')}
            title={'编辑地址'}
            titleColor={'#333'}
          />
          <ScrollView style={{
            flex: 1
          }}>
            <Picker
              onOk={this.onChange}
              value={this.state.value}
              data={this.state.sfCity} cols={3} cascade={true}
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
                    }}>选择省市区</Text>
                  )
                }
              </List.Item>
            </Picker>
            <View style={{
              margin: 12,
              marginTop: 0,
              marginRight: 0
            }}>

              <TextInput
                style={styles.input}
                onChangeText={text => this.onChangeText('username', text)}
                value={this.state.username}
                placeholder='收件人姓名(2个以上字符)'
              />
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                onChangeText={text => this.onChangeText('mobile', text)}
                value={this.state.mobile}
                placeholder='收件人手机号码'
              />
              <TextInput
                style={styles.input}
                onChangeText={text => this.onChangeText('address', text)}
                value={this.state.address}
                placeholder='小区详细地址(5个以上字符)'
              />
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
  }
});