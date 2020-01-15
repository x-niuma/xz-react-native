import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Platform, Dimensions} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

/**
 * 自定义导航栏
 */
let height = (Platform.OS === 'ios' ? 20 : 0) + 90;

export default class NavPage extends Component {

  static defaultProps = {
    title: 'title',
  };

  render() {
    let {title} = this.props;
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.back_btn} onPress={() => {alert('返回')}}>
            <AntDesign name="left" size={22}/>
            <Text style={{ fontSize: 14, marginTop: -2 }}>返回</Text>
          </TouchableOpacity>

          <View style={{alignItems: 'center', flex: 1}}>
            <Text style={{ fontSize: 17}}>{title}</Text>
          </View>

          <TouchableOpacity style={styles.right_btn} onPress={() => {
            alert('更多')
          }}>
            <Text>更多{height}</Text>
            {/*<Image style={[styles.icon, {width: 25, height: 5}]} source={require('./more.png')}/>*/}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: 44,
    width: window.width,
    backgroundColor: 'blue'
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: height,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    paddingHorizontal: 10,
    position: 'absolute',
  },
  icon: {
    width: 21,
    height: 21,
    color: "white",
  },
  right_btn: {
    width: 50,
    height: 30,
  },
  back_btn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 50,
    paddingLeft: 10
  }
});