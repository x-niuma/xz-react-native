import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ListView from 'deprecated-react-native-listview'
import Icon from 'react-native-vector-icons/AntDesign';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import theme from '../res/style/theme';

const avatar_url = 'https://mall.s.maizuo.com/503e28f40d91666e7b2317589f653c46.jpg?x-oss-process=image/resize,w_563';

// 关于作者
class Talks extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }).cloneWithRows([
        'Simplicity Matters',
        'Hammock Driven Development',
        'Value of Values',
        'Are We There Yet?',
        'The Language of the System',
        'Design, Composition, and Performance',
        'Clojure core.async',
        'The Functional Database',
        'Deconstructing the Database',
        'Hammock Driven Development',
        'Value of Values'
      ])
    };
  }

  _renderStickyHeader = () => {
    return (
      <View key="sticky-header" style={styles.stickySection}>
        <Text style={styles.stickySectionText}>语锲外包</Text>
      </View>
    )
  }

  _renderFixedHeader = () => {
    return (
      <View key="fixed-header" style={styles.fixedSection}>
        <Text style={styles.fixedSectionText} onPress={() => this.props.navigation.pop()}>
          <Icon name="left" size={24} color='white'/>
        </Text>
      </View>
    )
  }

  render() {
    const { onScroll = () => {} } = this.props;
    return (
      <ListView
        ref="ListView"
        style={styles.container}
        dataSource={ this.state.dataSource }
        renderRow={(rowData) => (
          <View key={rowData} style={ styles.row }>
            <Text style={ styles.rowText }>{ rowData }</Text>
          </View>
         )}
        renderScrollComponent={props => (
          <ParallaxScrollView
            onScroll={onScroll}
            headerBackgroundColor="#333"
            stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
            parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
            backgroundSpeed={10}
            renderBackground={() => (
              <View key="background">
                <Image style={styles.card_mask_img} source={{ uri: avatar_url}}/>
                <View style={styles.card_mask}/>
              </View>
            )}
            renderForeground={() => (
              <View key="parallax-header" style={ styles.parallaxHeader }>
                <Image style={styles.avatar} source={{uri: avatar_url}}/>
                <Text style={styles.sectionSpeakerText}>语锲社区</Text>
                <Text style={styles.sectionTitleText}>专注Web/JS/移动端</Text>
              </View>
            )}
            renderStickyHeader={this._renderStickyHeader}
            renderFixedHeader={this._renderFixedHeader}
          />
        )}
      />
    );
  }
}

const window = Dimensions.get('window');
const AVATAR_SIZE = 80;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 300;
const STICKY_HEADER_HEIGHT = 90;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.primaryColor
  },
  stickySection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 45,
    height: STICKY_HEADER_HEIGHT,
    textAlign: 'center',
    backgroundColor: theme.primaryColor
  },
  fixedSectionText: {
    color: '#fff',
    fontSize: 14
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 14,
    paddingVertical: 5
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  rowText: {
    fontSize: 20
  },
  // banner
  card_mask: {
    position: 'absolute',
    top: 0,
    width: window.width,
    backgroundColor: 'rgba(0, 0, 0, .4)',
    height: PARALLAX_HEADER_HEIGHT
  },
  card_mask_img: {
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2
  },
  stickySectionText: {
    color: 'white',
    fontSize: 18
  },
  fixedSection: {
    position: 'absolute',
    top: 50,
    left: 10
  },
});

export default Talks;