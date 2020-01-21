import React, {Component} from 'react';
import {Text, View, TextInput, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import { Toast, Provider } from '@ant-design/react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Storage from '../util/Storage';
import theme from '../res/style/theme';

/**
 * @description 登陆页面
 */
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '13249064450',
      password: '123456',
      isLogin: true,
      isRegister: false,
      userInfo: null,
      borderColor1: '#eff0f6',
      borderColor2: '#eff0f6',
      borderColor: '#eff0f6',
      borderColorHint: '#333'
    };
  }

  doLogin = () => {
    fetch('http://xz.airtlab.com/api/user/login/', {
        method: "POST", //请求方法
        body: `mobile=${this.state.mobile}&password=${this.state.password}`, //请求体
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(res => {
        console.log(res);
        Storage.setItem('userInfo', res.data);
        this.setState({userInfo: res.data});
        Toast.success('登录成功', 1, () => {
          this.props.navigation.goBack()
        });
      })
      .catch(error => {
        console.log(error)
        Toast.success('登录失败');
      })
  };

  handleSubmit = () => {
    this.doLogin()
  };

  render() {
    const { isLogin } = this.state;
    const { navigation } = this.props;
    const FormBox = (
      <View style={styles.formBox}>
        <View style={{...styles.inputItem, borderColor: this.state.borderColor1}}>
          <TextInput
            style={styles.input}
            onChangeText={(mobile) => this.setState({mobile})}
            value={this.state.mobile}
            placeholder="输入登录户名"
            onFocus={() => {this.setState({borderColor1: this.state.borderColorHint})}}
            onBlur={() => {this.setState({borderColor1: this.state.borderColor})}}
          />
        </View>
        <View style={{...styles.inputItem, borderColor: this.state.borderColor2}}>
          <TextInput style={{...styles.input}}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            placeholder="输入登录密码"
            secureTextEntry={true}
            onFocus={() => {this.setState({borderColor2: this.state.borderColorHint})}}
            onBlur={() => {this.setState({borderColor2: this.state.borderColor})}}/>
        </View>
        <View style={{marginTop: 20}}>
          <TouchableWithoutFeedback onPress={() => this.handleSubmit()}>
            <Text style={styles.loginBtn}>{isLogin ? '立即登录' : '立即注册'}</Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.bwtWrapper}>
          <View style={styles.tipWrapper}>
            <Text>{isLogin ? '没有账户？' : '已有账户？'}</Text>
            <TouchableWithoutFeedback onPress={() => {this.setState({isLogin: !isLogin})}}>
              <Text style={{ color: '#07c160'}}>{isLogin ? '注册' : '登录'}</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
    return (
      <Provider>
        <View style={styles.container}>
          <AntDesign style={styles.btn_close} name="close" size={30}
            onPress={()=>navigation.goBack()}
          />
          <View style={styles.cardBox}>
            <Image style={styles.logo}
              source={{ uri: 'http://s1.huishoubao.com/web/hsbh5/static/img/signin_img_logo@2x.5d329ba.png'}}
            />
          </View>
          { FormBox }
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  btn_close: {
    zIndex: 5,
    position: 'absolute',
    right: 10,
    top: 50,
    color: '#fff',
    width: 40,
    height: 40
  },
  cardBox: {
    display: 'flex',
    alignItems: 'center',
    height: 240,
    backgroundColor: theme.primaryColor
  },
  logo: {
    width: 98,
    height: 98,
    borderRadius: 49,
    marginTop: 60
  },
  formBox: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginTop: -50,
    marginHorizontal: 18,
    backgroundColor: '#fff',
    borderRadius: 8
  },
  inputItem: {
    paddingLeft: 0,
    paddingRight: 0,
    marginBottom: 20,
    borderBottomWidth: 1
  },
  input: {
    height: 44,
    paddingVertical: 4
  },
  loginBtn: {
    fontSize: 16,
    height: 44,
    lineHeight: 44,
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#fe5b44'
  },
  tipWrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  bwtWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12
  }
})