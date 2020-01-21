import React, {Component} from 'react';
import { StyleSheet, View, Text, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { MapView } from 'react-native-amap3d';
import AMap from '../api/amap';
import theme from '../res/style/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class CarDetailsPage extends Component {
  state = {
    located: false,
    latitude: 39.91095,
    longitude: 116.37296,
    locationEnabled: false,
    tips: [],
    searchMode: false,
    chooseAddress: null
  };

  componentDidMount() {}

  _doSearch = () => {
    AMap.inputTip({
      location: `${this.state.longitude},${this.state.latitude}`,
      // keywords: '肯'
    }).then(res => {
      if (res) {
        this.setState({
          tips: res.tips
        })
      }
    })
  };

   _goBack = () => {
    this.props.navigation.goBack();
  };

  _toggleLocate = () => {
    this.setState({
      locationEnabled: !this.state.locationEnabled
    })
  };

  _handleLocation = ({ nativeEvent }) => {
    this.setState({
      located: true,
      latitude: nativeEvent.latitude,
      longitude: nativeEvent.longitude
    }, this._doSearch)
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.fix_header}>
          <TouchableOpacity onPress={this._goBack} style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <AntDesign name="left" size={20} color="#ccc"/>
            <Text style={{ color: "#ccc" }}>返回</Text>
          </TouchableOpacity>
          <View style={{width: 10}}/>
          <Text style={{ color: "#ccc" }}>搜索您要去的地方</Text>
        </View>
        {/*<View style={styles.tip_list}>*/}
          {/*{*/}
            {/*this.state.tips.map((item, index) => {*/}
              {/*return <View key={index} style={item.tip_item}>*/}
                {/*<Text style={{*/}
                  {/*lineHeight: 32*/}
                {/*}}*/}
                {/*onPress={() => {*/}
                  {/*if(!item.location) {*/}
                    {/*return;*/}
                  {/*}*/}
                  {/*const location = item.location.split(',');*/}
                  {/*if (location.length) {*/}
                    {/*this.setState({*/}
                      {/*longitude: location[0],*/}
                      {/*latitude: location[1],*/}
                    {/*})*/}
                  {/*}*/}
                {/*}}*/}
                {/*>{item.name}</Text>*/}
              {/*</View>*/}
            {/*})*/}
          {/*}*/}
        {/*</View>*/}
        <View style={styles.fix_locate}>
          <Text style={{color: 'red'}} onPress={this._toggleLocate}>
            {this.state.locationEnabled ? '关闭定位' : '开启定位'}
          </Text>
        </View>
        <MapView
          onPress={({nativeEvent}) => {
            AMap.decodeAddress({
              location: `${nativeEvent.longitude},${nativeEvent.latitude}`
            }).then(res => {
              this.setState({
                chooseAddress: res
              })
            })
          }}
          style={{...StyleSheet.absoluteFill}}
          locationEnabled={this.state.locationEnabled}
          onLocation={this._handleLocation}
          coordinate={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
          }}
        >
          {
            this.state.tips.map((item, index) => {
              if (!item.location || typeof item.location !== 'string') {
                return null;
              }
              const l = item.location.split(',');
              return (
                <MapView.Marker
                  key={index}
                  draggable
                  title={item.name}
                  coordinate={{
                    latitude: l[1],
                    longitude: l[0],
                  }}
                />
              )
            })
          }
        </MapView>
        {
          this.state.chooseAddress ? (
            <View style={styles.address}>
              <Text style={styles.address_box}>{this.state.chooseAddress.regeocode.formatted_address}</Text>
              <View style={styles.address_btn}>
                <Text style={styles.address_btn_text}>使用</Text>
              </View>
            </View>
          ) : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  address: {
    zIndex: 2,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 40,
    padding: 10,
    marginHorizontal: 12,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  address_box: {
    width: 300,
    lineHeight: 24,
  },
  address_btn: {
    paddingHorizontal: 8,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: theme.primaryColor
  },
  address_btn_text: {
    color: '#fff',
    lineHeight: 24,
    fontSize: 12
  },
  tip_list: {
    position: 'absolute',
    top: 100,
    zIndex: 2,
    width: deviceWidth - 24,
    marginHorizontal: 12,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff'
  },
  tip_item: {
    lineHeight: 34
  },
  fix_locate: {
    zIndex: 2,
    position: 'absolute',
    left: 12,
    top: 100,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderColor: 'red',
    borderWidth: .5,
    color: 'red'
  },
  fix_header: {
    position: 'absolute',
    zIndex: 2,
    top: 44,
    height: 44,
    width: deviceWidth - 24,
    marginHorizontal: 12,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4
  }
});