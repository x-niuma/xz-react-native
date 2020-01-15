import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Carousel } from '@ant-design/react-native';
const { width, height } = Dimensions.get('window');

// 轮播组件
export default class CommonSwiper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curIndex: 1
    }
  }

  onHorizontalSelectedIndexChange = async (index) => {
    this.setState({
      curIndex: index
    })
  };

  _handleClick = (index) => {
    if (typeof this.props.onClickItem === 'function') {
      this.props.onClickItem(index);
    }
  };

  render() {
    const { curIndex } = this.state;
    const dList = this.props.data;
    return (
      <View style={styles.wrapper}>
        <Carousel
          selectedIndex={curIndex}
          autoplay
          infinite
          afterChange={this.onHorizontalSelectedIndexChange}
          dotStyle={styles.dotStyle}
          dotActiveStyle={styles.dotActiveStyle}
        >
          {
            dList.map((slide, index) => {
              return (
                <View style={[styles.containerHorizontal]} key={index}>
                  <TouchableWithoutFeedback onPress={()=> this._handleClick(index)}>
                    <Image source={{ uri: slide.img }} style={styles.slide_img}/>
                  </TouchableWithoutFeedback>
                </View>
              )
            })
          }
        </Carousel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative'
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingTop: 4
  },
  dotStyle: {
    width: 16,
    height: 3,
    borderRadius: 0,
    marginBottom: 6,
    backgroundColor: 'rgba(0, 0, 0, .2)',
  },
  dotActiveStyle: {
    backgroundColor: '#fff'
  },
  slide_img: {
    height: 154,
    width: width - 24,
    borderRadius: 8
  }
});
