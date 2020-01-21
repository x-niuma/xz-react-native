import React, {Component} from 'react';
import { StyleSheet, View, Text, TextInput, Dimensions } from 'react-native';
import { MapView } from 'react-native-amap3d';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class CarDetailsPage extends Component {
  state = {
    located: false,
    latitude: 39.91095,
    longitude: 116.37296
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.fix_header}>
          <Text style={{color: '#ccc'}}>
            <Text>返回</Text>
            <View style={{width: 10}}/>
            <Text>搜索您要去的地方</Text>
          </Text>
        </View>
        <MapView
          style={{...StyleSheet.absoluteFill}}
          locationEnabled
          onLocation={({ nativeEvent }) => {
            if (this.state.located) {
              this.setState({
                located: true,
                latitude: nativeEvent.latitude,
                longitude: nativeEvent.longitude
              })
            }
          }}
           coordinate={{
             latitude: this.state.latitude,
             longitude: this.state.longitude,
           }}
        >
           <MapView.Marker
             draggable
             title='这是一个可拖拽的标记'
             onDragEnd={({ nativeEvent }) => {
               console.log(`${nativeEvent.latitude}, ${nativeEvent.longitude}`)
             }}
             coordinate={{
               latitude: 39.91095,
               longitude: 116.37296,
             }}
           />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
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