import React , { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import DishDetail from './DishDetailComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';



const MainDrawerStack = createDrawerNavigator();
const HomeStack = createStackNavigator();
const MenuStack = createStackNavigator();

const MenuNavigator = () => {
    return (
      <MenuStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#512DA8',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff',
          },
        }}
      >
        <MenuStack.Screen name='Menu' component={Menu} />
        <MenuStack.Screen name='Dishdetail' component={DishDetail} />
      </MenuStack.Navigator>
    );
  };

const HomeNavigator = () => {
return (
    <HomeStack.Navigator
    headerMode='screen'
    screenOptions={{
        headerStyle: {
        backgroundColor: '#512DA8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        color: '#fff',
        },
    }}
    >
    <HomeStack.Screen name='Home' component={Home} />
    </HomeStack.Navigator>
);
};
const MainNavigator = () => {
    return (
      <MainDrawerStack.Navigator
        headerMode='screen'
        initialRouteName='Home'
        options={{
          headerStyle: {
            backgroundColor: '#512DA8',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff',
          },
        }}
        screenOptions={{ drawerBackgroundColor: '#D1C4E9' }}
      >
        <MainDrawerStack.Screen
          name='Menu'
          options={{ drawerLabel: 'Menu' }}
          component={MenuNavigator}
        />
        <MainDrawerStack.Screen
          name='Home'
          options={{ drawerLabel: 'Home' }}
          component={HomeNavigator}
        />
      </MainDrawerStack.Navigator>
    );
  };

class Main extends Component {


    render(){
        return(
            <View style={{flex : 1, paddingTop : Platform.OS ==='ios' ? 0: Expo.Constants.statusBarHeight }} >
           <NavigationContainer>
          <MainNavigator/>
        </NavigationContainer>
            </View>
        ); 
    }
}

export default Main;