import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const list = [];
for(let index = 0; index < 100; index++) {
  list.push(index);
}

/**
 * @description 导航栏 demo
 */
class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      // header:  null,
      title: 'ddd',
      // headerTransparent: true, // 背景透明
    }
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1}}>
          {
            list.map(item => {
              return (
                <Text key={item}>{item}</Text>
              )
            })
          }
        </ScrollView>

        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('Details')}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      // headerMode: 'screen'
    }
  }
);

export default createAppContainer(AppNavigator);