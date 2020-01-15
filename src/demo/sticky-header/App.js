import React, {Component} from 'react';
import {Animated, FlatList, Text, View, StyleSheet} from 'react-native';
import StickyHeader from "./StickyHeader";

export default class MovieListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: [1, 2, 3, 4, 5, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
      scrollY: new Animated.Value(0),
      headHeight: -1
    };
  }

  _keyExtractor = (item, index) => index.toString();

  _itemDivide = () => {
    return <View style={{height: 1, backgroundColor: '#ccc'}}/>;
  };

  _renderItem = (item) => {
    return (
      <View>
        <Text style={{height: 200}}>666</Text>
      </View>
    );
  };

  render() {
    return (
      <Animated.ScrollView
        style={{flex: 1}}
        onScroll={
          Animated.event(
            [{
              nativeEvent: {contentOffset: {y: this.state.scrollY}} // 记录滑动距离
            }],
            {useNativeDriver: true}) // 使用原生动画驱动
        }
        scrollEventThrottle={1}
      >
        <View onLayout={(e) => {
          let {height} = e.nativeEvent.layout;
          this.setState({headHeight: height}); // 给头部高度赋值
        }}>
          <View>
            <Text style={styles.topHeader}>这是头部</Text>
          </View>
        </View>
        <StickyHeader
          stickyHeaderY={this.state.headHeight} // 把头部高度传入
          stickyScrollY={this.state.scrollY}  // 把滑动距离传入
        >
          <View>
            <Text style={styles.tab}>这是顶部</Text>
          </View>
        </StickyHeader>

        <FlatList
          data={this.state.movieList}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this._itemDivide}
        />
      </Animated.ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHeader: {
    height: 60,
    textAlign: "center",
  },
  tab: {
    height: 80,
    zIndex: 999,
    textAlign: "center",
    backgroundColor: "red"
  }
});