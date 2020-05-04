import React , { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import DishDetail from './DishDetailComponent';
import AboutUs from './AboutComponent';
import ContactUs from './ContactComponent';
import {Icon} from 'react-native-elements'; 

import { View, Platform , Image, StyleSheet, ScrollView, Text} from 'react-native';
import { createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator ,DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';


const MainDrawerStack = createDrawerNavigator();
const HomeStack = createStackNavigator();
const MenuStack = createStackNavigator();
const AboutStack = createStackNavigator();
const ContactStack = createStackNavigator();

const AboutNavigator = () => {
    return (
      <AboutStack.Navigator
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
        <MenuStack.Screen name='About Us' component={AboutUs} options={({ navigation, route }) => ({
          headerLeft: () => (
            <Icon name='menu' size={24} color='white' 
            onPress={() => navigation.toggleDrawer()}></Icon>
    )
        })}/>
      </AboutStack.Navigator>
    );
  };
  const ContactNavigator = () => {
    return (
      <ContactStack.Navigator
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
        <MenuStack.Screen name='Contact Us' component={ContactUs} options={({ navigation, route }) => ({
          headerLeft: () => (
            <Icon name='menu' size={24} color='white' 
            onPress={() => navigation.toggleDrawer()}></Icon>
    )
        })}/>
      </ContactStack.Navigator>
    );
  };
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
        <MenuStack.Screen name='Menu' component={Menu} options={({ navigation, route }) => ({
          headerLeft: () => (
            <Icon name='menu' size={24} color='white' 
            onPress={() => navigation.toggleDrawer()}></Icon>
    )
        })}/>
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
    <HomeStack.Screen name='Home' component={Home} options={({ navigation, route }) => ({
          headerLeft: () => (
            <Icon name='menu' size={24} color='white' 
            onPress={() => navigation.toggleDrawer()}></Icon>
    )
        })} />
    </HomeStack.Navigator>
);
};

const CustomDrawerContentComponent = (props) =>{
  return(
    <ScrollView>
     <SafeAreaView style={styles.container}
            forceInset={{top:'always', horizontal: 'never'}}>
            <View style={styles.drawerHeader}>
               <View style={{flex:1}}>
                  <Image source={require('./images/logo.png')}
                          style={styles.drawerImage} />
                </View> 
                <View style={{flex:2}}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItemList {...props} />
      </SafeAreaView>
    </ScrollView>
  ) ;
}
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
        drawerContent= {props => <CustomDrawerContentComponent {...props} />}
        >
        <MainDrawerStack.Screen
          name='Menu'
          options={{ drawerLabel: 'Menu',
          drawerIcon: ({tintColor})=>(
            <Icon 
                name='list'
                type='font-awesome'
                size={24}
                color={tintColor}>
            </Icon>) }}
          component={MenuNavigator}
        />
        <MainDrawerStack.Screen
          name='Home'
          options={{ drawerLabel: 'Home',
           drawerIcon: ({tintColor})=>(
            <Icon 
                name='home'
                type='font-awesome'
                size={24}
                color={tintColor}>
            </Icon>) }}
          component={HomeNavigator}
        />
        <MainDrawerStack.Screen
          name='About Us'
          options={{ drawerLabel: 'About Us', 
          drawerIcon: ({tintColor})=>(
            <Icon 
                name='info-circle'
                type='font-awesome'
                size={24}
                color={tintColor}>
            </Icon>) }}
          component={AboutNavigator}
        />
         <MainDrawerStack.Screen
          name='Contact Us'
          options={{ drawerLabel: 'Contact Us',
          drawerIcon: ({tintColor})=>(
            <Icon 
                name='address-card'
                type='font-awesome'
                size={22}
                color={tintColor}>
            </Icon>) }}
          component={ContactNavigator}
        />
      </MainDrawerStack.Navigator>
    );
  }

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
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});

export default Main;