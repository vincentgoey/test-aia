import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import NavigationService from './navigationService';
import itemDetails from '../page/itemDetails';
import itemListing from '../page/itemListing';
import WebviewFrame from '../page/webView';
import Search from '../page/search';

const RootStack = createStackNavigator();
const RootStackNavigator = () => {
  return (
    <NavigationContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}>
      <RootStack.Navigator
        initialRouteName="itemListing"
        screenOptions={{
          gestureEnabled: false,
          headerShown: true,
          presentation: 'transparentModal',
          cardOverlayEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <RootStack.Screen
          name="itemListing"
          component={itemListing}
          options={{title: 'Item Listing'}}
        />
        <RootStack.Screen
          name="itemDetails"
          component={itemDetails}
          options={{title: 'Item Details'}}
        />
        <RootStack.Screen
          name="WebView"
          component={WebviewFrame}
          options={{title: 'More Details'}}
        />
        <RootStack.Screen
          name="Search"
          component={Search}
          options={{title: 'Search'}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigator;
