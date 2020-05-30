/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Main from './_app/Main';
import Details from './_app/Details';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />

      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Main'}>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{title: 'Search'}}
          />
          <Stack.Screen
            name="Details"
            component={Details}
            options={{title: 'Details', gestureEnabled: true}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
