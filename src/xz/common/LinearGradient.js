import React from 'react';
import LinearGradient from 'react-native-linear-gradient'

/**
 * @description 背景渐变组件
 */
export default class CommonLinearGradient extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const colors = this.props.colors || ['#c82519', '#fff'];
    const style = this.props.style || {};
    const start = this.props.start || { x: 0, y: 0 };
    const end = this.props.end || { x: 0, y: 0 };
    const locations = this.props.locations || [0, 1];
    return (
      <LinearGradient
        start={start}
        end={end}
        locations={locations}
        colors={colors}
        style={style}
      >
        {this.props.children}
      </LinearGradient>
    );
  }
}
