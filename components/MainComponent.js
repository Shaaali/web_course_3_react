import React , { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import DishDetail from './DishDetailComponent';
import AboutUs from './AboutComponent';
import ContactUs from './ContactComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';

import {Icon} from 'react-native-elements'; 

import { View, Platform , Image, StyleSheet, ScrollView, Text} from 'react-native';
import { createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator ,DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders} from '../redux/ActionCreators';
import { connect } from 'react-redux';

const MainDrawerStack = createDrawerNavigator();
const HomeStack = createStackNavigator();
const MenuStack = createStackNavigator();
const AboutStack = createStackNavigator();
const ContactStack = createStackNavigator();
const ReservationStack = createStackNavigator();
const FavoritesStack = createStackNavigator();
const LoginStack = createStackNavigator();

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders())
})

const FavoritesNavigator = () => {
  return (
    <FavoritesStack.Navigator
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
      <ContactStack.Screen name='Favorites' component={Favorites} options={({ navigation, route }) => ({
          headerLeft: () => (
            <Icon name='menu' size={24} color='white' 
            onPress={() => navigation.toggleDrawer()}></Icon>
    )
        })}/>
    </FavoritesStack.Navigator>
  );
};

const LoginNavigator = () => {
  return (
    <LoginStack.Navigator
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
      <LoginStack.Screen name='Login' component={Login} options={({ navigation, route }) => ({
          headerLeft: () => (
            <Icon name='menu' size={24} color='white' 
            onPress={() => navigation.toggleDrawer()}></Icon>
    )
        })}/>
    </LoginStack.Navigator>
  );
};


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
const ReservationNavigator = () => {
  return (
    <ReservationStack.Navigator
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
      <ReservationStack.Screen name='Contact Us' component={Reservation} options={({ navigation, route }) => ({
          headerLeft: () => (
            <Icon name='menu' size={24} color='white' 
            onPress={() => navigation.toggleDrawer()}></Icon>
    )
        })}/>
    </ReservationStack.Navigator>
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
        drawerContent= {props => <CustomDrawerContentComponent {...props} />}
        >
        <MainDrawerStack.Screen
          name='Login'
          options={{ drawerLabel: 'Login' , 
          drawerIcon: ({tintColor, focused})=>(
            <Icon 
                name='sign-in'
                type='font-awesome'
                size={24}
                color={tintColor}>
            </Icon>)}}
          component={LoginNavigator}/> 
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
         <MainDrawerStack.Screen
          name='Reserve Table'
          options={{ drawerLabel: 'Reserve Table' , 
          drawerIcon: ({tintColor, focused})=>(
            <Icon 
                name='cutlery'
                type='font-awesome'
                size={24}
                color={tintColor}>
            </Icon>)}}
          component={ReservationNavigator}/>
      
        <MainDrawerStack.Screen
        name='Favorites'
        options={{ drawerLabel: 'Favorites' , 
        drawerIcon: ({tintColor, focused})=>(
          <Icon 
              name='heart'
              type='font-awesome'
              size={24}
              color={tintColor}>
          </Icon>)}}
        component={FavoritesNavigator}/>

      </MainDrawerStack.Navigator>
    );
  }

class Main extends Component {

    componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

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

export default connect(mapStateToProps, mapDispatchToProps)(Main);