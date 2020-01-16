import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import Home from './page/Home';
import Welcome from './page/Welcome';
import Account from './page/Account';
import Category from './page/Category';
import XzProductList from './page/XzProductList';
import XzProduct from './page/XzProduct';
import Login from './page/Login';
import AboutUs from './page/AboutUs';
import AboutAuthor from './page/AboutAuthor';
import TestScreen from './page/Test';
import ScanScreen from './page/Scan';
import H5Screen from './page/H5';
import ChatUsers from './page/ChatUsers';
import Chat from './page/Chat';
import Search from './page/Search';

import MyPoint from './page/MyPoint';
import MyCollect from './page/MyCollect';
import MyStar from './page/MyStar';
import MyFollow from './page/MyFollow';
import MyXzProduct from './page/MyXzProduct';
import AddXzProduct from './page/AddXzProduct';
import MyAddress from './page/MyAddress';
import EditAddress from './page/EditAddress';
import AMap from './page/Amap';

const getNavigationOptions = ({ navigation }) => {
  return {
    tabBarVisible: !(navigation.state.index > 0)
  }
};

const HomeStack = createStackNavigator({
  Home: {
    screen: Home
  },
  XzProduct: {
    screen: XzProduct
  },
  Search: {
    screen: Search
  },
  Scan: {
    screen: ScanScreen
  },
  Chat: {
    screen: Chat
  },
  H5: {
    screen: H5Screen
  }
}, {
  defaultNavigationOptions: {
    header: null
  }
});
HomeStack.navigationOptions = getNavigationOptions;

const CategoryStack = createStackNavigator({
  Category: {
    screen: Category
  },
  XzProductList: {
    screen: XzProductList
  },
  XzProduct: {
    screen: XzProduct
  },
}, {
  defaultNavigationOptions: {
    header: null
  }
});
CategoryStack.navigationOptions = getNavigationOptions;

const ChatStack = createStackNavigator({
  ChatUsers: {
    screen: ChatUsers
  },
  Chat: {
    screen: Chat
  }
});

const AccountStack = createStackNavigator({
  Account: {
    screen: Account
  },
  AboutUs: {
    screen: AboutUs
  },
  AboutAuthor: {
    screen: AboutAuthor
  },
  Test: {
    screen: TestScreen
  },
  Scan: {
    screen: ScanScreen
  },
  H5: {
    screen: H5Screen
  },
  MyPoint: {
    screen: MyPoint
  },
  MyStar: {
    screen: MyStar
  },
  MyFollow: {
    screen: MyFollow
  },
  MyCollect: {
    screen: MyCollect
  },
  MyXzProduct: {
    screen: MyXzProduct
  },
  MyAddress: {
    screen: MyAddress
  },
  AddXzProduct: {
    screen: AddXzProduct
  },
  XzProduct: {
    screen: XzProduct
  },
  AMap: {
    screen: AMap
  }
}, {
  initialRouteName: 'Account',
  defaultNavigationOptions: {
    header: null
  }
});
AccountStack.navigationOptions = getNavigationOptions;

const defaultColor = '#333';
const activeColor = '#c82519';
const iconSize = 20;
const MainStack = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: '首页',
      tabBarIcon: ({ focused }) => {
        return (
          <Entypo
            name="home"
            size={iconSize}
            style={{ color: focused ? activeColor : defaultColor }}
          />
        )
      },
    }
  },
  Category: {
    screen: CategoryStack,
    navigationOptions: {
      tabBarLabel: '分类',
      tabBarIcon: ({ focused }) => {
        return (
          <AntDesign
            name="appstore1"
            size={iconSize}
            style={{ color: focused ? activeColor : defaultColor }}
          />
        )
      },
    }
  },
  ChatUsers: {
    screen: ChatStack,
    navigationOptions: {
      tabBarLabel: '聊天',
      tabBarIcon: ({ focused }) => {
        return (
          <AntDesign
            name="message1"
            size={iconSize}
            style={{ color: focused ? activeColor : defaultColor }}
          />
        )
      },
    }
  },
  Account: {
    screen: AccountStack,
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        return (
          <FontAwesome
            name="user"
            size={iconSize}
            style={{ color: focused ? activeColor : defaultColor }}
          />
        )
      },
      tabBarLabel: '我的'
    }
  }
}, {
  defaultNavigationOptions: {
    headerMode: 'screen'
  },
  initialRouteName: 'Home',
  tabBarOptions: {
    inactiveTintColor: defaultColor,
    activeTintColor: activeColor,
  },
});

const AppNavigator = createStackNavigator(
  {
    Welcome: {
      screen: Welcome
    },
    Main: {
      screen: MainStack
    },
    Login: {
      screen: Login
    },
    EditAddress: {
      screen: EditAddress
    }
  },
  {
    initialRouteName: 'Welcome',
    mode: 'modal',
    headerMode: 'none',
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default createAppContainer(AppNavigator);