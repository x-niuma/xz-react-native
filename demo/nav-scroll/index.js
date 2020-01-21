import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native'
import NavPage from "./Nav";
import ListView from 'deprecated-react-native-listview';
const {width} = Dimensions.get('window');

/**
 * @description 滚动渐变
 */
export default class TestMyNav extends Component<{}> {
  constructor(props) {
    super(props);
    this.navBar = null;
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  renderRow = (rowData, sectionId, rowId) => {
    return (
      <View
        style={{height: 100, justifyContent: 'center', borderWidth: 1, borderColor: 'red'}}
        key={rowId}>
        <Text style={{marginHorizontal: 10}}>{`这时第：${rowId}行`}</Text>
      </View>
    )
  };

  renderHeader = () => {
    return (
      <View>
        <Image
          style={{height: 200, width: width}}
          source={{uri: 'https://upload.jianshu.io/users/upload_avatars/2174847/35584aef-dcac-46c0-9280-67a3b1ebb2c9.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96'}}
          resizeMode={'cover'}
        />
      </View>
    )
  };

  _onScroll(event) {
    let y = event.nativeEvent.contentOffset.y;
    let opacityPercent = y / 200;
    if (y < 200) {
      this.navBar.setNativeProps({
        style: {opacity: opacityPercent}
      })
    } else {
      this.navBar.setNativeProps({
        style: {opacity: 1}
      })
    }
  }

  render() {
    let dataSource = this.state.dataSource.cloneWithRows([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    return (
      <View style={styles.container}>
        <View style={styles.TopShadowArea} />
        <View
          ref={ref => this.navBar = ref}
          style={[styles.navBar, {opacity: 1}]}>
          <NavPage title={'详情页'}/>
        </View>
        <ListView
          onScroll={this._onScroll.bind(this)}
          bounces={false}
          dataSource={dataSource}
          renderRow={this.renderRow}
          renderHeader={this.renderHeader}/>
        <View
          ref={ref => this.navBar = ref}
          style={[styles.navBar, {opacity: 1}]}>
          <NavPage title={'详情页'}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  navBar: {
    marginTop: 20,
    height: 44,
    width: width,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  navContent: {
    height: 44,
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  searchBar: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    flex: 1,
    height: 25,
    backgroundColor: 'white',
    marginHorizontal: 15
  }
});