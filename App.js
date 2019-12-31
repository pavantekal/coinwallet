/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import Login from "../coinwallet/app/components/login";

import React, {Component} from 'react';
import {View, Text, Button, TouchableOpacity, Image} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import index from '../coinwallet/app/components/index';
import signup from '../coinwallet/app/components/signup';
import login from '../coinwallet/app/components/login';
import News from '../coinwallet/app/components/News';
import Accounts from '../coinwallet/app/components/Accounts';
import Transactions from '../coinwallet/app/components/Transactions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import * as firebase from 'firebase';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

var firebaseConfig = {
  apiKey: 'AIzaSyCsUOsoLUh_YJvoLZhIibBEj5eP-PU4a3A',
  authDomain: 'coinwallet-7055d.firebaseapp.com',
  databaseURL: 'https://coinwallet-7055d.firebaseio.com',
  projectId: 'coinwallet-7055d',
  storageBucket: 'coinwallet-7055d.appspot.com',
  messagingSenderId: '611007723491',
  appId: '1:611007723491:web:0373a5c63e319bc1ad92d6',
  measurementId: 'G-KPT1RH1N93',
};
firebase.initializeApp(firebaseConfig);

const TabNavigator = createBottomTabNavigator(
  {
    News: News,
    Accounts: Accounts,
    Price: Transactions,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'News') {
          iconName = 'md-paper';
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
        } else if (routeName === 'Accounts') {
          iconName = 'md-book';
        } else if (routeName === 'Price') {
          iconName = 'md-analytics';
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#626bb0',
      inactiveTintColor: 'gray',
    },
  },
);

const MainNavigator = createStackNavigator(
  {
    Index: {screen: index},
    News: {
      screen: TabNavigator,
      navigationOptions: {
        headerLeft: null,
        headerRight: () => (
          <TouchableOpacity
            style={{marginRight: 20}}
            onPress={() =>
              (signOutUser = () => {
                this.props.navigation.navigate('Index');
              })
            }>
            <Image
              style={{width: wp('4%'), height: hp('4%')}}
              source={{
                uri:
                  'https://cdn3.iconfinder.com/data/icons/glypho-computers-andother-tech/64/door-exit-256.png',
              }}
            />
          </TouchableOpacity>
        ),
        title: 'Coinwallet',
        headerStyle: {
          backgroundColor: '#f27b35',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'Inconsolata-Bold',
        },
      },
    },
    Login: {screen: login},
    Signup: {screen: signup},
  },
  {headerMode: 'screen'},
);

const App = createAppContainer(MainNavigator);

export default App;
