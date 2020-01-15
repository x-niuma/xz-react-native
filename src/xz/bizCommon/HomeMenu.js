import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback
} from 'react-native';

import menuList from '../res/data/homeMenuList';

export default class Home extends React.Component {
  _switchPage = (index) => {
    this.props.navigation.push('H5', {
      url: menuList[index].url
    })
  };

  render() {
    return (
      <View style={styles.entry_list}>
        {
          menuList.map((item, index) => {
            return (
              <TouchableWithoutFeedback onPress={() => this._switchPage(index)} key={index}>
                <View style={styles.entry_item}>
                  <Image style={styles.entry_icon} source={{ uri: 'https:' + item.icon }} />
                  <Text style={styles.entry_name}>{item.name}</Text>
                </View>
              </TouchableWithoutFeedback>
            )
          })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  entry_list: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 8,
    backgroundColor: '#fff'
  },
  entry_item: {
    width: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 10
  },
  entry_icon: {
    width: 40,
    height: 40
  },
  entry_name: {
    fontSize: 12,
    lineHeight: 16,
    color: '#666',
    marginTop: 10
  },
});
