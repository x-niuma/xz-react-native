import React, { Component } from 'react';
import UserCollectPage from '../bizCommon/UserCollectPage'

export default class MyFollow extends Component {
  render() {
    const { navigation } = this.props;
    return <UserCollectPage navigation={navigation} actType="2"/>
  }
}